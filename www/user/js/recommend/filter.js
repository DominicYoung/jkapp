/**
 * id2title.......分享方式过滤器
 *
 * statusFilter.......知识状态过滤器
 */
angular.module('recommendApp')
	.filter('id2title', function() {
		return function(input) {
			if (angular.isString(input)) {
				switch (input) {
					case '0':
						return "经验案例";
					case '1':
						return "问答";
					case '2':
						return "技术文档";
					case '3':
						return "词条";
					case '4':
						return "已知问题";
				}
			} else {
				switch (input) {
					case 0:
						return "经验案例";
					case 1:
						return "问答";
					case 2:
						return "技术文档"
					case 3:
						return "词条"
					case 4:
						return "已知问题";
				}
			}
		};
	})
	.filter('statusFilter', function() {
		return function(input) {
			if (input == '0') {
				return "草稿";
			} else if (input == '1') {
				return "待审核";
			} else if (input == '2') {
				return "已发布";
			} else if (input == '3') {
				return "退回";
			} else if (input == '4') {
				return "废弃";
			} else if (input == '5') {
				return "超时";
			} else if (input == '8') {
				return "已发布";
			} else {
				return "未知状态";
			}
		};
	})
	.filter('dateDay', function() {
		var filter = function(date) {
			var u = /([^\s]*)/i;
			if (typeof(date) != 'string') {
				return date;
			}
			var result = date.match(u);
			date = result[1];
			return date;
		};
		return filter;
	});