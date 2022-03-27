from users import *

def user_tests():
    registration_endpoint = '/api/users/register'
    login_endpoint = '/api/users/login'

    # create 5 random users

    user_list = register_users(5, registration_endpoint)
    print(user_list)

    # authenticate the 5 created users

    auth_tokens = []

    for user in user_list:
        auth_tokens.append(request_oauth_token(user[0], user[1], login_endpoint))

    # test GET /api/users - should return all users in the system with limited info as standard user making request

    get_users(auth_tokens[0])

    # set a user as admin

    set_user_as_admin(user_list[0][3])

    # test GET /api/users - should return all users in the system with extra info as admin user making request (includes email and admin status)

    get_users(auth_tokens[0])

    # returns an admin auth token for use in other tests

    return auth_tokens


