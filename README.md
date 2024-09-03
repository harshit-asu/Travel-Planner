# Comprehensive Trip Manager

Comprehensive Trip Manager is a web application designed to help users plan trips efficiently. It allows users to manage all aspects of a trip, including destinations, activities, accommodations, transport, packing lists, and expenses. The app also supports collaboration by enabling users to invite others to join and contribute to trip planning.

https://github.com/user-attachments/assets/9de0e0d8-7495-4258-9a10-bd27c9245a78


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Signup & Authentication**: Secure user signup and authentication using JWT to protect user data.
- **Add and Manage Trips**: Users can create and manage multiple trips, keeping all trip details in one place.
- **Invite People to Collaborate**: Users can invite friends or family members to join and contribute to trip planning.
- **Manage Destinations**: Add and organize destinations within each trip, making it easy to plan your journey.
- **Manage Activities**: Keep track of planned activities and events during the trip.
- **Manage Transport**: Organize transport details, including flights, car rentals, and other travel arrangements.
- **Manage Accommodations**: Track hotel bookings or other accommodations with detailed information.
- **Manage Expenses**: Monitor expenses among trip members to ensure fair cost-sharing.
- **Manage Packing Lists**: Create and manage packing lists to ensure nothing is forgotten.
- **Dashboard and Analytics**: Get an overview of trip details and analytics through a user-friendly dashboard.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Flask, REST APIs
- **Database**: PostgreSQL
- **Object-Relational Mapping (ORM)**: SQLAlchemy
- **Authentication**: JWT (JSON Web Token)
- **User Interface Styling**: MDB React, Material UI

## Installation

### Prerequisites

- Node.js and npm (for the frontend)
- Python 3.x and pip (for the backend)
- PostgreSQL database

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/swathianaji/Travel-Planner.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd travel-planner/backend
    ```
3. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Create a PostgreSQL database named travelplanner_database.db
   - If you wish to use SQLite, change the database URI in app.py 'sqlite:///travelplanner_database.db'
    
7. Run database migrations:
    ```bash
    flask db migrate -m "Initial Migration"
    flask db upgrade
    ```
8. Start the Flask server:
    ```bash
    python app.py
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd travel-planner/frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```

## Usage

- Access the application by navigating to `http://localhost:3000` in your web browser.
- Create an account and log in to start managing your trips.
- Use the dashboard to add trips, invite collaborators, and manage all aspects of your travel plans.

## API Documentation

The backend provides RESTful APIs for interacting with the database. Below is a brief overview of the available endpoints:

- **User Authentication**
  - `POST /signup` - Create a new user account
  - `POST /login` - Log in with existing credentials

- **Trips**
  - `GET /trips` - Retrieve all trips
  - `POST /trips` - Create a new trip

- **Destinations**
  - `GET /trips/:trip_id/destinations` - Retrieve all destinations for a trip
  - `POST /trips/:trip_id/destinations` - Add a new destination

- **Activities, Accommodations, Transport, Expenses, Packing Lists**
  - Similar endpoints are provided for managing activities, accommodations, transport, expenses, and packing lists.

Refer to the [API Documentation](link_to_your_full_api_docs) for detailed information on all available endpoints and request/response formats.

## Authentication

User authentication is handled using JWT (JSON Web Tokens). Upon successful login, the server generates a token that is sent to the client and stored locally. This token is included in the Authorization header of subsequent API requests to verify the user's identity.

## Database Schema

The application uses a PostgreSQL database with the following key tables:

- **Users**: Stores user information
- **Trips**: Stores details about each trip
- **Destinations**: Stores details about destinations within a trip
- **Activities**: Stores planned activities
- **Accommodations**: Stores accommodation details
- **Transport**: Stores transport details
- **Expenses**: Stores expenses and cost-sharing details
- **Packing Lists**: Stores items for packing

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Contact

For any questions or feedback, please reach out:

- **Swathi Anaji Revanasiddappa**
  - Email: swathi.anaji@asu.edu
  - LinkedIn: [linkedin.com/in/swathi-anaji-r](https://www.linkedin.com/in/swathi-anaji-r/)

- **Harshit Allumolu**
  - Email: harshit.allumolu@asu.edu
  - LinkedIn: [linkedin.com/in/harshit-allumolu](https://www.linkedin.com/in/harshit-allumolu)
