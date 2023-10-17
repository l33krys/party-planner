#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource
from flask_socketio import SocketIO

# Local imports
from config import app, db, api

socketio = SocketIO(app)
# Add your model imports
from models import *
from models import GuestList 

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@socketio.on('new_guest_added')
def handle_new_guest(data):
    db.session.add(data)
    db.session.commit()
    socketio.emit('guest_list_updated', broadcast=True)

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
        

class Guests(Resource):
    def get(self):
        return make_response([guest.to_dict() for guest in Guest.query.all()], 200)
    
    def post(self):
        guest_json = request.get_json()
        guest = Guest()
        try:
            for key in guest_json:
                if hasattr(guest, key):
                    setattr(guest, key, guest_json[key])
            db.session.add(guest)
            db.session.commit()
            return make_response(guest.to_dict(rules=()), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        

class GuestById(Resource):
    def get(self, id):
        guest = Guest.query.filter_by(id=id).first()
        if guest:
            return make_response(guest.to_dict(), 200)
        else:
            return make_response({"error": "Guest does not exist"}, 404)

    def delete(self, id):
        guest = Guest.query.get(id)
        if guest:
            db.session.delete(guest)
            db.session.commit()
            return "", 204
        return make_response({"error": "Guest not found"}, 404)
    
    def patch(self, id):
        data = request.get_json()
        guest = Guest.query.filter_by(id=id).first()
        if guest:
            try:
                for key in data:
                    if hasattr(guest, key):
                        setattr(guest, key, data[key])
                db.session.commit()
                return make_response(guest.to_dict(), 200)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Guest does not exist"}, 404)


class GuestListResource(Resource):
    def get(self):
        guest_list = GuestList.query.all()
        return make_response([guest.to_dict() for guest in guest_list], 200)


api.add_resource(Parties, "/parties")
api.add_resource(PartyById, "/parties/<int:id>")
api.add_resource(Foods, "/foods")    
api.add_resource(FoodById, "/foods/<int:id>")
api.add_resource(Guests, "/guests")
api.add_resource(GuestById, "/guests/<int:id>")
api.add_resource(GuestListResource, "/guest-list")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

