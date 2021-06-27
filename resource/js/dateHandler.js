var dateHandler={}
function Appendzero(obj)
{
    if(obj<10) return "0" +""+ obj;
    else return obj;

}
window.onload = function (e) {

dateHandler.afterDay=function(d){
        d.setDate(d.getDate()+1);
    return d;
}
dateHandler.lastDay=function(d){
        d.setDate(d.getDate()-1);
    return d;
}
dateHandler.lastMonth=function(d){
        d.setMonth(d.getMonth()-1);
    return d;
}
dateHandler.lastWeek=function(d){
        d.setDate(d.getDate() - d.getDay());
    return d;
}
dateHandler.lastSunday=function(d){
	d.setDate(d.getDate()-1);
        d.setDate(d.getDate() - d.getDay());
    return d;
}

dateHandler.lastMonth=function(d){
	d.setMonth(d.getMonth()-1);
        d.setDate(1);
    return d;
}
dateHandler.lastQuarter=function(d){
        var now_month=d.getMonth()+1;
        if(now_month < 4){
        d.setMonth(0);
        }else if(now_month >= 4 && now_month < 7){
        d.setMonth(3);
        }else if(now_month >= 7 && now_month < 10){
        d.setMonth(6);
        }else if(now_month >= 10){
        d.setMonth(9);
        }
        d.setDate(1);
    return d;
}
dateHandler.dateToStrForDaily=function(d,sym){
    if(sym){
        return d.getFullYear() +sym+ Appendzero(d.getMonth()+1) +sym+ Appendzero(d.getDate()-1);
    }else{
        return d.getFullYear() +'/'+ Appendzero(d.getMonth()+1) +'/'+ Appendzero(d.getDate()-1);
    }
}
dateHandler.dateToString= (_date,flag='')=>{                                                                                                                                                                             
if(_date instanceof Date){
//return _date.getFullYear()+"/"+Number(_date.getMonth()+1)+"/"+_date.getDate()
return _date.toISOString().replace('-', flag).split('T')[0].replace('-', flag).substr(0,10)
}else{
return _date
}
}
dateHandler.dateToStrFree=function(d,sym,isRepublicEra){
var _sym="/"
	if(sym!=null)_sym=sym;
  if(isRepublicEra){
        return Number(d.getFullYear()-1911) +_sym+ Appendzero(d.getMonth()+1) +_sym+ Appendzero(d.getDate());
  }else{
        return d.getFullYear() +_sym+ Appendzero(d.getMonth()+1) +_sym+ Appendzero(d.getDate());
        }
}
dateHandler.dateToStr=function(date,sym,isRepublicEra,format){
var _sym="/",y='',m='',d='',_date
	if(sym!=null)_sym=sym;
if(date instanceof Date){
_date=date
}else{
_date=new Date(date)
}
  y=_date.getFullYear()
  m=Appendzero(_date.getMonth()+1)
  d=Appendzero(_date.getDate())
  if(isRepublicEra){
        y=Number(y-1911)
        }
        if(format=='m/d')return m+_sym+d;
        if(format=='y')return y
        if(format=='m')return m
        if(format=='d')return d
        
        return y+_sym+m+_sym+d;
}
dateHandler.afterXDay=function(_d,x,sym='/',isRepublicEra,format){
        var ary=[];
        var d=new Date(_d);
        ary.push(this.dateToStr(d,sym,isRepublicEra,format));
        for(var i=1 ;i<x;i++){
                var tomorrow=this.afterDay(d);
                ary.push(this.dateToStr(tomorrow,sym,isRepublicEra,format));
        }
        return ary;
}
dateHandler.lastXDay=function(_d,x,sym='/',isRepublicEra,format){
        var ary=[];
        var d=new Date(_d);
        ary.push(this.dateToStr(d,sym,isRepublicEra,format));
        for(var i=1 ;i<x;i++){
                var lastday=this.lastDay(d);
                ary.push(this.dateToStr(lastday,sym,isRepublicEra,format));
        }
        return ary;
}
dateHandler.lastXWeek=function(_d,x){
        var ary=[];
        var d=new Date(_d);
	if(d.getDay()==0){
		ary.push(_d);
	}
        for(var i=1 ;i<x;i++){
                var lastweek=this.lastSunday(d);
                ary.push(this.dateToStr(lastweek));
        }
        return ary;
}

dateHandler.lastXMonth=function(_d,x){
        var ary=[];
        var d=new Date(_d);
        for(var i=1 ;i<=x;i++){
                var lastmonth=this.lastMonth(d);
                ary.push(this.dateToStr(lastmonth));
        }
        return ary;
}


dateHandler.stringToDate=(str)=>{
let year=str.substr(0,4);
let month=str.substr(4,2);
let day=str.substr(6,2);
return new Date(year,Number(month-1),day)

}

}
