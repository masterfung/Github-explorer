window.Github = Ember.Application.create({
	rootElement : '#github-app'
});

Github.Router.map(function() {
  // put your routes here
});

Github.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
    'Tsung Hung', 
    'Django', 
    'Django Rest Framework'
    ];
  }
});
