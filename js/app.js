window.Github = Ember.Application.create({});

Github.Router.map(function() {
  // put your routes here
});

Github.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['asian', 'yellow', 'glow'];
  }
});
