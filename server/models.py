from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Guest(db.Model, SerializerMixin):
    __tablename__ = 'guests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)

    # relationships
    food = db.relationship("Food", back_populates="guests", cascade="all, delete-orphan")
    parties = association_proxy("food", "party")

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
