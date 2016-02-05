var mainApp = angular.module('mainApp', ['ngRoute', 'mainControllers']);

mainApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/overview', {
    templateUrl: 'partials/overview.html',
    controller: 'OverviewController'
  }).
  when('/mp', {
    templateUrl: 'partials/mp.html',
    controller: 'MPController'
  }).
  when('/lab', {
    templateUrl: 'partials/lab.html',
    controller: 'LabController'
  }).
  when('/help', {
    templateUrl: 'partials/help.html',
    controller: 'HelpController'
  }).
  when('/schedule', {
    templateUrl: 'partials/schedule.html',
    controller: 'ScheduleController'
  }).
  when('/staff', {
    templateUrl: 'partials/staff.html',
    controller: 'StaffController'
  }).
  when('/developing', {
    templateUrl: 'partials/developing.html',
    controller: 'DevelopingController'
  }).
  when('/404', {
        templateUrl: '404.html',
        controller: 'Four04Controller'
   }).
  otherwise({
    redirectTo: '/overview'
  });
}]);

var labApp = angular.module('labApp', ['ngRoute', 'labControllers']);

labApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/schedule', {
    templateUrl: 'partials/labs/schedule.html',
    controller: 'ScheduleController'
  }).
  otherwise({
    redirectTo: '/schedule'
  });
  for(var i = 1; i <= 14; i++){
    $routeProvider.
    when('/lab' + i, {
      templateUrl: 'partials/labs/lab' + i + ".html",
      controller: 'LabController'
    });
  }
}]);
