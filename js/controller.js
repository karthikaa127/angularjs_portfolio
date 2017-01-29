portfolio.controller('PageCtrl', function ($log, httpGetService) {
    console.log("Page Controller.");
    var promise = httpGetService.getData('/skills');
    promise.then(
      function(response) {
        console.log(response);
        d3_skills(response);
      },
      function(err) {
          $log.error('failed to get data', err);
      });
}).controller('AboutCtrl', function ($scope, $log, httpGetService) {
  console.log("this is about page.");
  var promise = httpGetService.getData('/profile');
  promise.then(
    function(response) {
      console.log(response);
      $scope.self = response;
    },
    function(err) {
        $log.error('failed to get data', err);
    });
}).controller('ContactCtrl', function ($scope, $http) {
  console.log("this is contact page.");

  $scope.submitForm = function(e) {
    e.preventDefault();
    $scope.result = sendContactForm(this);
    $http.post('/contacts', $scope.result)
      .success(function(data, status, headers, config) {
        $('#success').show();
        $('#contactForm').hide();
        console.log(data);
      }).
      error(function(err, status, headers, config) {
        console.log(err+ " : "+status);
      });
  };

  var sendContactForm = function(){
      return {
        "name": contactForm.contact_name.value.toString(),
        "email": contactForm.contact_email.value.toString(),
        "phone": contactForm.contact_phone.value.toString(),
        "message": contactForm.contact_message.value.toString(),
        "timestamp": new Date()
      };
  };
}).factory('httpGetService', function($http, $log, $q) {
  return {
    getData: function(url) {
      var deferred = $q.defer();
      $http.get(url)
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code){
          deferred.reject(msg);
          $log.error(msg, code);
        });
      return deferred.promise;
    }
  }
});
