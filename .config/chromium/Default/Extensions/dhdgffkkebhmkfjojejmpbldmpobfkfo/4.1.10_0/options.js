window.sendMessage=function(a,b){a.origin="options";rea.extension.sendMessage(a,b)};Registry.require(["layout","curtain","i18n"],function(){var a=Registry.get("curtain"),b=Registry.get("i18n");Registry.get("layout").init("options.js",{suc:function(){a.wait(b.getMessage("Please_wait___"))},fail:function(){confirm(b.getOriginalMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_"))&&(window.location.href="http://tampermonkey.net/bug")}})});
