"""
Import required libraries
Flask: Main web framework
request: Handles HTTP requests
jsonify: Converts data to JSON format
SQLAlchemy: ORM for database operations
datetime: For handling timestamps
CORS: To allow cross-origin requests
"""
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from flask_cors import CORS

# Initialize Flask application
# Configures SQLite database and disables modification tracking
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for all routes
CORS(app)
db = SQLAlchemy(app)


class Appointment(db.Model):
    """
    Define the Appointment model
    Represents the appointments table in the database
    Includes fields for name, email, phone, date, time, notes, and created_at timestamp
    """
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    time = db.Column(db.String(5), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Method to convert model instance to dictionary
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route('/api/saveappointment', methods=['POST'])
def create_appointment():
    """
    Route to save new appointments
    Accepts POST requests with JSON data
    :return:
    """
    data = request.get_json()
    try:
        # Create new appointment record from data
        new_record = Appointment(**data)
        db.session.add(new_record)
        db.session.commit()
        # Return the created appointment as JSON
        return jsonify(new_record.to_dict()), 201
    except Exception as e:
        # Rollback if any error occurs
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    """
    Route to get all appointments
    :return: appointments list
    """
    # Query all appointments from database
    records = Appointment.query.all()
    # Convert list of appointments to JSON
    return jsonify([r.to_dict() for r in records])


# Main block to run the application
if __name__ == '__main__':
    app.run(debug=True)
