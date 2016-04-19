'use strict';

angular
  .module('lctapp')
  .controller('uploadVideoController', UploadVideoController);

/** @ngInject */
function UploadVideoController($scope,fileUploadService,API_ENDPOINT,Session,Rest) {
  console.log('upload video ctrl');
  $scope.video = {};
  $scope.videoFile = {};

  $scope.saveVideo = function(){
    var file = $scope.videoFile;
    var uploadUrl = API_ENDPOINT+'/upload';

    var fileObj = $scope.video;
    fileObj.videoFile = {
      name: 'abcd',
      age: 18
    };

    fileUploadService.uploadFileToUrl(file,uploadUrl).then(function(){
      console.log('uploaded succesfully');
      var user = Session.getUser();
      var fileObj = $scope.video;
      //Rest.registerImage(user.username).customPUT($scope.videoFile).then(function(){
      //  console.log('file Saved');
      //})
      //.catch(function(e){
      //  console.log('file NOT Saved');
      //  console.log(e);
      //})
    })
      .catch(function(){
        console.log('uploaded failed');
      })

  };
}
