from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import re

from config import db

import datetime

# Models go here!
class Guest(db.Model, SerializerMixin):
    __tablename__ = 'guests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)

    # relationships
    foods = db.relationship("Food", back_populates="guest", cascade="all, delete-orphan")
    parties = association_proxy("foods", "party")

    # serialization rules
    

    # validations
    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name is required.")
        if not (1 <= len(name) <= 15 and name.istitle()):
            raise ValueError("Invalid name format. Name must be between 1 and 15 characters with the first letter capitalized.")
        return name
    
    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email address is required.")
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, email):
            raise ValueError("Invalid email address format.")
        if len(email) > 40:
            raise ValueError("Email address must be between 1 and 40 characters.")
        return email
    
    @validates("phone_number")
    def validate_phone_number(self, key, phone_number):
        if not phone_number:
            raise ValueError("Phone number is required.")
        phone_regex = r'^\d{3}-\d{3}-\d{4}$'
        if not re.match(phone_regex, phone_number):
            raise ValueError("Invalid phone number format. Please use XXX-XXX-XXXX format.")
        return phone_number
    

    def __repr__(self):
        return f'<Guest {self.id}, {self.name}, {self.email}, {self.phone_number}>'
      
class Party(db.Model, SerializerMixin):

    __tablename__ = "parties"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String)
    date = db.Column(db.String)
    
    # relationships
    foods = db.relationship("Food", back_populates="party", cascade="all, delete-orphan")
    guests = association_proxy("foods", "guest")

    # serialization rules
    serialize_rules = ("-foods", "-guests")

    @validates("name")
    def validate_name(self, key, name):
        if not name and len(name) < 1:
            raise ValueError("Name field is required")
        return name
    
    @validates("location")
    def validate_location(self, key, location):
        if not location and len(location) < 1:
            raise ValueError("Location is required")
        return location
    
    @validates("date")
    def validate_date(self, key, date):
        if not date:
            raise ValueError("Date is required. Please use YYYY-MM-DD.")
        return date
    
    def __repr__(self):
        return f"Party: {self.id}, {self.name}, {self.location}, {self.date}"
    
class Food(db.Model, SerializerMixin):

    __tablename__ = "foods"

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"))
    guest_id = db.Column(db.Integer, db.ForeignKey("guests.id"))

    # relationships
    party = db.relationship("Party", back_populates="foods")
    guest = db.relationship("Guest", back_populates="foods")

    # serialization rules
    serialize_rules = ("-party", "-guest")

    @validates("item")
    def validate_item(self, key, item):
        if not item and len(item) < 1:
            raise ValueError("Food item is required")
        return item
    
    @validates("quantity")
    def validate_quantity(self, key, quantity):
        if quantity < 1:
            raise ValueError("Quantity must be more than 1")
        return quantity
    
    @validates("party_id")
    def validate_party_id(self, key, party_id):
        if party_id is None:
            raise ValueError("Party ID is required")
        return party_id
    
    @validates("guest_id")
    def validate_guest_id(self, key, guest_id):
        if guest_id is None:
            raise ValueError("Guest ID is required")
        return guest_id

    def __repr__(self):
        return f"Food: {self.id}, {self.item}, {self.quantity}"

class GuestList(db.Model):
    __tablename__ = 'guest_list'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('guests.id'))
    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))

  # relationships
    guest = db.relationship('Guest')
    party = db.relationship('Party')

    def to_dict(self):
        return {
            'id': self.id,
            'guest': self.guest.to_dict(),
            'party': self.party.to_dict()
        }