#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Guest, Party, Food

fake = Faker()

def create_guests():
    guests = []
    for _ in range(5):
        g = Guest(
            name=fake.name(),
            email=fake.email(),
            phone_number=fake.phone()
        )
        guests.append(g)
        
    return guests

def create_parties():
    parties = []
    for _ in range(3):
        p = Party(
            name=fake.name(),
            location=fake.location.streetAddress(),
            date=fake.date.future()
        )
        parties.append(p)
        
    return parties

def create_foods(guests, parties):
    foods = []
    for _ in range(10):
        f = Food(
            item=fake.name(),
            quantity=rc(range(20)),
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

        print("Seeding guests...")
        guests = create_guests()
        db.session.add_all(guests)
        db.session.commit()

        print("Seeding parties...")
        parties = create_parties()
        db.session.add_all(parties)
        db.session.commit()

        print("Seeding foods...")
        foods = create_foods()
        db.session.add_all(foods)
        db.session.commit()

        print("Done seeding!")

