let actionBtn = document.querySelector(".btn-primary[data-load-assets]");

actionBtn.addEventListener('click', () => {
	import(/* webpackChunkName: "player-js" */ "./js/player.js").then(player => {
		import(/* webpackChunkName: "player-scss" */'./scss/player.scss');

		import(/* webpackChunkName: "player-js" */ "./js/controls.js").then(controls => {

		});
	});
});


