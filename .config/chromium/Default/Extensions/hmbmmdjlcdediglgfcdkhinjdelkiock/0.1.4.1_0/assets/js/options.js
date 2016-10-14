$(function() {
	var $awesome2 = $("#slider").slider({min: 0, max: 100, step: 2, value: 68});
    $awesome2.slider("pips", { prefix: "" }).slider("float");
	var defaultConfig={
		cfgver: 1.3,
		normal:{
			bold: 68
		},
	};
	function save_options() {
		chrome.storage.sync.set({
			bold: $('#slider').slider("option", "value")/100
		}, function() {
			// Update status to let user know options were saved.
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(function() {
				status.textContent = '';
			}, 750);
		});
	}
	function restore_options() {
		chrome.storage.sync.get({
			bold: defaultConfig.normal.bold
		}, function(items) {
			$("#slider").slider({min: 0, max: 100, step: 2, value: items.bold*100 });
		});
	}
	restore_options();
	document.getElementById('save').addEventListener('click', save_options);
	$( "a[href$='options']" ).click(function(){$("#options").show();$("#about").hide();});
	$( "a[href$='about']" ).click(function(){$("#options").hide();$("#about").show();});
	$("#about").hide();
});

