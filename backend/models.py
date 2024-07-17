from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())
    is_verified = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(255), default='user')    # role can be 'admin', 'user'
    phone_number = db.Column(db.String(255))
    profile_picture = db.Column(db.String(255))

    # Define relationships
    trips_created = db.relationship('Trip', cascade="all,delete", backref='creator', lazy=True)
    trip_memberships = db.relationship('TripMember', cascade="all,delete", backref='user', lazy=True)
    invitations_sent = db.relationship('TripInvitation', cascade="all,delete", foreign_keys='TripInvitation.sender_id', backref='sender', lazy=True)
    invitations_received = db.relationship('TripInvitation', cascade="all,delete", foreign_keys='TripInvitation.receiver_id', backref='recipient', lazy=True)
    # reviews = db.relationship('Review', backref='author', lazy=True)
    notifications = db.relationship('Notification', cascade="all,delete", backref='recipient', lazy=True)
    # emergency_contacts = db.relationship('EmergencyContact',  backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Trip(db.Model):
    __tablename__ = 'trips'

    trip_id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    trip_name = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    budget = db.Column(db.Numeric(10, 2))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    # Define relationships
    trip_members = db.relationship('TripMember', cascade="all,delete", backref='trip', lazy=True)
    invitations = db.relationship('TripInvitation', cascade="all,delete", backref='trip', lazy=True)
    expenses = db.relationship('Expense', cascade="all,delete", backref='trip', lazy=True)
    transports = db.relationship('Transport', cascade="all,delete", backref='trip', lazy=True)
    accommodations = db.relationship('Accommodation', cascade="all,delete", backref='trip', lazy=True)
    packing_list = db.relationship('PackingList', cascade="all,delete", backref='trip', lazy=True)


class TripMember(db.Model):
    __tablename__ = 'trip_members'

    trip_member_id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    role = db.Column(db.String(255), default='member')
    total_expenses = db.Column(db.Numeric(10, 2))
    joined_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    # Define relationships
    expenses = db.relationship('Expense', cascade="all,delete", backref='payer', lazy=True)
    expense_splits = db.relationship('ExpenseSplit', cascade="all,delete", backref='trip_member', lazy=True)


class TripInvitation(db.Model):
    __tablename__ = 'trip_invitations'

    trip_invitation_id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    invitation_sent_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    expiry_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now() + db.func.interval('1 week'))


class Place(db.Model):
    __tablename__ = 'places'

    place_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(255))
    opening_hours = db.Column(db.String(255))
    entry_fee = db.Column(db.Numeric(10, 2))
    website = db.Column(db.String(255))
    contact_info = db.Column(db.String(255))
    picture = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    # Define relationships
    destinations = db.relationship('Destination', backref='place', lazy=True)


class Destination(db.Model):
    __tablename__ = 'destinations'

    destination_id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey('places.place_id'))
    arrival = db.Column(db.DateTime(timezone=True))
    departure = db.Column(db.DateTime(timezone=True))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    # Define relationships
    accommodations = db.relationship('Accommodation', cascade="all,delete", backref='destination', lazy=True)
    activities = db.relationship('Activity', cascade="all,delete", backref='destination', lazy=True)


class Expense(db.Model):
    __tablename__ = 'expenses'

    expense_id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'))
    paid_by = db.Column(db.Integer, db.ForeignKey('trip_members.trip_member_id'))
    category = db.Column(db.String(255))
    amount = db.Column(db.Numeric(10, 2))
    expense_date = db.Column(db.Date, server_default=db.func.current_date())
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    # Define relationships
    splits = db.relationship('ExpenseSplit', cascade="all,delete", backref='expense', lazy=True)


class ExpenseSplit(db.Model):
    __tablename__ = 'expense_splits'

    expense_split_id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey('expenses.expense_id'))
    trip_member_id = db.Column(db.Integer, db.ForeignKey('trip_members.trip_member_id'))
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


class Activity(db.Model):
    __tablename__ = 'activities'

    activity_id = db.Column(db.Integer, primary_key=True)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.destination_id'))
    activity_name = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime(timezone=True))
    end_time = db.Column(db.DateTime(timezone=True))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


class Transport(db.Model):
    __tablename__ = 'transport'

    transport_id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'))
    mode_of_transport = db.Column(db.String(255))
    departure_location = db.Column(db.String(255))
    arrival_location = db.Column(db.String(255))
    departure_time = db.Column(db.DateTime(timezone=True))
    arrival_time = db.Column(db.DateTime(timezone=True))
    cost = db.Column(db.Numeric(10, 2))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


class Accommodation(db.Model):
    __tablename__ = 'accommodations'

    accommodation_id = db.Column(db.Integer, primary_key=True)
    accommodation_name = db.Column(db.String(255), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.destination_id'))
    address = db.Column(db.Text)
    check_in = db.Column(db.DateTime(timezone=True))
    check_out = db.Column(db.DateTime(timezone=True))
    cost = db.Column(db.Numeric(10, 2))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


# class Review(db.Model):
#     __tablename__ = 'reviews'

#     review_id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
#     destination_id = db.Column(db.Integer, db.ForeignKey('destinations.destination_id'))
#     rating = db.Column(db.Integer, nullable=False)
#     comment = db.Column(db.Text)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
#     updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


class PackingList(db.Model):
    __tablename__ = 'packing_lists'

    packing_list_id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'))
    item_name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    packed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


class Notification(db.Model):
    __tablename__ = 'notifications'

    notification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


# class EmergencyContact(db.Model):
#     __tablename__ = 'emergency_contacts'

#     contact_id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
#     name = db.Column(db.String(255), nullable=False)
#     phone_number = db.Column(db.String(255), nullable=False)
#     relationship = db.Column(db.String(255))
#     created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
#     updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())