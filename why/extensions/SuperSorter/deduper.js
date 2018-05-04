function DuplicateView(a){Util.debug("DuplicateView constructor");try{this.containingElement=a}catch(b){throw Error(Util.reportError("DuplicateView constructor",b));}}DuplicateView.checkboxChanged=function(a){DuplicateView.updateDeleteButtonStatus(a)};DuplicateView.TIMEOUT_MILLISECONDS=5;
DuplicateView.selectAllButFirstPerGroup=function(a){Util.debug("DuplicateView.selectFirstInEachGroup");try{DuplicateView.setWorking(a,!0),setTimeout(function(){var b=a.getElementsByTagName("ul");Util.debug(b.length+" lists of duplicates found.");for(var c=0;c<b.length;c++)for(var e=b[c].getElementsByTagName("li"),f=0;f<e.length;f++)e[f].getElementsByTagName("input")[0].checked=0!==f;DuplicateView.setWorking(a,!1);DuplicateView.updateDeleteButtonStatus(a)},DuplicateView.TIMEOUT_MILLISECONDS)}catch(b){throw Error(Util.reportError("DuplicateView.selectFirstInEachGroup",
b));}};
DuplicateView.selectAllButLastPerGroup=function(a){Util.debug("DuplicateView.selectLastInEachGroup");try{DuplicateView.setWorking(a,!0),setTimeout(function(){var b=a.getElementsByTagName("ul");Util.debug(b.length+" lists of duplicates found.");for(var c=0;c<b.length;c++)for(var e=b[c].getElementsByTagName("li"),f=0;f<e.length;f++)e[f].getElementsByTagName("input")[0].checked=f!==e.length-1;DuplicateView.setWorking(a,!1);DuplicateView.updateDeleteButtonStatus(a)},DuplicateView.TIMEOUT_MILLISECONDS)}catch(b){throw Error(Util.reportError("DuplicateView.selectLastInEachGroup",b));
}};DuplicateView.invertSelection=function(a){Util.debug("DuplicateView.invertSelection");try{DuplicateView.setWorking(a,!0),setTimeout(function(){for(var b=a.ownerDocument.getElementById(DuplicateView.DUPLICATE_LIST_DIV_ID).getElementsByTagName("input"),c=0;c<b.length;c++)b[c].checked=!b[c].checked;DuplicateView.setWorking(a,!1);DuplicateView.updateDeleteButtonStatus(a)},DuplicateView.TIMEOUT_MILLISECONDS)}catch(b){throw Error(Util.reportError("DuplicateView.invertSelection",b));}};
DuplicateView.deleteDuplicates=function(a){Util.debug("DuplicateView.deleteDuplicates");try{DuplicateView.setWorking(a,!0),setTimeout(function(){var b=[],c=a.getElementsByTagName("input");Util.debug(c.length);for(var e=0;e<c.length;e++)if(c[e].checked){var f=c[e].id.split("_");2===f.length&&b.push(f[1])}else Util.debug("Unchecked :"+c[e].id);DeDuper2.deleteBookmarks(b,function(){DuplicateView.setWorking(a,!1);DuplicateView.refreshList(a)})},DuplicateView.TIMEOUT_MILLISECONDS)}catch(b){throw Error(Util.reportError("DuplicateView.deleteDuplicates",
b));}};DuplicateView.updateDeleteButtonStatus=function(a){var b=$("#"+DuplicateView.DUPLICATE_LIST_DIV_ID,a)[0];if(b){for(var b=b.getElementsByTagName("input"),d=!1,c=0;c<b.length;c++)if(b[c].checked&&!0===b[c].checked){d=!0;break}DuplicateView.toggleDeleteButton(a,d)}else Util.info("Erk - List element not found!")};
DuplicateView.toggleDeleteButton=function(a,b){try{var d=a.ownerDocument.getElementById("globalDeDupeButton");b?d.disabled=!1:(DuplicateView.hideConfirmCancelButtons(a),d.disabled=!0)}catch(c){throw Error(Util.reportError("DuplicateView.toggleDeleteButton",c));}};
DuplicateView.confirmDeletion=function(a){try{if(!a)throw Error("containingHtmlElement was undefined.");a.ownerDocument.getElementById("confirmCancelButtons").style.visibility="visible"}catch(b){throw Error(Util.reportError("DuplicateView.confirmDeletion",b));}};
DuplicateView.hideConfirmCancelButtons=function(a){try{if(!a)throw Error("containingHtmlElement was undefined.");a.ownerDocument.getElementById("confirmCancelButtons").style.visibility="hidden"}catch(b){throw Error(Util.reportError("DuplicateView.hideConfirmCancelButtons",b));}};DuplicateView.refreshList=function(a){Util.debug("DuplicateView.refreshList");a.ownerDocument.getElementById("deDupeGlobalButton").disabled=!0;DuplicateView.showAnimation(a);DuplicateView.clearList(a);DeDuper2.go(new DuplicateView(a))};
DuplicateView.clearList=function(a){Util.debug("DuplicateView.clearList");(a=a.ownerDocument.getElementById(DuplicateView.DUPLICATE_LIST_DIV_ID))?(console&&console.log&&console.log("Found list div."),listParent=a.parentNode,listParent.removeChild(a)):console&&console.log&&console.log("Didn't find list div.")};
DuplicateView.hide=function(a){try{DuplicateView.clearList(a),DuplicateView.hideConfirmCancelButtons(a),a.style.visibility="hidden",a.ownerDocument.getElementById("deDupeGlobalButton").disabled=!1}catch(b){throw Error(Util.reportError("DuplicateView.hide",b));}};
DuplicateView.deselectAll=function(a){Util.debug("DuplicateView.deselectAll");try{DuplicateView.setWorking(a,!0),setTimeout(function(){for(var b=a.ownerDocument.getElementById(DuplicateView.DUPLICATE_LIST_DIV_ID).getElementsByTagName("input"),c=0;c<b.length;c++)b[c].checked=!1;DuplicateView.setWorking(a,!1)},1)}catch(b){throw Error(Util.reportError("DuplicateView.deselectAll",b));}};DuplicateView.DUPLICATE_LIST_DIV_ID="globalDuplicateList";DuplicateView.DUPLICATE_LIST_DIV_CLASS="duplicateListDiv";
DuplicateView.BUTTON_DIV_ID="deDupeButtons";
DuplicateView.prototype={displayDuplicates2:function(a){Util.debug("DuplicateView.displayDuplicates2");try{if(!this.containingElement)throw Error("Cannot display duplicates since containingElement is null.");if(!a)throw Error("pathsArray argument was null.");Util.debug("DuplicateView.displayDuplicates2 is displaying "+a.length+" paths.");this.hideLoader();DuplicateView.hideConfirmCancelButtons(this.containingElement);var b=this.getUserPreferences(),d=!0,c="<div class='"+DuplicateView.DUPLICATE_LIST_DIV_CLASS+
"' id='"+DuplicateView.DUPLICATE_LIST_DIV_ID+"'><h2>Duplicate bookmarks</h2>";if(0<a.length){for(var e=0;e<a.length;e++){var f=a[e],g=f[f.length-1];if(0!==e)var h=a[e-1],d=0!==Sorter2.compareBookmarks(g,h[h.length-1],b);var k=DuplicateView.getPathAsString(f);0===e?c+="<ul>":!0===d&&(c+="</ul><ul>");c+="<li id='dupe_"+g.id+"'><input type='checkbox' id='delete_"+g.id+"'/>"+k+"</li>"}c+="</ul>"}else c+="<p>You have no duplicate bookmarks.",!0===b.ignoreBookmarksBar&&(c+=" (The Bookmarks Bar was ignored.)"),
c+="</p>";this.containingElement.innerHTML+=c+"</div>";$("#"+DuplicateView.DUPLICATE_LIST_DIV_ID).on("change","input:checkbox",function(){DuplicateView.checkboxChanged($("#dupeDisplay")[0])});this.containingElement.style.visibility="visible";DuplicateView.updateDeleteButtonStatus(this.containingElement)}catch(l){throw Error(Util.reportError("DuplicateView.displayDuplicates2",l));}},getUserPreferences:function(){try{if(!this.userPrefs&&(this.userPrefs=PrefsHelper.loadOptions(),!this.userPrefs))throw Error("Could not load user options.");
return this.userPrefs}catch(a){throw Error(Util.reportError("DuplicateView.getUserPreferences",a));}},showLoader:function(){DuplicateView.setWorking(this.containingElement,!0)},hideLoader:function(){DuplicateView.setWorking(this.containingElement,!1)}};DuplicateView.prototype.containingElement=null;DuplicateView.prototype.userPrefs=null;
DuplicateView.getPathString=function(a){Util.debug("DuplicateView.getPathString");try{var b="";a.sortByUpLevel();for(var d=0;d<a.array.length;d++){var c=a.array[a.array.length-(d+1)].bookmark;1<d&&(b+=" : ");c.url&&(b+="<a target='_blank' href='"+c.url+"'>");b=0===d?"":b+(c.title?c.title:"-");c.url&&(b+="</a>")}return b}catch(e){throw Error(Util.reportError("DuplicateView.getPathString",e));}};
DuplicateView.getPathAsString=function(a){Util.debug("DuplicateView.getPathAsString");try{for(var b="",d=0;d<a.length;d++){var c=a[d];1<d&&(b+=" : ");c.url&&(b+="<a target='_blank' href='"+c.url+"'>");b=0===d?"":b+(c.title?c.title:"-");c.url&&(b+="</a>")}return b}catch(e){throw Error(Util.reportError("DuplicateView.getPathAsString",e));}};
DuplicateView.hideAnimation=function(a){try{var b=a.ownerDocument;if(!b)throw Error("Couldn't find document.");var d=b.getElementById("deDupeLoaderSpan");d||Util.info("Couldn't find animation span.");d.style.visibility="hidden"}catch(c){throw Error(Util.reportError("DuplicateView.hideAnimation",c));}};DuplicateView.disableDupeButtons=function(a){DuplicateView.toggleDupeButtons(a,!1)};DuplicateView.enableDupeButtons=function(a){DuplicateView.toggleDupeButtons(a,!0);DuplicateView.updateDeleteButtonStatus(a)};
DuplicateView.toggleDupeButtons=function(a,b){for(var d=a.ownerDocument.getElementById(DuplicateView.BUTTON_DIV_ID).getElementsByTagName("button"),c=0;c<d.length;c++)d[c].disabled=!b};
DuplicateView.setWorking=function(a,b){Util.debug("DuplicateView.setWorking("+a+", "+b+")");try{!0===b?(DuplicateView.hideConfirmCancelButtons(a),DuplicateView.showAnimation(a),DuplicateView.disableDupeButtons(a)):(DuplicateView.hideAnimation(a),DuplicateView.enableDupeButtons(a))}catch(d){throw new Util.reportError("DuplicateView.setWorking",d);}};
DuplicateView.showAnimation=function(a){try{var b=a.ownerDocument;if(!b)throw Error("Couldn't find document.");var d=b.getElementById("deDupeLoaderSpan");d||Util.info("Couldn't find animation span.");d.style.visibility="visible"}catch(c){throw Error(Util.reportError("DuplicateView.showAnimation",c));}};function DeDuper2(){}DeDuper2.name="DeDuper2";DeDuper2.BOOKMARKS_BAR_ID=1;
DeDuper2.go=function(a){try{DeDuper2.write("DeDuper2.go"),DeDuper2.getPaths(function(b){DeDuper2.handlePaths(b,a)})}catch(b){throw Error(Util.reportError("DeDuper2.go",b));}};DeDuper2.getPaths=function(a){try{chrome.bookmarks.getTree(function(b){DeDuper2.handleTree(b,a)})}catch(b){throw Error(Util.reportError("DeDuper2.getPaths",b));}};
DeDuper2.handleTree=function(a,b){try{var d=PrefsHelper.loadOptions();if(!d)throw Error("Could not load preferences!");DeDuper2.write("bmTree items: "+a.length);var c=a[0];if(!c)throw Error("Could not find root.");var e=DeDuper2.buildPaths(c,[c],d);"function"===typeof b&&b(e)}catch(f){throw Error(Util.reportError("DeDuper2.handleTree",f));}};
DeDuper2.buildPaths=function(a,b,d){try{if(!d)throw Error("prefs argument was nothing!");var c=[];if(!0===d.ignoreBookmarksBar&&a.id==BookmarkSortPrefs.BOOKMARKS_BAR_ID)DeDuper2.write("DeDuper2.buildPaths: ignoring the Bookmarks Bar.");else if(c.push(b),a.children)for(var e=0;e<a.children.length;e++){var f=a.children[e];if(!f)throw Error("Child at index "+e+" was nothing!");var g=[],g=g.concat(b);g.push(f);c=c.concat(DeDuper2.buildPaths(f,g,d))}return c}catch(h){throw Error(Util.reportError("DeDuper2.buildPaths",
h));}};
DeDuper2.handlePaths=function(a,b){try{Array.prototype.contains||(Array.prototype.contains=function(a){for(var b=this.length;b--;)if(this[b]===a)return!0;return!1});if(!a)throw Error("pathsArray argument was nothing.");DeDuper2.write("Paths: "+a.length);var d=[],c=PrefsHelper.loadOptions();DeDuper2.sortPathsByLeafThenPath(a,c);DeDuper2.write("Sorted paths.");for(var e=1;e<a.length;e++){var f=a[e-1],g=a[e],h=f[f.length-1],k=g[g.length-1];h.url&&k.url&&!0===(0===Sorter2.compareBookmarks(h,k,c))&&(DeDuper2.write("DUPLICATE 1: "+
h.title+"|"+h.url),DeDuper2.write("DUPLICATE 2: "+k.title+"|"+k.url),d.contains(f)||d.push(f),d.push(g))}b.displayDuplicates2(d)}catch(l){throw Error(Util.reportError("DeDuper2.handlePaths",l));}};DeDuper2.sortPathsByLeafThenPath=function(a,b){a.sort(function(a,c){var e=Sorter2.compareBookmarks(a[a.length-1],c[c.length-1],b);if(0!==e)return e;var e=DeDuper2.getPathString(a),f=DeDuper2.getPathString(c);return DeDuper2.comparePathStrings(e,f,b)})};
DeDuper2.comparePathStrings=function(a,b,d){try{if(!a)throw Error("pathString1 was nothing!");if(!b)throw Error("pathString2 was nothing!");if(!d)throw Error("prefs was nothing!");d.caseSensitive||(a=a.toLowerCase(),b=b.toLowerCase());return a<b?-1:a>b?1:0}catch(c){throw Error(Util.reportError("DeDuper2.comparePathStrings",c));}};
DeDuper2.getPathString=function(a){try{if(!a)throw Error("orderedBookmarkArray was nothing.");for(var b="",d=0;d<a.length;d++){0<d&&(b+=" : ");var c=a[d];if(!c)throw Error("Item at index "+d+" was nothing.");b+=c.title?c.title:"-"}return b}catch(e){throw Error(Util.reportError("DeDuper2.getPathString",e));}};
DeDuper2.deleteBookmarks=function(a,b){Util.debug("DeDuper2.deleteBookmarks");try{for(var d=new Devign.Sequence,c=0;c<a.length;c++)d.add(function(a,b){return function(b){chrome.bookmarks.remove(a,function(){b.next()})}}(a[c],d));b&&(d.onEnd=function(){b()});d.start()}catch(e){throw Error(Util.reportError("DeDuper2.deleteBookmarks",e));}};DeDuper2.WRITE_MODE="debug";DeDuper2.write=function(a){"info"===DeDuper2.WRITE_MODE?Util.info(a):Util.debug(a)};
