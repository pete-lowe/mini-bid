from auctions import *
from items import *
from user_tests import *
from auction_tests import *

def auction_tests(auth_tokens):


    # get active auctions (i.e. those whose end date has not yet passed)
    get_active_auctions(auth_tokens[0])

    # get closed auctions (i.e. those whose end date has not yet passed)
    get_closed_auctions(auth_tokens[0])

    #create a new item using the item tests and start an auction containing that item

    new_item = add_item(auth_tokens[0])
    auction = start_auction(new_item['item']['_id'], auth_tokens[0])

    # post increasing bid in the newly created auction, each bid by a different user

    post_bid_in_active_auction(auction['auction']['_id'], auth_tokens[1], 10)
    post_bid_in_active_auction(auction['auction']['_id'], auth_tokens[2], 20)
    post_bid_in_active_auction(auction['auction']['_id'], auth_tokens[3], 30)

    # get the actions bid history

    get_auction_bid_history(auction['auction']['_id'], auth_tokens[0])


