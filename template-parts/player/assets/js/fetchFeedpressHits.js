const applyfilters = require( 'applyfilters' );
const hash = require( 'object-hash' );
const localstorageHandle = require( '@web-dev-media/localstorage' );

let fetchFeedpressHits = ( mediaPlayerCollection ) => {
	mediaPlayerCollectionLength = mediaPlayerCollection.length;
	postIds = [];
	const storageKeyBase = 'fetchedHits_';

	const updateHits = function( hits, fromCache ) {
		hits = JSON.parse( JSON.parse( hits ) );

		if ( hits !== undefined ) {
			mediaPlayerCollection.forEach( mediaPlayer => {
				let hitsElems = mediaPlayer.node.parentNode.querySelectorAll( '.hitsCount' );
				mediaPlayer.hits = hits[ mediaPlayer.postId ];

				hitsElems.forEach( hitsElem => {
					let currentAmount = hitsElem.innerText;
					let fetchedHits = hits[ mediaPlayer.postId ];

					console.log(fetchedHits);

					if ( fetchedHits > currentAmount ) {
						hitsElem.innerText = currentAmount;
					}
				} );
			} );
		}
	};

	if ( mediaPlayerCollectionLength > 0 ) {
		mediaPlayerCollection.forEach( mediaPlayer => {
			let playerParentNode = mediaPlayer.node.parentNode;
			let postId = playerParentNode != null ? playerParentNode.dataset.postId : null;
			;

			if ( postId && mediaPlayer.hits === undefined ) {
				postIds.push( postId );
				mediaPlayer.postId = postId;
			}
		} );

		let timestamp = localstorageHandle.get( storageKeyBase + hash( postIds ) + '_timestamp' );
		let hits = Date.now() - timestamp > (
			1000 * 60 * 60
		) ? null : localstorageHandle.get( storageKeyBase + hash( postIds ) );

		if ( !hits && postIds.length > 0 ) {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if ( xhr.readyState === 4 ) {
					localstorageHandle.update( storageKeyBase + hash( postIds ), xhr.responseText );
					localstorageHandle.update( storageKeyBase + hash( postIds ) + '_timestamp', Date.now() );
					updateHits( xhr.responseText );
				}
			};

			xhr.open( 'POST', window.wpsofa.rest_url + 'wpffph/v1/hits' );
			xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
			xhr.send( "ids=" + postIds.join( ',' ) );
		} else {
			updateHits( hits, true );
		}
	}
};

applyfilters.addFilter( 'mediaPlayerCollection', ( resolve, mediaPlayerCollection ) => {
	fetchFeedpressHits( mediaPlayerCollection );
	resolve();
}, 1 );


