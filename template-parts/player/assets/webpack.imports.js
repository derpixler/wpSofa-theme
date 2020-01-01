document.addEventListener( 'DOMContentLoaded', function( event ) {
	let mediaPlayer = document.querySelectorAll( ".podcastPlayer" );

	import(/* webpackChunkName: "player-scss" */'./scss/player.scss');

	window.observeElements( mediaPlayer, () => {
		import(/* webpackChunkName: "player-scss" */'./scss/player-lazy.scss');
		import(/* webpackChunkName: "player-js" */ "./js/likeEpisode.js").then( controls => {} );
		import(/* webpackChunkName: "player-js" */ "./js/player.js").then( mediaPlayer => {
			new mediaPlayer.default();
		} );
	} );

});