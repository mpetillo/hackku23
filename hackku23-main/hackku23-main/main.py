from flask import Flask, render_template, url_for, jsonify
import json
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

@app.route('/stores')
def stores():
    return render_template('stores.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

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

if __name__ == '__main__':
    app.run()