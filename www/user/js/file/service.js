'use strict';

angular.module('fileApp').factory('fileEntry', ['$q','$timeout', '$ionicPopup','fileSqlite', function($q,$timeout, $ionicPopup,fileSqlite) {
	var factory = {},
        fileURI = '';
    document.addEventListener('deviceready',function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFS, fail);
    });
    function getFS(fileSystem){
        var root = fileSystem.root;
        root.getDirectory('qwsmFiles',{create: true,exclusive: false},function(drcEntry){
            fileURI = drcEntry.toURI();
        },fail);
    };

    function fail(){
        console.log('err');
    };

    factory.getFiles = function(){
        var fileList = [],
            d = $q.defer();
        window.resolveLocalFileSystemURI(fileURI,function(drcEntry){
            var drcReader = drcEntry.createReader();
            drcReader.readEntries(function(entryArr){
                for(var i = 0 ,len = entryArr.length; i < len;i++){
                    if(entryArr[i].isFile){
                        fileList.push({name: entryArr[i].name});
                    }  
                };
                d.resolve(fileList);
            },function(err){
                d.reject(err);
            });
        },fail);
        return d.promise;
    };

    factory.removeFile = function(f,list){
        var fname = f.name,
            d = $q.defer();
        window.resolveLocalFileSystemURI(fileURI,function(drcEntry){
            drcEntry.getFile(fname,{create: false,exclusive:false},function(fileEntry){
                fileEntry.remove(function(){
                    remindShow('删除成功！');
                    var fn = list.indexOf(f);
                    list.splice(fn,1);
                    fileSqlite.removeFile(fname);
                    d.resolve(f);
                },function(){
                    remindShow('删除失败！');
                    d.reject(err);
                });
            },fail);
        },fail);
        return d.promise;
    };
    
    factory.removeAllFile = function(){
        var d = $q.defer();
        window.resolveLocalFileSystemURI(fileURI,function(drcEntry){
            drcEntry.removeRecursively(function(){
                remindShow('清空成功！');
                fileSqlite.removeAllFile();
                d.resolve(true);
            },function(){
                remindShow('清空失败！');
                d.reject(err);
            });
        },fail);
        return d.promise;
    };
    function remindShow (title) {
        var showPopup = $ionicPopup.show({title: title});
        showPopup.then(function(res) {});
        $timeout(function() {
            showPopup.close(); //关闭提示框
        }, 1000);
    };
    return factory;
}])
.factory('fileSqlite', ['$rootScope','$cordovaSQLite', function($rootScope,$cordovaSQLite){
    var db;
    function sqlResultTranslate (rows){
        var rst = new Array(rows.length);
        for(var i = 0,len = rows.length; i < len;i++){
            rst[i] = rows.item(i); 
        }
        return rst;
    };
    var file = {
        initDB: function() {
            db = $cordovaSQLite.openDB('my.db');
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS files(id integer primary key,name text)").then(function(res){
                $rootScope.$broadcast('createdDB',true);
            },function(err){
                $rootScope.$broadcast('createdDB',false);
            });
        },
        getFileList: function(callback) {
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
                console.log("delete name -> " + name);
            }, function(err) {
                console.error(err);
            });
        },
        removeAllFile: function(){
            var query = "DELETE FROM files";
            $cordovaSQLite.execute(db, query).then(function(res) {
                console.log("delete all -> ");
            }, function(err) {
                console.error(err);
            });
        }
    };
    return file;
}]);
