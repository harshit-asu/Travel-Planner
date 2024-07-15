# backend/models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, declarative_base
import uuid

Base = declarative_base()

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime)

    trip = relationship('Trip', cascade="all, delete", back_populates='user')
    user_people = relationship('People', cascade="all, delete", back_populates='people_user')
    user_verification_code = relationship('VerificationCode', cascade='all, delete', back_populates='verification_code_user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    
class Trip(db.Model):
    __tablename__ = 'trip'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    name = db.Column(db.String(160), nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    expected_budget = db.Column(db.Float)

    user = relationship('User', back_populates='trip')
    trip_people = relationship('People', cascade="all, delete", back_populates='people_trip')
    trip_activity = relationship('Activity', cascade="all, delete", back_populates='activity_trip')


class People(db.Model):
    __tablename__ = 'people'
    trip_id =  db.Column(db.Integer, ForeignKey('trip.id'), primary_key =True)
    user_id =  db.Column(db.Integer, ForeignKey('user.id'), primary_key =True)

    people_user = relationship('User', back_populates='user_people') 
    people_trip = relationship('Trip', back_populates='trip_people')


class Activity(db.Model):
    __tablename__ = 'activity'
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, ForeignKey('trip.id'))
    name = db.Column(db.String(160), nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    place = db.Column(db.String(160), nullable=False)
    expense = db.Column(db.Float)


    activity_trip = relationship('Trip', back_populates='trip_activity')


class VerificationCode(db.Model):
    __tablename__ = "verification_code"
    id = db.Column(db.Integer, primary_key=True, default=lambda: uuid.uuid4().int >> (128 - 32), unique=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    code = db.Column(db.Integer)

    verification_code_user = relationship('User', back_populates='user_verification_code')