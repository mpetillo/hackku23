import requests
import base64
import os
# from dotenv import load_dotenv

# load_dotenv()

# KROGER_CLIENT_ID = os.getenv('KROGER_CLIENT_ID')
# KROGER_CLIENT_SECRET = os.getenv('KROGER_CLIENT_SECRET')
# print(KROGER_CLIENT_ID)
KROGER_CLIENT_ID = 'hackku23hackathonproject-d02c1e419e98d6a47a8387ebd2bfebcc2873333728189594211'
KROGER_CLIENT_SECRET = 'Q6v8Y_Pz6duCSKJ9Nf8CWsOmgRWljzhDS3JygfoG'

def getPriceTotal(zipcode, foodlist):
    auth_str = base64.b64encode(bytes(KROGER_CLIENT_ID + ':' + KROGER_CLIENT_SECRET, 'utf-8')).decode('utf-8')
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + auth_str
    }
    payload = {
        'grant_type': 'client_credentials'
    }
    url = 'https://api.kroger.com/v1/connect/oauth2/token'
    headersLocationFood = {
        'Accept':'application/json',
        'Authorization': 'Bearer '+ requests.post(url, headers=headers, data=payload).json()["access_token"]
    }
    responseLocations = requests.get('https://api.kroger.com/v1/locations?filter.zipCode.near=66046', headers=headersLocationFood)
    nearestStore = responseLocations.json()['data'][0]['locationId']
    total = 0.00
    for i in foodlist:
        temp = i.replace(" ", "%20")
        fooditem = requests.get(f"https://api.kroger.com/v1/products?filter.locationId={nearestStore}&filter.term={temp}", headers=headersLocationFood)
        fooditem = fooditem.json()['data']['items']['price']
        if 'promo' in fooditem and fooditem['promo'] != 0:
            total += fooditem['promo']
        else:
            total += fooditem['regular']

    return total

