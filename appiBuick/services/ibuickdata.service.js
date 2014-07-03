ibuickApp.factory("iBuickData", function() {

	var factory = {};
	
	factory.gasTypes = [];
	
	factory.sharedObject = {};
	factory.favorDealer = {};
	factory.favorGasStations = [];
	factory.favorParking = [];
	
	factory.helpview = {};
	
	// 指示灯的相关数据
	factory.indicators = [
		             	     {"title":"乘客安全带提示灯", 
		             	      "content":"点火按钮被按到“起动（START）”位置数秒钟后，将会响起数秒钟蜂鸣音以提醒前排乘客系好安全带。只有在乘客安全气囊启用时，才会出现这种情况。参见“乘客传感系统”，了解更多信息。乘客安全带提示灯也会启亮数秒钟，然后再闪烁几秒钟。 在乘客仍未系好安全带且车辆起步时，将反复发出蜂鸣声和启亮提示灯。 在乘客系好安全带后，不再发出蜂鸣声，灯也熄灭。",
		             	      "photo":"l_cad_li_1_120x120.png"
		             	     },
		             	     {"title":"牵引力控制系统（TCS）警告灯",
		             	      "content":"如果牵引力控制（TC）警告灯启亮且一直不灭，则表明牵引力控制系统可能有故障。 当您开启发动机时，牵引力控制（TC）警告灯将短时启亮。如果不亮，应排除故障，使其在发生故障时能随时发出警告。 如果用位于控制台上的牵引力控制（TC）开/关（ON/OFF）按钮关闭牵引力控制系统，此灯也会启亮。 如果牵引力控制（TC）警告灯一直不灭或在行驶中启亮，您应尽快小心地靠边停车。关闭发动机，然后重新起动。如果警告灯仍不熄灭或在行车时又重新启亮，则需要维修车辆。应尽快检修牵引力控制系统。参见“牵引力控制系统（TCS）”，了解更多信息。",
		             	      "photo":"l_cad_li_2_120x120.png"
		             	     },
		             	     {"title":"安全带提示灯",
		             	      "content":"点火按钮被按到“起动（START）”位置时，将会响起数秒钟蜂鸣音以提醒乘员系好安全带。驾驶员安全带提示灯也会启亮数秒钟，然后再闪烁几秒钟。您应系好安全带。 在驾驶员仍未系好安全带且车辆起步时，将反复发出蜂鸣声和启亮提示灯。 在驾驶员系好安全带后，不再发出蜂鸣声，灯也熄灭。",
		             	      "photo":"l_cad_li_3_120x120.png"
		             	     },
		             	     {"title":"充电系统指示灯",
		             	      "content":"开启发动机时，此灯将会短时启亮，以显示发电机和蓄电池充电系统工作正常。 如果此灯长亮不灭，则需要维修车辆。您应立即将车辆开至上海通用汽车有限公司别克特约售后服务中心。为了节省蓄电池电力直至您到达维修站，请关闭所有附件。参见“驾驶员信息中心（DIC）控制和显示”， 了解更多信息。",
		             	      "photo":"l_cad_li_4_120x120.png"
		             	     },
		             	     {"title":"发动机冷却液温度警告灯",
		             	      "content":"发动机冷却液温度警告灯将会在发动机非常热时启亮。 车辆起动时，此警告灯也会短时启亮。 如果此灯不熄灭或在行驶时启亮且一直不灭，则表明冷却系统可能有故障。如果在发动机冷却液温度警告灯启亮时行驶，会导致车辆过热，参见“发动机过热保护操作模式”。参见“发动机过热”和“驾驶员信息中心警告和信息”，了解更多信息。",
		                       "photo":"l_cad_li_5_120x120.png"
		             	     },
		             	     {"title":"机油压力警告灯",
		             	      "content":"如有配备，该指示灯会告诉您发动机机油压力是否有问题。 起动发动机时，该指示灯会短时启亮。这是一项检查， 以确认指示灯是否工作。如果指示灯不亮，一定要排除故障，使其在发生故障时能随时发出警告。 当指示灯启亮且一直不灭时，则表明机油在流经发动机时出现异常。这可能是机油不足的问题，也可能是有其它一些系统故障。",
		             	      "photo":"l_cad_li_6_120x120.png"
		             	     },
		             	     {"title":"故障指示灯",
		             	      "content":"如有配备，该指示灯会告诉您发动机机油压力是否有问 题。 起动发动机时，该指示灯会短时启亮。这是一项检查， 以确认指示灯是否工作。如果指示灯不亮，一定要排除故障，使其在发生故障时能随时发出警告。 当指示灯启亮且一直不灭时，则表明机油在流经发动机时出现异常。这可能是机油不足的问题，也可能是有其它一些系统故障。",
		             	      "photo":"l_cad_li_7_120x120.png"
		             	     },
		             	     {"title":"防抱死制动系统警告灯",
		             	      "content":"动系统的防抱死部分可能有故障。如果红色的“制动(BRAKE)”指示灯未启亮，您仍可以制动，但是不能进行防抱死制动。参见“制动系统警告灯”。如果此灯长亮不灭，请将点火开关按钮按至OFF/ACC位置。如果此灯在行驶时启亮，应尽快停车并关闭点火开关。然后，重新起动发动机，使系统复位。如果警告灯仍不熄灭或在行车时又启亮，则需要维修车辆。如果常规制动系统警告灯未启亮，您仍可以制动，但是不能进行防抱死制动。如果常规制动系统警告灯也启亮，则不仅没有防抱死制动，而且常规制动器也有问题。参见“制动系统警告灯”。",
		             	      "photo":"l_cad_li_8_120x120.png"
		             	     },
		             	     {"title":"安全指示灯",
		             	      "content":"关于此灯的信息，请参见“防盗系统”。",
		             	      "photo":"l_cad_li_9_120x120.png"
		             	     },
		             	     {"title":"轮胎气压过低警告灯",
		             	      "content":"对于配备有轮胎压力监控器系统的车辆，此指示灯将在起动发动机时短时启亮。 此后，它将只会在存在瘪胎或轮胎压力过低情况时启亮。 参见“胎压监测系统”，了解更多信息。",
		             	      "photo":"l_cad_li_10_120x120.png"
		             	     },
		             	     {"title":"巡航控制指示灯",
		             	      "content":"每当设定巡航控制系统时，该指示灯启亮。当巡航控制系统被关闭时，该指示灯将熄灭。参见 “巡航控制”,了解更多信息。",
		             	      "photo":"l_cad_li_11_120x120.png"
		             	     },
		             	     {"title":"雾灯指示灯",
		             	      "content":"雾灯指示灯将会在使用雾时启亮。 当雾灯被关闭时，该指示灯将熄灭。参见“雾灯”，了解更多信息。",
		             	      "photo":"l_cad_li_12_120x120.png"
		             	     },
		             	     {"title":"车灯未关提示灯",
		             	      "content":"每当驻车灯开启时,该指示灯启亮。参见“前大灯未关提示”，了解更多信息。",
		             	      "photo":"l_cad_li_13_120x120.png"
		             	     },
		             	     {"title":"远光灯指示灯",
		             	      "content":"每当前大灯远光灯开启时，该指示灯启亮。参见“前大灯”下的“前大灯远光/近光转换器”,了解更多信息。",
		             	      "photo":"l_cad_li_14_120x120.png"
		             	     },
		             	     {"title":"后雾灯指示灯",
		             	      "content":"雾灯指示灯将会在使用雾灯时启亮。 当雾灯被关闭时，该指示灯将熄灭。参见“雾灯”，了解更多信息。",
		             	      "photo":"l_cad_li_15_120x120.png"
		             	     },
		             	     {"title":"气囊就绪指示灯",
		                       "content":"仪表板上有一个气囊就绪指示灯，该灯显示气囊符号。系统将检查气囊电气系统有无故障。指示则指示有无电气故障。系统检查内容包括气囊传感器、气囊模块、线路及诊断模块。有关气囊系统的详细信息，请参见“气囊系统”。车辆起动时，此灯将会亮起闪烁几秒钟。然后，此灯应熄灭。这表示气囊系统已准备就绪。如果车辆起动后气囊就绪指示灯一直不熄灭或在行车时启亮，表明气囊系统存在异常。立即维修车辆。",
		                       "photo":"l_cad_li_16_120x120.png"
		             	     },
		             	     {"title":"制动系统警告灯",
		             	      "content":"您车辆的液压制动系统分为两部分。如果有一部分不工作，另一部分仍可工作并正常停车。尽管如此，为保持良好的制动性能，必须使两个部分都工作正常。 如果警告灯启亮，表明制动系统有问题。应立即检查制动系统。 开启发动机时此灯应短时启亮。如果不亮，应排除故障，使其在发生故障时能随时发出警告。",
		             	      "photo":"l_cad_li_17_120x120.png"
		             	     }];
	
	init();
	
	function init() {
		factory.sharedObject.gasStations = [];
		factory.sharedObject.parkings = [];
		factory.sharedObject.dealers = [];
		factory.sharedObject.localdealers = [];
		factory.sharedObject.ttsHandle = null;
		
		factory.sharedObject.city = "上海市";
		factory.sharedObject.citycode = "3101";
		
		factory.favorParking = [];
		factory.favorGasStations = [];
		
		loadFavorDealer();
		loadFavorParking();
		loadFavorGasStations();
		loadGasTypeList();
		loadHelpViewData();
	};
	
	// 获取指示灯信息(指定起始点和获取个数，返回一个数组)
	factory.getIndicators = function (startIndex, nums) {
		indicatorArray = [];
		for(var i=startIndex, j=0; i<factory.indicators.length && j< nums; i++, j++ ) {
			var item = factory.indicators[i];
			indicatorArray.push(item);
		}
		return indicatorArray;
	};
	
	function loadHelpViewData () {
		var result = gm.io.readFile("helpview.json");
		if(typeof result === 'number') {
			factory.helpview = undefined;
			//$log.log('Failed to read favorDealer.json');
		} else {
			//$log.log('Successfully read favorDealer.json');
			factory.helpview = JSON.parse(result);
			//factory.sharedObject.dealers.push(factory.favorDealer);
		}	
	};
	
	function saveHelpViewData () {
		var result = gm.io.writeFile("helpview.json", JSON.stringify(factory.helpview));
		if (result == 11) {
			//$log.log('Successfully wrote to favorDealer.json');
		}
		else {
			//$log.log('Failed to write to favorDealer.json');
		}
	};
	
	function saveFavorDealer () {
		var result = gm.io.writeFile("favorDealer.json", JSON.stringify(factory.favorDealer));
		if (result == 11) {
			//$log.log('Successfully wrote to favorDealer.json');
		}
		else {
			//$log.log('Failed to write to favorDealer.json');
		}
	};
	
	// 装载常用经销商
	function loadFavorDealer() {
		var result = gm.io.readFile("favorDealer.json");
		if(typeof result === 'number') {
			factory.favorDealer = undefined;
			//$log.log('Failed to read favorDealer.json');
		} else {
			//$log.log('Successfully read favorDealer.json');
			factory.favorDealer = JSON.parse(result);
			//factory.sharedObject.dealers.push(factory.favorDealer);
		}		
	};
	
	function saveFavorGasStations () {
		var result = gm.io.writeFile("favorGasstation.json", JSON.stringify(factory.favorGasStations));
		if (result == 11) {
			//$log.log('Successfully wrote to favorgasstation.json');
		}
		else {
			//$log.log('Failed to write to favorgasstation.json');
		}
	};
	
	function loadFavorGasStations () {
		var result = gm.io.readFile("favorGasstation.json");
		  if(typeof result === 'number') {
			  //$log.log('Failed to read favorgasstation.json');
		  } else {
			  factory.favorGasStations = JSON.parse(result);
		  }		
	};
	
	function saveFavorParking() {
		var result = gm.io.writeFile("favorParking.json", JSON.stringify(factory.favorParking));
		if (result == 11) {
			//$log.log('Successfully wrote to favorparking.json');
		}
		else {
			//$log.log('Failed to write to favorparking.json');
		}
	};
	
	function loadFavorParking() {
		var result = gm.io.readFile("favorParking.json");
		  if(typeof result === 'number') {
			  //$log.log('Failed to read favorParking.json');
		  } else {
			  factory.favorParking = JSON.parse(result);
		  }	
	};
	
	function saveGasTypeList() {
		var result = gm.io.writeFile("gastypelist.json", JSON.stringify(factory.gasTypes));
		if (result == 11) {
			//$log.log('Successfully wrote to favorparking.json');
		}
		else {
			//$log.log('Failed to write to favorparking.json');
		}
	};
	
	function loadGasTypeList() {
		var result = gm.io.readFile("gastypelist.json");
		  if(typeof result === 'number') {
			  //$log.log('Failed to read favorParking.json');
		  } else {
			  factory.gasTypes = JSON.parse(result);
		  }	
	};

	factory.updateFavorDealer = function (newDealer) {
		factory.favorDealer = newDealer;
		saveFavorDealer();
	};
	
	factory.saveFavorGasStations = function() {
		saveFavorGasStations();
	};
	factory.loadFavorGasStations = function() {
		loadFavorGasStations();
	};
	factory.saveFavorParking = function() {
		saveFavorParking();
	};
	factory.loadFavorParking = function() {
		loadFavorParking();
	};
	
	factory.saveHelpViewData = function() {
		saveHelpViewData();
	};
	
	factory.saveGasTypeList = function() {
		saveGasTypeList();
	};
	factory.loadGasTypeList = function() {
		loadGasTypeList();
	};
	
	factory.transCityCode = function(cityadcode, provinceadcode) {
		if (cityadcode === '' || provinceadcode === '' || cityadcode == undefined || provinceadcode == null) {
			return "3101";
		}
		if(cityadcode === provinceadcode) {
			cityadcode = cityadcode.substr(0,3) + "1";
		}
		else {
			cityadcode = cityadcode.substr(0,4);
		}
		return cityadcode;
	};

	return factory;
});