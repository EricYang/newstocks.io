angular.module("myApp.modal",[]).factory("modal",["$uibModal",function(o){return{newChartModal:function(t,a,e){o.open({animation:!0,templateUrl:"angular/js/components/modal/chart.html",controller:["$scope",function(t){t.labels_chart=[3,4,3,2,2],t.data_chart=[[2,3,21,3,2],[3,4,3,2,3]],t.datasetOverride=[{label:"Line chart",borderWidth:3,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",type:"line"},{label:"Bar chart",borderWidth:1,type:"bar"}],t.labels_chart=a.labels_chart,t.data_chart=a.data_chart,t.name_chart=a.name_chart,t.desc_chart=a.desc_chart}],size:t,resolve:{title:function(){return"系統訊息"}}}).result.then(function(t){e(t)},function(){console.log("Modal dismissed at: "+new Date)})},newModal:function(t,n,a){o.open({animation:!0,templateUrl:"angular/js/components/modal/text.html",controller:["$scope","$uibModalInstance","title",function(t,a,e){t.title=e,t.name=n.name,t.text=n.text,t.array=n.array,t.close=function(){a.dismiss("cancel")}}],size:t,resolve:{title:function(){return"系統訊息"}}}).result.then(function(t){a(t)},function(){console.log("Modal dismissed at: "+new Date)})}}}]);