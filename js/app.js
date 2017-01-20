var portfolio = angular.module('portfolio', ['ngRoute']);

portfolio.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "templates/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "templates/about.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "templates/contact.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "templates/home.html", controller: "PageCtrl"});
}]);
