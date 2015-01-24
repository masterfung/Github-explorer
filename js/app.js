window.Github = Ember.Application.create({
	rootElement : '#github-app',
  LOG_TRANSITIONS: true
});

Github.Router.map(function() {
  this.resource("user", {path: "/users/:login"},
    function () {
      this.resource('repositories', {path: 'repositories'});
      this.resource("repository", { path: "repositories/:reponame"});
    }
  );
});

var devs = [
	{login: "django", name: "Django"},
	{login: 'masterfung', name: "Tsung Hung"},
	{login: 'tomchristie', name: "Tom Christie"},
  {login: "tomdale", name: "Tom Dale" },
  {login: "wycats", name: "Yehuda Katz" }
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


Github.UserIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('user');
  }
});

Github.RepositoriesRoute = Ember.Route.extend({
  model: function () {
    var user = this.modelFor('user');
    return Ember.$.getJSON(user.repos_url);
  }
});

Github.RepositoryRoute = Ember.Route.extend({
  model: function (params) {
    var user = this.modelFor("user");
    //build the URL for the Repo call manually
    var url = "https://api.github.com/repos/" + user.login + "/" + params.reponame;
    return Ember.$.getJSON(url);
  }
});

Github.RepositoriesController = Ember.ArrayController.extend({
  needs : ['user'],
  user : Ember.computed.alias("controllers.user")
});

Github.RepositoryController = Ember.ObjectController.extend({
  needs : ['user'],
  user : Ember.computed.alias("controllers.user")
});
