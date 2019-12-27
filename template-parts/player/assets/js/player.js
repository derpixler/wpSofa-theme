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
					progressBar: '.progress .status',
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

						playerControls.currentTime = player.querySelector( '.current-time' );

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
				[ 'play', 'pause', 'timeupdate', 'loadeddata'].map( event => {
					player.audio.addEventListener( event, (e) => this[event](player) );
				});

				player.controls.startStop.addEventListener('click', (e) => this.playStop(e.currentTarget, player));

			});
		}
	}

	playStop(playStopElem, player){
		let btn = playStopElem.querySelector('div');
		const classes = {
			play: 'play',
			pause: 'pause'
		};

		if(btn.classList.contains(classes.play)){
			btn.classList.remove(classes.play);
			btn.classList.add(classes.pause);

			playStopElem.classList.remove(classes.play);
			playStopElem.classList.add(classes.pause);

			player.audio.play();
		}else{
			btn.classList.remove(classes.pause);
			btn.classList.add(classes.play);

			playStopElem.classList.remove(classes.pause);
			playStopElem.classList.add(classes.play);

			player.audio.pause();
		}
	}

	playerTimeUpdater(player){
		let currTimeElem = player.controls.currentTime;
		let currentTime = player.audio.currentTime ? player.audio.currentTime : localstorageHandle.get(player.hash + '_currentTime');

		if(player.audio.currentTime) {
			currTimeElem.innerText = this.formatSecondsAsTime( currentTime );
		}
	}

	play(player){
		this.playerTimeUpdater(player);
	}

	pause(player){
		this.playerTimeUpdater(player);
	}

	timeupdate(player){
		this.playerTimeUpdater(player);

		if(player.audio.currentTime) {
			let currTimeElem = player.controls.currentTime;
			let percent = Math.floor( ( 100 / player.audio.duration) * player.audio.currentTime );

			player.controls.progressBar.style.width = percent + '%';

			switch (percent) {
				case 95:
					currTimeElem.dataset.progress = "95";
					break;
				case 80:
					currTimeElem.dataset.progress = "80";
					break;
				case 50:
					currTimeElem.dataset.progress = "50";
					break;
				case 25:
					currTimeElem.dataset.progress = "25";
					break;
				default:
					currTimeElem.dataset.progress = "0";
					break;
			}

		}
	}

	loadeddata(player){
		//console.log(player);
	}

	formatSecondsAsTime(secs) {
		var hr  = Math.floor(secs / 3600);
		var min = Math.floor((secs - (hr * 3600))/60);
		var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

		if (min < 10){
			min = "0" + min;
		}
		if (sec < 10){
			sec  = "0" + sec;
		}
		if (hr < 10){
			hr  = "0" + hr;
		}

		return hr + ':' + min + ':' + sec;
	}

}

exports = module.exports = mediaPlayer;