import requests

# Get the token
payload = {
    "client_id": "IkkB7CtQAqbOKvC3bV3L7hB0uOiu5lfE",
    "client_secret": "R_-q10HX-sd7iostfNuJiDKEmTrrepUokdXlA_5rziOcotA9C-4vFKv1JjDtZcak",
    "audience": "https:/mealplannerapi.com/api/login",
    "grant_type": "client_credentials"
}

response = requests.post(
    "https://dev-km6ivy4lzonnfqa2.us.auth0.com/oauth/token",
    json=payload
)

token_data = response.json()
access_token = token_data['access_token']
print("Access Token:", access_token)

# Test API endpoint with the token
headers = {
    "Authorization": f"Bearer {access_token}"
}

# Test the recipes endpoint
api_response = requests.get(
    "http://localhost:3000/api/recipes",
    headers=headers
)

print("\nAPI Response Status:", api_response.status_code)
print("API Response:", api_response.json() if api_response.status_code == 200 else api_response.text)