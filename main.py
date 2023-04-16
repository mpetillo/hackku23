from flask import Flask, request, render_template, url_for, jsonify
from secrets import Keys
from sendSMS import send_sms

import json

keys = Keys()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recipes')
def recipes():
    return render_template('recipe.html')

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/generated')
def generated():
    return render_template('show_recipes.html')

@app.route('/API/GetDropDownConfigurations/', methods=['GET'])
def configureDropDowns():
    cuisine, diets, ingredients, intolerences = {}, {}, {}, {}
    with open("cuisine.json", "r") as f:
        cuisine = json.load(f)
    with open("diets.json", "r") as f:
        diets = json.load(f)
    with open("ingredients.json", "r") as f:
        ingredients = json.load(f)
    with open("intolerances.json", "r") as f:
        intolerances = json.load(f)
    response = jsonify({'cuisine': cuisine, 'diets': diets, 'ingredients': ingredients, 'intolerances': intolerances})
    response.status_code = 200
    return response

@app.route('/TWILIO/SendMessage/', methods=['POST'])
def sendMessage():
    phone_number = request.form['phone_number']
    message = request.form['selected_recipe']
    print(message) # delete this and uncomment next line when twilio tokens entered to secrets.py
    #send_sms(phone_number,"test")
    return "Message sent successfully"

if __name__ == '__main__':
    app.run()
