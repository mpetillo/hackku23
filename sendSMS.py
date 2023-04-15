import os
from twilio.rest import Client
from secrets import Keys

keys = Keys()

def send_sms(to_number, message):
    # Get Twilio account SID, auth token, and Twilio phone number from environment variables
    account_sid = keys.TWILIO_ACCOUNT_SID
    auth_token = keys.TWILIO_AUTH_TOKEN
    twilio_number = keys.TWILIO_PHONE_NUMBER
    # Create a Twilio client object
    client = Client(account_sid, auth_token)

    # Use the Twilio client to send a message
    message = client.messages.create(
        to=to_number, 
        from_=twilio_number,
        body=message
    )
