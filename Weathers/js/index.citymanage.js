function CityManagePage() {
	var URA = new gm.ngi.weathers.userRegionAdpater();
	var RA = new gm.ngi.weathers.regionAdapter();

	var cityManageBoxes = $("#pageBox_cityManager");
	cityManageBoxes.push($("#pageBox_citymanage_add")[0]);
	cityManageBoxes.push($("#pageBox_citymanage_add_country")[0]);
	cityManageBoxes.push($("#pageBox_citymanage_delete")[0]);
	cityManageBoxes.push($("#pageBox_citymanage_searchcity")[0]);

	this.showCityManagePage = function () {
		$("#pageBox_cityManageContainer").show();
		$("#pageBox_forecast").hide();
	};

	$.fn.extend({
		showBox: function () {

			cityManageBoxes.hide();
			$("#li_edit").hide();
			$("#pageBox_citymanage_text").val("");
			$("#pageBox_citymanage_add_country_text").val("");

			$(this).show()
				.find("[jsp]")
				.reInitJsp();
		}
	});

	this.showMyCityPage = function () {
		$("#pageBox_cityManager").showBox();
		$("#pageBox_citymanage_add_country_id").html("");

		$("#li_title").text("我的城市");
		if ($("#ul_cityManager").children(".li_white").length == 0) {
			$("#li_edit").hide();
		} else {
			$("#li_edit").show();
		}


		// TODO: 判断是否有默认城市, 如果有，则隐藏li_bak
		$("#li_back").unbind("click");
		$("#li_back").click(function () {
			gm.ngi.weathers.defaultPage.showForecastPage();
		});
	};

	this.showProvinceListPage = function () {
		$("#pageBox_citymanage_add").showBox();
		$("#li_title").text("省市目录");

		$("#li_back").unbind("click");
		$("#li_back").click(function () {
			gm.ngi.weathers.defaultPage.showMyCityPage();
		});
	};

	this.showCityListPage = function (title) {
		$("#pageBox_citymanage_add_country").showBox();
		$("#li_title").text(title || "城市目录");

		$("#li_back").unbind("click");
		$("#li_back").click(function () {
			gm.ngi.weathers.defaultPage.showProvinceListPage();
		});
		var api = $("#pageBox_citymanage_add_country").find("[jsp]").data("jsp");
		if (api) {
			api.scrollToY(0);
		}
	};

	this.showDeleteCityPage = function () {
		$("#pageBox_citymanage_delete").showBox();
		$("#li_title").text("编辑城市");

		$("#li_back").unbind("click");
		$("#li_back").click(function () {
			gm.ngi.weathers.defaultPage.showMyCityPage();
		});

	};

	this.showSearchCityPage = function () {
		$("#pageBox_citymanage_searchcity").showBox();
		$("#li_title").text("搜索结果");

	};

	function initJsp() {
		$(".cityManager").initJsp(false, 54);
		$(".cityManager2").initJsp(false, 54);
	}

	// 从 City li 元素上解析 ID
	function parseItemIdFromCityElem(cityElem) {
		if (!cityElem || !cityElem.attr("id"))
			return null;

		var id = cityElem.attr("id");
		return id.substring(id.lastIndexOf("_") + 1);

	}

	// 检查行政区域的数据配置，如果本地不存在则下载，正式应用时不需调用。
	function checkAdministrativeDistrict() {
		gm.ngi.weathers.defaultPage.showProgressBox("初始化省份资料中...");

		var list = RA.getProvinces();
		if (!list || list == 0 || list.length == 0)
			RA.generateProvinces();

		list = RA.getProvinces();
		if (list && list.length > 0) {
			list = RA.getRegions(list[0].provinceId);
			if (!list || list == 0 || list.length == 0)
				RA.generateRegions();
		}
		gm.ngi.weathers.defaultPage.closeProgressBox();
	};

	// 渲染省份列表
	function initProvinceBox() {
//		gm.ngi.weathers.defaultPage.showProgressBox("初始化...");
		var list = RA.getProvinces();
		if (list && list.length > 0) {
			var newItem = "";
			for (var p in list) {
				var li = list[p];
				newItem += ("<li id='li_pageBox_citymanage_add_" + li.provinceId + "' class='cityList'><a href='#' class='white'>" + li.provinceName + "</a></li>");
			}
			newItem = $(newItem);
			newItem.appendTo($("#ul_pageBox_citymanage_add"));

		}
//		gm.ngi.weathers.defaultPage.closeProgressBox();
	};

	//加载城市列表
	function initCountryBox(cityid, name) {
		if (!name && cityid && cityid.attr("id")) {
			name = cityid.find("a").html();
			cityid = cityid.attr("id");
			cityid = cityid.substring(cityid.lastIndexOf("_") + 1);
		}
		$("#pageBox_citymanage_add_country_id").html(cityid);
		$("#pageBox_citymanage_add_country_title").html(name);
		var lis = $("#ul_pageBox_citymanage_add_country").children(".cityList");
		if (lis && lis.length > 0)
			lis.remove();
		var list = RA.getRegions(cityid);
		if (list && list.length > 0) {
			var newItem = "";
			for (var p in list) {
				var li = list[p];
				newItem += ("<li id='li_pageBox_citymanage_add_country_" + li.regionId + "' class='cityList'><a href='#' class='white'>" + li.regionName.replace(name + ".", "") + "</a></li>");
			}
			newItem = $(newItem);
			newItem.appendTo($("#ul_pageBox_citymanage_add_country"));

			$("#ul_pageBox_citymanage_add_country").reInitJsp();
		}
	};

	//初始化用户默认城市
	function initMyCityBox() {
		var liList = $("#ul_cityManager").children(".li_white");
		if (liList && liList.length > 0)
			liList.remove();

		liList = $("#ul_pageBox_citymanage_delete").children(".li_white");
		if (liList && liList.length > 0)
			liList.remove();

		list = URA.getAll();
		var isEmpty = !list || list.length == 0;

		if (!isEmpty) {
			var newItem = "";
			var newItem_1 = "";
			for (var p in list) {
				var li = list[p];
				var id = li.regionId;
				var name = li.regionName;
				if (name.indexOf(".") > -1)
					name = li.districtName;
				newItem += ("<li id='li_pageBox_cityManager_" + id + "' class='li_white'><a href='#' class='white'>" + name + "</a></li>");
				newItem_1 += ("<li id='li_pageBox_citymanage_delete_" + id + "' class='li_white'><a href='#' class='white'>" + name + "</a><span id='span_pageBox_citymanage_delete_" + id + "'></span></li>");
			}
			newItem = $(newItem);
			newItem.insertBefore($("#li_cityManager_add"));
			newItem_1 = $(newItem_1);
			newItem_1.appendTo($("#ul_pageBox_citymanage_delete"));

			newItem.bind("click", function () {
				selectCity_clicked($(this));
			});
			newItem_1.find("span").bind("click", function () {
				deleteCity_clicked($(this));
			});
		}
		$("#ul_cityManager").reInitJsp();
	};

	//跳转至城市列表页
	function province_clicked(item) {
		var id = parseItemIdFromCityElem(item);
		if (!id)
			return;

		var name = item.find("a").html();
		initCountryBox(id, name);
		gm.ngi.weathers.defaultPage.showCityListPage(name);
	};

	//添加选中城市为默认，并跳到管理首页
	function city_clicked(item) {
		var id = parseItemIdFromCityElem(item);
		if (!id)
			return;

		var list = URA.getAll();
		var flg = false;
		if (list && list.length > 0)
			for (var p in list)
				if (list[p].regionId == id) {
					flg = true;
					break;
				}
		if (!flg) {
			var region = RA.getRegion(id);
			if (region)
				URA.add(region);
			else {
				//li_pageBox_citymanage_add_click(item);
				return;
			}
		}

		initMyCityBox();
		gm.ngi.weathers.defaultPage.showMyCityPage();
	}

	//移除某个用户默认城市
	function deleteCity_clicked(item) {
		if (!item || !item.attr("id"))
			return;
		var id = item.attr("id");
		id = id.substring(id.lastIndexOf("_") + 1);
		URA.remove(id);
		initMyCityBox();
	};

	// 选择某个城市，进入预报
	function selectCity_clicked(item) {

		var id = parseItemIdFromCityElem(item);
		if (!id)
			return;

		var list = URA.getAll();
		if (!list || list.length == 0)
			return;

		for (var p in list) {
			if (list[p].regionId == id) {
				var region = list[p]; 
				gm.ngi.weathers.defaultPage.currentCity = region;
				URA.setDefault(region);
				gm.ngi.weathers.app.currentRegion = region;
				gm.ngi.weathers.app.regionId = region.regionId;
				gm.ngi.weathers.defaultPage.renderForecast();
				gm.ngi.weathers.defaultPage.showFirstRegion();
				gm.ngi.weathers.defaultPage.showForecastPage();
				break;
			}
		}

	}

	this.search_city = function (keyword) {

		gm.ngi.weathers.defaultPage.showProgressBox("城市搜索中...");
		tracer.begin("search city: " + keyword, "citySearch");
		var cities = [];
		var provinceId = $("#pageBox_citymanage_add_country_id").text();
		if (!provinceId) {
			cities = RA.findRegions(keyword);
		} else {
			var list = RA.getRegions(provinceId);
			if (list && list.length > 0) {
				for (var p in list) {
					if (list[p].regionName.indexOf(keyword) >= 0)
						cities.push(list[p]);
				}
			}
		}
		tracer.end("search city: " + keyword, "citySearch");
		
		var container = $("#ul_pageBox_citymanage_searchcity");
		$("#pageBox_citymanage_searchcity .i_citySearch").val(keyword);
		container.children().remove();
		if (!cities || cities.length == 0) {
			tracer.info("not found: " + keyword, "citySearch");
			var str = ("<li class='cityList'><a href='#' class='white'>未找到匹配的城市</a></li>");
			var newItem = $(str);
			container.append(newItem);
		} else {
			tracer.info("found " + cities.length + " match items: " + keyword, "citySearch");
			for (var p in cities) {
				var id = cities[p].regionId;
				var name = cities[p].regionName;
				var str = ("<li id='li_pageBox_citymanage_searchcity_country_" + id + "' class='cityList'><a href='#' class='white'>" + name + "</a></li>");
				var newItem = $(str);
				container.append(newItem);
				newItem.bind("click", function () {
					city_clicked($(this));
				});
			}
		}

		gm.ngi.weathers.defaultPage.showSearchCityPage();
		gm.ngi.weathers.defaultPage.closeProgressBox();
	};
	
	// 如果搜索结果只有一个，则直接选择并进入我的城市列表页
	// 仅用于启动
	this.geosearch_city = function (keyword) {

		gm.ngi.weathers.defaultPage.showProgressBox("城市搜索中...");

		var cities = [];
		var provinceId = $("#pageBox_citymanage_add_country_id").text();
		if (!provinceId) {
			cities = RA.findRegions(keyword);
		} else {
			var list = RA.getRegions(provinceId);
			if (list && list.length > 0) {
				for (var p in list) {
					if (list[p].regionName.indexOf(keyword) >= 0)
						cities.push(list[p]);
				}
			}
		}

    	if (cities && cities.length == 1){
    		URA.add(cities[0]);
    		URA.setDefault(cities[0]);
			initMyCityBox();
			gm.ngi.weathers.defaultPage.showMyCityPage();
    	} else {
    		var container = $("#ul_pageBox_citymanage_searchcity");
    		$("#pageBox_citymanage_searchcity .i_citySearch").val(keyword);
    		container.children().remove();
    		if (!cities){
    			var str = ("<li class='cityList'><a href='#' class='white'>未找到匹配的城市</a></li>");
    			var newItem = $(str);
    			container.append(newItem);
    		} else {
    			for (var p in cities) {
    				var id = cities[p].regionId;
    				var name = cities[p].regionName;
    				var str = ("<li id='li_pageBox_citymanage_searchcity_country_" + id + "' class='cityList'><a href='#' class='white'>" + name + "</a></li>");
    				var newItem = $(str);
    				container.append(newItem);
    				newItem.bind("click", function () {
    					city_clicked($(this));
    				});
    			}
    		}
    		gm.ngi.weathers.defaultPage.showSearchCityPage();
//        	gm.ngi.weathers.defaultPage.showCityManagePage();
    	}

		gm.ngi.weathers.defaultPage.closeProgressBox();
	};

	function registerEventHandlers() {
		// 默认返回到mycity页，用于地理定位
		$("#li_back").unbind("click");
		$("#li_back").click(function () {
			gm.ngi.weathers.defaultPage.showMyCityPage();
		});
		$("#li_back").registerButtonFeedBack("images/30_1.png", "images/30.png");
		$("#li_edit").registerButtonFeedBack("images/31_1.png", "images/31_0.png");

		// 我的城市：增加按钮
		$("#li_cityManager_add").click(function () {
			gm.ngi.weathers.defaultPage.showProvinceListPage();
		});

		// 我的城市：编辑按钮
		$("#li_edit").click(function () {
			gm.ngi.weathers.defaultPage.showDeleteCityPage();
		});

		// 列表项点击回馈
		$(".cityManager ul li").live("mousedown", function () {
			$(this).addClass("down");
			$(this).find("a").addClass("down");
		});
		$(".cityManager ul li").live("mouseup", function () {
			$(this).removeClass("down");
			$(this).find("a").removeClass("down");
		});

		$(".cityManager2 ul li").live("mousedown", function () {
			$(this).addClass("down");
			$(this).find("a").addClass("down");
		});
		$(".cityManager2 ul li").live("mouseup", function () {
			$(this).removeClass("down");
			$(this).find("a").removeClass("down");
		});

		// 省份、城市列表项的点击事件
		$("#ul_pageBox_citymanage_add_country li").live("click", function () {
			city_clicked($(this));
		});
		$("#ul_pageBox_citymanage_add li").live("click", function () {
			province_clicked($(this));
		});

		//省份查找按钮点击
		$("#btn_pageBox_citymanage_add").click(function (e) {
			var value = $("#pageBox_citymanage_text").val().trim();
			if (value) {
				gm.ngi.weathers.defaultPage.search_city(value);
			}
		});

		//城市查找按钮点击
		$("#btn_pageBox_citymanage_add_country").click(function (e) {
			var value = $("#pageBox_citymanage_add_country_text").val().trim();
			if (value) {
				gm.ngi.weathers.defaultPage.search_city(value);
			}
		});

		//查找文本框输入事件
		$("#btn_pageBox_citymanage_searchcity").click(function () {
			var value = $("#pageBox_citymanage_searchcity_text").val().trim();
			if (value) {
				gm.ngi.weathers.defaultPage.search_city(value);
			}
		});
	}

	function registerKeyboard() {
		$("#customkeyboard").keyboard({
			clickCallback: function () {
				if (!$(".changeopacity").hasClass("display_no"))
					$(".changeopacity").addClass("display_no");
			},
			doneCallback: function (d) {
				$(".changeopacity").removeClass("display_no");
				var input = d.target.input.val().trim();
				if (input) {
					setTimeout(function () {
						gm.ngi.weathers.defaultPage.search_city(input);
					}, 0);	// 使用setTimeout, 以便隐藏键盘
				}

			},
			returnCallback: function () {
				$(".changeopacity").removeClass("display_no");
			}
		});
	}

	initProvinceBox();
	initMyCityBox();
	initJsp();
	registerEventHandlers();
	registerKeyboard();

}