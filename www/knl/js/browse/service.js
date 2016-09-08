'use strict';

browseApp.factory('getMyInfo', ['$http', '$q', function($http, $q) {
    var baseUrl = window.localStorage['baseUrl'],
        info = {};

    return function getMyInfo() {
        var url = baseUrl + "/bskm/rest/user/single/me",
            d = $q.defer();
        $http.get(url).success(function(data) {
            info = data;
            info.photo = baseUrl + data.photo;
            d.resolve(info);
        }).error(function(err) {
            d.reject(err);
        });
        return d.promise;
    };
}])
.factory('getUserList', ['$http','$q', function($http, $q){
    var baseUrl = window.localStorage['baseUrl'];

    /**
     * [getUserList 根据用户名称，省份获取用户列表]
     * @param  {[str]} name [用户名称]
     * @param  {[str]} prov [省份]
     * @param  {[num]} num  [每页显示个数]
     * @param  {[num]} page [第几页]
     * @return {[type]}      [promise]
     */
    return function getUserList(name,prov,page,num){
        var url = baseUrl + '/bskm/rest/user/page/'+ page + '/' + num,
            data = prov === "001" ? 'fullname=' + name + '&exclude=1' : 'fullname=' + name + '&provId=' + prov + '&exclude=1',
            d = $q.defer();
            $http.post(url,data).success(function(data){
                d.resolve(data);
            }).error(function(err) {
                d.reject(err);
            });
            return d.promise;
    };
}])
.factory('getKnlBrowse', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
        var factory = {};
        var baseUrl = window.localStorage['baseUrl'];
        /**
         * 获取知识详情
         * @param knlparams
         */
        factory.getArticle = function(knlparams) {
            //debugger;
            var deferred = $q.defer(),
                url = baseUrl + '/bskm/rest/knl/' + knlparams.typeID + '/single/' + knlparams.knlID;
            $http.get(url).success(function(data) {
                console.log(data);
                data.choiceBstAns = data.createBy === $rootScope.userInfo.userKey && data.isClose === 0;
                deferred.resolve(data);
            }).error(function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        /**
         * 获取评论或问答
         * @param knlparams, pageNum, knl
         */
        factory.getComment = function(knlparams, pageNum, knl) {
            if (!knl) {
                return;
            }
            var pageNum = pageNum || 1,
                url = knlparams.typeID == 1 ? baseUrl + '/bskm/rest/knl/answer/page/' + knlparams.knlID + '/' + pageNum + '/10' : baseUrl + '/bskm/rest/comment/list/' + knlparams.typeID + '/' + knlparams.knlID + '/' + pageNum + '/10';
            $http.get(url).success(function(data) {
                knl.comment = data;
            });
        };

        /**
         * 获取附件信息
         * @param knlparams, knl
         */
        factory.getFiles = function(knlparams, knl) {
            if (!knl) {
                return;
            }
            if (knlparams.typeID === 1) {
                return;
            }
            var url = baseUrl + '/bskm/rest/knl/attachment/page/' + knlparams.typeID + '/' + knlparams.knlID;
            $http.get(url).success(function(data) {
                knl.files = data;
            });
        };

        /**
         * 获取评分
         * @param knlparams, knl
         */
        factory.getMyScore = function(knlparams, knl) {
            if (!knl) {
                return;
            }
            var url = baseUrl + '/bskm/rest/comment/has/' + knlparams.typeID + '/' + knlparams.knlID;
            $http.get(url).success(function(data) {
                knl.myScoreObj = {};
                knl.myScoreObj.score = data;
            });
        };

        /**
         * 获取数据量
         * @param knlparams, knl
         */
        factory.getknlcount = function(knlparams, knl) {
            if (!knl) {
                return;
            }
            var url = baseUrl + '/bskm/rest/knlcount/' + knlparams.typeID + '/' + knlparams.knlID;
            $http.get(url).success(function(data) {
                // knl.myKnlcount = {};
                knl.myKnlcount = data[0];
                console.log(knl.myKnlcount);
            });
        };

        factory.getArticleAll = function(knlparams) {
            var knl = {};
            this.getArticle(knlparams).then(function(data) {
                knl.knlCont = data;
            });
            this.getComment(knlparams, 1, knl);
            this.getFiles(knlparams, knl);
            this.getMyScore(knlparams, knl);
            this.getknlcount(knlparams,knl);
            console.log(knl);
            return knl;
        };
        return factory;
    }])
