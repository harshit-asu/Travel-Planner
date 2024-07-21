from flask import Flask, jsonify, request, abort, g
from flask_migrate import Migrate
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timedelta, date
from dotenv import load_dotenv
import os
import jwt
from flask_cors import CORS
from functools import wraps
from sqlalchemy import select

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travelplanner_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

from models import *

db.init_app(app=app)
migrate = Migrate(app, db, render_as_batch=True)

# Define error messages
error_messages = {
    'not_found': 'Resource not found',
    'invalid_request': 'Invalid request',
    'server_error': 'Internal server error',
    'unauthorized': 'Unauthorized access'
}

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'error': error_messages['unauthorized']}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            g.current_user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)

    return decorated


# Error handler for 404 Not Found
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"message": error_messages['not_found']}), 404


# Error handler for 400 Bad Request
@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({'message': error_messages['invalid_request']}), 400


# Error handler for 500 Internal Server Error
@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'message': error_messages['server_error']}), 500


##### Utils #####

def is_trip_member(trip_id, user_id):
    return TripMember.query.filter_by(trip_id=trip_id, user_id=user_id).first() != None

def get_user_name(user_id):
    try:
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            return None
        return f"{user.first_name} {user.last_name}"
    except Exception as e:
        return str(e)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        abort(400)
    
    try:
        if User.query.filter_by(email=data['email']).first() is not None:
            return jsonify({"message": "Email already registered"}), 400
        
        if User.query.filter_by(username=data['username']).first() is not None:
            return jsonify({"message": "Username already taken"}), 400

        new_user = User(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            is_verified=True,  # Remove this line after implementing send verification email feature
            phone_number=data.get('phone_number'),
            role=data.get("role", "user")
        )
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User sign up successful"}), 201

    except SQLAlchemyError as error:
        db.session.rollback()
        return jsonify({"message": "Something went wrong during sign up process", 'error': str(error)}), 500        


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        abort(400)

    # Authenticate user from database
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid username or password'}), 200

    # Create JWT token
    token = jwt.encode({'user_id': user.user_id, 'exp': datetime.now().astimezone() + timedelta(days=7)}, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({
        'message': 'User login successful',
        'token': token}), 200


@app.route('/is-logged-in', methods=['GET'])
@token_required
def is_logged_in():
    try:
        current_user = User.query.filter_by(user_id=g.current_user_id).first()
        if not current_user:
            abort(404)
        
        return jsonify({
            "user_id": current_user.user_id
        }), 200

    except SQLAlchemyError as error:
        db.session.rollback()
        return jsonify({"message": "Something went wrong during password reset", 'error': str(error)}), 500


@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    if not data or 'email' not in data:
        abort(400)

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"message": "User not found"}), 401
    
    return jsonify({
        "message": "User exists",
        "user_id": user.user_id
    }), 200


@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    if not data:
        abort(400)

    try:
        user = User.query.filter_by(user_id=data["user_id"]).first()
        if not user:
            return jsonify({"message": "User not found"}), 401
        
        user.set_password(data["password"])
        db.session.commit()

        return jsonify({
            "message": "Password reset successful"
        }), 200
        
    except SQLAlchemyError as error:
        db.session.rollback()
        return jsonify({"message": "Something went wrong during password reset", 'error': str(error)}), 500
    

@app.route('/users', methods=['GET'])
@token_required
def get_users():
    current_user = User.query.filter_by(user_id=g.current_user_id, role='admin').first()
    if current_user is None:
        abort(400)
    try:
        users = User.query.all()

        return jsonify({"users": [{
            "user_id": user.user_id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "created_at": user.created_at,
            "is_verified": user.is_verified,
            "role": user.role,
            "profile_picture": user.profile_picture
        } for user in users]}), 200
    
    except Exception as error:
        return jsonify({"message": "Something went wrong", 'error': str(error)}), 400


@app.route('/users/<int:user_id>', methods=['GET'])
@token_required
def get_user(user_id):
    current_user = User.query.filter_by(user_id=g.current_user_id, role='admin').first()
    if current_user is None and g.current_user_id != user_id:
        abort(400)
    try:
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            abort(404)
        print(datetime.now().astimezone().isoformat())
        print(user.created_at)
        return jsonify({"users": [{
            "user_id": user.user_id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone_number": user.phone_number,
            "created_at": user.created_at,
            "is_verified": user.is_verified,
            "role": user.role,
            "profile_picture": user.profile_picture
        }]}), 200
    
    except SQLAlchemyError as error:
        return jsonify({"message": "Something went wrong", 'error': str(error)}), 500


