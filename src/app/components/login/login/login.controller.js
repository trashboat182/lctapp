'use strict';

angular
    .module('lctapp')
    .controller('LoginController', LoginController);

/** @ngInject */
function LoginController($scope, Rest, ngDialog, $state, Session) {

    $scope.login = {
      username:'',
      password:''
    };
    $scope.error = {
        title: '',
        message:''
    };

    $scope.showLoginErrorDialog = function(){
        $scope.loginErrorDialog = ngDialog.open({
            template: 'app/components/login/login/loginError.html',
            className: 'ngdialog-theme-default',
            closeByEscape : true,
            closeByDocument: true,
            showClose: true,
            scope: $scope
        });
    };

    $scope.closeLoginErrorDialog = function(){
        $scope.loginErrorDialog.close();
    };

    $scope.$on('ngDialog.closed', function (e, $dialog) {
        console.log('ngDialog was closed: ' + $dialog.attr('id'));
    });

    $scope.signin = function(){
      if($scope.login.username && $scope.login.password){
        Rest.users($scope.login.username).get().then(function(response) {
            var user = response.data;
            if(user){
                if($scope.login.password===user.password){
                    if(!Session.getUser()){
                        Session.createSession({
                            username:$scope.login.username,
                            password:$scope.login.password,
                            email: $scope.login.email,
                            emailAuth:false
                        });
                    }
                    $state.go('dashboard');
                }
                else{
                    $scope.error.tittle = 'Incorrect Password';
                    $scope.showLoginErrorDialog();
                }
            }
            else{
                $scope.error.tittle = 'User Not Found';
                $scope.showLoginErrorDialog();
            }
        });
      }
    };
}
