'use strict';

if(!config){
    var config = angular.module('config',['ionic']);
}
config.constant('provinces', [{
    "name": "全部省份",
    "ID": "001"
}, {
    "name": "南方基地",
    "ID": "003"
}, {
    "name": "全网监控中心",
    "ID": "004"
}, {
    "name": "北京",
    "ID": "100"
}, {
    "name": "广东",
    "ID": "200"
}, {
    "name": "上海",
    "ID": "210"
}, {
    "name": "天津",
    "ID": "220"
}, {
    "name": "重庆",
    "ID": "230"
}, {
    "name": "辽宁",
    "ID": "240"
}, {
    "name": "江苏",
    "ID": "250"
}, {
    "name": "湖北",
    "ID": "270"
}, {
    "name": "四川",
    "ID": "280"
}, {
    "name": "陕西",
    "ID": "290"
}, {
    "name": "河北",
    "ID": "311"
}, {
    "name": "山西",
    "ID": "351"
}, {
    "name": "河南",
    "ID": "371"
}, {
    "name": "吉林",
    "ID": "431"
}, {
    "name": "黑龙江",
    "ID": "451"
}, {
    "name": "内蒙",
    "ID": "471"
}, {
    "name": "山东",
    "ID": "531"
}, {
    "name": "安徽",
    "ID": "551"
}, {
    "name": "浙江",
    "ID": "571"
}, {
    "name": "福建",
    "ID": "591"
}, {
    "name": "湖南",
    "ID": "731"
}, {
    "name": "广西",
    "ID": "771"
}, {
    "name": "江西",
    "ID": "791"
}, {
    "name": "贵州",
    "ID": "851"
}, {
    "name": "云南",
    "ID": "871"
}, {
    "name": "西藏",
    "ID": "891"
}, {
    "name": "海南",
    "ID": "898"
}, {
    "name": "甘肃",
    "ID": "931"
}, {
    "name": "宁夏",
    "ID": "951"
}, {
    "name": "青海",
    "ID": "971"
}, {
    "name": "新疆",
    "ID": "991"
}]);
config.constant('knlTypes', [
{
    "ID": 3,
    "name": "故障处理类"   
},{
    "ID": 2,
    "name": "日常运维类"
},{
    "ID": 1,
    "name": "业务知识类"
},{
    "ID": 5,
    "name": "管理知识类"
},{
    "ID": 6,
    "name": "行业知识类"
},{
    "ID": 4,
    "name": "其他"
}
]);