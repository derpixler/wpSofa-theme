const localstorageHandle = require( '@web-dev-media/localstorage' );
const hash = require( 'object-hash' );

class mediaPlayer {
	constructor() {
		this.options = {
			storage_key: 'wpsofa-player-storage',
			currentPos : 0,
			selectors  : {
				player  : '.player',
				controls: {
					startStop  : '.media-action',
					progressBar: '.progress',
					duration: '.status'
				}
			}
		};

		this.players = [];

		localstorageHandle.options.cacheTime = -1;

		this.collectPlayers();

		if(this.players.length > 0) {
			this.addEvents();
		}

		console.log( {
			localstorage: localstorageHandle,
			players     : this.players
		} );
	}

	collectPlayers() {
		let self = this;

		if ( self.options.selectors ) {
			let selector = self.options.selectors.player;

			if ( selector ) {
				let players = document.querySelectorAll( selector );

				[].forEach.call( players, function( player ) {
					let playerControls = {};
					let playerSources = {};

					let audio = player.querySelector( 'audio' );
					let sources = player.querySelectorAll( 'source' );

					if ( sources && audio ) {
						[].forEach.call( sources, function( source ) {
							let type = source.getAttribute( 'type' );
							playerSources[ type ] = source.getAttribute( 'src' );
						} );

						for ( selector in self.options.selectors.controls ) {
							playerControls[ selector ] = player.querySelector( self.options.selectors.controls[ selector ] );
						}

						self.players.push( {
							node    : player,
							audio   : audio,
							controls: playerControls,
							sources : playerSources,
							hash    : hash( playerSources )
						} );
					}

				} );
			}
		}
	}

	addEvents() {
		if(this.players) {
			this.players.forEach(player => {
				[ 'play', 'pause', 'progress', 'timeupdate', 'loadeddata'].map( event => {
					//player.audio.addEventListener( event, (e) => mediaPlayer[event](player, e) );
				});

				player.controls.startStop.addEventListener('click', (e) => this.playStop(e, player));

			});
		}
	}

	playStop(playStopElem, player){
		console.log({
			playStopElem:playStopElem,
			player:player
		});
	}

}

exports = module.exports = mediaPlayer;