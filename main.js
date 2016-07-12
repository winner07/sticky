function sticky(elements){
	var elementRect;
	var tempPlaceEl = document.createElement("div");
	tempPlaceEl.className = "temp-placeholder";
	
	// Toggle sticky elements
	function toggleSticky(windowTop){
		var current;
		
		for(var i = 0, l = elementRect.length; i < l; i++){
			current = elementRect[i].element;

			// Set sticky element
			if(windowTop >= elementRect[i].rect.top && !current.classList.contains("is-sticky")){
				// Style for sticky
				current.style.width = elementRect[i].rect.width + "px";
				current.style.position = "fixed";
				current.style.top = 0;
				current.style.left = elementRect[i].rect.left + "px";
				current.classList.add("is-sticky");
				
				console.log(i);
				
				// Temporary placeholder element
				tempPlaceEl.style.height = elementRect[i].rect.height + "px";
				tempPlaceEl.style.marginTop = elementRect[i].rect.marginTop;
				tempPlaceEl.style.marginBottom = elementRect[i].rect.marginBottom;
				current.parentNode.insertBefore(tempPlaceEl.cloneNode(), current.nextSibling);
			} else if(windowTop < elementRect[i].rect.top && current.classList.contains("is-sticky")){
				// Remove sticky element
				current.removeAttribute("style");
				current.classList.remove("is-sticky");
				current.parentNode.removeChild(current.nextSibling);
			}
		}
	}
	
	// Get size of an elements
	function getElementsRect(){
		elementRect = [];
		
		// Iterate over elements for sticky and write its rect size
		[].forEach.call(elements, function(current){
			var rect;
			var elementForRect;

			if(!current.classList.contains("is-sticky")){
				elementForRect = current;
			} else {
				elementForRect = current.nextSibling;
			}
			
			rect = {
				top : Math.round(elementForRect.getBoundingClientRect().top + window.pageYOffset),
				left : Math.round(elementForRect.getBoundingClientRect().left),
				width : Math.round(elementForRect.getBoundingClientRect().width),
				height : elementForRect.offsetHeight,
				marginTop : window.getComputedStyle(elementForRect).getPropertyValue("margin-top"),
				marginBottom : window.getComputedStyle(elementForRect).getPropertyValue("margin-bottom")
			}
			
			elementRect.push({
				element : current,
				rect : rect
			});
		});
	}
	
	// Resize already sticky elements
	function resizeStickyElements(){
		[].forEach.call(elements, function(current){
			var tempCurrent;
			var tempCurrentRect;
			
			if(current.classList.contains("is-sticky")){
				tempCurrent = current.nextSibling;
				tempCurrentRect = tempCurrent.getBoundingClientRect();
				current.style.width = Math.round(tempCurrentRect.width) + "px";
				current.style.left = Math.round(tempCurrentRect.left) + "px";
				tempCurrent.style.height = current.offsetHeight + "px";
			}
		});
	}
	
	// Init
	(function(){
		getElementsRect();
		
		window.addEventListener("scroll", function(){
			toggleSticky(window.pageYOffset);
		}, false);
		
		window.addEventListener("resize", function(){
			getElementsRect();
			resizeStickyElements();
		}, false);
	})();
}

document.addEventListener("DOMContentLoaded", function(){
	sticky(document.getElementsByClassName("post-title"));
}, false);