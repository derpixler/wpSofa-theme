(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{7:function(e,t,r){function a(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var o=r(18),s=r(19),n=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={storage_key:"wpsofa-player-storage",currentPos:0,selectors:{player:".player",controls:{startStop:".media-action",progressBar:".progress .status",duration:".status"}}},this.players=[],o.options.cacheTime=-1,this.collectPlayers(),this.players.length>0&&this.addEvents()}var t,r,n;return t=e,(r=[{key:"collectPlayers",value:function(){var e=this;if(e.options.selectors){var t=e.options.selectors.player;if(t){var r=document.querySelectorAll(t);[].forEach.call(r,(function(r){var a={},o={},n=r.querySelector("audio"),i=r.querySelectorAll("source");if(i&&n){for(t in[].forEach.call(i,(function(e){var t=e.getAttribute("type");o[t]=e.getAttribute("src")})),e.options.selectors.controls)a[t]=r.querySelector(e.options.selectors.controls[t]);a.currentTime=r.querySelector(".current-time"),e.players.push({node:r,audio:n,controls:a,sources:o,hash:s(o)})}}))}}}},{key:"addEvents",value:function(){var e=this;this.players&&this.players.forEach((function(t){["play","pause","timeupdate","loadeddata"].map((function(r){t.audio.addEventListener(r,(function(a){return e[r](t)}))})),t.controls.startStop.addEventListener("click",(function(r){return e.playStop(r.currentTarget,t)}))}))}},{key:"playStop",value:function(e,t){var r=e.querySelector("div"),a="play",o="pause";r.classList.contains(a)?(r.classList.remove(a),r.classList.add(o),e.classList.remove(a),e.classList.add(o),t.audio.play()):(r.classList.remove(o),r.classList.add(a),e.classList.remove(o),e.classList.add(a),t.audio.pause())}},{key:"playerTimeUpdater",value:function(e){var t=e.controls.currentTime,r=e.audio.currentTime?e.audio.currentTime:o.get(e.hash+"_currentTime");e.audio.currentTime&&(t.innerText=this.formatSecondsAsTime(r))}},{key:"play",value:function(e){this.playerTimeUpdater(e)}},{key:"pause",value:function(e){this.playerTimeUpdater(e)}},{key:"timeupdate",value:function(e){if(this.playerTimeUpdater(e),e.audio.currentTime){var t=e.controls.currentTime,r=Math.floor(100/e.audio.duration*e.audio.currentTime);e.controls.progressBar.style.width=r+"%",t.dataset.progress=r>95?"90":r>80?"75":r>50?"50":r>25?"25":"0"}}},{key:"loadeddata",value:function(e){}},{key:"formatSecondsAsTime",value:function(e){var t=Math.floor(e/3600),r=Math.floor((e-3600*t)/60),a=Math.floor(e-3600*t-60*r);return r<10&&(r="0"+r),a<10&&(a="0"+a),t<10&&(t="0"+t),t+":"+r+":"+a}}])&&a(t.prototype,r),n&&a(t,n),e}();e.exports=n},8:function(e,t){}}]);
//# sourceMappingURL=player-js.chunk.js.map