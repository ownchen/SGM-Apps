(function($){
	$.fn.keyboard = function (opts) {
		var currentPos = 0;
		var tempwords = "";
		var currentView = "pyFirst";
		var pevView = "";
		var viewReg1 = /py(First|Second)/;
		var viewReg2 = /en(First|Second)/;
		var ObjectId = null;
		var curSelectCnt = [];
		var regObjList = [];
		var keyList = {
			"pyFirst":[['k_1', 5,5, 66,67],['k_2', 81,5, 66,67],['k_3', 157,5, 66,67],['k_4', 233,5, 66,67],['k_5', 309,5, 66,67],['k_6', 385,5, 66,67],['k_7', 461,5, 66,67],['k_8', 537,5, 66,67],['k_9', 613,5, 66,67],['k_0', 689,5, 66,67],['k_q', 40,72, 66,67],['k_w', 116,72, 66,67],['k_e', 192,72, 66,67],['k_r', 268,72, 66,67],['k_t', 344,72, 66,67],['k_y', 420,72, 66,67],['k_u', 496,72, 66,67],['k_i', 572,72, 66,67],['k_o', 648,72, 66,67],['k_p', 724,72, 66,67],['k_a', 5,139, 66,67],['k_s', 81,139, 66,67],['k_d', 157,139, 66,67],['k_f', 233,139, 66,67],['k_g', 309,139, 66,67],['k_h', 385,139, 66,67],['k_j', 461,139, 66,67],['k_k', 537,139, 66,67],['k_l', 613,139, 66,67],['k_symbol', 689,139, 66,67, "Ã§Â¬Â¦Ã¥ï¿½Â·"],['k_z', 40,206, 66,67],['k_x', 116,206, 66,67],['k_c', 192,206, 66,67],['k_v', 268,206, 66,67],['k_b', 344,206, 66,67],['k_n', 420,206, 66,67],['k_m', 496,206, 66,67],['k_,', 572,206, 66,67],['k_.', 648,206, 66,67],['k_tab', 135,273, 71,67],['k_space', 216,273, 316,67, "ç©ºæ ¼"],['k_en', 542,273, 66,67,"è‹±"],['k_cancel', 55,273, 71,67,"å�–æ¶ˆ"]],
			"pySecond":[['k_prev', 5,5, 66,67],['k_next', 724,5, 66,67],['k_q', 40,72, 66,67],['k_w', 116,72, 66,67],['k_e', 192,72, 66,67],['k_r', 268,72, 66,67],['k_t', 344,72, 66,67],['k_y', 420,72, 66,67],['k_u', 496,72, 66,67],['k_i', 572,72, 66,67],['k_o', 648,72, 66,67],['k_p', 724,72, 66,67],['k_a', 5,139, 66,67],['k_s', 81,139, 66,67],['k_d', 157,139, 66,67],['k_f', 233,139, 66,67],['k_g', 309,139, 66,67],['k_h', 385,139, 66,67],['k_j', 461,139, 66,67],['k_k', 537,139, 66,67],['k_l', 613,139, 66,67],['k_symbol', 689,139, 66,67, "Ã§Â¬Â¦Ã¥ï¿½Â·"],['k_z', 40,206, 66,67],['k_x', 116,206, 66,67],['k_c', 192,206, 66,67],['k_v', 268,206, 66,67],['k_b', 344,206, 66,67],['k_n', 420,206, 66,67],['k_m', 496,206, 66,67],['k_,', 572,206, 66,67],['k_.', 648,206, 66,67],['k_tab', 135,273, 71,67],['k_space', 216,273, 316,67],['k_en', 542,273, 66,67],['k_cancel', 55,273, 71,67,"å�–æ¶ˆ"]],
			"enFirst":[['k_~', 5,5, 66,67],['k_@', 81,5, 66,67],['k_#', 157,5, 66,67],['k_$', 233,5, 66,67],['k_%', 309,5, 66,67],['k_^', 385,5, 66,67],['k_&', 461,5, 66,67],['k_*', 537,5, 66,67],['k_(', 613,5, 66,67],['k_)', 689,5, 66,67],['k_Q', 40,72, 66,67],['k_W', 116,72, 66,67],['k_E', 192,72, 66,67],['k_R', 268,72, 66,67],['k_T', 344,72, 66,67],['k_Y', 420,72, 66,67],['k_U', 496,72, 66,67],['k_I', 572,72, 66,67],['k_O', 648,72, 66,67],['k_P', 724,72, 66,67],['k_A', 5,139, 66,67],['k_S', 81,139, 66,67],['k_D', 157,139, 66,67],['k_F', 233,139, 66,67],['k_G', 309,139, 66,67],['k_H', 385,139, 66,67],['k_J', 461,139, 66,67],['k_K', 537,139, 66,67],['k_L', 613,139, 66,67],['k_symbol', 689,139, 66,67],['k_Z', 40,206, 66,67],['k_X', 116,206, 66,67],['k_C', 192,206, 66,67],['k_V', 268,206, 66,67],['k_B', 344,206, 66,67],['k_N', 420,206, 66,67],['k_M', 496,206, 66,67],['k_,', 572,206, 66,67],['k_.', 648,206, 66,67],['k_tab', 135,273, 71,67],['k_space', 216,273, 316,67, "ç©ºæ ¼"],['k_py', 542,273, 66,67,"Ã¨â€¹Â±"],['k_cancel', 55,273, 71,67,"å�–æ¶ˆ"]],
			"enSecond":[['k_1', 5,5, 66,67],['k_2', 81,5, 66,67],['k_3', 157,5, 66,67],['k_4', 233,5, 66,67],['k_5', 309,5, 66,67],['k_6', 385,5, 66,67],['k_7', 461,5, 66,67],['k_8', 537,5, 66,67],['k_9', 613,5, 66,67],['k_0', 689,5, 66,67],['k_q', 40,72, 66,67],['k_w', 116,72, 66,67],['k_e', 192,72, 66,67],['k_r', 268,72, 66,67],['k_t', 344,72, 66,67],['k_y', 420,72, 66,67],['k_u', 496,72, 66,67],['k_i', 572,72, 66,67],['k_o', 648,72, 66,67],['k_p', 724,72, 66,67],['k_a', 5,139, 66,67],['k_s', 81,139, 66,67],['k_d', 157,139, 66,67],['k_f', 233,139, 66,67],['k_g', 309,139, 66,67],['k_h', 385,139, 66,67],['k_j', 461,139, 66,67],['k_k', 537,139, 66,67],['k_l', 613,139, 66,67],['k_symbol', 689,139, 66,67],['k_z', 40,206, 66,67],['k_x', 116,206, 66,67],['k_c', 192,206, 66,67],['k_v', 268,206, 66,67],['k_b', 344,206, 66,67],['k_n', 420,206, 66,67],['k_m', 496,206, 66,67],['k_,', 572,206, 66,67],['k_.', 648,206, 66,67],['k_tab', 135,273, 71,67],['k_space', 216,273, 316,67, "ç©ºæ ¼"],['k_py', 542,273, 66,67,"Ã¨â€¹Â±"],['k_cancel', 55,273, 71,67,"å�–æ¶ˆ"]],
			"symbol": [['k_1', 5,5, 66,67],['k_2', 81,5, 66,67],['k_3', 157,5, 66,67],['k_4', 233,5, 66,67],['k_5', 309,5, 66,67],['k_6', 385,5, 66,67],['k_7', 461,5, 66,67],['k_8', 537,5, 66,67],['k_9', 613,5, 66,67],['k_0', 689,5, 66,67],['k_~', 40,72, 66,67],['k_!', 116,72, 66,67],['k_@', 192,72, 66,67],['k_#', 268,72, 66,67],['k_$', 344,72, 66,67],['k_%', 420,72, 66,67],['k_^', 496,72, 66,67],['k_&', 572,72, 66,67],['k_*', 648,72, 66,67],['k_+', 0,139, 66,67],['k_=', 81,139, 66,67],['k_-', 157,139, 66,67],['k__', 233,139, 66,67],['k_:', 309,139, 66,67],['k_;', 385,139, 66,67],['k_"', 461,139, 66,67],["k_'", 537,139, 66,67],['k_|', 613,139, 66,67],['k_ABC', 689,139, 66,67],['k_/', 40,206, 66,67],['k_\\', 116,206, 66,67],['k_(', 192,206, 66,67],['k_)', 268,206, 66,67],['k_<', 344,206, 66,67],['k_>', 420,206, 66,67],['k_,', 496,206, 66,67],['k_.', 572,206, 66,67],['k_?', 648,206, 66,67],['k_space', 216,273, 316,67,"ç©ºæ ¼"],['k_.com', 542,273, 66,67],['k_cancel',135,273, 71,67,"å�–æ¶ˆ"]]
		};
		var d = { target: { input: "", relatedInput: ""} };
		
		var textLength = 0;
		var increaseLengthArray = new Array();
		var increaseLength;
		var pageIndexArray = new Array();
		var pageindex = 0;
		var endTextWidth = 0;
		var curInput = null;
		//ime py part
		var LastNo = 0;
		var LastFlag = 0;
		var SPACECHAR = " ";
		var OutChi = new Array();
		var OutEng = new Array();

		var ORIGINALCharObj = null;
		var CURRENTCharObj = null;
		var CURRENTCharList = [];

		CodeList = codeList.split(',');
		
		var optionFunc = {
				"k_prev": function(){
					if (pageindex == 0)
						return;
					if (viewReg1.test(currentView)) {
				        var sgmsss = tempwords;
				        if (sgmsss != "") {
				            var first_num = 0;
				            var tempIndex = pageIndexArray[pageindex - 1] + increaseLengthArray[increaseLength];
				            if ((LastNo - tempIndex) > first_num) {
				                LastNo = LastNo - tempIndex + 1;
				                GetStr(LastNo, sgmsss);
				            }
				            else {
				                GetStr(0, sgmsss);
				            }
				        }
				        pageindex = pageindex - 1;
				    }
				},
				"k_next": function(){
					if (viewReg1.test(currentView)) {
				        pageindex = pageindex + 1;
				        pageIndexArray.push(increaseLengthArray[increaseLength]);
				        sgmsss = tempwords;
				        if ((sgmsss != "") && (LastFlag != -1)) {
				            var first_num = 0;
				            var wordList_length = CURRENTCharList.length;
				            document.getElementById("ChiList").innerHTML = "";
				            GetStr(LastNo + 1, sgmsss);
				        }
				    }
				},
				"k_en": function(){
					if (viewReg2.test(pevView))
						Transform("en"+RegExp.$1);
					else
						Transform("enSecond");
				},
				"k_py": function(){
					if (viewReg1.test(pevView))
						Transform("py"+ RegExp.$1);
					else if (tempwords)
						Transform("pySecond");
					else
						Transform("pyFirst");
				},
		        "k_backspace": function(){
		            if (tempwords != "") {
		                tempwords = tempwords.substring(0, tempwords.length - 1);
		                document.getElementById("tempwordsshow").innerHTML = tempwords;
		                
		                if (viewReg1.test(currentView)) {
		                    Grep(tempwords);
		                } else {
		                    wbx();
		                }
		                if (curSelectCnt.length)
		    				d.target.input.get(0).setSelectionRange(curSelectCnt[0],curSelectCnt[1]);
		            } else {
		                DeleteText(ObjectId);
		            }
		            if (d.target.input.val()|| $("#tempwordsshow").html()){
				    	$("#k_backspace").addClass("delete_enable");
				    	d.target.input.val() &&
				            	$("#k_enter").addClass("enter_enable");
		            }
				    else{
				    	$("#k_backspace").removeClass("delete_enable");
				    	$("#k_enter").removeClass("enter_enable");
				    }
		        },
		        "k_enter" : function(){
		            ReturnVaule = d.target.input.val();
		            onDone();
				},
				"k_space": function(){
		            if (tempwords == "") {
		                InsertTextAtCursor(ObjectId, " ", currentPos);
		            } else {
		                SendStr(0);
		            }
				},
				"k_tab": function(){
					if (viewReg1.test(currentView))
						Transform("enFirst");
					else if(viewReg2.test(currentView)){
						RegExp.$1 == "First" && Transform("enSecond");
						RegExp.$1 == "Second" && Transform("enFirst");
					}
				},
				"k_symbol": function(){
					Transform("symbol");
				},
				"k_ABC": function(){
					Transform(pevView);
				},
				"k_cancel": function(){
					$('#customkeyboard').hide();
					$('#popupcontainer').hide();
					$("#k_backspace").removeClass("delete_enable");
			    	$("#k_enter").removeClass("enter_enable");
					uninstallKeyBoardEvent();
				}
			};
		function dhKeyBoard() {
		    var obj = d.target.input.get(0) || document.getElementById("T1");
		    ObjectId = obj;
		}
		//pressKey function.
		function pressKey(data, obj) {
		    
		    var reg = /k_(.+)/;
		    if (reg.test(data[0])){
			    var c = data[5] || RegExp.$1;
			    var showEffect = function(){
				    var button = $("#keyboard").find("button").length ? $("#keyboard").find("button") 
				    		: $("<button>"+c+"</button>");
				    button.html(c);
				    button.css({ 
				    	"left": data[1] + 3, 
				    	"top":data[2] + 2, 
				    	"width":data[3],
				    	"height":data[4]
				    });
			    	$("#keyboard").append(button);
		    	}
			    
			    
			    
		    	data[1] && !obj && showEffect();
		    	!obj &&  $("#keyboard").find("button").show();
		    	
		    	
		    	setTimeout(function(){
		    		if (optionFunc[data[0]]){
				    	optionFunc[data[0]]();
				    } else {
				    	getKey(data[0]);
				    }
		    		$("#keyboard").find("button").hide();
		    	}, 33);
		    }
		}
		//Call value when user click the enter button
		function onDone() {
		    if (ReturnVaule == "") {
		        //call back the function for empty value
		        typeof param.EmptyValueCallback == "function" && param.EmptyValueCallback();
		    }
		    else {
		        $(d.target.relatedInput).attr("value", $(d.target.input).attr("value"));
		        typeof param.doneCallback == "function" && param.doneCallback(d);
		        closekeyboard();
		    }
		}
		
		function getKey(key) {
			if (viewReg1.test(currentView) && /k_([a-z]+)/.test(key)){
				ime_cn(key);
			} else{
				ime_en(key);
			}

		}
		function ime_en(key) {
		    var inputText;
			var reg = /k_(.+)/;
			if (reg.test(key)){
				inputText = RegExp.$1;
	            InsertTextAtCursor(ObjectId, inputText);
			}
		}
		function ime_cn(key) {
			
			var reg1 = /k_(\d+)/;
			
			if (reg1.test(key)){
				var inputText = RegExp.$1;
				InsertTextAtCursor(ObjectId, inputText);
			}
			
			var reg2 = /k_([a-z,A-Z]+)/;
			if (reg2.test(key)){
				tempwords += RegExp.$1;
	            viewReg1.test(currentView) ? Grep(tempwords) : wbx();
	            Transform("pySecond");
	            $("#tempwordsshow").html(tempwords);
	            setCaretPosition(ObjectId, currentPos);
			}
			if (curSelectCnt.length)
				d.target.input.get(0).setSelectionRange(curSelectCnt[0],curSelectCnt[1]);
			
			if (d.target.input.val() || $("#tempwordsshow").html())
		    	$("#k_backspace").addClass("delete_enable");
		    else
		    	$("#k_backspace").removeClass("delete_enable");
		}
		
		//find the text in "Text Library"
		function FindIn(sgmsss) {
		    var find = -1, low = 0, mid = 0, high = CodeList.length;
		    var sEng = "";
		    while (low < high) {
		        mid = (low + high) / 2;
		        mid = Math.floor(mid);
		        sEng = CodeList[mid];
		        if (sEng.indexOf(sgmsss, 0) == 0) { find = mid; break; }
		        sEng = CodeList[mid - 1];
		        if (sEng.indexOf(sgmsss, 0) == 0) { find = mid; break; }
		        if (sEng < sgmsss) { low = mid + 1; } else { high = mid - 1; }
		    }
		    while (find > 0) {
		        sEng = CodeList[find - 1];
		        if (sEng.indexOf(sgmsss, 0) == 0) { find = find - 1; } else { break; }
		    }
		    return (find);
		}

		/*
		The logic codes for how to show the words on the inputcontainer
		Using the touch event to show more words.
		*/
		function GetStr(No, sgmsss) {
		    textLength = 0;
		    document.getElementById("ChiList").innerHTML = "";
		    var sTmp = "", sChi = "";
		    var ableDisplay = "1";
		    var overWidth = 630 - (sgmsss.length*20);
		    
		    
		    for (i = 0; i <= parseInt(overWidth / 63)-1; i++) {
		        if (No + i >= CodeList.length - 1) { break; }
		        sTmp = CodeList[No + i];
		        if (sTmp != undefined && sTmp.indexOf(sgmsss) >= 0) {
		            sChi = CodeList[No + i];
		            OutEng[i] = sChi.substring(sgmsss.length, sChi.indexOf(SPACECHAR));
		            OutChi[i] = sChi.substr(sChi.lastIndexOf(SPACECHAR) + 1);
		            textLength = parseInt(textLength) + OutChi[i].length;
		            if (i <= 8 && ableDisplay == "1") {
		                
		                if (textLength > 17) {
		                    ableDisplay = "0";
		                }
		                else {
		                    increaseLength = 0;
		                    textLength += 1;
		                    document.getElementById("ChiList").innerHTML += "<span class=\"singleText\">"+ OutChi[i] +'</span>';
		                    LastNo = No + i;
		                    increaseLength = i + 1;
		                    increaseLengthArray[i + 1] = i + 1;
		                    LastFlag = 0;
		                    $("#nextarrow").removeClass('arrowdisable'); 
		                }
		            }
		        }
		        else {
		            LastFlag = -1;
		            LastNo = No + (increaseLength - 1);
		        }
		    }
		    $(".singleText").unbind("click").click(function(){
		    	Transform("pyFirst");
            	OutChi2($(this).html(),this);
            });
		    $("#tempwordsshow").unbind("click").click(function(){
		    	Transform("pyFirst");
		    	OutChi2($(this).html(),this);
		    });
		}

		function Grep(sgmsss) {
		    var No = -1;
		    var overWidth = 630 - (sgmsss.length*20);
		    OutChi = new Array();
		    //set the OutChi Array.
		    for (var i = 0; i <=parseInt(overWidth / 63)-1; i++) { OutChi[i] = ""; }
		    if (sgmsss != "") {
		        No = FindIn(sgmsss);
		        //if (No >= 0) { GetStr(No, sgmsss); }
		        GetStr(No, sgmsss);
		    }
		    else {
		    	Transform("pyFirst");
		        document.getElementById("ChiList").innerHTML = "";
		    }
		}
		
		function Transform(viewName){
			if (viewReg1.test(viewName) && RegExp.$1 == "Second")
				$("#textshowcontainer, #inputcontainer").show();
			else
				$("#textshowcontainer, #inputcontainer").hide();
			$("#keyboard").removeClass(currentView+"view");
			$("#keyboard").addClass(viewName+"view");
			pevView = currentView;
			currentView = viewName;
			if (curSelectCnt.length)
				d.target.input.get(0).setSelectionRange(curSelectCnt[0],curSelectCnt[1]);
		}

		//SendStr,PageUp,PageDown
		//According to the order to choose the chinese text.
		function SendStr(n) {
		    if (viewReg1.test(currentView)) {
		        if ((n >= 0) && (n <= 9) && OutChi.length > 0) {
		            //ObjectId.value += OutChi[n];
		            OutChi1(OutChi[n]);
		        }
		        else {
		            var inputText = "";
		            var charArray = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
		            switch (n) {
		                case 9:
		                    inputText = (shiftmodule == "down") ? "0" : "0";
		                    OutChi1(inputText);
		                    break;
		                default:
		                    var numText = (n + 1).toString();
		                    inputText = (shiftmodule == "down") ? numText : charArray[n];
		                    OutChi1(inputText);
		                    break;
		            }
		        }
		    } else {
		        if ((n >= 0) && (n <= 9) && teststr2.length > 0) {
		            //  ObjectId.value += teststr2[n];
		            OutChi1(teststr2[n]);
		            teststr2 = new Array();
		        }
		    }
		}

		//InsertTextAtCursor
		function InsertTextAtCursor(input, inputText) {
		    // ObjectId = input;
		    //setCaretPosition(ObjectId, currentPos);
			
			input = d.target.input.get(0) || input;
		    currentPos = doGetCaretPosition(ObjectId);

		    var strLeft = input.value.substring(0, currentPos);
		    var strRight = input.value.substring(currentPos, input.value.length);
		    if (curSelectCnt.length){
		    	strLeft = input.value.substring(0, curSelectCnt[0]);
			    strRight = input.value.substring(curSelectCnt[1], input.value.length);
			    curSelectCnt = [];
		    }
		    
		    
		    input.value = strLeft +inputText+ strRight;
		    if (inputText == " ") {
		        currentPos++;
		    }
		    else {
		        currentPos += inputText.length;
		    }
		    setCaretPosition(ObjectId, currentPos);
		    
		    if (input.value){
		    	$("#k_backspace").addClass("delete_enable");
		    	$("#k_enter").addClass("enter_enable");
		    }
		    else{
		    	$("#k_backspace").removeClass("delete_enable");
		    	$("#k_enter").removeClass("enter_enable");
		    }
		    return input.value;
		}


		//output the chinese text with background color for selected item.
		function OutChi2(Text, object) {
            InsertTextAtCursor(ObjectId, Text);
            tempwords = "";
            $(".singleText", "#ChiList").unbind("click");
            $("#ChiList").html("");
            $("#tempwordsshow").html("");
            OutChi = new Array();
            $("#ChiList").css("left", "0");
		}
		function OutChi1(Text) {
		    InsertTextAtCursor(ObjectId, Text);
		    tempwords = "";
		    document.getElementById("ChiList").innerHTML = "";
		    document.getElementById("tempwordsshow").innerHTML = "";
		    OutChi = new Array();
		}
		//delete the text on input with cursor position
		function DeleteText(input) {
			input = d.target.input.get(0) || input;
            if (curSelectCnt.length)
            {
            	ObjectId.value = ObjectId.value.substring(0,curSelectCnt[0])+ObjectId.value.substring(curSelectCnt[1], ObjectId.value.length);
            	setCaretPosition(ObjectId, curSelectCnt[0]);
            	curSelectCnt = [];
            	return;
            }
            currentPos = doGetCaretPosition(ObjectId);
		    var strLeft = input.value.substring(0, currentPos);
		    var strDelete = strLeft.substring(0, strLeft.length - 1)
		    var strRight = input.value.substring(currentPos, input.value.length);
		    input.value = strDelete + strRight;
		    //set the updated pos
		    if (currentPos != 0) {
		        currentPos--;
		        setCaretPosition(ObjectId, currentPos);
		    }
		    else {
		        setCaretPosition(ObjectId, 0);
		    }
		    
		    
		    
		    return input.value;
		}

		function doGetCaretPosition(input) {
		    currentPos = 0;
		    if (input.get)
		    	input = input.get(0);
		    if (input.selectionStart || input.selectionStart == '0')
		        currentPos = input.selectionStart;

		    return (currentPos);
		}


		function setCaretPosition(input, pos) {
			if (input.get)
		    	input = input.get(0);
		    if (input.setSelectionRange) {
		        input.focus();
		        input.setSelectionRange(pos, pos);
		    }
		    else if (input.createTextRange) {
		        var range = input.createTextRange();
		        range.collapse(true);
		        range.moveEnd('character', pos);
		        range.moveStart('character', pos);
		        range.select();
		    }
		}
		
		
		//The function for popup
		//Open Popup
		function openkeyboard() {
		    
			var pyBg1 = new Image();
			pyBg1.src = "keyboard/images/py_1.png";
			pyBg1.onload = function(){
				$('#customkeyboard').show();
				$('#popupcontainer').show();
				dhKeyBoard();
				installKeyBoardEvent();
			}
			var pyBg2 = new Image();
			pyBg2.src = "keyboard/images/py_2.png";
			pyBg2.onload = function(){};
			
			var enBg1 = new Image();
			enBg1.src = "keyboard/images/en_1.png";
			enBg1.onload = function(){};
			
			var enBg2 = new Image();
			enBg2.src = "keyboard/images/en_2.png";
			enBg2.onload = function(){};
			
			var sym = new Image();
			sym.src = "keyboard/images/sym.png";
			sym.onload = function(){};
		}

		//CLose Popup
		function closekeyboard() {
		    document.getElementById("T1").value = "";
		    $('#popupcontainer').css('display', 'none');
		}
		//Init parameters
		var param = {
		    targetId: undefined,
		    imagePath: "keyboard/images",
		    doneCallback: undefined,
		    EmptyValueCallback: undefined,
		    returnCallback: undefined
		};
		var currentSearchText;
		var isDrag = false;
		var isTouchEnd = false;
		var _this = this;
		
		
		function keyboardInit(p){
			for (var i in p)
		        param[i] = p[i];
			param.targetId = "#"+$(_this).attr("id");
			var keyboardstr = new Array();
		    keyboardstr.push("<div id=\"popupcontainer\">");
		    keyboardstr.push("<div id=\"keyboardcontainer\" class=\"keyboardpopup\">");
		    keyboardstr.push("<div id=\"maincontainer\">");
		    keyboardstr.push("<div id=\"cursorposition\">");
		    keyboardstr.push("<span id=\"previouspostion\"></span>");
		    keyboardstr.push("<span id=\"nextpostion\"></span>");
		    keyboardstr.push("</div>");
		    keyboardstr.push("<div class=\"letter enter\" id=\"k_enter\">");
		    keyboardstr.push("</div>");
		    keyboardstr.push("<div id=\"inputtextbox\">");
		    keyboardstr.push("<input type=\"text\" name=\"T1\" value=\"\" size=\"80\" id=\"T1\">");
		    keyboardstr.push("<input type=\"password\" name=\"T2\" value=\"\" size=\"80\" id=\"T2\">");
		    keyboardstr.push("<div class=\"delete letter\" id=\"k_backspace\">");
		    keyboardstr.push("</div>");
		    keyboardstr.push("</div>");
		    
		    keyboardstr.push("<div style=\"clear:both;\"></div>");
		    keyboardstr.push("<div id=\"textshowcontainer\">");
		    keyboardstr.push("<div id=\"inputcontainer\">");
		    keyboardstr.push("<div id=\"tempwordsshow\">");
		    keyboardstr.push("</div>");
		    keyboardstr.push("<div id=\"ChiList\">");
		    keyboardstr.push("</div>");
		    keyboardstr.push("</div>");
		    keyboardstr.push("</div>");
		    keyboardstr.push("<div id=\"keycontainer\">");
		    keyboardstr.push("</div>");
		    keyboardstr.push("</div>");
		    keyboardstr.push("</div>");
		    var view = new Array();
		    view.push('<div id="keyboard" class="pyFirstview view" style="position: relative;">');
		    view.push('</div>');
		    $(param.targetId).html(keyboardstr.join(''));
		    $("#keycontainer").append($(view.join('').replace(/\[0\]/gi, param.imagePath)));
		    
		    var arr = new Array();
		    var y = "";
		    for(i = 0; i < $(".btnList").length; i ++){
		    	y = 67 * i + 5;
		    	$(".btnList").eq(i).find(".btn").each(function(index){
		    		var word = $(this).find(".btnCenter").html();
		    		var x = parseInt( $(this).css("margin-left").replace("xp","") );
		    		for (j = 0; j < index; j ++){
		    			var before = $(".btnList").eq(i).find(".btn").eq(j);
		    			x += parseInt( before.css("margin-left") )+ parseInt( before.css("margin-right") ) + before.width();
		    		}
		    		arr.push("['"+word+"', "+x+","+y+", "+$(this).width()+","+$(this).height()+"]");
		    	});
		    }
		    $("#hd").val("["+arr.join(",")+"]");
		    
		    $("#inputcontainer").hide();
		    
		    
		    $("input[type='text'],input[type='password']").not('#T1,#T2').unbind("focus").bind("focus", function () {
		        currentSearchText = $(this).attr("value");
		        d.target.relatedInput = this;
		        
		        
		        if ($(this).attr("type") == "password")
		        {
		        	$('#T2')[0].value = currentSearchText;
		        	d.target.input = $('#T2').show(); 
		        	$('#T1').hide();
		        	ObjectId = $('#T2').get(0);
		        	Transform("enSecond");
		        } else{
		        	$('#T1')[0].value = currentSearchText;
		        	$('#T2').hide();
		        	d.target.input = $('#T1').show();
		        	ObjectId = $('#T1').get(0);
		        }
		        
		        openkeyboard();
		    });
		}
		function getRangeById(id) 
		{ 
			var word=''; 
			if (document.selection){
				o=document.selection.createRange();
				if(o.text.length>0)
					word=o.text;
			} else { 
			}
			o = document.getElementById(id); 
			var p1=o.selectionStart, p2=o.selectionEnd; 
			//if (p1||p1=='0'){if(p1!=p2)word=o.value.substring(p1,p2);}} 
			return [p1, p2]; 
		} 
		function installKeyBoardEvent(){
			$("#T1,#T2").unbind("click").bind("click", function(){
				doGetCaretPosition(this);
				curSelectCnt = [];
				return $(this).val();
				
			}).unbind("select").bind("select", function(){
				curSelectCnt = getRangeById("T1");
			});
			
			$("#k_backspace").unbind("click").bind("click", function(){
				pressKey([this.id], this);
			});
		    $("#keyboard").unbind("click").bind("click",function(e){
		    	var x = e.clientX;
		    	var y = e.clientY - 146;
		    	for (var i in keyList[currentView]){
		    		var cur = keyList[currentView][i];
		    		if (cur[1] <= x && (cur[3] + cur[1]) >= x && cur[2] <= y && (cur[2]+cur[4]) >= y){
		    			pressKey(cur);
		    			//alert(cur[0]);
		    		}
		    	}
		    });
		    $("#k_enter").unbind("click").bind("click", function(e){
		    	pressKey([this.id], this);
		    });
		    $('#previouspostion').unbind("click").bind("click", function () {
		        if (currentPos != 0) {
		            currentPos--;
		            setCaretPosition(ObjectId, currentPos);
		        }
		        else {
		            setCaretPosition(ObjectId, 0);
		        }
		        currentPos = doGetCaretPosition(ObjectId);
		    });
		    $('#nextpostion').unbind("click").bind("click", function () {
		        currentPos++;
		        setCaretPosition(ObjectId, currentPos);
		        currentPos = doGetCaretPosition(ObjectId);
		    });
		    
		    $("#keyboard, " +
		    		"#maincontainer," +
		    		"#cursorposition," +
		    		"#previouspostion," +
		    		"#nextpostion," +
		    		"#k_enter," +
		    		"#k_backspace")
		    		.unbind("selectstart")
		    		.on("selectstart", function(){
		    			return false;
		    		});
		  
		}
		function uninstallKeyBoardEvent(){
			$("#T1,#T2").unbind("click").unbind("focus").unbind("change");
			$("#k_backspace").unbind("click");
			$("#keyboard").unbind("click");
			$("#k_enter").unbind("click");
		    $('#previouspostion').unbind("click");
		    $('#nextpostion').unbind("click");
		    
		    for(var i = 0; i < regObjList.length; i ++)
		    	$(regObjList[i]).unbind("focus");
		    CodeList = null;
		}
		
		this.RegisterKeyBoadr = function(obj, callback){
			
			regObjList.push(obj);
			$(obj).not('#T1,#T2').unbind("focus").bind("focus", function () {
				currentSearchText = $(this).attr("value");
		        d.target.relatedInput = this;
		        
		        
		        if ($(this).attr("type") == "password")
		        {
		        	$('#T2')[0].value = currentSearchText;
		        	d.target.input = $('#T2').show(); 
		        	$('#T1').hide();
		        	ObjectId = $('#T2').get(0);
		        	Transform("enFirst");
		        } else{
		        	$('#T1')[0].value = currentSearchText;
		        	$('#T2').hide();
		        	d.target.input = $('#T1').show();
		        	ObjectId = $('#T1').get(0);
		        }
		        
		        openkeyboard();
		    });
		}
		
		keyboardInit(opts);
		
		return this;
	}
})($);






