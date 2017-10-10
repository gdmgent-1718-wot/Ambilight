
"""
==============================================
AMBILIGHT
==============================================
Course:     Web Of Things (WOT)
Option:     New Media Development
Department: Graphic and Digital Media
College:    Artevelde University College Ghent
----------------------------------------------
Authors:
    - Jef Roosens
    - Basiel Smitz
----------------------------------------------
Resources:
    - https://www.element14.com/community/community/raspberry-pi/blog/2017/07/10/sense-hat-color-chooser
    - https://firebase.google.com/docs/admin/setup
==============================================
"""

# Python wrapper for interfacing with the SENSE HAT for Raspberry Pi and Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from sense_hat import SenseHat

# Create sense hat object
sense = SenseHat()

# Add authentication credentials
cred = credentials.Certificate('ambilight-c124f-firebase-adminsdk-c46v8-1b793011da.json')
default_app = firebase_admin.initialize_app(cred,{'databaseURL':'https://ambilight-c124f.firebaseio.com'})

# Define root of the database
root = db.reference()

# Overwrite the database everytime the color changes
while True:

    # Navigate to the right object
    colors = root.child('colors').get()

    # Get data from database
    redvalue = colors['red']
    greenvalue = colors['green']
    bluevalue = colors['blue']

    # Concatenate color string
    colorsh = (redvalue, greenvalue, bluevalue)

    # Print colorstring to canvas
    print(colorsh)
    canvas = [
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh,
        colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh, colorsh
        ]

    # Print canvas on Sense Hat
    sense.set_pixels(canvas)
