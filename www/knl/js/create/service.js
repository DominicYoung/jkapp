'use strict';

createApp.factory('resourceData', ['$resource', '$q', function($resource, $q){

	var factory = {};
	var baseUrl = window.localStorage['baseUrl']; //ip地址
	
	factory.getSysType = function(id) {
		var url = baseRul + "/bskm/rest/attr/category/sys/" + id,
		_sys = $resource(url,{}),
		d = $q.defer();
		_sys.query(function(data){d.resolve(data)}, function(err){d.reject([])});
		return d.promise;
	};
	factory.getResType = function(id) {
		var url = baseRul + "bskm/rest/attr/category/res/" + id,
		_res = $resource(url, {}),
		d = $q.defer();
		_res.query(function(data){d.resolve(data)}, function(err){d.reject([])});
		return d.promise;
	};

	return factory;
}]);