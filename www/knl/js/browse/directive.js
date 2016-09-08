'use strict';

browseApp.directive('knlFavorite', ['$http', '$ionicModal', '$ionicPopup', '$timeout','favoriteObj', function($http , $ionicModal, $ionicPopup, $timeout,favoriteObj) {
		// Runs during compile
		return {
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {
				//当前元素
				var elem = angular.element(iElm[0]);
				    $scope.editBmShow = false;
				elem.bind('touch click',function(){
                	$scope.openFavoriteModal();
                });

                $scope.crtFavoriteShowFn = function(){
                	$scope.editBmShow = true;
                };
                $scope.crtFavoriteHideFn = function(){
                	$scope.editBmShow = false;
                };

                favoriteObj().then(function(data){
                 	$scope.favorites = data;
                 },function(err){

                 });
				$scope.crtFav = {};

			    $ionicModal.fromTemplateUrl('knl/views/favorite.html', {
			        scope: $scope,
			        animation: 'slide-in-up'
			    }).then(function(modal) {
			        $scope.favoriteModal = modal;
			    });
			    $scope.openFavoriteModal = function(){
			        $scope.favoriteModal.show();
			    };
			    $scope.closeFavoriteModal = function() {
			        $scope.favoriteModal.hide();
			    };

                //添加到收藏夹，如果已经收藏那么就删除
				$scope.collectFn = function(id) {
					console.log(id);
					var fb = $scope.favorites.getChild(id);
					console.log($scope.favorites.child);
					console.log(fb);
					if(fb.choiced === true){
						fb.removeKnl().then(function(data){},function(err){
							remindPopup(data.msgText||'删除失败！');
						});
					}else{
						fb.addKnl().then(function(data){},function(err){
							remindPopup(data.msgText||'添加失败！');
						});
					}
				};

				//创建收藏夹
				$scope.crtFavorite = function() {
					if ($scope.crtFav.groupName === undefined || $scope.crtFav.groupName === '') {
						remindPopup('不能为空！');
						return;
					};

					$scope.favorites.addChild($scope.crtFav.groupName).then(function(data){
						$scope.crtFav.groupName = '';
						$scope.editBmShow = false;
					},function(err){
						remindPopup(data.msgText||'创建失败！');
					});
				};



				function remindPopup(title){
		            var alertPopup = $ionicPopup.alert({
		                title: title,
		            });
		            alertPopup.then(function(res) {
		                $timeout(function() {
		                    alertPopup.close();
		                }, 1000);
		            });
		        };
			}
		};
	}])
	.directive('knlRecommend', ['$http', '$ionicModal', '$ionicPopup', '$timeout','provinces','getUserList', 'recommendServ', function($http, $ionicModal, $ionicPopup, $timeout, provinces, getUserList, recommendServ) {
		// Runs during compile
		return {
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {

				var elem = angular.element(iElm[0]);

                elem.bind('touch click',function(){
                	$scope.openRecommendModal();
                });

			    $ionicModal.fromTemplateUrl('knl/views/recommend.html', {
			        scope: $scope,
			        animation: 'slide-in-up'
			    }).then(function(modal) {
			        $scope.recommendModal = modal;
			    });
			    $scope.openRecommendModal = function(){
			        $scope.recommendModal.show();
			    };
			    $scope.closeRecommendModal = function() {
			        $scope.recommendModal.hide();
			    };
			    //Cleanup the modal when we're done with it!
			    $scope.$on('$destroy', function() {
			        $scope.recommendModal.remove();
			    });

                $scope.provs = provinces;
                $scope.provsShow = false;
                $scope.provShowFn = function(){
                	$scope.provsShow = !$scope.provsShow;
                };
				$scope.recommend = {
					choiceProv: "001",
					choiceUsers: [],
					searchUser: '',
					searchUsers: [],
					content: ''
				};

				/**
				 * 搜索用户
				 */
				$scope.searchUserFn = function() {
					if ($scope.recommend.searchUser === '') {
						return;
					}
					var searchUsers = $scope.recommend.searchUser.split(';'),
					    searchUser = searchUsers[searchUsers.length - 1];
					getUserList(searchUser,$scope.recommend.choiceProv,1,5).then(function(data){
						$scope.recommend.searchUsers = data;
					},function(err){});
				};

				/**
				 * 移除已选择用户
				 * @param index
				 */
				$scope.removeChoiceUserFn = function(index) {
					$scope.recommend.choiceUsers.splice(index, 1);
				};

				/**
				 * 选择用户
				 * @param user
				 */
				$scope.choiceUserFn = function(user) {
					$scope.recommend.choiceUsers.push(user);
					var searchUsers = $scope.recommend.searchUser.split(';');

					searchUsers[searchUsers.length - 1] = user.fullname;
					$scope.recommend.searchUser = searchUsers.join(';') + ';';
					$scope.recommend.searchUsers = [];
				};

				/**
				 * 知识推荐
				 */
				$scope.crtRecommendFn = function() {
					if ($scope.recommend.choiceUsers.length === 0) {
						remindPopup('请选择推荐人');
						return;
					}
					recommendServ($scope.recommend.choiceUsers,$scope.recommend.content).then(function(data){
						remindPopup('推荐成功');
						$scope.recommend = {
							choiceProv: 0,
							choiceUsers: [],
							searchUser: '',
							searchUsers: [],
							content: ''
						};
					},function(err){
						remindPopup(err.msgText||'推荐失败！');
					});
				};

				function remindPopup(title){
		            var alertPopup = $ionicPopup.alert({
		                title: title,
		            });
		            alertPopup.then(function(res) {
		                $timeout(function() {
		                    alertPopup.close();
		                }, 1000);
		            });
		        };
			}
		};
	}]);
