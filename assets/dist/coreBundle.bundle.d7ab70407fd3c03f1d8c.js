!function(e){function t(t){for(var o,n,i=t[0],s=t[1],a=0,l=[];a<i.length;a++)n=i[a],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&l.push(r[n][0]),r[n]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(u&&u(t);l.length;)l.shift()()}var o={},r={0:0};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.e=function(e){var t=[],o=r[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=i);var s,a=document.createElement("script");a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.src=function(e){return n.p+""+({4:"styles-scss"}[e]||e)+".chunk.js"}(e);var u=new Error;s=function(t){a.onerror=a.onload=null,clearTimeout(l);var o=r[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+n+": "+i+")",u.name="ChunkLoadError",u.type=n,u.request=i,o[1](u)}r[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:a})}),12e4);a.onerror=a.onload=s,document.head.appendChild(a)}return Promise.all(t)},n.m=e,n.c=o,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="wp-content\\themes\\wpsofa-theme/assets/dist/",n.oe=function(e){throw console.error(e),e};var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var a=0;a<i.length;a++)t(i[a]);var u=s;n(n.s=0)}([function(e,t,o){o(1),e.exports=o(2)},function(e,t,o){o.e(4).then(o.t.bind(null,4,7)),console.log("helper")},function(e,t){window.loadIsInView=function(e,t,o){var r={loop:(o=o||{}).loop||!1,ratio:o.ratio||0};if(e){var n=new IntersectionObserver((function(e){for(var o in e)if(e){var i=e[o],s=e[o].target;void 0===i.isVisible&&(i.isVisible=!0),(i.isIntersecting&&i.isVisible||i.intersectionRatio>r.ratio)&&(t(s,i),!1===r.loop&&n.unobserve(s))}}),{ratio:r.ratio});NodeList.prototype.isPrototypeOf(e)?e.forEach((function(e){n.observe(e)})):n.observe(e)}else console.warn("Call of fireOnVisible without any Node or NodeList will be ignored.")}}]);
//# sourceMappingURL=coreBundle.bundle.d7ab70407fd3c03f1d8c.js.map