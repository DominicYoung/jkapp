'use strict';
angular.module('homeApp')
  .factory('veryIndentify',['$http', '$q', function($http, $q){
    var baseUrl = window.localStorage['baseUrl'];
    return function(){
      var url = baseUrl + '/bskm/rest/user/single/me',
        d = $q.defer();
      $http.get(url).success(function(data) {
        d.resolve(data);
      }).error(function(err,status) {
        d.reject(status);
      });
      return d.promise;
    }
  }])

.factory('userInfo', ['$http', '$q', function($http, $q){

    var userInfo = {};
    var urlHost = window.localStorage['urlHost']

    userInfo.getUser =  function (){
        var d = $q.defer(), 
            url = urlHost + "rest/user/single/me";//

        $http.get(url).success(function(data) {
            d.resolve(data);
        }).error(function() {
            d.reject(err);
        });
        return d.promise;
    }; 

    //获取用户积分
    userInfo.getKnlCredit = function(){
        var  d = $q.defer(),
             url = urlHost + "rest/user/credit";

        $http.get(url).success(function(data) {
            d.resolve(data);
        }).error(function() {
            d.reject(err);
        });
        return d.promise;
    };

    //获取我的知识条数
    userInfo.getKnlCount = function(){
        var  d = $q.defer(),
             url = urlHost + "rest/user/knl/count";

        $http.get(url).success(function(data) {
            d.resolve(data);
        }).error(function() {
            d.reject(err);
        });
        return d.promise;
    };

    //获取我的收藏知识条数
    userInfo.getFavoriteCount = function(){
        var  d = $q.defer(),
             url = urlHost + "rest/user/bookmaker/user/count",
             data = "groupID=-2";

        $http.post(url,data).success(function(data) {
            d.resolve(data);
        }).error(function() {
            d.reject(err);
        });
        return d.promise;
    };

    userInfo.getRecommendCount = function(){
        var  d = $q.defer(),
             url = urlHost + "rest/recommend/me/count";

        $http.get(url).success(function(data) {
            d.resolve(data);
        }).error(function() {
            d.reject(err);
        });
        return d.promise;
    };

    return userInfo;
}])

