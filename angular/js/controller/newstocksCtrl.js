"use strict";var getUrlParameter=function(e){for(var t,r=window.location.search.substring(1).split("&"),n=0;n<r.length;n++)if((t=r[n].split("="))[0]===e)return void 0===t[1]||decodeURIComponent(t[1])},dateToString=(e,t="")=>e instanceof Date?e.toISOString().replace("-",t).split("T")[0].replace("-",t).substr(0,10):e,takePart2=(e,t,r)=>{for(var n=e.slice(Math.max(e.length-t,0)),i=[],a=t/r,s=0;s<r;s++){i[s]=[];for(var m=0;m<a;m++)i[s].push(n.shift())}for(s in i)i[s]=(i[s].reduce((e,t)=>e+t)/i[s].length).toFixed(2);return i},checkRise=n=>{var e,i=0,a=0,s="-";return n.map((e,t,r)=>{t+1<=n.length&&(e>r[t+1]&&(a+=1,t==n.length-2&&(s="down")),e<r[t+1]&&(i+=1,t==n.length-2&&(s="rise")))}),e=Number((n[n.length-1]-n[0])/n[0]*100).toFixed(2),[i,a,s,e]};function getDirectionByXmin(e,t){e.slice(Math.max(e.length-t,0)).reduce((e,t)=>e+t);var r=checkRise(takePart2(e,t,5)),n=r[0]-r[1],e=r[2],t="➔";return 4==n?t="⬆":2==n?t="rise"==e?"➚":"↗":-2==n?t="down"==e?"➘":"↘":-4==n&&(t="⬇"),r[3]+" % "+t}angular.module("myApp").controller("newstocksCtrl",["$scope","$rootScope","modal","cfpLoadingBar","webService",function(m,e,a,t,n){m.titles=[{id:"rise",name:"漲跌",visible:!0,type:"percentage"},{id:"best_time",name:"最佳時機",visible:!0,type:"percentage"},{id:"range_low_current",name:"低x現價差",visible:!1,type:"percentage"},{id:"range_high_current",name:"高x現價差",visible:!1,type:"percentage"},{id:"range_high_open",name:"高x昨價差",visible:!1,type:"percentage"},{id:"current_price",name:"股價",visible:!0,type:"number"},{id:"volumn",name:"成交量",visible:!0,type:"number"},{id:"id",name:"代號",visible:!0,type:"number"},{id:"name",name:"名字",visible:!0,type:"string"},{id:"price5m-1h",name:"5分鐘圖/1h",visible:!1,type:"chart",chartType:"5m-1h",interval:1},{id:"price5m-2h",name:"5分鐘圖/2h",visible:!1,type:"chart",chartType:"5m-2h",interval:5},{id:"volumn30m",name:"30分鐘成交量",visible:!1,type:"chart",chartType:"30m",interval:1},{id:"min60",name:"1小時漲幅",visible:!1,type:"number"},{id:"min20",name:"20分鐘漲幅",visible:!1,type:"number"},{id:"min10",name:"10分鐘漲幅",visible:!1,type:"number"},{id:"volumn30",name:"30分鐘內量增",visible:!1,type:"number"},{id:"volumn10",name:"10分鐘內量增",visible:!1,type:"number"},{id:"volumn1",name:"1分鐘內量增",visible:!1,type:"number"},{id:"yest_avg",name:"昨日均價",visible:!1,type:"number"},{id:"current_avg",name:"今日均價",visible:!1,type:"number"},{id:"remark",name:"備註",visible:!0,type:"string"},{id:"low",name:"日最低",visible:!1,type:"number"},{id:"high",name:"日最高",visible:!1,type:"number"}],m.getNumber=function(e){return parseInt(e[m.sort.column])},m.remark=[],m.sort={column:"rise",descending:!0},m.editKey="id",m.partOfTime=0,m.changeSorting=function(e){var t=m.sort;t.column==e?t.descending=!t.descending:(t.column=e,t.descending=!1)},m.setTitle=r=>{m.titles.map((e,t)=>{r.id==e.id&&(m.titles[t].visible=!m.titles[t].visible)})},m.getAnnouncementJson=function(){var s=new Date;n.get("https://resource.aaa4u.info/stocks/newstocks/announcement.json",{},function(e){var t,r,n,i=[],a=e.data;for(t in a)a[t]&&(n=a[t][1].split("/"),r=Number(n[1]),n=Number(n[2]),s.getUTCMonth()+1<=r&&s.getUTCDate()<=n&&(n="("+a[t][3]+" "+a[t][2]+" "+a[t][4]+")",i.push(n),-1!=m.ids.indexOf(a[t][3])&&(m.remark[a[t][3]]=a[t][4])));m.announcement=i})},m.findHistVoulumn=e=>{var r=e.volume,n=e.price,i=(e.date,[]),a=0;return n.map((e,t)=>{n[t+1]&&7<=(n[t+1]-e)/e*100&&(i.push(r[t+1]),t=Number(r[t+1].replace(/,/g,"")),a+=t)}),a=Math.floor(a/i.length/1e3),[Math.floor(.4*a),Math.floor(.8*a),a]},m.handleHist=function(e){m.thenewstocks=[];var t,r=dateHandler.dateToStr(m.dt,"/",!0);for(t in e)if(e[t]){var n=e[t].date.indexOf(r);-1==(n=-1==n?e[t].price.length-1:n)&&(n=0),1<=e[t].price.length&&n<=30&&m.thenewstocks.push(t);for(var i=0;i<n;i++)e[t].max||(e[t].max=0),e[t].low||(e[t].low=1e7),e[t].max<Number(e[t].price[i])&&(e[t].max=Number(e[t].price[i])),e[t].low>Number(e[t].price[i])&&(e[t].low=Number(e[t].price[i]));e[t].gap_volumn=m.findHistVoulumn(e[t])}m.hist=e},m.getHistJson=function(t){n.get("https://resource.aaa4u.info/stocks/newstockHist.json",{},function(e){m.handleHist(e),t&&t()})},m.setChart=(e,t,r,n)=>{m.name_chart=t,m.desc_chart=r,m.data_chart=e,m.labels_chart=[];var i=(new Date).getTime();e.map((e,t)=>{t=new Date(i-6e4*n*t);m.labels_chart.push(t.getHours()+":"+t.getMinutes())});e={name_chart:t,desc_chart:r,data_chart:e,labels_chart:m.labels_chart.reverse()};a.newModal("lg",e,()=>{})},m.getTimePartNumber=()=>{new Date;var e=(new Date).getHours();return 9==e?0:10<=e&&e<=12?1:2},m.init=()=>{m.handleHist(m.hist),m.getRemindData(()=>{m.getData()})},m.getRemindData=r=>{var e=dateToString(m.dt,"-");n.get("https://resource.aaa4u.info/stocks/newstocks/"+e+"-remind.json",{},function(e){if("error"!=(m.reminddata=e)&&e)for(var t in e)m.remark[t]=Object.values(e[t]).join(",");r&&r()})},m.deleteTimer=()=>{m.timer&&(window.clearInterval(m.timer),m.timer=null)},m.ids=[],m.hasInit=!1,m.getData=()=>{var r=dateToString(m.dt,"-");console.log(r),m.partOfTime=m.getTimePartNumber(),n.get("https://resource.aaa4u.info/stocks/newstocks/"+r+".json",{},function(e){if("error"!=e&&e){m.alldata=m.tidy(e),m.origindata=e;const t=new Date;e=t.getHours();!m.timer&&9<=e&&e<=15&&(m.timer=window.setInterval(()=>{m.init()},6e4)),dateToString(t,"-")!==r&&m.deleteTimer()}else m.deleteTimer()})};m.tidy=s=>{var e=Object.keys(s).map(r=>{m.hasInit||m.ids.push(r);var e=s[r].volumn_30mins,t=e[e.length-1]-e[0],n=e[e.length-1]-e[e.length-10],i=e[e.length-1]-e[e.length-2],e=JSON.parse(JSON.stringify(s[r].price));e.sort(function(e,t){return e-t});e=e.shift();s[r].low=e,s[r].open_price=s[r].price[0],s[r].remark=m.remark[r]||"",s[r].current_price=s[r].price[s[r].price.length-1],s[r].price10=s[r].price.slice(s[r].price.length-10),s[r]["price5m-1h"]=takePart2(s[r].price,60,12),s[r]["price5m-2h"]=takePart2(s[r].price,120,24),s[r].volumn30m=s[r].volumn_30mins.map((e,t)=>0!=t?(e-s[r].volumn_30mins[t-1])/1e3:0),s[r].volumn=Number(s[r].volumn)/1e3,s[r].volumn30=t/1e3,s[r].volumn10=n/1e3,s[r].volumn1=i/1e3,s[r].min10=getDirectionByXmin(s[r].price,10),s[r].min20=getDirectionByXmin(s[r].price,20),s[r].min60=getDirectionByXmin(s[r].price,60),s[r].range_low_current=(s[r].current_price-e)/e*100,s[r].range_high_current=(s[r].high-s[r].current_price)/s[r].high*100,s[r].range_high_open=(s[r].high-s[r].open_price)/s[r].high*100,s[r].rise=(s[r].current_price-s[r].yest_avg)/s[r].yest_avg*100,s[r].best_time=8*(s[r].range_low_current-s[r].rise);let a=.3;15<=s[r].current_price&&(a=1),60<=s[r].current_price&&(a=2),150<=s[r].current_price&&(a=3),250<=s[r].current_price&&(a=4),400<=s[r].current_price&&(a=5),800<=s[r].current_price&&(a=6);n=Number(s[r].min60.split(" ")[0]),Number(s[r].min20.split(" ")[0]),i=Number(s[r].min10.split(" ")[0]),e=i*(s[r].volumn10*a/2);return s[r].best_time+=7*n,s[r].best_time+=e,3<=s[r].range_high_current&&s[r].range_high_current<4.2&&9<=s[r].range_high_open&&0<i?s[r].best_time+=40:s[r].range_high_current<2?s[r].best_time+=20:s[r].range_high_current<3&&(s[r].best_time+=10),""!=s[r].remark&&(s[r].best_time+=10),m.hist[r]&&(s[r].high>=m.hist[r].max&&(s[r].best_time+=20,s[r].remark="*創新高 \n"+s[r].remark),s[r].volumn>=m.hist[r].gap_volumn[m.partOfTime]&&(s[r].best_time+=15,s[r].remark="*創新量 \n"+s[r].remark)),9<=s[r].range_high_open&&s[r].range_high_current<=4&&s[r].current_price>s[r].current_avg&&(s[r].remark="!注意股:今日起漲10% \n"+s[r].remark),(s[r].rise<0||s[r].current_avg>s[r].current_price)&&(s[r].best_time=0),s[r].volumn<=10&&(s[r].notShow=!0),s[r]});return 0<m.ids.length&&(m.hasInit=!0),m.announcement||m.getAnnouncementJson(),e},m.getHistJson(()=>{m.init()}),m.today=function(){m.dt=new Date},m.today(),m.clear=function(){m.dt=null},m.popup1={opened:!1},m.open1=function(){m.popup1.opened=!0},m.dateOptions={dateDisabled:function(e){var t=e.date;return"day"===e.mode&&(0===t.getDay()||6===t.getDay())},formatYear:"yy",maxDate:new Date,minDate:new Date("2021/05/01"),startingDay:1},m.$watch("dt",()=>{m.init()})}]).controller("newstockCtrl",["$scope","$stateParams","$rootScope","modal","cfpLoadingBar","webService",function(e,t,r,n,i,a){e.id=Number(t.id)}]);