ibuickApp.directive('sgmGaodeMap', function ($compile) {
	return {
		restrict: 'A',
		template: '<div id="gaodemap">',
		replace:true,
		scope: {
			center: "=",          
			markers: "=",         
			divWidth: "=",          
			divHeight: "=",
			teleClicked: "&",
			destenation: "=",
			pathlist: "=",
			zoomin: "=",
			zoomout: "=",
			marktype: "="
		},
		link: function (scope, element, attrs) {
			
			var pathcolor = new Array(3);
			pathcolor[0] = "#1767e7";
			pathcolor[1] = "#FF3300";
			pathcolor[2] = "#009933";
			// 设置显示高度和宽度
			element.css("height", scope.divHeight+"px");
			element.css("width",  scope.divWidth+"px");
			
			var map = null;
			// 检查更新
			var arr = ["markers"];
			for (var i = 0, cnt = arr.length; i < arr.length; i++) {
				scope.$watch(arr[i], function () {
					if (--cnt <= 0) {
						updateControl();
					}
				});
			}
			
			scope.$on('$destroy', function() {
            	map = null;
            	//delete map;
            });
			
			scope.$watch("pathlist", function () {
                if (map && scope.pathlist) {
                	updatePath();                	
                }
            });
			
			scope.$watch("center", function () {
                if (map && scope.center) {
                	//map.setCenter(new AMap.LngLat(scope.center.longitude, scope.center.latitude));
                }
            });
			
			scope.$watch("zoomin", function () {
                if (map && scope.zoomin) {
                	map.zoomIn();
                }
            });
			
			scope.$watch("zoomout", function () {
                if (map && scope.zoomout) {
                	if(map.getZoom() < 7 ) {
                		return;
                	}
                	map.zoomOut();
                }
            });

			function updateControl() {
				var options = {
						center: new AMap.LngLat(116.404,39.915),
						divid:"gaodemap"
				};
				
				console.log(scope.center);
				
				if (scope.center) {
					options.center = new AMap.LngLat(scope.center.longitude, scope.center.latitude);
				}

				// 创建地图
				// map = iBuickData.map;
				if(map == null) {
					map = new AMap.Map(options.divid, {center:options.center, doubleClickZoom: true});
					//map = iBuickData.map;
				}
				map.setCenter(new AMap.LngLat(scope.center.longitude, scope.center.latitude));
				//map.setZoom(14);
				map.clearMap();
				updateMarkers();
				//updatePath();
				//map.setFitView();
			};
			
			function updateMarkers() {
				//$log.log(scope.markers)
				var iconurl = "assests/images/map/";
				switch(scope.marktype)
				{
				case 1: // dealer
					iconurl += "mapicondealer.png";
				  break;
				case 2: // gasstation
					iconurl += "mapicongasstation.png";
				  break;
				case 3: // parking
					iconurl += "mapiconparking.png";
					break;
				default:
					iconurl += "mapiconcenter.png";
				}
				if(scope.markers == undefined) {
					return;
				}
				for(var marker in scope.markers) {
					var map_marker = new AMap.Marker({                  
						map:map, 
						position: new AMap.LngLat(scope.markers[marker].longitude, scope.markers[marker].latitude),                               
						icon: iconurl,
						visible:true
						});

				   var infoWindow = null;
                   AMap.event.addListener(map_marker,'click',function(){
                	   infoWindow.open(map,map_marker.getPosition());
                   }) ;
                   if (scope.markers[marker].telephone) {
                	   infoWindow = new AMap.InfoWindow({
                		   isCustom:true,
                		   content:createInfoWindow('<span style="font-size:25px;color:white;line-height:30px">'+scope.markers[marker].name+'</span><br /><img src="assests/images/map/maptel.png" style="float:left"><span style="font-size:30px;color:white;line-height:52px;vertical-align:middle">'+scope.markers[marker].telephone+'</span>'),
//                		   size:new AMap.Size(300,0),
//                		   offset:AMap.Pixel(0, -50)
                	   });
                   } else {
                	   infoWindow = new AMap.InfoWindow({
                		   isCustom:true,
                		   content:createInfoWindow('<span style="font-size:25px;color:white;line-height:30px">'+scope.markers[marker].name+'</span>',"<img src='assests/images/map/maptel.png' style='float:left'><span style='font-size:30px;color:white;line-height:52px;vertical-align:middle'>"+scope.markers[marker].telephone+"</span>"),
                		   size:new AMap.Size(300,0),
                		   offset:AMap.Pixel(0, -50)
                	   });
                   };
                   
                   function createInfoWindow(title,content){
                	   var info = document.createElement("div");
                	   var bottom = document.createElement("div"), sharp; 
                	   if(scope.markers[marker].telephone) {
                		   info.className = "mapinfo";
                		   bottom.className = "info-bottom";
                	   }else {
                		   info.className = "mapinfo2";
                		   bottom.className = "info-bottom2";
                	   }
                	   
                	   var top = document.createElement("div");
                	   top.className = "info-top";
                	   var titleD = document.createElement("div");
                	   titleD.innerHTML = title;
                	   var closeX = document.createElement("img");
                	   closeX.src = "assests/images/map/mapclose.png";
                	   closeX.onclick = closeInfoWindow;
                	   closeX.className = "mappopupclose";
                	   top.appendChild(titleD);
                	   info.appendChild(closeX);
                	   info.appendChild(top);
                	   
                	   var topang = angular.element(top);
                	   var clickedItema = topang.find('img')[0];
                	   var clickedItem = angular.element(clickedItema);
                	   
                	   //var clickedItem = angular.element.find('button')[0];
                	   clickedItem.bind('click',function(event){
                		   scope.teleClicked({telephone:scope.markers[marker].telephone});
                	   });
                	                  	     
                	   sharp = document.createElement("img");
                	   sharp.src = "assests/images/map/mapbottom.png";
                	   info.appendChild(bottom);
                	   bottom.appendChild(sharp);                	   
                	   return info;
                   };
                   
                   function closeInfoWindow(){
						map.clearInfoWindow(); 
				   };

				   map.setFitView();
				}
				map.setFitView();
			};
			
			function updatePath() {
				//$log.log(scope.pathlist);
				for(var i=0; i< scope.pathlist.length && i < 3; i++) {
					var path = scope.pathlist[i];
					var xy_array = new Array();
					var arr = new Array();
					if(angular.isArray(path.road)) {
						for(var j=0;j<path.road.length;j++) {
							xy_array[j] = path.road[j].coor;
							var poi_xy_r = angular.fromJson(xy_array[j]);
							for(var k=0; k<poi_xy_r.length; ) {
								arr.push(new AMap.LngLat(poi_xy_r[k], poi_xy_r[k+1]));
								k +=2;
							}
						}
					} else {
						xy_array[0] = path.road.coor;
						var poi_xy_r = angular.fromJson(xy_array[0]);
						for(var k=0; k<poi_xy_r.length; ) {
							arr.push(new AMap.LngLat(poi_xy_r[k], poi_xy_r[k+1]));
							k +=2;
						}
					}
					
					line = new AMap.Polyline({
						map: map,
						path: arr,
						strokeColor: pathcolor[i],
						strokeOpacity: 1.0,
						strokeWeight: 6,
						strokeStyle:"dashed", 
						strokeDasharray: [10, 5]
					});
				}
				
				var start = new AMap.LngLat(scope.center.longitude, scope.center.latitude);
				start_marker = new AMap.Marker({
					map: map,
					position: start,
					icon: "assests/images/map/mapiconstart.png",
					offset: new AMap.Pixel(-10, -55)
				});

				var end = new AMap.LngLat(scope.destenation.longitude, scope.destenation.latitude);
				end_marker = new AMap.Marker({
					map: map,
					position: end,
					icon: "assests/images/map/mapiconend.png",
					offset: new AMap.Pixel(-10, -55)
				});
				map.setFitView();
			};
		}
	};
});