.factory('fileManage', ['$cordovaSQLite', function($cordovaSQLite){
    var db;
    function sqlResultTranslate (rows){
        var rst = new Array(rows.length);
        for(var i = 0,len = rows.length; i < len;i++){
            rst[i] = rows.item(i); 
        }
        return rst;
    };
    var fileSqlite = {
        initDB: function() {
            db = $cordovaSQLite.openDB('my.db');
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS files(id integer primary key,name text)");
        },
        getfileList: function(callback) {
            var query = "SELECT name FROM files",
            callData = [];
            $cordovaSQLite.execute(db, query).then(function(res) {
                if (res.rows.length > 0) {
                    callData = sqlResultTranslate(res.rows);
                    callback(callData);
                } else {
                    callback(callData);
                    console.log("No results found");
                }
            }, function(err) {
                console.error(err);
            });
        },
        addFile: function(name) {
            var query = "INSERT INTO files (name) VALUES (?)";
            $cordovaSQLite.execute(db, query, [name]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
            }, function(err) {
                console.error(err);
            });
        },
        removeFile: function(name) {
            var query = "DELETE FROM files WHERE name = ?";
            $cordovaSQLite.execute(db, query, [name]).then(function(res) {
                console.log("delete ID -> " + res.deleteId);
            }, function(err) {
                console.error(err);
            });
        }
    };
    return fileSqlite;
}])

    /**
     * [获取轮播信息]
     * @param  {[type]} $http     [description]
     * @param  {Object} $q        [description]
     * @return {[type]}           [description]
     */
    .factory('sliderSource', ['$http', '$q', function($http, $q) {
        var sliderSource = {};
        var baseUrl = window.localStorage['baseUrl'];
        /**
         * [getSliderList 获取轮播列表]
         * @return {[type]} [description]
         */
        sliderSource.getSliderList = function() {
            var url = baseUrl + '/jkapp/rest/index/photo',
                d = $q.defer();
            $http.get(url).success(function(data) {
                angular.forEach(data, function(d) {
                    d.src = baseUrl + d.src;
                    d.href = '#/browse' + d.href;
                });
                console.log(data);
                d.resolve(data);
            }).error(function(err) {
                d.reject(err);
            });
            return d.promise;
        }
        return sliderSource;
    }]).factory('hotKnlList', ['$http', '$q', function($http, $q) {
        var sliderSource = {};
        var baseUrl = window.localStorage['baseUrl'];
        return function() {
            var url = baseUrl + '/bskm/rest/index/new/visit/knl',
            d = $q.defer();
            $http.get(url).success(function(data) {
                console.log(data);
                d.resolve(data);
            }).error(function(err) {
                d.reject(err);
            });
            return d.promise;
        };
    }]).factory('impEvent', ['$http', '$q', function($http, $q) {
        return function() {};
    }]).factory('invest', ['$http', '$q', function($http, $q) {
        return function() {};
    }])
    /**
     * [从后台获取列表信息的工厂]
     * @param  {[type]} $http         [description]
     * @param  {[type]} $q            [description]
     * @return {[Object]}             [description]
     */
    .factory('knlListSource', ['$http', '$q', '$location',function($http, $q, $location) {
        var knlList = {};
        var baseUrl = window.localStorage['baseUrl'];
        /**
         * [getHotList 获取五条热门知识信息]
         * @param  {[num]} id [知识类型id]
         * @return {[promise]}    [返回查询结果]
         */
        knlList.getHotList = function(id) {
            var url = baseUrl + '/bskm/rest/index/click/' + id,
            d = $q.defer();
            $http.get(url).success(function(data) {
                d.resolve(data);
            }).error(function(err) {
                d.reject(err);
            });
            return d.promise;
        };
        /**
         * [getNewList 获取最新的知识列表]
         * @param  {[num]} id        [知识类型id]
         * @param  {[num]} page      [知识页数,默认第一页]
         * @param  {[num]} num       [知识条数，默认10条]
         * @param  {[string]} authority [共享中心类型，me省级，all全网,默认全网]
         * @return {[promise]}           [查询结果]
         */
        knlList.getNewList = function(id, page, num, authority) {
            var page = page || 1,
                num = num || 10,
                url = baseUrl + '/bskm/rest/knl/' + id + '/page/' + page + '/' + num,
                data = authority === "me" ? "provCenter=true" : "",
                d = $q.defer();
            $http.post(url, data).success(function(data) {
                d.resolve(data);
            }).error(function(err) {
                d.reject(err);
            });
            return d.promise;
        };
        knlList.getSearchList = function(id, page, num, authority, d) {
            var data = '',
                searchData = angular.copy(d),
                page = page || 1,
                tab = {},
                url = baseUrl + '/bskm/rest/knl/' + id + '/page/' + page + '/' + num,
                d = $q.defer(),
                title = '';
            title = searchData.title && searchData.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            title = encodeURIComponent(title);
            if (searchData.fullText) {
                searchData.keywords = searchData.title;
                delete searchData.title;
                delete searchData.fullText;
            } else {
                delete searchData.fullText;
            }
            $location.search('');
            angular.forEach(searchData, function(value, key) {
                if (value !== '' && value !== "-1") {
                    if (key === 'knlResourceType') {
                        value = getChildIDList(resTypes, value);
                    } else if (key === 'knlSysType') {
                        value = getChildIDList(sysTypes, value);
                    }
                    if (key !== 'provKey' || value !== '001') {
                        $location.search(key, value);
                        data += key + "=" + value + "&";
                    }
                }
            });
            data = data.substr(0, data.length - 1);
            data = authority === "me" ? data + "provCenter=true" : data;
            $http.post(url, data).success(function(data) {
                    d.resolve(data);
                }).error(function(err) {
                    d.reject(err);
                });
            return d.promise;
        };
        return knlList;
    }])
    /**
     * [knl 知识列表对象]
     * @param  {[type]} $q                        [description]
     * @param  {Array}  knlListSource             [description]
     * @return {[type]}                           [description]
     */
    .factory('knl', ['$q', 'knlListSource', function($q, knlListSource) {
        /**
         * [Knl 创建知识模块类]
         * @param {[num]} typeID [知识模块id]
         */
        function Knl(typeID, authority) {
            this.id = typeID;
            this.hotList = {}; //热门知识列表
            this.newList = {}; //最新知识列表
            this.newListRemind = '查看更多'; //更多提示
            this.getHotList(); //获取热门知识
            this.getNewList(); //获取最新知识
            this.searched = false;
            this.authority = authority || 'all';
            this.searchData = {};
        };
        /**
         * [changeAuthority 省级共享切换]
         * @return {[type]} [description]
         */
        Knl.prototype.changeAuthority = function() {
            if (this.authority === 'all') {
                this.authority = 'me';
            } else {
                this.authority = 'all';
            }
            this.getNewList();
            return this;
        };
        /**
         * [getHotList 获取热门知识列表，固定长度为五个]
         * @return {[type]} [description]
         */
        Knl.prototype.getHotList = function() {
            var d = $q.defer(),
                that = this;
            knlListSource.getHotList(this.id).then(function(data) {
                that.hotList = data;
                d.resolve(data);
            }, function(err) {
                d.reject(err);
            });
            return d.promise;
        };
        /**
         * [getNewList 获取最新的知识列表，前十个]
         * @return {[type]} [description]
         */
        Knl.prototype.getNewList = function() {
            var d = $q.defer(),
                that = this;
            knlListSource.getNewList(this.id, 1, 10, this.authority).then(function(data) {
                that.newList = data;
                console.log(data);
                that.newListRmdCtrl(data.pageVO.curPage, data.pageVO.totalPages);
                d.resolve(data);
            }, function(err) {
                d.reject(err);
            });
            return d.promise;
        };
        /**
         * [getNewListMore 获取下一页的知识]
         * @param  {[type]} page [指定的页数，如果为空，则自动填充为当前页]
         * @return {[type]}      [description]
         */
        Knl.prototype.getNewListMore = function(page) {
            var page = page || this.newList.pageVO.curPage,
                d = $q.defer(),
                that = this;
            if (page >= this.newList.pageVO.pageSize) {
                return;
            };
            var moreFn = this.searched ? knlListSource.getSearchList : knlListSource.getNewList;
            moreFn(this.id, ++page, 10, this.authority,this.searchData).then(function(data) {
                that.newList.pageVO = data.pageVO;
                that.newListRmdCtrl(data.pageVO.curPage, data.pageVO.totalPages);
                that.newList.rows = that.newList.rows.concat(data.rows);
                d.resolve(data.rows);
            }, function(err) {
                d.reject(err);
            });
            return d.promise;
        };
        /**
         * [newListRmdCtrl 判断是否加载完毕]
         * @param  {[type]} curPage    [当前页]
         * @param  {[type]} totalPages [总页数]
         * @return {[type]}            [description]
         */
        Knl.prototype.newListRmdCtrl = function(curPage, totalPages) {
            if (curPage >= totalPages) {
                this.newListRemind = '已到底';
            } else {
                this.newListRemind = '查看更多';
            }
        };

        Knl.prototype.getSearchList = function(){
            var page = page || this.newList.pageVO.curPage,
                d = $q.defer(),
                that = this;
            if (page >= this.newList.pageVO.pageSize) {
                return;
            };
            console.log(this.searchData);
            knlListSource.getSearchList(this.id, 1, 10, this.authority, this.searchData).then(function(data){
                that.newList = data;
                console.log(data);
                that.newListRmdCtrl(data.pageVO.curPage, data.pageVO.totalPages);
                d.resolve(data);
            }, function(err) {
                d.reject(err);
            });
            return d.promise;
        };

        return function(typeID) {
            return new Knl(typeID);
        };
    }]);
