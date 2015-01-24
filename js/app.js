window.Github = Ember.Application.create({
	rootElement : '#github-app'
});

Github.Router.map(function() {
  this.resource("user", {path: "/users/:login"});
});

var devs = [
	{login: "django", name: "Django"},
	{login: 'masterfung', name: "Tsung Hung"}
	];

Github.IndexRoute = Ember.Route.extend({
  model: function() {
    return devs;
  }
});

Github.IndexController = Ember.ArrayController.extend({
	renderedForth: function () {
		return new Date();
	}.property(),
	actions : {
		clickMe: function () {
			alert('I am dangerously clicked!');
		}
	}
});

Github.UserRoute = Ember.Route.extend({
	model: function(params) {
		return Ember.$.getJSON("https://api.github.com/users/" +
	 		params.login);
	}
});
