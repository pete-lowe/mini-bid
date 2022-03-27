from user_tests import *
from item_tests import *
from auction_tests import *

def run_all_tests():
    # basic functional testing for APIs - current config creates 5 users and utilises these in the other tests. 
    auth_tokens = user_tests()
    item_tests(auth_tokens)
    auction_tests(auth_tokens)


if __name__ == "__main__":
    run_all_tests()
    print('-------------------------------')
    print('ALL TESTS COMPLETED SUCESSFULLY')
    print('-------------------------------')
