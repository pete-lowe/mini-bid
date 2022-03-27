import requests
import json
from time import sleep

base_url = 'http://localhost:3000'


def get_items(auth_token: str) -> json:
    response = requests.get(base_url + '/api/items', headers={'auth-token': auth_token})
    if response.status_code == 200:
        sleep(0.5)
        print(f'GET items sucessfull. List of items: {response.text[:400]}.......')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def get_item_by_id(item_id: str, auth_token: str) -> json:
    response = requests.get(base_url + f'/api/items/{item_id}', headers={'auth-token': auth_token})
    if response.status_code == 200:
        sleep(0.5)
        print(f'GET item sucessfull. Item details: {response.text[:400]}')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def get_items_by_condition(condition: str, auth_token: str) -> json:
    response = requests.get(base_url + f'/api/items/condition/{condition}', headers={'auth-token': auth_token})
    if response.status_code == 200:
        sleep(0.5)
        print(f'GET items by condition sucessfull. Showing {condition} items details: {response.text[:400]}')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def add_item(auth_token: str) -> json:
    data = {
        "item_name": "Test item name",
        "item_condition": "used",
        "item_description": "This is a test item description"
    }
    response = requests.post(base_url + '/api/items/add_item', headers={'auth-token': auth_token}, json=data)
    sleep(0.5)
    if response.status_code == 200:
        print(f'Item sucessfully added to the system with the following details: {response.content}')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def delete_item_by_id(item_id: str, auth_token: str) -> json:
    response = requests.delete(base_url + f'/api/items/{item_id}', headers={'auth-token': auth_token})
    sleep(0.5)
    if response.status_code == 200:
        print(f'Item with id {item_id} sucessfully deleted from the system')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def delete_item_by_id_failure_when_not_admin(item_id: str) -> json:
    auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM2MTEyOTUzNjlkODBkZThhZTFjZDgiLCJpYXQiOjE2NDgzMzE5MTR9.HtJ3zMVT9Gx3iYFcVchhOwKnqkjpAPt4NliCo06FgBY'
    response = requests.delete(base_url + f'/api/items/{item_id}', headers={'auth-token': auth})
    sleep(0.5)
    if response.status_code == 401:
        print(f'Item with id {item_id} cannot be delete by a non admin user - test passed')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')