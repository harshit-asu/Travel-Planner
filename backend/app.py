# backend/app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User

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
    db.session.commit()
    return jsonify({"msg": "User signed up successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200

if __name__ == '__main__':
    app.run(debug=True)
