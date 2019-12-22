let player = document.querySelector(".podcastPlayer");
window.loadIsInView(player, () => {
	import(/* webpackChunkName: "player-js" */ "./js/player.js").then(player => {
		import(/* webpackChunkName: "player-scss" */'./scss/player.scss');
		import(/* webpackChunkName: "player-js" */ "./js/controls.js").then(controls => {});
	});
});