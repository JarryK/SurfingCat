'use strict';
var eToy = (function set_dujitang() {
	var toy_globalsetting = function(){
		// 扩展$能力
		$.extend({
			sendAjax: function(_url,_data,_type){
				var url = _url == "" || _url == null ? "" : _url;
				var data = (typeof _data) == 'object' && _data != null ? _data : undefined;
				// var data = _data;
				var type ="";
				if(_type == 'get' || type == 'post'){
					type = _type;
				}else{
					type = 'get';
				}
				if(type == 'get'){
					var _str = '';
					for(var k in data){
						_str = _str + k + '=' + data[k] + '&';
						
					}
					url =  url + '?' + _str.substr(0,_str.length -1);
					return $.ajax(
						{
							url: url,
							method: type,
						});
				}else{
					return $.ajax(
						{
							url: url,
							method: type,
							data: data,
						});
				}
			}
		})
	};
	var utils_functions = (function(){
		return {
			set_dujitangByID: function (where){
				if (where == '' || where == null) {
					return console.log('set_dujitang-需要指定元素！');
				}
				let _where = document.getElementById(where);
				if (_where == '' || _where == null || _where == undefined) {
					return console.log('set_dujitang-指定元素无效！');
				}
			},
			getDujitang: function(){
				var url = 'https://api.btstu.cn/yan/api.php'
				$.sendAjax(url,{ 
					charset:"utf-8",
					encode:"json"
				}).done(function(data){
					return data;
				}).fail(function(error){
					alert(error)
				});
			},
			getWeather:function(){
				var url = 'https://tianqiapi.com/api';
				$.sendAjax(url,{
					version:'v6',
					appid: '23337874',
					appsecret: 'CO940xCW'
				}).done(function(data){
					console.log(data)
				}).fail(function(error){
					alert(error)
				});
			}
		};
	})();
	var system_config = (function () {
        return {
            formatSeconds: function(value) {
                var theTime = parseInt(value);// 需要转换的时间秒
                var theTime1 = 0;// 分
                var theTime2 = 0;// 小时
                var theTime3 = 0;// 天
                if(theTime > 60) {
                    theTime1 = parseInt(theTime/60);
                    theTime = parseInt(theTime%60);
                    if(theTime1 > 60) {
                        theTime2 = parseInt(theTime1/60);
                        theTime1 = parseInt(theTime1%60);
                        if(theTime2 > 24){
                            //大于24小时
                            theTime3 = parseInt(theTime2/24);
                            theTime2 = parseInt(theTime2%24);
                        }
                    }
                }
                var result = '';
                if(theTime > 0){
                    result = ""+parseInt(theTime)+" 秒 ";
                }
                if(theTime1 > 0) {
                    result = ""+parseInt(theTime1)+" 分 "+result;
                }
                if(theTime2 > 0) {
                    result = ""+parseInt(theTime2)+" 小时 "+result;
                }
                if(theTime3 > 0) {
                    result = " "+parseInt(theTime3)+" 天 "+result;
                }
                return result;
            },
        };
    })();
	var _init = function (mixture_string) {
		return $.Deferred(function (defer) {
			toy_globalsetting($.extend(true,eToy,utils_functions,system_config)); // 全局功能设置
			defer.resolve(); 
		}).promise();
   	};
    return {
    	init: function(){
			if(typeof(jQuery)=="undefined"){
				return console.error("eToy.js init error: jQuery is not imported,eToy.js need imported jQuery");
			}
    		return  _init.apply(eToy, Array.prototype.slice.call(arguments))
    	}
    }
})();
window.onload = function(){eToy.init()}