(function() {
	chrome.storage.sync.get({
		bold: 0.68
	}, function(items) {
		var css = "* {\n text-shadow: transparent 0px 0px 0px, rgba(0,0,0,"+items.bold+") 0px 0px 0px !important; \n}";
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
		} else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node);
			}
		}
	});
})();
