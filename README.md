# PartyPro: React Flask Application

PartyPro is a full-stack web application that simplifies party planning by allowing users to create, manage parties, invite guests, and track RSVPs. The application utilizes React for the frontend user interface and Flask, a Python web framework, for the backend server. Users can create new parties, manage guest lists, edit party details, and view RSVP information for each party.

## Features

- **Party Management**: Create new parties with names, locations, and dates.
- **Guest Management**: Add guests with their names, email addresses, and phone numbers.
- **RSVP Tracking**: Track guest attendance by managing RSVPs for each party.

## Technologies Used

- **Frontend**: React, Semantic UI React
- **Backend**: Flask, SQLAlchemy 
- **Database**: SQLite 
- **State Management**: React Hooks 
- **API Requests**: JavaScript `fetch` API for making HTTP requests
- **Validation**: Yup 

## Setup Instructions

### Prerequisites

- Node.js installed
- Python and Flask installed
- SQLite database set up 

### Frontend Setup

1. Clone the repository: 
    git clone [git@github.com:l33krys/party-planner.git]
2. Install dependencies: 
    npm install
3. Start the React development server: 
    npm start

The React application will run on `http://localhost:3000`.

### Backend Setup

1. Install Python dependencies (consider using a virtual environment): 
    pipenv install
2. Set up the SQLite database and update the database configuration in `config.py` with the appropriate details.
3. Run Flask migrations to set up the database schema: 
    flask db init / flask db migrate / flask db upgrade
4. Start the Flask backend server: 
    flask run

The Flask application will run on `http://localhost:5000`.

## API Endpoints

- **GET `/parties`**: Get a list of all parties.
- **POST `/parties`**: Create a new party.
- **PATCH `/parties/<party_id>`**: Update party details.
- **DELETE `/parties/<party_id>`**: Delete a party.
- **GET `/guests`**: Get a list of all guests.
- **POST `/guests`**: Add a new guest.
- **PATCH `/guests/<guest_id>`**: Update guest details.
- **DELETE `/guests/<guest_id>`**: Delete a guest.
- **GET `/guest_lists`**: Get RSVP information.
- **POST `/guest_lists`**: Add a guest to a party.
- **DELETE `/guest_lists/<guest_list_id>`**: Remove a guest from a party.

## Usage

1. **Create a Party**: Click on "Create Party" and fill out the party details (name, location, date) in the form.

2. **Manage Guests**: Navigate to the "Guest Page" to view a list of guests. Add new guests and add them to parties by
                      clicking "Add to Party." Guests can be deleted by clicking "Delete User."

3. **Track RSVPs**: View RSVP information on the "RSVP List". Guests' attendance status can be managed from this page.

4. **Edit Party Details**: Click "Edit" on a party card to modify party details.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, please create a pull request or submit an issue. This project was created by GitHub users **l33krys** and **adgholson**.
