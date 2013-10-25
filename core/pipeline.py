USER_FIELDS = ['username', 'email']

def more_user_data(strategy, details, response, uid, user=None, *args, **kwargs):
    print strategy.backend_name()
    
    return {}