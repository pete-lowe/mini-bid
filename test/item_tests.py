from items import *
from user_tests import *


def item_tests(auth_tokens: str):

    # get all items

    items = get_items(auth_tokens[0])

    # get item searching by a particular item id

    get_item_by_id(items[0]['_id'], auth_tokens[0])

    # get all items based on condition (new or used)

    get_items_by_condition("new", auth_tokens[0])
    get_items_by_condition('used', auth_tokens[0])

    # add a new item

    new_item = add_item(auth_tokens[0])

    # delete the newly added item

    delete_item_by_id_failure_when_not_admin(new_item['item']['_id'])
    delete_item_by_id(new_item['item']['_id'], auth_tokens[0])



