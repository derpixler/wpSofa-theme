(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{11:function(e,t,a){var r=a(18),o=a(19);r.addFilter("mediaPlayerObject",(function(e,t){!function(e){if(e){var t=o.get(e.hash+"_episode_liked"),a=e.node.parentNode.querySelector(".episodeLike");void 0!==e.likes&&e.likes;console.log({before:e.likes}),e.likes||new Promise((function(t,r){var o=new XMLHttpRequest;o.onreadystatechange=function(){4===o.readyState&&(a.innerHTML=o.responseText.replace('"',"").replace('"',""),e.likes=JSON.parse(o.responseText),t())},o.open("POST",window.wpsofa.rest_url+"wpsofa/v1/like_post/get"),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send("id="+e.node.parentNode.dataset.postId)})),null===t?a&&a.addEventListener("click",(function(){null===o.get(e.hash+"_episode_liked")&&new Promise((function(t,r){var s=new XMLHttpRequest;s.onreadystatechange=function(){4===s.readyState&&(a.innerHTML=JSON.parse(s.responseText),a.classList.remove("icon-star-regular"),a.classList.add("icon-star-solid"))},s.open("POST",window.wpsofa.rest_url+"wpsofa/v1/like_post/put"),s.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s.send("id="+e.node.parentNode.dataset.postId),o.update(e.hash+"_episode_liked",!0)}))})):(a.classList.remove("icon-star-regular"),a.classList.add("icon-star-solid"))}}(t),e()}),1)},8:function(e,t,a){var r=a(18),o=a(20),s=a(19);r.addFilter("mediaPlayerCollection",(function(e,t){!function(e){mediaPlayerCollectionLength=e.length,postIds=[];var t=function(t,a){a=a||!1,(t=JSON.parse(JSON.parse(t)))&&e.forEach((function(e){var a=e.node.parentNode.querySelectorAll(".hitsCount");e.hits=t[e.postId],a.forEach((function(a){a.innerText&&(a.innerText=t[e.postId])}))}))};if(mediaPlayerCollectionLength>0){e.forEach((function(e){var t=e.node.parentNode,a=null!=t?t.dataset.postId:null;a&&void 0===e.hits&&(postIds.push(a),e.postId=a)}));var a=s.get("fetchedHits_"+o(postIds)+"_timestamp"),r=Date.now()-a>36e5?null:s.get("fetchedHits_"+o(postIds));if(!r&&postIds.length>0){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&(s.update("fetchedHits_"+o(postIds),n.responseText),s.update("fetchedHits_"+o(postIds)+"_timestamp",Date.now()),t(n.responseText))},n.open("POST",window.wpsofa.rest_url+"wpffph/v1/hits"),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send("ids="+postIds.join(","))}else t(r,!0)}}(t),e()}),1)},9:function(e,t,a){function r(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=a(18),s=a(19),n=a(20),i=function(){function e(){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===window.wpsofa.player){var t={storage_key:"wpsofa-player-storage",currentPos:0,selectors:{player:".player",controls:{startStop:".media-action",progressBar:".progress",progressBarStatus:".progress .status",duration:".status"}}};o.doFilter("mediaPlayerOptions",t).then((function(){return t})),this.options=t,this.players=[],s.options.cacheTime=-1,this.collectPlayers(),this.players.length>0&&(window.wpsofa.player=this.players,this.addEvents(),o.doFilter("mediaPlayerCollection",this.players).then((function(){return t})))}}var t,a,i;return t=e,(a=[{key:"collectPlayers",value:function(){var e=this;if(e.options.selectors){var t=e.options.selectors.player;if(t){var a=document.querySelectorAll(t);[].forEach.call(a,(function(a){var r={},s={},i=a.querySelector("audio"),u=i.querySelectorAll("source");if(u){for(t in[].forEach.call(u,(function(e){var t=e.getAttribute("type");s[t]=e.getAttribute("src")})),e.options.selectors.controls)r[t]=a.querySelector(e.options.selectors.controls[t]);r.currentTime=a.querySelector(".current-time");var l={node:a,audio:i,controls:r,sources:s,sourcesNodes:u,hash:n(s)};o.doFilter("mediaPlayerObject",l).then((function(){return l})),e.players.push(l)}}))}}}},{key:"addEvents",value:function(){var e=this;this.players&&this.players.forEach((function(t){s.update(t.hash+"_isPlaying",!1),["play","pause","timeupdate"].map((function(a){t.audio.addEventListener(a,(function(r){return e[a](t)}))})),t.controls.startStop.addEventListener("click",(function(a){return e.playStop(a.currentTarget,t)})),t.controls.progressBar.addEventListener("click",(function(a){return e.seek(a,t)})),e.timeupdate(t)}))}},{key:"playStop",value:function(e,t){var a=e.querySelector("div"),r="play",o="pause";a.classList.contains(r)?(a.classList.remove(r),a.classList.add(o),e.classList.remove(r),e.classList.add(o),t.audio.play(),t.audio.currentTime=s.get(t.hash+"_currentTime"),s.update(t.hash+"_isPlaying",!0)):(a.classList.remove(o),a.classList.add(r),e.classList.remove(o),e.classList.add(r),t.audio.pause(),s.update(t.hash+"_isPlaying",!1))}},{key:"play",value:function(e){this.playerTimeUpdater(e)}},{key:"pause",value:function(e){this.playerTimeUpdater(e)}},{key:"timeupdate",value:function(e){var t=e.audio.currentTime?e.audio.currentTime:s.get(e.hash+"_currentTime"),a=e.audio.duration?e.audio.duration:s.get(e.hash+"_duration");if(t){var r=e.controls.currentTime,o=Math.floor(100/a*t);e.controls.progressBarStatus.style.width=o+"%",r.dataset.progress=o>85?"85":o>70?"70":o>45?"45":o>15?"15":"0",!0===s.get(e.hash+"_isPlaying")&&null!=a&&(s.update(e.hash+"_currentTime",e.audio.currentTime),s.update(e.hash+"_duration",e.audio.duration)),[].forEach.call(e.sourcesNodes,(function(e){var a=e.getAttribute("src");e.setAttribute("src",a.split("#")[0]+"#t="+t)})),this.playerTimeUpdater(e)}}},{key:"playerTimeUpdater",value:function(e){var t=e.controls.currentTime,a=e.audio.currentTime?e.audio.currentTime:s.get(e.hash+"_currentTime");a&&(t.innerText=this.formatSecondsAsTime(a))}},{key:"formatSecondsAsTime",value:function(e){var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),r=Math.floor(e-3600*t-60*a);return a<10&&(a="0"+a),r<10&&(r="0"+r),t<10&&(t="0"+t),t+":"+a+":"+r}},{key:"seek",value:function(e,t){var a=e.offsetX/t.node.offsetWidth;t.audio.currentTime=a*t.audio.duration,s.update(t.hash+"_currentTime",t.audio.currentTime),s.update(t.hash+"_duration",t.audio.duration),this.timeupdate(t)}}])&&r(t.prototype,a),i&&r(t,i),e}();e.exports=i}}]);