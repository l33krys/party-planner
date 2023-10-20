#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api, CORS

# Add your model imports
from models import *


# Views go here!
CORS(app)

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
        # party_json = request.get_json()
        # attending_guests = party_json.get("attendingGuests", [])  # Get the attending guests array from the JSON data
        # party = Party()
        # # Populate party attributes from party_json
        # # Save party to the database
        
        # # Associate attending guests with the party
        # for guest_data in attending_guests:
        #     guest_id = guest_data.get("id")
        #     guest = Guest.query.get(guest_id)
        #     if guest:
        #         party.attending_guests.append(guest)
        
        # # Commit changes to the database
        # db.session.add(party)
        # db.session.commit()
        
        # # Return the response with attending guests data
        # response_data = {
        #     "id": party.id,
        #     "name": party.name,
        #     # Include other party attributes as needed
        #     "attendingGuests": [{"id": guest.id, "name": guest.name} for guest in party.attending_guests]
        # }
        # return response_data, 201
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
                    party.to_dict(), 202
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
        guests = [guest.to_dict() for guest in Guest.query.all()]
        return guests, 200
    
    def post(self):

        guest_json = request.get_json()
        email_json = guest_json["email"]
        exists = [guest.email for guest in Guest.query.filter(Guest.email==email_json).all()]
    
        if exists:
            return make_response(
               {"errors": ["Email has already been registered"]}, 400
            )
        else:
            try:
                guest = Guest()
                for key in guest_json:
                    if hasattr(guest, key):
                        setattr(guest, key, guest_json[key])
                db.session.add(guest)
                db.session.commit()
                return make_response(guest.to_dict(), 201)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)  
    

        # guest_json = request.get_json()
        # guest = Guest()
        # try:
        #     for key in guest_json:
        #         if hasattr(guest, key):
        #             setattr(guest, key, guest_json[key])
        #     db.session.add(guest)
        #     db.session.commit()
        #     return make_response(guest.to_dict(), 201)
        # except ValueError:
        #     return make_response({"errors": ["validation errors"]}, 400)
        

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


class GuestLists(Resource):

    def get(self):

        guestlists = [guestlist.to_dict() for guestlist in GuestList.query.all()]
        return make_response(
            guestlists, 200
        )
    
    def post(self):

        data = request.get_json()
        id_party = data["party_id"]
        id_guest = data["guest_id"]
        exists = [guest_list.guest.id for guest_list in GuestList.query.filter(GuestList.party_id==id_party).all()]
    
        if id_guest in exists:
            return make_response(
               {"errors": ["Already RSVP'd"]}, 400
            )
        else:
            try:
                guestlist = GuestList()
                for key in data:
                    if hasattr(guestlist, key):
                        setattr(guestlist, key, data[key])
            
                db.session.add(guestlist)
                db.session.commit()

                return make_response(
                    guestlist.to_dict(), 201
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )


class GuestListById(Resource):

    def get(self, id):
        guestlist = GuestList.query.filter_by(id=id).first()
        if guestlist:
            return make_response(
                guestlist.to_dict(), 200
            )
        else:
            return make_response(
                {"error": "Guest list does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        guestlist = GuestList.query.filter_by(id=id).first()
        if guestlist:
            try:
                for key in data:
                    if hasattr(guestlist, key):
                        setattr(guestlist, key, data[key])
                db.session.commit()

                return make_response(
                    guestlist.to_dict(), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Guest list does not exist"}, 404
            )
    
    def delete(self, id):
        guestlist = GuestList.query.filter_by(id=id).first()
        if guestlist:
            db.session.delete(guestlist)
            db.session.commit()

            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Guest list does not exist"}, 404
            )

class GuestRSVP(Resource):

    def get(self, id):

        parties = [party.to_dict(only=("party.name", "party.id" )) for party in GuestList.query.filter_by(guest_id=id).all()]

        return make_response(
            parties, 200
        )

api.add_resource(GuestRSVP, "/guests/parties/<int:id>")


api.add_resource(Parties, "/parties")
api.add_resource(PartyById, "/parties/<int:id>")
api.add_resource(Foods, "/foods")    
api.add_resource(FoodById, "/foods/<int:id>")
api.add_resource(Guests, "/guests")
api.add_resource(GuestById, "/guests/<int:id>")
api.add_resource(GuestLists, "/guest_lists")    
api.add_resource(GuestListById, "/guest_lists/<int:id>")



if __name__ == '__main__':
    app.run(port=5555, debug=True)

