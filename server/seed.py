#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime

# Remote library imports
from faker import Faker
fake = Faker()

# Local imports
from app import app
from models import db, Guest, Party, Food

def create_foods(guests, parties):
    items = ["Chicken Wings", "Meatballs", "Hummus and Pita Chips", "Lasagna", "Cake", "Salad", "Sliders", "Chips and Salsa", "Cookies", "Pizza", "Soda", "Water", "Coffee"]
    foods = []
    for _ in range(10):
        f = Food(
            item=items[rc(range(len(items)))],
            quantity=rc(range(1, 20)),
            party_id=rc([party.id for party in parties]),
            guest_id=rc([guest.id for guest in guests])
        )
        foods.append(f)
        
    return foods

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")     
      
        # Seed code goes here!

        Guest.query.delete()
        Party.query.delete()
        Food.query.delete()

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

        db.session.add_all(guests)
        db.session.commit()

        print("Seeding parties...")
        halloween = Party(name="Halloween Party", location="Haunted Mansion", date="2023-10-31")
        friendsgiving = Party(name="Friendsgiving", location="123 Flatiron St", date="2023-11-18")
        holiday = Party(name="Holiday Potluck", location="Break Room", date="2023-12-20")
        parties = [halloween, friendsgiving, holiday]
        
        db.session.add_all(parties)
        db.session.commit()       

        print("Seeding foods...")
        foods = create_foods(guests, parties)
        db.session.add_all(foods)
        db.session.commit()

        print("Done seeding!")