.factory('knlManage', ['$rootScope', '$http', '$q', '$timeout', '$ionicPlatform', '$ionicPopup', '$cordovaFileTransfer', 'fileManage', function($rootScope, $http, $q, $timeout, $ionicPlatform, $ionicPopup, $cordovaFileTransfer, fileManage) {
    var factory = {};
    var baseUrl = window.localStorage['baseUrl']; //ip地址

    var fileURI = "";
    $ionicPlatform.ready(function() {
        //if (!!LocalFileSystem) {
        //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        //}
    });

    function gotFS(fileSystem) {
        var root = fileSystem.root,
            rootURI = root.toURI();
        root.getDirectory('qwsmFiles', {
            create: true,
            exclusive: false
        }, function(drcEntry) {
            fileURI = drcEntry.toURI();
        }, function() {
            console.log('创建文件夹失败');
        });
    };

    function fail() {
        console.log('err');
    };

    /**
     * 废弃知识
     * @param typeID 知识模块id
     * @param knlID 知识id
     */
    factory.knlDiscard = function(typeID, knlID) {
        if (typeID === undefined || knlID === undefined) {
            throw new Error('请指定知识');
            return;
        }
        var url = baseUrl + '/bskm/rest/disable/knl/' + typeID + '/' + knlID;
        $http.get(url).success(function(data) {
            if (data.msgStatus === 1) {
                remindShow('知识已废弃！'); //提示信息
            } else {
                remindShow('知识废弃失败！'); //提示信息
            }
        });
    };

    /**
     * 创建评论
     * @param  typeID
     * @param  knlID
     * @param  comment
     * @param  knl
     */
    factory.crtComment = function(typeID, knlID, comment, knl) {
        console.log(1);
        if (typeID === undefined || knlID === undefined) {
            return;
        }
        if (comment.content === '') {
            remindShow('评论不能为空！');
            return;
        }
        var url = typeID == 1 ? baseUrl + '/bskm/rest/knl/answer/add/' + knlID : baseUrl + '/bskm/rest/comment/add/text/' + typeID + '/' + knlID,
            data = 'content=' + comment.content;
        $http.post(url, data).success(function(data) {
            if (data.msgStatus === 1) {
                var _comment = {
                    user: {}
                };
                _comment.content = comment.content;
                _comment.user.fullname = '我';
                _comment.createTime = '刚刚';
                knl.comment.rows.unshift(_comment);
                knl.comment.pageVO.totalRows++;
                comment.content = '';
                remindShow('评论成功！'); //提示信息
            } else {
                remindShow('评论提交失败！'); //提示信息
            }
        });
    };


    /**
     * 创建评分
     * @param typeID
     * @param knlID
     * @param score
     */
    factory.crtScore = function(typeID, knlID, score) {
        var d = $q.defer();
        if (score === 0) {
            remindShow('评分不能为空！'); //提示信息
        }
        var url = baseUrl + '/bskm/rest/comment/add/rank/' + typeID + '/' + knlID,
            data = 'rank=' + score;
        $http.post(url, data).success(function(data) {
            if (data.msgStatus === 1) {
                d.resolve(score);
                return;
            } else {
                d.resolve(0);
                remindShow('评分失败！'); //提示信息
            }
        }).error(function(err) {
            d.reject(err);
        });
        return d.promise;
    };


    factory.fileDownload = function(f) {
        var url = baseUrl.slice(0, -6) + f.filePath,
            targetPath = encodeURI(fileURI + f.fileName),
            trustHosts = true;
        var options = {};
        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            .then(function(result) {
                fileManage.addFile(f.fileName);
                remindShow('下载成功！');
            }, function(err) {
                remindShow('下载失败！'); //提示信息
            });
    };

    /**
     * [getMoreComment 获取下一页评论列表]
     * @param  {[type]} typeID  [知识类型ID]
     * @param  {[type]} knlID   [知识ID]
     * @param  {[type]} pageNum [当前页]
     * @return {[type]}         [description]
     */
    factory.getMoreComment = function(typeID, knlID, pageNum) {
        var d = $q.defer();
        var url = typeID == 1 ? baseUrl + '/bskm/rest/knl/answer/page/' + knlID + '/' + pageNum + '/10' : baseUrl + '/bskm/rest/comment/list/' + typeID + '/' + knlID + '/' + pageNum + '/10';
        $http.get(url).success(function(data) {
            d.resolve(data);
        }).error(function(err) {
            d.reject(err);
        });
        return d.promise;
    }

    function remindShow(title) {
        var showPopup = $ionicPopup.show({
            title: title
        });
        showPopup.then(function(res) {});
        $timeout(function() {
            showPopup.close(); //关闭提示框
        }, 1000);
    };

    return factory;
}])
.factory('fileManage', ['$cordovaSQLite', function($cordovaSQLite) {
    var db;

    function sqlResultTranslate(rows) {
        var rst = new Array(rows.length);
        for (var i = 0, len = rows.length; i < len; i++) {
            rst[i] = rows.item(i);
        }
        return rst;
    };
    var fileSqlite = {
        initDB: function() {
            db = $cordovaSQLite.openDB('my.db');
            if (!!db) {
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS files(id integer primary key,name text)");
            }
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
browseApp.factory('favoriteObj', ['$rootScope','$http', '$q', function($rootScope, $http, $q){
    var baseUrl = window.localStorage['baseUrl'];
    var knlInfo = $rootScope.params;

    var Favorites = function(childs){
        this.child = childs || [];
    };

    Favorites.prototype.addChild = function (name) {
        var url = baseUrl + '/bskm/rest/bookmaker/add',
            data = 'groupName=' + name,
            d = $q.defer(),
            that = this;
        if (name === undefined || name === '') {
            console.log('请填写收藏夹名字');
            return;
        }
        $http.post(url,data).success(function(data){
            console.log('添加收藏夹！');

            console.log(data);
            if (data.msgStatus === 1) {
                var f = new FavoriteFolder(data.obj,name,false);
                that.child.push(f);
                d.resolve(this);
            } else {
                d.reject(false);
            }
        }).error(function(err){
            d.reject(false);
        });

        return d.promise;
    };

    Favorites.prototype.removeChild = function (id) {
        for(var i = 0,len = this.child.length; i < len;i++ ){
            if(this.child[i].id === id){
               this.child.splice(i,1);
               return this;
            }
        }
    };

    Favorites.prototype.getChild = function(id){
        var c = this.child;
        for(var i = 0,len = c.length;i < len;i++){
            if(c[i].groupID === id){
                return c[i];
            }
        }
    };

    Favorites.prototype.initChoiced = function(){
        //debugger;
        var url = baseUrl + '/bskm/rest/bookmaker/exists/group/' + knlInfo.typeID + '/' + knlInfo.knlID,
            d = $q.defer(),
            that = this;
        $http.get(url).success(function(data){
            var fArr = data;
            that.child.forEach(function(c){
                fArr.forEach(function(f) {
                if ( f && f.groupID === c.groupID) {
                        c.choiced = true;
                    }
                });
            });
            d.resolve(this);
        }).error(function(err){
            d.reject(err);
        });

        return d.promise;
    }

    var FavoriteFolder = function(id,name,choiced) {
        this.groupID = id;
        this.groupName = name || '无';
        this.choiced = choiced || false;
    };

    FavoriteFolder.prototype.addKnl = function (){
        var url = baseUrl + '/bskm/rest/bookmaker/knl/' + knlInfo.typeID + '/add/' + knlInfo.knlID,
            data = 'groupID=' + this.groupID,
            d = $q.defer(),
            that = this;

        $http.post(url,data).success(function(data){
            if (data.msgStatus === 1) {
                that.choiced = !that.choiced;
                d.resolve(true);
            } else {
                d.reject(data);
            }
        }).error(function(err) {
            d.reject(err);
        });
        return d.promise;
    };


    FavoriteFolder.prototype.removeKnl = function (){
        var url = baseUrl + '/bskm/rest/bookmaker/deleteknl/' + knlInfo.typeID + '/' + knlInfo.knlID,
            data = 'groupID=' + this.groupID,
            d = $q.defer(),
            that = this;

        $http.post(url,data).success(function(data){
            if (data.msgStatus === 1) {
                that.choiced = !that.choiced;
                d.resolve(true);
            } else {
                d.reject(data);
            }
        }).error(function(err) {
            d.reject(err);
        });
        return d.promise;
    };


    return function(){
        var favoriteGroupURL = baseUrl + '/bskm/rest/bookmaker/list/group',
            d = $q.defer();
            $http.get(favoriteGroupURL).success(function(data){
                var fArr = [];
                if(data && data.length > 0){
                    data.forEach(function(d){
                        fArr.push(new FavoriteFolder(d.groupID,d.groupName,false));
                    });
                    // debugger;
                    var favorites = new Favorites(fArr);
                    favorites.initChoiced();
                    d.resolve(favorites);
                }
            }).error(function(err){
                d.reject(err);
            });
            return d.promise;
    };
}]);
browseApp.factory('recommendServ', ['$rootScope','$http', '$q', function($rootScope, $http, $q){
    var baseUrl = window.localStorage['baseUrl'];
    var knlInfo = $rootScope.params;
    /**
     * [recommend description]
     * @param  {[arr]} users  [用户列表]
     * @param  {[str]} reason [推荐原因]
     * @return {[type]}        [promise]
     */
    return function recommend(users,reason){
        var url = baseUrl + '/bskm/rest/recommend/touser/' + knlInfo.typeID + '/' + knlInfo.knlID,
            data = 'recommendTo=',
            d = $q.defer();
            if(users.length <= 0){
                d.reject(false);
                return d.promise;
            }
            users.forEach(function(user) {
                data += user.userKey + ',';
            });
            data.substring(0, data.length - 1);
            data = data + '&reason=' + reason;
            $http.post(url,data).success(function(data){
                if (data.msgStatus === 1) {
                    d.resolve(true);
                }else{
                    d.reject(data);
                }
            }).error(function(err){
                d.reject(err);
            });
            return d.promise;
    };
}])
