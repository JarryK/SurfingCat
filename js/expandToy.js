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
				toastr.options = {
					closeButton: true,
					debug: false,
					progressBar: true,
					positionClass: "toast-top-center",
					showEasing: "swing",  
       				hideEasing: "linear",  
        			showMethod: "fadeIn",  
        			hideMethod: "fadeOut" 
        		};
				var url = 'https://api.btstu.cn/yan/api.php'
				$.sendAjax(url,{ 
					charset:"utf-8",
					encode:"json"
				}).done(function(data){
					if (data.text != null && data != '') {
						toastr.info(data.text);
						$('toast toast-info').style.width = '500px'  
					}else{
						toastr.info('今天没有毒鸡汤！');  
					}
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
	var _init = function (mixture_string) {
		return $.Deferred(function (defer) {
			toy_globalsetting($.extend(true,eToy,utils_functions)); // 全局功能设置
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