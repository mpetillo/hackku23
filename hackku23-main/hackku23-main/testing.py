import requests
import base64

response = requests.get(f'https://api.kroger.com/v1/connect/oauth2/{}')
print(response)