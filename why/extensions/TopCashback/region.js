var origin=window.location.origin;$(document).ready(function(){window.postMessage({tcbstatus:"ready"},origin),$(".country-opt").click(function(t){t.preventDefault(),chrome.runtime.sendMessage({cmd:"countrysel",countrydata:JSON.parse($(this).attr("data-country"))})})}),chrome.runtime.onMessage.addListener(function(t,n,e){"undefined"!=typeof t.tcbstatus&&window.postMessage(t,origin)});