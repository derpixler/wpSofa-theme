import("./assets/js/player").then(Text => {
	import(/* webpackChunkName: "player.scss" */ './assets/scss/player.scss');

	import("./assets/js/controls").then(Text => {
		// you can access Text inside here.
	});	// you can access Text inside here.
});