portfolio.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller.");
    portfolio.controller('mainController', function($scope) {
      // function to submit the form after all validation has occurred
      $scope.submitForm = function(isValid) {
        // check to make sure the form is completely valid
      };
    });

    $('#contactForm').submit(function () {
        sendContactForm(this);
    });

    var sendContactForm = function(){
        var jsondata = localStorage.getItem("pf_contact");
        var name = contactForm.contact_name.value;
        var email = contactForm.contact_email.value;
        var phone = contactForm.contact_phone.value;
        var message = contactForm.contact_message.value;
        if (jsondata === null) {
            var contact_form = '{"data":[' +
                '{"name":"'+name+'","email":"'+email+'","phone":"'+phone+'","message":"'+message+'"}]}';
            jsondata =  JSON.parse(JSON.stringify(contact_form));
        }
        else{
            var obj = JSON.parse(jsondata);
            obj.data.push({name: name.toString(), email: email.toString(), phone: phone.toString(), message: message.toString()});
            jsondata =  (JSON.stringify(obj));
        }
        localStorage.setItem('pf_contact', jsondata);
    };
});

portfolio.controller('AboutCtrl', function (/* $scope, $location, $http */) {
  console.log("this is about page.");
});
