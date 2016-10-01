/* 
 * LivePage is based on Live.js by Martin Kool (@mrtnkl). 
 * Rewritten by Mike Rogers (@MikeRogers0)
 */
function livePage(config) {
  // Set up some defaults variables
  this.options = config;
  this.options.enabled = true;
  this.resources = [];
  this.lastChecked = 0;
  this.url = document.URL;
};

/*
 * Asks the page to scan itself, than looks for elements to track.
 */
livePage.prototype.scanPage = function() {
  // Add resources checkers in here
  if (this.options.monitor_css == true) {
    this.scanCSS();
  }

  if (this.options.monitor_js == true) {
    this.scanJS();
  }

  if (this.options.monitor_custom == true) {
    this.scanCustom();
  }

  if (this.options.monitor_html == true) {
    this.addResource( new LiveResource(this.url) );
  }

  // Randomise the checking process, so were not hitting groups the same of files.
  this.resources.sort(function() {
    return 0.5 - Math.random();
  });

  this.checkBatch();
}

livePage.prototype.scanJS = function(){
  elements = document.querySelectorAll('script[src*=".js"]');
  for (var key = 0; key < elements.length; key++) {
    this.addResource(new LiveResource(elements[key].src));
  }
};

livePage.prototype.scanCSS = function(){
  styleSheets = document.styleSheets;

  for (var key = 0; key < styleSheets.length; key++) {
    var sheet = styleSheets[key];

    if (sheet) {
      // If it has a href we can monitor
      if (sheet.href) {
        this.addResource(new LiveCSSResource(sheet.href, sheet.media.mediaText, sheet.ownerNode));
        var sheet_folder = sheet.href.replace(sheet.href.split('/').pop(), '');
      } else {
        var sheet_folder = '';
      }

      // Now lets checks for @import stuff within this stylesheet.
      if (sheet.cssRules) {
        for (var ruleKey = 0; ruleKey < sheet.cssRules.length; ruleKey++) {
          var rule = sheet.cssRules[ruleKey];

          if (rule && rule.href) {
            var rule_href = (function() {
              if (rule.href.indexOf("//") == 0) {
                return window.location.protocol + rule.href;
              }

              if (rule.href.indexOf("http://") == 0 || rule.href.indexOf("https://") == 0  || rule.href.indexOf("/") == 0) {
                return rule.href;
              }

              // Convert http://127.0.0.1:4000/spec/css/index.html to http://127.0.0.1:4000/spec/css/
              // then add the current href on.
              var url_parts = document.URL.split("/");
              url_parts.pop();
              var recombined_url = url_parts.join("/") + "/";
              return recombined_url  + rule.href;
            });

            this.addResource(new LiveResource(rule_href()));
          }
        }
      }
    }
  }
};

livePage.prototype.scanCustom = function(){
  elements = document.querySelectorAll('link[rel="livePage"]');
  for (var key = 0; key < elements.length; key++) {
    if (elements[key].href) {
      this.addResource(new LiveResource(elements[key].href));
    }
  }
};

/*
 * Adds live resources to the list of trackable objects.
 */
livePage.prototype.addResource = function(resource) {
  // Normalize the URL
  resource.url = this.normalizeURL(resource.url);

  // Check the URL is ok
  if (!this.trackableURL(resource.url)) {
    return false;
  }

  this.resources[this.lastChecked++] = resource;
}

/*
 *
 */
livePage.prototype.removeResource = function(url) {
  for (r in this.resources) {
    if (this.resources[r].url == url) {
      delete this.resources[r];
    }
  }

  // Now shuffle the stack.
  this.resources.sort(function() {
    return 0.5 - Math.random();
  });
}

/*
 * Normalise the URL. - Remove anything after a #
 */
livePage.prototype.normalizeURL = function(url) {

  if (this.options.ignore_anchors == true) {
    url = url.split('#');
    return url[0];
  }
  return url;
}

/*
 * saveScrollPosition / restoreScrollPosition
 * Keeps page looking at some scrolll position
 * Handy for when you're working on the bottom of a page between
 * reloads and redraws.
 */
livePage.prototype.saveScrollPosition = function() {
  if( !this.options.persist_scroll_points ){
    return;
  }

  sessionStorage.setItem("livepage-scrollpoints", JSON.stringify({
    scrollX: window.scrollX,
    scrollY: window.scrollY
  }));
}

livePage.prototype.restoreScrollPosition = function() {
  if( !this.options.persist_scroll_points ){
    return;
  }
  
  var scrollPoints = JSON.parse(sessionStorage.getItem("livepage-scrollpoints"));

  // No points? Don't restore anything.
  if(scrollPoints == null){
    return false;
  }

  window.scroll(scrollPoints.scrollX, scrollPoints.scrollY);

  sessionStorage.removeItem("livepage-scrollpoints");
}

/*
 * Tells LivePage if the URL is ok.
 */
livePage.prototype.trackableURL = function(url) {
  // from: http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
  if (this.options.skip_external == false) {
    return true;
  }

  match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return false;
  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {
    "http:": 80,
    "https:": 443
  }[location.protocol] + ")?$"), "") !== location.host) return false;
  return true;
}

/*
 * Lets us check the resources in small batches.
 */
livePage.prototype.checkBatch = function() {
  if (this.options.enabled == false) {
    return false;
  }
  this.check();
}

/*
 * Triggers a resource check.
 */
livePage.prototype.check = function() {
  // Que up the next resource, if it dosen't exist start again.
  this.lastChecked++;
  if (this.resources[this.lastChecked] == undefined) {
    this.lastChecked = 0;
    if (this.resources[this.lastChecked] == undefined) { // Nothing left to check
      $livePage.options.enabled = false;
      return;
    }
  }

  this.resources[this.lastChecked].check(function(){
    setTimeout(function() { $livePage.checkBatch(); }, $livePage.options.refresh_rate);
  });
}

if (typeof $livePageConfig == "object") {
  var $livePage = new livePage($livePageConfig);
  $livePage.restoreScrollPosition();
  $livePage.scanPage();
}
