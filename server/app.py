#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Parties(Resource):

    def get(self):

        parties = [party.to_dict() for party in Party.query.all()]
        return make_response(
            parties, 200
        )
    
    def post(self):
        data = request.get_json()
        party = Party()
        try:
            for key in data:
                if hasattr(party, key):
                    setattr(party, key, data[key])
        
            db.session.add(party)
            db.session.commit()

            return make_response(
                party.to_dict(), 201
            )
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

api.add_resource(Parties, "/parties")

class PartyById(Resource):

    def get(self, id):
        party = Party.query.filter_by(id=id).first()
        if party:
            return make_response(
                party.to_dict(), 200
            )
        else:
            return make_response(
                {"error": "Party does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        party = Party.query.filter_by(id=id).first()
        if party:
            try:
                for key in data:
                    if hasattr(party, key):
                        setattr(party, key, data[key])
                db.session.commit()

                return make_response(
                    party.to_dict(), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Party does not exist"}, 404
            )
    
    def delete(self, id):
        party = Party.query.filter_by(id=id).first()
        if party:
            db.session.delete(party)
            db.session.commit()

            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Party does not exist"}, 404
            )
    
api.add_resource(PartyById, "/parties/<int:id>")

class Foods(Resource):

    def get(self):

        foods = [food.to_dict() for food in Food.query.all()]
        return make_response(
            foods, 200
        )
    
    def post(self):
        data = request.get_json()
        food = Food()
        try:
            for key in data:
                if hasattr(food, key):
                    setattr(food, key, data[key])
        
            db.session.add(food)
            db.session.commit()

            return make_response(
                food.to_dict(), 201
            )
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

api.add_resource(Foods, "/foods")

class FoodById(Resource):

    def get(self, id):
        food = Food.query.filter_by(id=id).first()
        if food:
            return make_response(
                food.to_dict(), 200
            )
        else:
            return make_response(
                {"error": "Food item does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        food = Food.query.filter_by(id=id).first()
        if food:
            try:
                for key in data:
                    if hasattr(food, key):
                        setattr(food, key, data[key])
                db.session.commit()

                return make_response(
                    food.to_dict(), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Food item does not exist"}, 404
            )
    
    def delete(self, id):
        food = Food.query.filter_by(id=id).first()
        if food:
            db.session.delete(food)
            db.session.commit()

            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Food item does not exist"}, 404
            )
    
api.add_resource(FoodById, "/foods/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

