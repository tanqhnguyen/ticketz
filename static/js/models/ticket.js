define([
  'basemodel'
], function(BaseModel){
  var Model = BaseModel.extend({
    url: 'ticket',

    getUser: function() {
      var firstName = this.get('user.first_name');
      var lastName = this.get('user.last_name');
      var name = firstName + ' ' + lastName;

      name = _.trim(name);
      if (name) {
        return name;
      }

      var email = this.get('user.email').split('@');
      email = _.first(email);
      return email + '@' + '...';
    }
  });

  return Model;
})
