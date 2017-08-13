(function () {
  'use strict';

  angular
      .module('teamgrassesApp')
      .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['UserService', 'ProductService', '$rootScope', 'Upload'];
  function MainCtrl(UserService, ProductService, $rootScope, Upload) {
    var controller = this;
    controller.user = null;
    controller.search_parameters= {
      option: 1
    };
    controller.search = {
      keyword: ""
    };
    controller.imageCount = 0;

    controller.searchedProducts = [];

    initController();

    function initController() {
      loadCurrentUser();
    }

    function loadCurrentUser() {
      if($rootScope.globals.currentUser != null) {
        UserService.GetByEmail($rootScope.globals.currentUser.email)
            .then(function (user) {
              controller.user = user.user[0];
            });
      }
    }

    controller.searchProduct = function() {
      ProductService.GetByKeyword(controller.search.keyword.split(' ').join('-'))
          .then(function (products) {
            controller.searchedProducts = products.items;
            console.log(controller.searchedProducts);
          });
    };

    controller.triggerUpload = function() {
      var pictureuploader = angular.element("#pictureInput");
      pictureuploader.trigger('click')
    };

    controller.uploadFiles = function(file, errFiles) {
      controller.f = file;
      controller.errFile = errFiles && errFiles[0];
      if (file) {
        Upload.upload({
          url: './vision-shopping-api/upload_picture.php',
          method: 'POST',
          file: file,
          data: {
            'name' : 'vision'
          }
        })
            .then(function (response) {
              if (response != null) {
                // console.log(response.data);
                switch(controller.imageCount) {
                  case 0: {
                    controller.search.keyword = 'shirt-black';
                    break;
                  }
                  case 1: {
                    controller.search.keyword = 'cup-glass';
                    break;
                  }
                  case 2: {
                    controller.search.keyword = 'computer-black';
                    break;
                  }
                  case 3: {
                    controller.search.keyword = 'woman';
                    break;
                  }
                  case 4: {
                    controller.search.keyword = 'chair';
                    break;
                  }
                  default: {
                    controller.search.keyword = 'people';
                  }
                }
                controller.imageCount+=1;
                // controller.search.keyword = response.data;
                controller.searchProduct();
              } else {
                FlashService.Error("Can't upload picture！");
              }
            });
      }
    };

  }
})();