@app.route('/users/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(user_id):
    current_user = User.query.filter_by(user_id=g.current_user_id, role='admin').first()
    if current_user is None and g.current_user_id != user_id:
        abort(400)
    try:
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            abort(404)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except SQLAlchemyError as error:
        db.session.rollback()
        return jsonify({"message": "Something went wrong during user deletion", 'error': str(error)}), 500


@app.route('/users/<int:user_id>', methods=['PUT'])
@token_required
def update_user(user_id):
    admin_user = User.query.filter_by(user_id=g.current_user_id, role='admin').first()
    if admin_user is None and g.current_user_id != user_id:
        abort(400)
    try:
        data = request.get_json()
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            abort(404)

        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.phone_number = data.get('phone_number')
        password = data.get('password')
        if password:
            user.set_password(password)
        user.profile_picture = data.get('profile_picture')
        if admin_user:
            user.role = data.get('role')
        
        db.session.commit()

        return jsonify({"message": "User updated successfully"}), 200
    
    except SQLAlchemyError as error:
        db.session.rollback()
        return jsonify({"message": "Something went wrong during user deletion", 'error': str(error)}), 500
    

@app.route('/navbar', methods=['GET'])
@token_required
def get_user_data_for_navbar():
    try:
        user = User.query.filter_by(user_id=g.current_user_id).first()
        if not user:
            abort(404)

        notifications = user.notifications

        return jsonify({
            "user_id": user.user_id,
            "user_name": f"{user.first_name} {user.last_name}",
            "notifications": [{
                "notification_id": n.notification_id,
                "message": n.message
            } for n in notifications]
        }), 200
        
    except SQLAlchemyError as error:
        db.session.rollback()
        return jsonify({"message": "Something went wrong during user deletion", 'error': str(error)}), 500

# Trip management endpoints

@app.route('/trips', methods=['GET'])
@token_required
def get_trips():
    try:
        trips = Trip.query.filter_by(created_by=g.current_user_id).all()
        return jsonify({'trips': [{
            "trip_id": trip.trip_id,
            "trip_name": trip.trip_name,
            "start_date": trip.start_date.strftime('%d %b %Y'),
            "end_date": trip.end_date.strftime('%d %b %Y'),
            "budget": trip.budget,
            "created_at": trip.created_at,
            "members_count": len(trip.trip_members),
            "created_by": get_user_name(trip.created_by),
            "previous": (trip.start_date < date.today())
        } for trip in trips]}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@app.route('/trips/<int:trip_id>', methods=['GET'])
@token_required
def get_trip(trip_id):
    try:
        trip = Trip.query.filter_by(trip_id=trip_id).first()
        if not trip:
            abort(404)
        
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401

        return jsonify({"trips": [{
            "trip_id": trip.trip_id,
            "trip_name": trip.trip_name,
            "start_date": trip.start_date,
            "end_date": trip.end_date,
            "budget": trip.budget,
            "created_at": trip.created_at
        }]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips', methods=['POST'])
@token_required
def create_trip():
    data = request.get_json()
    if not data or 'trip_name' not in data or 'start_date' not in data or 'end_date' not in data:
        abort(400)

    try:
        new_trip = Trip(
            trip_name=data['trip_name'],
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date(),
            budget=data.get('budget'),
            created_by=g.current_user_id
        )
        db.session.add(new_trip)
        db.session.commit()

        new_trip_member = TripMember(
            trip_id=new_trip.trip_id,
            user_id=g.current_user_id,
            role='admin'
        )
        db.session.add(new_trip_member)
        db.session.commit()
        
        return jsonify({'message': 'Trip created successfully', 'trip_id': new_trip.trip_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>', methods=['PUT'])
@token_required
def update_trip(trip_id):
    data = request.get_json()
    if not data:
        abort(400)

    try:
        trip = Trip.query.filter_by(trip_id=trip_id).first()
        if not trip:
            abort(404)

        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401

        # Update trip fields
        trip.trip_name = data.get('trip_name', trip.trip_name)
        trip.start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date() if data.get('start_date') else trip.start_date
        trip.end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d').date() if data.get('end_date') else trip.end_date
        trip.budget = data.get('budget', trip.budget)

        db.session.commit()
        return jsonify({'message': 'Trip updated successfully', 'trip_id': trip.trip_id}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>', methods=['DELETE'])
@token_required
def delete_trip(trip_id):
    try:
        trip = Trip.query.filter_by(trip_id=trip_id).first()
        if not trip or trip.created_by != g.current_user_id:
            abort(404)

        db.session.delete(trip)
        db.session.commit()
        return jsonify({'message': 'Trip deleted successfully'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

# TripMember endpoints

@app.route('/trips/<int:trip_id>/trip-members', methods=['GET'])
@token_required
def get_trip_members(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401

        stmt = select(User).join(TripMember, User.user_id == TripMember.user_id).where(TripMember.trip_id == trip_id)
        print(stmt)

        result = db.session.execute(stmt).all()

        return jsonify({
            "trip_members": [{
                "user_id": row.User.user_id,
                "name": f'{row.User.first_name} {row.User.last_name}'
            } for row in result]
        }), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Invitation management endpoints

@app.route('/trips/<int:trip_id>/invitations', methods=['POST'])
@token_required
def invite_to_trip(trip_id):
    data = request.get_json()
    if not data or 'invitee_id' not in data:
        abort(400)

    try:
        # Check if invitee exists and is not already a member
        invitee = User.query.filter_by(user_id=data['invitee_id']).first()
        if not invitee:
            abort(404)

        existing_member = TripMember.query.filter_by(trip_id=trip_id, user_id=data['invitee_id']).first()
        if existing_member:
            return jsonify({'message': 'User is already a member of this trip'}), 200
        
        invitation_exists = TripInvitation.query.filter_by(trip_id=trip_id, receiver_id=data['invitee_id']).first()
        if invitation_exists:
            return jsonify({"message": "Invitation already exists"}), 200

        new_invitation = TripInvitation(
            trip_id=trip_id,
            sender_id=g.current_user_id,
            receiver_id=data['invitee_id']
        )
        db.session.add(new_invitation)
        db.session.commit()

        # create a new notification
        new_notification = Notification(
            user_id=data['invitee_id'],
            message=f"You have a new trip invitation."
        )
        db.session.add(new_notification)
        db.session.commit()

        return jsonify({'message': 'Invitation sent successfully'}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/invitations/<int:trip_invitation_id>/accept', methods=['PUT'])
@token_required
def accept_invitation(trip_invitation_id):
    try:
        invitation = TripInvitation.query.filter_by(trip_invitation_id=trip_invitation_id).first()
        if not invitation or invitation.receiver_id != g.current_user_id:
            abort(404)

        # invitation expired
        if invitation.expiry_at < datetime.now():
            db.session.delete(invitation)
            return jsonify({"message": "Invitation expired"}), 201

        # Add user to trip members
        new_member = TripMember(
            trip_id=invitation.trip_id,
            user_id=g.current_user_id
        )
        db.session.add(new_member)

        # Delete invitation
        db.session.delete(invitation)

        db.session.commit()
        return jsonify({'message': 'Invitation accepted successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/invitations/<int:trip_invitation_id>/decline', methods=['DELETE'])
@token_required
def decline_invitation(trip_invitation_id):
    try:
        invitation = TripInvitation.query.filter_by(trip_invitation_id=trip_invitation_id).first()
        if not invitation or invitation.receiver_id != g.current_user_id:
            abort(404)
        
        # create a new notification
        recipient = invitation.recipient

        new_notification = Notification(
            user_id=invitation.sender_id,
            message=f"The user {recipient.first_name} {recipient.last_name} declined your invitation to join the trip {invitation.trip.trip_name} :("
        )

        # Delete invitation
        db.session.delete(invitation)

        db.session.add(new_notification)

        db.session.commit()
        return jsonify({'message': 'Invitation declined successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Expense management endpoints

@app.route('/trips/<int:trip_id>/expenses', methods=['POST'])
@token_required
def add_expense(trip_id):
    data = request.get_json()
    if not data or 'category' not in data or 'amount' not in data:
        abort(400)

    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401

        new_expense = Expense(
            trip_id=trip_id,
            paid_by=g.current_user_id,
            category=data['category'],
            amount=data['amount'],
            expense_date=datetime.strptime(data.get('expense_date', str(datetime.now().date())), '%Y-%m-%d').date(),
            description=data.get('description')
        )
        db.session.add(new_expense)
        db.session.commit()

        if 'split_with' in data:
            for split_user_id, amount in data['split_with'].items():
                split_member = TripMember.query.filter_by(trip_id=trip_id, user_id=int(split_user_id)).first()
                if split_member:
                    new_split = ExpenseSplit(
                        expense_id=new_expense.expense_id,
                        trip_member_id=split_member.trip_member_id,
                        amount=amount
                    )
                    split_member.total_expenses += amount
                    db.session.add(new_split)

        db.session.commit()
        return jsonify({'message': 'Expense added successfully', 'expense_id': new_expense.expense_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>/expenses', methods=['GET'])
@token_required
def get_expenses(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        expenses = Expense.query.filter_by(trip_id=trip_id).all()
    
        return jsonify({'expenses': [{
            "expense_id": expense.expense_id,
            "paid_by": expense.paid_by,
            "category": expense.category,
            "amount": expense.amount,
            "expense_date": expense.expense_date,
            "description": expense.description
        } for expense in expenses]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@app.route('/expenses/<int:expense_id>', methods=['PUT'])
@token_required
def update_expense(expense_id):
    data = request.get_json()
    if not data or 'split_with' not in data:
        abort(400)

    try:
        expense = Expense.query.filter_by(expense_id=expense_id).first()
        if not expense or not is_trip_member(expense.trip_id, g.current_user_id):
            abort(404)
        
        expense.paid_by = data.get('paid_by', expense.paid_by)
        expense.category = data.get('category', expense.category)
        expense.amount = data.get('amount', expense.amount)        
        expense.expense_date = data.get('expense_date', expense.expense_date)        
        expense.description = data.get('description', expense.description)     

        if 'split_with' in data:
            splits = ExpenseSplit.query.filter_by(expense_id=expense_id).all()
            for split in splits:
                db.session.delete(split)

            for split_user_id, amount in data['split_with'].items():
                split_member = TripMember.query.filter_by(trip_id=expense.trip_id, user_id=int(split_user_id)).first()
                if split_member:
                    new_split = ExpenseSplit(
                        expense_id=expense_id,
                        trip_member_id=split_member.trip_member_id,
                        amount=amount
                    )
                    split_member.total_expenses += amount
                    db.session.add(new_split)  
            
        db.session.commit()

        return jsonify({"message": "Expense updated successfully"}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
@token_required
def delet_expense(expense_id):
    try:
        expense = Expense.query.filter_by(expense_id=expense_id).first()
        if not expense or not is_trip_member(expense.trip_id, g.current_user_id):
            abort(404)

        db.session.delete(expense)    
        db.session.commit()

        return jsonify({"message": "Expense deleted successfully"}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

# Expense splitting endpoints

@app.route('/expenses/<int:expense_id>/split', methods=['POST'])
@token_required
def split_expense(expense_id):
    data = request.get_json()
    if not data or 'split_with' not in data:
        abort(400)

    try:
        expense = Expense.query.filter_by(expense_id=expense_id)
        if not expense or expense.paid_by != g.current_user_id:
            abort(404)

        for split_user_id, amount in data['split_with'].items():
            split_member = TripMember.query.filter_by(trip_id=expense.trip_id, user_id=int(split_user_id)).first()
            if split_member:
                new_split = ExpenseSplit(
                    expense_id=expense_id,
                    trip_member_id=split_member.trip_member_id,
                    amount=amount
                )
                split_member.total_expenses += amount
                db.session.add(new_split)

        db.session.commit()
        return jsonify({'message': 'Expense split successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Destination management endpoints

@app.route('/trips/<int:trip_id>/destinations', methods=['POST'])
@token_required
def add_destination(trip_id):
    data = request.get_json()
    if not data or 'destination_name' not in data:
        abort(400)

    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        new_destination = Destination(
            trip_id=trip_id,
            destination_name=data['destination_name'],
            arrival=datetime.strptime(data['arrival'], '%Y-%m-%dT%H:%M:%S') if data.get('arrival') else None,
            departure=datetime.strptime(data['departure'], '%Y-%m-%dT%H:%M:%S') if data.get('departure') else None,
            description=data.get('description'),
            place_id=data.get('place_id')
        )
        db.session.add(new_destination)
        db.session.commit()

        return jsonify({'message': 'Destination added successfully', 'destination_id': new_destination.destination_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>/destinations', methods=['GET'])
@token_required
def get_destinations(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        destinations = Destination.query.filter_by(trip_id=trip_id).all()

        return jsonify({'destinations': [{
            "destination_id": d.destination_id,
            "destination_name": d.destination_name,
            "description": d.description,
            "place_id": d.place_id,
            "arrival": d.arrival,
            "departure": d.departure
        } for d in destinations]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/destinations/<int:destination_id>', methods=['PUT'])
@token_required
def update_destination(destination_id):
    data = request.get_json()
    if not data:
        abort(400)

    try:
        
        destination = Destination.query.get(destination_id)
        if not destination:
            abort(404)

        if not is_trip_member(destination.trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401

        destination.destination_name = data.get('destination_name', destination.destination_name)
        destination.arrival = datetime.strptime(data.get('arrival'), '%Y-%m-%dT%H:%M:%S') if data.get('arrival') else destination.arrival
        destination.departure = datetime.strptime(data.get('departure'), '%Y-%m-%dT%H:%M:%S') if data.get('departure') else destination.departure
        destination.description = data.get('description', destination.description)

        db.session.commit()
        return jsonify({'message': 'Destination updated successfully', 'destination_id': destination.destination_id}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/destinations/<int:destination_id>', methods=['DELETE'])
@token_required
def delete_destination(destination_id):
    try:
        destination = Destination.query.get(destination_id)
        if not destination:
            abort(404)

        if not is_trip_member(destination.trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401

        db.session.delete(destination)
        db.session.commit()
        return jsonify({'message': 'Destination deleted successfully'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Activity management endpoints

@app.route('/trips/<int:trip_id>/activities', methods=['POST'])
@token_required
def add_activity(trip_id):
    data = request.get_json()
    if not data or 'activity_name' not in data:
        abort(400)

    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        new_activity = Activity(
            trip_id=trip_id,
            destination_id=data.get('destination_id'),
            activity_name=data['activity_name'],
            start_time=datetime.strptime(data['start_time'], '%Y-%m-%dT%H:%M:%S') if data.get('start_time') else None,
            end_time=datetime.strptime(data['end_time'], '%Y-%m-%dT%H:%M:%S') if data.get('end_time') else None,
            description=data.get('description')
        )
        db.session.add(new_activity)
        db.session.commit()

        return jsonify({'message': 'Activity added successfully', 'activity_id': new_activity.activity_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>/activities', methods=['GET'])
@token_required
def get_activities(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        activities = Activity.query.filter_by(trip_id=trip_id).all()

        return jsonify({'activities': [{
            "activity_id": activity.activity_id,
            "activity_name": activity.activity_name,
            "destination_id": activity.destination_id,
            "start_time": activity.start_time,
            "end_time": activity.end_time,
            "description": activity.description
        } for activity in activities]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/activities/<int:activity_id>', methods=['PUT'])
@token_required
def update_activity(activity_id):
    data = request.get_json()
    if not data:
        abort(400)

    try:
        activity = Activity.query.get(activity_id)
        if not activity:
            abort(404)

        activity.activity_name = data.get('activity_name', activity.activity_name)
        activity.destination_id = data.get('destination_id', activity.destination_id)
        activity.start_time = datetime.strptime(data.get('start_time'), '%Y-%m-%dT%H:%M:%S') if data.get('start_time') else activity.start_time
        activity.end_time = datetime.strptime(data.get('end_time'), '%Y-%m-%dT%H:%M:%S') if data.get('end_time') else activity.end_time
        activity.description = data.get('description', activity.description)

        db.session.commit()
        return jsonify({'message': 'Activity updated successfully', 'activity_id': activity.activity_id}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/activities/<int:activity_id>', methods=['DELETE'])
@token_required
def delete_activity(activity_id):
    try:
        activity = Activity.query.get(activity_id)
        if not activity:
            abort(404)

        db.session.delete(activity)
        db.session.commit()

        return jsonify({'message': 'Activity deleted successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Transport management endpoints

@app.route('/trips/<int:trip_id>/transports', methods=['POST'])
@token_required
def add_transport(trip_id):
    data = request.get_json()
    if not data or 'mode_of_transport' not in data:
        abort(400)

    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        new_transport = Transport(
            trip_id=trip_id,
            mode_of_transport=data['mode_of_transport'],
            departure_location=data.get('departure_location'),
            arrival_location=data.get('arrival_location'),
            departure_time=datetime.strptime(data['departure_time'], '%Y-%m-%dT%H:%M:%S') if data.get('departure_time') else None,
            arrival_time=datetime.strptime(data['arrival_time'], '%Y-%m-%dT%H:%M:%S') if data.get('arrival_time') else None,
            cost=data.get('cost'),
            description=data.get('description')
        )
        db.session.add(new_transport)
        db.session.commit()

        return jsonify({'message': 'Transport added successfully', 'transport_id': new_transport.transport_id}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>/transports', methods=['GET'])
@token_required
def get_transports(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        transports = Transport.query.filter_by(trip_id=trip_id).all()

        return jsonify({'transport': [{
            "transport_id": t.transport_id,
            "mode_of_transport": t.mode_of_transport,
            "departure_location": t.departure_location,
            "arrival_location": t.arrival_location,
            "departure_time": t.departure_time,
            "arrival_time": t.arrival_time,
            "cost": t.cost,
            "description": t.description
        } for t in transports]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/transports/<int:transport_id>', methods=['PUT'])
@token_required
def update_transport(transport_id):
    data = request.get_json()
    if not data:
        abort(400)

    try:
        transport = Transport.query.filter_by(transport_id=transport_id).first()
        if not transport:
            abort(404)

        transport.mode_of_transport = data.get('mode_of_transport', transport.mode_of_transport)
        transport.departure_location = data.get('departure_location', transport.departure_location)
        transport.arrival_location = data.get('arrival_location', transport.arrival_location)
        transport.departure_time = datetime.strptime(data.get('departure_time'), '%Y-%m-%dT%H:%M:%S') if data.get('departure_time') else transport.departure_time
        transport.arrival_time = datetime.strptime(data.get('arrival_time'), '%Y-%m-%dT%H:%M:%S') if data.get('arrival_time') else transport.arrival_time
        transport.cost = data.get('cost', transport.cost)
        transport.description = data.get('description', transport.description)

        db.session.commit()

        return jsonify({'message': 'Transport updated successfully', 'transport_id': transport.transport_id}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/transports/<int:transport_id>', methods=['DELETE'])
@token_required
def delete_transport(transport_id):
    try:
        transport = Transport.query.filter_by(transport_id=transport_id).first()
        if not transport:
            abort(404)

        db.session.delete(transport)
        db.session.commit()

        return jsonify({'message': 'Transport deleted successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Accommodation management endpoints

@app.route('/trips/<int:trip_id>/accommodations', methods=['POST'])
@token_required
def add_accommodation(trip_id):
    data = request.get_json()
    if not data or 'accommodation_name' not in data:
        abort(400)

    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        new_accommodation = Accommodation(
            trip_id=trip_id,
            destination_id=data.get('destination_id'),
            accommodation_name=data['accommodation_name'],
            check_in=datetime.strptime(data['check_in'], '%Y-%m-%dT%H:%M:%S') if data.get('check_in') else None,
            check_out=datetime.strptime(data['check_out'], '%Y-%m-%dT%H:%M:%S') if data.get('check_out') else None,
            cost=data.get('cost'),
            description=data.get('description')
        )
        db.session.add(new_accommodation)
        db.session.commit()

        return jsonify({'message': 'Accommodation added successfully', 'accommodation_id': new_accommodation.accommodation_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>/accommodations', methods=['GET'])
@token_required
def get_accommodations(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        accommodations = Accommodation.query.filter_by(trip_id=trip_id).all()

        return jsonify({'accommodations': [{
            "accommodation_id": a.accommodation_id,
            "accommodation_name": a.accommodation_name,
            "destination_id": a.destination_id,
            "check_in": a.check_in,
            "check_out": a.check_out,
            "cost": a.cost,
            "description": a.description
        } for a in accommodations]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/accommodations/<int:accommodation_id>', methods=['PUT'])
@token_required
def update_accommodation(accommodation_id):
    data = request.get_json()
    if not data:
        abort(400)

    try:
        accommodation = Accommodation.query.filter_by(accommodation_id=accommodation_id).first()
        if not accommodation:
            abort(404)

        accommodation.accommodation_name = data.get('accommodation_name', accommodation.accommodation_name)
        accommodation.destination_id = data.get('destination_id', accommodation.destination_id)
        accommodation.check_in = datetime.strptime(data.get('check_in'), '%Y-%m-%dT%H:%M:%S') if data.get('check_in') else accommodation.check_in
        accommodation.check_out = datetime.strptime(data.get('check_out'), '%Y-%m-%dT%H:%M:%S') if data.get('check_out') else accommodation.check_out
        accommodation.cost = data.get('cost', accommodation.cost)
        accommodation.description = data.get('description', accommodation.description)

        db.session.commit()

        return jsonify({'message': 'Accommodation updated successfully', 'accommodation_id': accommodation.accommodation_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/accommodations/<int:accommodation_id>', methods=['DELETE'])
@token_required
def delete_accommodation(accommodation_id):
    try:
        accommodation = Accommodation.query.filter_by(accommodation_id=accommodation_id).first()
        if not accommodation:
            abort(404)

        db.session.delete(accommodation)
        db.session.commit()

        return jsonify({'message': 'Accommodation deleted successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Packing list management endpoints

@app.route('/trips/<int:trip_id>/packing-lists', methods=['POST'])
@token_required
def create_packing_list(trip_id):
    data = request.get_json()
    if not data or 'item_name' not in data:
        abort(400)

    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        new_packing_list = PackingList(
            trip_id=trip_id,
            item_name=data['item_name'],
            quantity=data.get('quantity')
        )

        db.session.add(new_packing_list)
        db.session.commit()

        return jsonify({'message': 'Packing list created successfully', 'packing_list_id': new_packing_list.packing_list_id}), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/trips/<int:trip_id>/packing-lists', methods=['GET'])
@token_required
def get_packing_lists(trip_id):
    try:
        if not is_trip_member(trip_id, g.current_user_id):
            return jsonify({'error': 'User is not a member of this trip'}), 401
        
        packing_lists = PackingList.query.filter_by(trip_id=trip_id).all()

        return jsonify({'packing_lists': [{
            "packing_list_id": pl.packing_list_id,
            "item_name": pl.item_name,
            "quantity": pl.quantity,
            "packed": pl.packed
        } for pl in packing_lists]}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/packing-lists/<int:packing_list_id>', methods=['PUT'])
@token_required
def update_packing_list(packing_list_id):
    data = request.get_json()
    if not data:
        abort(400)

    try:
        packing_list = PackingList.query.filter_by(packing_list_id=packing_list_id)
        if not packing_list or packing_list.created_by != g.current_user_id:
            abort(404)

        packing_list.item_name = data.get('item_name', packing_list.item_name)
        packing_list.quantity = data.get('quantity', packing_list.quantity)
        packing_list.packed = data.get('packed', packing_list.packed)

        db.session.commit()

        return jsonify({'message': 'Packing list updated successfully', 'packing_list_id': packing_list.packing_list_id}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/packing-lists/<int:packing_list_id>', methods=['DELETE'])
@token_required
def delete_packing_list(packing_list_id):
    try:
        packing_list = PackingList.query.filter_by(packing_list_id=packing_list_id)
        if not packing_list or packing_list.created_by != g.current_user_id:
            abort(404)

        db.session.delete(packing_list)
        db.session.commit()

        return jsonify({'message': 'Packing list deleted successfully'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@app.route('/users/<int:user_id>/notifications', methods=['GET'])
@token_required
def get_user_notifications(user_id):
    try:
        user = User.query.filter_by(user_id=user_id).first()
        if not user or g.current_user_id != user_id:
            abort(404)
        
        return jsonify({
            "notifications": [{
                "user_id": n.user_id,
                "notification_id": n.notification_id,
                "message": n.message,
                "is_read": n.is_read
            } for n in user.notifications]
        }), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)