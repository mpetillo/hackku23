from flask import Flask, render_template, url_for
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

if __name__ == '__main__':
    app.run()
