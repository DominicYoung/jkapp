angular.module('userApp.service',['config','ngCordova'])

.factory('getUserInfo', ['$http', '$q', function($http, $q){

    var userInfo ={};


    var urlHost = window.localStorage['urlHost'];

    userInfo.getUser =  function (){
        var d = $q.defer(),
            url = urlHost + "rest/user/single/me";

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
}]);
