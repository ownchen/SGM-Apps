function jspScroller(elemList, overrideScroll){

	var defaultContentHeight = 325;
	var contentHeight = $("#leftBox").height() || defaultContentHeight;
	
	if (overrideScroll){
		registerListener();
	}

	function registerListener(){
		elemList.bind('jsp-initialised', function(){
			elemList.find(".jspArrowDown")
				.unbind()
				.bind('mousedown.jsp', elemList, downArrowClicked);

			elemList.find(".jspArrowUp")
				.unbind()
				.bind('mousedown.jsp', elemList, upArrowClicked);
		});
	}
	
	function getContentTop(){
		var api = elemList.data("jsp");
		return api.getContentPositionY();
	}
	
	function itemTopIsVisible(item){
		var contentTop = getContentTop();
		var contentBottom = contentTop + contentHeight;
		var itemTop = item.position().top;
		var itemBottom = itemTop + item.height();
		
		return (itemTop >= contentTop) && (itemTop <= contentBottom);
	}
	
	function itemBottomIsVisible(item){
		var contentTop = getContentTop();
		var contentBottom = contentTop + contentHeight;
		var itemTop = item.position().top;
		var itemBottom = itemTop + item.height();
		
		return (itemBottom >= contentTop) && (itemBottom <= contentBottom);
	}
	
	function itemIsVisible(item){
		return itemBottomIsVisible(item) || itemTopIsVisible(item);
	}

	this.getCurrentItem = function() {
		
		var contentPosition = getContentTop();

		var items = elemList.find("ul li");
		if (items.length == 0)
			return null;

		if (contentPosition === 0) {
			return $(items[0]);
		}

		for ( var i = 0; i < items.length; i++) {
			item = $(items[i]);
			if (itemIsVisible(item)) {
				return item;
			}
		}
		return $(items.last());
	};
	
	this.getNextItem = function(curItem){
		
		if (!curItem){
			curItem = this.getCurrentItem();
			if (!curItem){
				return null;
			}
		}
		
		var nextItem = curItem.next();
		if (nextItem.length == 0 || nextItem.attr("class") != curItem.attr("class")) {
			return null;
		}
		return nextItem;
	};
	
	this.scrollToTop = function(){
		var api = elemList.data("jsp");
		api.scrollToY(0);
	}
	
	this.scrollDown = function(){
		var api = elemList.data("jsp");
		api.scrollByY(arrowSpeed);
	}
	
	function upArrowClicked(e){
		var jspScroller = e.data.getScroller();
		var curItem = jspScroller.getCurrentItem();
		if (!curItem)
			return;
		
		var api = e.data.data("jsp");
		var prevItem = curItem.prev();
		if (prevItem.length == 0){
			api.scrollToY(0);
			return;
		}
		api.scrollToElement(prevItem, true, false);
	}
	
	function downArrowClicked(e){
		var jspScroller = e.data.getScroller();
		var curItem = jspScroller.getCurrentItem();
		if (!curItem)
			return;
		
		var api = e.data.data("jsp");
		if (!itemBottomIsVisible(curItem)){
			// 滚动到当前条目的底部
			api.scrollToElement(curItem, false, false);
			return;
		}
		
		var nextItem = curItem.next();
		api.scrollToElement(nextItem, true, false);
		
	}

}

function extendJspInitialise(){
	var definition = {
			initJsp:function(overrideScroll, arrowSpeed){
				var scroller = new jspScroller(this, overrideScroll);
				this.data("jspScroller", scroller);
				this.jScrollPane({
					'showArrows': true,
					'maintainPosition': true,
					'clickOnTrack': false,
					'animateScroll': false,
					animateDuration: 300,
					verticalDragMinHeight:50,
					verticalDragMaxHeight:100,
					arrowButtonSpeed:arrowSpeed		
				});
//				console.debug("initJsp: " + this[0].id);
			},
			reInitJsp:function(){
				var api = this.data("jsp");
				if (api){
					api.reinitialise();
//					console.debug("reInitJsp: " + this[0].id);
				}
			},
			getScroller:function(){
				return this.data("jspScroller");
			},
			getScrollPane:function(){
				if (this.attr("jspListBox") == ""){
					return this;
				} else {
					return this.parents("[jspListBox]");
				}
			}
	}
	$.fn.extend(definition);
}

extendJspInitialise();

