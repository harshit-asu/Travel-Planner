# backend/app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import random
from emails.send import send_verification_email

from models import db, User, Trip, People, VerificationCode


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travelplanner_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '27321DC87158B602B0A35ED734FCA137DEB6725E88D83ACA437BAC973209BD49'

# db = SQLAlchemy(app)
db.init_app(app=app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    firstName = data['firstName']
    lastName = data['lastName']
    email = data['email']
    password = data['password']

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"msg": "Email already registered"}), 400

    new_user = User(firstName=firstName,lastName=lastName, email=email)
    new_user.set_password(password)
    db.session.add(new_user)

    #TODO: send an email with verification code
    code = random.randint(1000, 9999)
    new_verification_code = VerificationCode(code=code, user_id=new_user.id)
    db.session.add(new_verification_code)
    db.session.commit()

    return jsonify({
        "msg": "User signed up successfully",
        "verification_id": new_verification_code.id
    }), 201

    # send email
    # if send_verification_email(code=new_verification_code.code, username=f'{firstName} {lastName}', to_email=email):
    #     db.session.commit()

    #     return jsonify({
    #         "msg": "User signed up successfully",
    #         "verification_id": new_verification_code.id
    #     }), 201

    # return jsonify({
    #     "msg": "Something went wrong"
    # }), 400


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401

    #TODO: check if verified or not

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200


@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "Email not found!"}), 401
    #TODO: send an email to this user with reset password link
    return jsonify({"msg": "Password reset instructions sent to email!"}), 200


@app.route('/trips', methods=['POST'])
@jwt_required()
def create_trip():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    new_trip = Trip(
        user_id=current_user_id,
        name=data['name'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d'),
        expected_budget=data.get('expected_budget', 0)
    )
    db.session.add(new_trip)
    db.session.commit()

    # create an entry in people with user_id
    db.session.add(People(trip_id=new_trip.id, user_id=current_user_id))
    db.session.commit()

    return jsonify({"msg": "Trip created successfully"}), 201


@app.route('/trips', methods=['GET'])
@jwt_required()
def get_trips():
    current_user_id = get_jwt_identity()
    trips = Trip.query.filter_by(user_id=current_user_id).all()
    return jsonify([{
        "id": trip.id,
        "name": trip.name,
        "start_date": trip.start_date.strftime('%Y-%m-%d'),
        "end_date": trip.end_date.strftime('%Y-%m-%d'),
        "expected_budget": trip.expected_budget
    } for trip in trips]), 200


@app.route('/trips/<int:trip_id>', methods=['PUT'])
@jwt_required()
def update_trip(trip_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=current_user_id).first()

    if trip is None:
        return jsonify({"msg": "Trip not found"}), 404

    trip.name = data['name']
    trip.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    trip.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    trip.expected_budget = data.get('expected_budget', trip.expected_budget)
    db.session.commit()

    return jsonify({"msg": "Trip updated successfully"}), 200


@app.route('/trips/<int:trip_id>', methods=['DELETE'])
@jwt_required()
def delete_trip(trip_id):
    current_user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=current_user_id).first()

    if trip is None:
        return jsonify({"msg": "Trip not found"}), 404

    db.session.delete(trip)
    db.session.commit()

    return jsonify({"msg": "Trip deleted successfully"}), 200


@app.route('/trips/<int:trip_id>/people', methods=['GET'])
@jwt_required()
def get_people_for_trip(trip_id):
    current_user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=current_user_id).first()

    if trip is None:
        return jsonify({"msg": "Trip not found"}), 404

    # write a query with user, and people tables to get user names
    """
        SELECT user.firstName, user.lastName
        FROM user
        WHERE user.id in (
            SELECT user_id
            FROM people
            where trip_id == trip.id
        )
    """
    #TODO: write query and get results into users list
    users = []

    return jsonify([{
        "id": user.id,
        "name": f"{user.firstName} {user.lastName}"
    } for user in users]), 200



if __name__ == '__main__':
    app.run(debug=True)
