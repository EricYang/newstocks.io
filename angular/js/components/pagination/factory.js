"use strict";angular.module("myApp").factory("pagination",function(){var r,a={maxSize:10,bigTotalItems:100,bigCurrentPage:1,setPage:function(){console.log("page changed by input",r.tempBigCurrentPage),r.tempBigCurrentPage=Math.floor(Number(r.tempBigCurrentPage)),r.tempBigCurrentPage<=r.numPages&&1<=r.tempBigCurrentPage&&(console.log("page changed level2",r.tempBigCurrentPage),r.bigCurrentPage=r.tempBigCurrentPage),r.tempBigCurrentPage=""}};return{init:function(e,t,g){return a.bigTotalItems=t||a.bigTotalItems,a.bigCurrentPage=g||a.bigCurrentPage,a.numPages=Math.ceil(a.bigTotalItems/a.maxSize),r=e,_.extend(e,a)}}});