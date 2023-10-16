#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Guest, db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        print("Creating Guests...")
        morgan = Guest(name="Morgan", email="morgan@email.com", phone_number="123-123-0000")
        jason = Guest(name="Jason", email="jason@email.com", phone_number="123-123-0000")
        oliver = Guest(name="Oliver", email="oliver@email.com", phone_number="123-123-0000")
        vanessa = Guest(name="Vanessa", email="vanessa@email.com", phone_number="123-123-0000")
        joe = Guest(name="Joe", email="joe@email.com", phone_number="123-123-0000")
        rae = Guest(name="Rae", email="rae@email.com", phone_number="123-123-0000")
        madi = Guest(name="Madi", email="madi@email.com", phone_number="123-123-0000")
        jazlin = Guest(name="Jazlin", email="jazlin@email.com", phone_number="123-123-0000")
        jenna = Guest(name="Jenna", email="jenna@email.com", phone_number="123-123-0000")
        anthony = Guest(name="Anthony", email="anthony@email.com", phone_number="123-123-0000")
        molly = Guest(name="Molly", email="molly@email.com", phone_number="123-123-0000")
        jia = Guest(name="Jia", email="jia@email.com", phone_number="123-123-0000")
        krystle = Guest(name="Krystle", email="krystle@email.com", phone_number="123-123-0000")
        aaron = Guest(name="Aaron", email="aaron@email.com", phone_number="123-123-0000")
        guests = [morgan, jason, oliver, vanessa, joe, rae, madi, jazlin, jenna, anthony, molly, jia, krystle, aaron]

        
