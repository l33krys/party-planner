from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

import datetime

# Models go here!

class Guest(db.Model, SerializerMixin):
    pass
class Party(db.Model, SerializerMixin):

    __tablename__ = "parties"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # relationships
    foods = db.relationship("Food", back_populates="party", cascade="all, delete-orphan")
    guests = association_proxy("food", "guest")

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
            raise ValueError("Date is required. Date can be updated if needed.")
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