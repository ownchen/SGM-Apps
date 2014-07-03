var Degaokey = "ua1o1uGofxIMAX9KY36rO2UOd0rCTPIrXCGkfD7Q";
//本接口查询逆地理编码 
//授权访问
//JavaAPI SearchRoute demo
var mapObj, toolbar, overview, scale;
var date, startTime;
var currentLine;

function mapInit() {
	var opt = {
	    center: new AMap.LngLat(Utility.currentPoint.lng, Utility.currentPoint.lat),
	    doubleClickZoom: true,
	    dragEnable: true,
	    level:13,
	};
	mapObj = new AMap.Map("GaodeMap", opt);
	//AMap.Conf.network = 1;
	//plugin "AMap.ToolBar",
	mapObj.plugin([ "AMap.OverView", "AMap.Scale"], function () {
		overview = new AMap.OverView();
		mapObj.addControl(overview);
		scale = new AMap.Scale();
		mapObj.addControl(scale);
	});
}

function getCityName(longitude, latitude,func) {
    var param = new Array();
    param.push(longitude);
    param.push(latitude);

    var url = new Array();
    url.push("http://telematics.autonavi.com/ws/mapapi/geo/reversecode");
    url.push("?output=json");
    url.push("&channel=gm_shanghai");
    url.push("&longitude=" + longitude);
    url.push("&latitude=" + latitude);
    url.push("&sign=" + keywordencoding(param));
    console.log("sign=" + keywordencoding(param));
    
    $.ajax({
        method:"post",
        url: url.join(""),
        success: function (data) {
            console.log(data);
            var cityName = data.ats.city.split("市");
            if(cityName[0]!=""){
             	if(Utility.currentLocationCity!=cityName[0]){
             		Utility.currentLocationCity = cityName[0];
             		Utility.currentSearchCity = Utility.currentLocationCity;
             		$("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
             		DianPing.getRegion(function(){
            			//callback func
            		},Utility.currentLocationCity);
             	};
         	}else{
         		//don't find any city
         		Controler.popUp_bg(Popup.noCity);
         	}
            Controler.preloadLayerHide();
            typeof func=="function"&&func();
        },
        //timeout: 10000,
        complete: function (jqXHR, status) {
            //console.log("ajaxCompleteStatus:" + status);
        },
    });        
};

function getRouthPathInfo(func,startPoint,endPoint){
	//url:http://telematics.autonavi.com/ws/mapapi/routing/ 
    var param = new Array();
    var url = new Array();
    url.push("http://telematics.autonavi.com/ws/mapapi/routing");
    url.push("?output=json");
    url.push("&channel=gm_shanghai");
    url.push("&fromX=" + startPoint.lng);
    param.push(startPoint.lng);
    url.push("&fromY=" + startPoint.lat);
    param.push(startPoint.lat);
    url.push("&toX=" + endPoint.lng);
    param.push(endPoint.lng);
    url.push("&toY=" + endPoint.lat);
    param.push(endPoint.lat);
    url.push("&coor_need=true");
    url.push("&sign=" + keywordencoding(param));
    
    $.ajax({
        method: "post",
        url: url.join(""),
        success: function (data) {
            console.log(data);
            //typeof func == "function" && func(currentData);
            //get City
            //routeChangeSearchXY_CallBack(data,startPoint,endPoint);
            routeChangeSearchInfo(data);
            //routeChangeSearchXY_CallBack(data,startPoint,endPoint);
            typeof func=="function"&&func();
        },
        //timeout: 10000,
        complete: function (jqXHR, status) {
            console.log("ajaxCompleteStatus:" + status);
        },
    });
};
var CurrentPathInfo={
	data:"",
	startPoint:"",
	endPoint:"",
};
function getRouthPath(func,startPoint,endPoint) {
    //url:http://telematics.autonavi.com/ws/mapapi/routing/ 
	
    var param = new Array();
    var url = new Array();
    url.push("http://telematics.autonavi.com/ws/mapapi/routing");
    url.push("?output=json");
    url.push("&channel=gm_shanghai");
    url.push("&fromX=" + startPoint.lng);
    param.push(startPoint.lng);
    url.push("&fromY=" + startPoint.lat);
    param.push(startPoint.lat);
    url.push("&toX=" + endPoint.lng);
    param.push(endPoint.lng);
    url.push("&toY=" + endPoint.lat);
    param.push(endPoint.lat);
    url.push("&coor_need=true");
    url.push("&sign=" + keywordencoding(param));
    
    $.ajax({
        method: "post",
        url: url.join(""),
        success: function (data) {
            console.log(data);
            CurrentPathInfo.data = data;
            CurrentPathInfo.startPoint = startPoint;
            CurrentPathInfo.endPoint = endPoint;
            //typeof func == "function" && func(currentData);
            //get City //Update the current Point icon;
            Utility.flagModel();
            //if(!Utility.hideMap){
            	Controler.preloadLayerHide();
            	Controler.showbox(new GaodeMapBox(function(){
		            routeChangeSearchXY_CallBack(CurrentPathInfo.data,CurrentPathInfo.startPoint,CurrentPathInfo.endPoint);
		            typeof func=="function"&&func();
            	}));
        },
        //timeout: 10000,
        complete: function (jqXHR, status) {
            console.log("ajaxCompleteStatus:" + status);
        },
    });
}


//设置地图中心点，此方法会重新加载一次地图
function setCenter(lng,lat) {
    mapObj.setCenter(new AMap.LngLat(lng, lat));
}

//添加点覆盖，设置点
function addCurrentMarker(lng, lat) {
    //构建点对象
    var marker = new AMap.Marker({
        map: mapObj,
        position: new AMap.LngLat(lng, lat), //基点位置
        icon: "static/img/icons_1.png", //marker图标，直接传递地址url
        offset: { x: -55, y: -5 }, //相对于基点的位置
	    imageOffset: new BMap.Size(-248, -1860),
    });
    mapObj.setCenter(marker.getPosition());
}


function routeSearch() {
    this.routeSType = "s"; //起始点  
    this.cityname = "";
    this.start_x = "";
    this.start_y = "";
    this.start_name = "";
    this.start_address = "";
    this.start_tel = "";
    this.start_pid = "";
    this.start_citycode = "";
    this.start_cityname = "";
    this.start_detailLink = "";
    this.start_type = "";
    this.end_x = "";
    this.end_y = "";
    this.end_name = "";
    this.end_address = "";
    this.end_tel = "";
    this.end_pid = "";
    this.end_citycode = "";
    this.end_cityname = "";
    this.end_detailLink = "";
    this.end_type = "";
    this.x_array;
    this.y_array;
    this.x_c_array;
    this.y_c_array;
    this.xy_array;
    this.xy_c_array;
    this.start_marker;
    this.end_marker;
    this.line;
    this.current_section;
}
var routeS = new routeSearch();


function routeChange_search_CallBack(data) {
    document.getElementById("textUniqId").value = data.uniqid;
    if (routeS.routeSType == "s") {
        if (data.list == null) {
            document.getElementById("result").innerHTML = "起点未查找到任何结果!<br />建议：<br />1.请确保所有字词拼写正确。<br />2.尝试不同的关键字。<br />3.尝试更宽泛的关键字。";
        } else {
            routeS.start_x = data.list[0].x;
            routeS.start_y = data.list[0].y;
            routeS.start_name = data.list[0].name;
            routeS.start_address = data.list[0].address;
            routeS.start_tel = data.list[0].tel;
            routeS.start_type = data.list[0].type;
            routeS.start_pid = data.list[0].pguid;
            routeS.start_citycode = data.list[0].citycode;
            routechange_EndSearch();
        }
    } 

}
function routeChangeSearchInfo(data){
	 if (data.ats.message == "Successful.") {
		 if (data.ats.path_list.path.length > 0) {
	        	Utility.searchStatus = true;
	        	var dis = data.ats.distance.split(",")[0];
	            var time = parseInt((parseInt(data.ats.drivetime.split(",")[0])/60));
	            $("#distanceInfo").html('<span class="dTitle">距离：</span>'+dis
                		+'&nbsp;&nbsp;驾车约'+time+"分钟");
		 }
	 }
};

var arr = new Array();
function routeChangeSearchXY_CallBack(data,startPoint,endPoint) {
    mapObj.clearMap();
    //var resultStr = "";
    //var route_count = data.count;
    //var road_length = 0;

    routeS.start_x = startPoint.lng;
    routeS.start_y = startPoint.lat;
    routeS.end_x = endPoint.lng;
    routeS.end_y = endPoint.lat;
    if (data.ats.message == "Successful.") {

        var overlays = ['start_marker', 'end_marker', 'line', 'current_section'];
        for (var i = 0; i < overlays.length; i++) {
            if (routeS[overlays[i]]) {
                routeS[overlays[i]].setMap(null);
                routeS[overlays[i]] = null;
            }
        }
        routeS.xy_array = new Array();

        if (data.ats.path_list.path.length > 0) {
        	Utility.searchStatus = true;
        	//var pts = transit.getResults().getPlan(0).getRoute(0).getPath();
            var dis = data.ats.distance.split(",")[0];
            var time = parseInt((parseInt(data.ats.drivetime.split(",")[0])/60))+"分钟";
            $($(".title_map span")[0]).html(time);
            $($(".title_map span")[1]).html(dis);
            $("#noticeBarContent").html('全程:<span>'+dis+'</span><br>时间:<span>'+time+'</span>');
            var htmlStr = new Array();
            var road = data.ats.path_list.path[0].road;
            if(road instanceof Array){
            	for (var i = 0; i < road.length; i++) {
            		routeS.xy_array[i] = road[i].coor; //每条线路的坐标
                    var nextAddress = "";
                    if (road[i + 1]) {
                        nextAddress = "进入<span style='color:#eb793c'>" + road[i + 1].name+"</span>";
                    }
                    htmlStr.push("<li>" + (i + 1) + "."+ road[i].text.replace("行驶","行驶<strong>").replace("米","</strong>米").replace("公里","</strong>公里") + nextAddress.replace("进入", "进入<span style='color:#eb793c'>") + "</span></li>");
                    //var allover = new Array();
                    var roadStr = road[i].coor.replace("[", "");
                    roadStr = roadStr.replace("]", "");
                    roadStr = roadStr.replace(/ /g, "");
                    var poi_xy_r = roadStr.split(",");

                    pushArrayPosition();
                    function pushArrayPosition(){
                        if(poi_xy_r.length>0){
                            arr.push(new AMap.LngLat(poi_xy_r[0].trim(), poi_xy_r[1].trim()));
                            poi_xy_r.splice(0, 2);
                            pushArrayPosition();
                        }
                    }
            	}
            }else{
            	routeS.xy_array[0] = road.coor; //每条线路的坐标

                var nextAddress = "";
                nextAddress = "进入<span style='color:#eb793c'>" + road.name+"</span>";
                htmlStr.push("<li>" + (0 + 1) + "."+ road.text + "<span style='color:#eb793c'>"+nextAddress + "</span></li>");
                //var allover = new Array();
                var roadStr = road.coor.replace("[", "");
                roadStr = roadStr.replace("]", "");
                roadStr = roadStr.replace(/ /g, "");
                var poi_xy_r = roadStr.split(",");

                pushArrayPosition();
                function pushArrayPosition(){
                    if(poi_xy_r.length>0){
                        arr.push(new AMap.LngLat(poi_xy_r[0].trim(), poi_xy_r[1].trim()));
                        poi_xy_r.splice(0, 2);
                        pushArrayPosition();
                    }
                }
        	}
            
            

            $("#guidContent ul").html(htmlStr.join(""));
            $(".endLocation").html(Utility.currentShopInfo.address);
            		//这边加了setTimeout，不加的时候画路劲的时候直接卡死
            		setTimeout(function(){
            			var start = new AMap.LngLat(routeS.start_x, routeS.start_y);
                        routeS.start_marker = new AMap.Marker({
                            map: mapObj,
                            position: start,
                            icon: "static/img/startPoint.png",
                            offset: new AMap.Pixel(-14, -36)
                        });
                        var end = new AMap.LngLat(routeS.end_x, routeS.end_y);
                        routeS.end_marker = new AMap.Marker({
                            map: mapObj,
                            position: end,
                            icon: "static/img/endPoint.png",
                            offset: new AMap.Pixel(-14, -36)
                        });
                        routeS.line = new AMap.Polyline({
                            map: mapObj,
                            path: arr,
                            zIndex:1,
                            strokeColor: "#003366",
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                            strokeStyle:"dashed",
                            strokeDasharray: [10, 0]
                        });
                        currentLine = arr;
                        arr = new Array();
                        //mapObj.setFitView([routeS.start_marker,routeS.end_marker]);
                        mapObj.setFitView();
                        
            		});
//            	}));
//            }else{
//            	$("#distanceInfo").html('<span class="dTitle">距离：</span>'+dis
//                		+'&nbsp;&nbsp;驾车约'+time+"分钟");
//            }
        }

    }else {
    	Utility.searchStatus = false;
    	if(!Utility.hideMap){
        	if(!Utility.searchStatus){
        		$("#noSearchResult_popup").css("display","block");
    			$("#alertpopup").css("display","block");
    			$("#noResult_yes").mouseup(function(){
    				$("#noSearchResult_popup").css("display","none");
        			$("#alertpopup").css("display","none");
        			 Controler.hidebox();
    			});
        	}
        	Controler.showbox(new GaodeMapBox());
        }
        //resultStr = "没有找到搜索结果,请确保关键字是否正确。";
    }
}

function keywordencoding(param) {
    var str = new Array();
    for (i in param) {
        str.push(param[i]);
    }
    str.push("@");
    str.push(Degaokey);
    var codeingStr = str.join("");
    codeingStr = window.md5(codeingStr).toString().toLocaleUpperCase();
    return codeingStr;
}