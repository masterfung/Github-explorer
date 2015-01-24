window.Github = Ember.Application.create({
	rootElement : '#github-app',
  LOG_TRANSITIONS: true
});

Ember.Handlebars.registerBoundHelper('fromDate', function (theDate) {
  var today = moment();
  var target = moment(theDate);
  return target.from(today);
})

Github.Router.map(function() {
  this.resource("user", {path: "/users/:login"},
    function () {
      this.resource('repositories', {path: 'repositories'});
      this.resource("repository", { path: "repositories/:reposit"}, function () {
        this.resource('issues');
        this.resource('forks');
        this.resource('commits');
        this.route('newissue');
      });
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
    var user = this.modelFor('user');
    var url = "https://api.github.com/repos/" + user.login + "/" + params.reposit;
    return Ember.$.getJSON(url);
  }
});

Github.RepositoriesController = Ember.ArrayController.extend({
  needs : ['user'],
  user : Ember.computed.alias("controllers.user")
});

Github.RepositoryController = Ember.ObjectController.extend({
  needs : ['user'],
  user : Ember.computed.alias("controllers.user"),
  forked: Ember.computed.alias("fork")
});

Github.IssuesRoute = Ember.Route.extend({
  model: function () {
    var repo = this.modelFor('repository');
    var url = repo.issues_url.replace('{/number}', '');
    return Ember.$.getJSON(url);
  }
});

Github.ForksRoute = Ember.Route.extend({
  model: function () {
    var repo = this.modelFor('repository');
    var url = repo.forks_url;
    return Ember.$.getJSON(url);
  }
});

Github.CommitsRoute = Ember.Route.extend({
  model: function () {
    var repo = this.modelFor('repository');
    var url = repo.commits_url.replace("{/sha}","");
    return Ember.$.getJSON(url);
  }
});

Github.Issue = Ember.Object.extend({
  title : '',
  body : '',
  isValid : function () {
    // Perform some validations here
    return true;
  }
});

Github.RepositoryNewissueController = Ember.Controller.extend({
  needs: ['repository'],
  repo: Ember.computed.alias('controllers.repository'),
  issue : function () {
    return Github.Issue.create();
  }.property('repo.model'),
  actions: {
    submitIssue: function () {
      //var values = this.getProperties('title', 'body');
      //console.log(values);
      //POST issues_url

      var issue = this.get('issue');
      var url = this.get("repo").get("issues_url");
      //Ember.$.post(url, {title:title, body:body}, function (result) {
        // upon success
        //this.transitionToRoute("issues");
        //alert("Issues submitted");
      //})
      console.log("Submitted:  " + issue.get('title') + " to" + url);
      // Unset the form after completion
      this.set('issue', Github.Issue.create());
      this.transitionToRoute('issues');
    }
  }
});
