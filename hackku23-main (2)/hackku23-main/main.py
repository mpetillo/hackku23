from flask import Flask, render_template, url_for, jsonify, request
import requests
import json
import externalfunctions
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

@app.route('/stores')
def stores():
    return render_template('stores.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/API/GetDropDownConfigurations/', methods=['GET'])
def configureDropDowns():
    cuisine, diets, ingredients, intolerances = {}, {}, {}, {}
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

@app.route('/API/CheckForRecipes', methods=['POST'])
def checkForRecipes():
    data = request.json #data contains "cuisine", "diet", "ingredients", "intolerances", "zipcode", "budget"
    if data is None:
        return '400'
    else:
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch"
        headers = {
            "X-RapidAPI-Key": "81953878c0mshfdb41f16e86865bp18a916jsn33156a295554",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
        querystring = {"query":"the","instructionsRequired":"True","number":"50"}
        if "cuisine" in data:
            querystring["cuisine"] = data["cuisine"]
        if "diet" in data:
            querystring["diet"] = data["diet"]
        if "ingredients" in data:
            querystring["includeIngredients"] = data["ingredients"]
        if "intolerances" in data:
            querystring["intolerances"] = data["intolerances"]
        response = requests.get(url, headers=headers, params=querystring).json()
        goodRecipes = []
        for i in response["results"]:
            price = externalfunctions.getPriceTotal(int(data['zipcode']), i['extendedIngredients'])
            if price <= int(data["budget"]):
                goodRecipes.append(i)
        thelist = {"recipes":goodRecipes}
        response = jsonify(thelist)
        response.status_code=200
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
