import re
from time import sleep
import requests
import json
import random
import string

base_url = 'http://localhost:3000'

def register_users(number_of_users: int, reg_endpoint: str) -> list:
    list_of_registered_users = []
    for i in range(number_of_users):
        random_string = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(6))
        email = random_string + '@example.com'
        username = random_string
        password = random_string
        data = {
        "email": email,
        "password": password,
        "username": username
        }
        response = requests.post(base_url + reg_endpoint, json=data)
        response_json = json.loads(response.text)
        sleep(0.5)
        if response.status_code == 200:
            print(f'User sucessfully registered with the following details: {response.content}')
            list_of_registered_users.append([email, username, password, response_json['_id']])
        else:
            print('There has been an error, please review the response:')
            print(response.content)
            raise Exception('Test failed - plese see the API response for further details.')
    return list_of_registered_users

def request_oauth_token(email: str, password: str, login_endpoint: str ) -> str:
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(base_url + login_endpoint, json=data)
    sleep(0.5)
    if response.status_code == 200:
        print(f'oAuth token obtained {response.content}')
        return response.content.decode("utf-8").split(':')[1].replace('"','').replace('}', '')
    else:
        print('There has been an error, please review the response:')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')



def get_users(auth_token: str) -> str:
    response = requests.get(base_url + '/api/users', headers={'auth-token': auth_token})
    if response.status_code == 200:
        print(f'GET users sucessfull. List of users: {response.text[:200]}.......')
        return response.content
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def get_users_as_admin(auth_token: str) -> str:
    response = requests.get(base_url + '/api/users', headers={'auth-token': auth_token})
    if response.status_code == 200:
        print(f'GET users as admin sucessfull. List of users with additional information: {response.text[:200]}.......')
        return response.content
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')


def set_user_as_admin(user_id: str) -> str:
    admin_auth = request_oauth_token('petemlowe@gmail.com', 'Bridie45', '/api/users/login')
    response = requests.post(base_url + f'/api/users/set_admin/{user_id}', headers={'auth-token': admin_auth})
    if response.status_code == 200:
        print(f'User {user_id} set as an admin')
        return response.content
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')    
