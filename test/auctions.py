import requests
import json
from time import sleep

base_url = 'http://localhost:3000'

def get_active_auctions(auth_token: str) -> json:
    response = requests.get(base_url + '/api/auctions/active', headers={'auth-token': auth_token})
    if response.status_code == 200:
        sleep(0.5)
        print(f'GET active auctions sucessfull. List of active auctions: {response.text[:400]}.......')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def get_closed_auctions(auth_token: str) -> json:
    response = requests.get(base_url + '/api/auctions/closed', headers={'auth-token': auth_token})
    if response.status_code == 200:
        sleep(0.5)
        print(f'GET closed auctions sucessfull. List of closed auctions: {response.text[:400]}.......')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def start_auction(item_id: str, auth_token: str) -> json:
    data = {
        "item_id": item_id,
        "auction_end_date": "22/05/2023",
    }
    response = requests.post(base_url + '/api/auctions/start_auction', headers={'auth-token': auth_token}, json=data)
    sleep(0.5)
    if response.status_code == 200:
        print(f'Auction sucessfully started to the system with the following details: {response.content}')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def post_bid_in_active_auction(auction_id: str, auth_token: str, bid: str) -> json:
    data = {
        "bid_amount": bid,
    }
    response = requests.post(base_url + f'/api/auctions/{auction_id}/post_bid', headers={'auth-token': auth_token}, json=data)
    sleep(0.5)
    if response.status_code == 200:
        print(f'Bid of {data["bid_amount"]} sucessfully entered  to the system with the following details: {response.content}')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')

def get_auction_bid_history(auction_id: str, auth_token: str) -> json:
    response = requests.get(base_url + f'/api/auctions/{auction_id}/bid_history', headers={'auth-token': auth_token})
    if response.status_code == 200:
        sleep(0.5)
        print(f'GET bid history for auction id {auction_id} sucessfull. List of bids: {response.text[:400]}.......')
        response_json = json.loads(response.text)
        return response_json
    else:
        print('There has been an error, test has failed - please check the application logs')
        print(response.content)
        raise Exception('Test failed - plese see the API response for further details.')