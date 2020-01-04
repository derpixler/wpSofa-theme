const applyfilters = require( 'applyfilters' );
const hash = require( 'object-hash' );
const localstorageHandle = require( '@web-dev-media/localstorage' );

let fetchFeedpressHits = ( mediaPlayerCollection ) => {
	mediaPlayerCollectionLength = mediaPlayerCollection.length;
	postIds = [];
	const storageKeyBase = 'fetchedHits_';

	const updateHits = function(hits, fromCache) {
		fromCache = fromCache || false;
		hits = JSON.parse(JSON.parse(hits));

		if(hits){
			mediaPlayerCollection.forEach(mediaPlayer => {
				let hitsElem = mediaPlayer.node.parentNode.querySelector('.icon-cassette .hitsCount');
				mediaPlayer.hits = hits[mediaPlayer.postId];

				if(hitsElem.innerText){
					hitsElem.innerText = hits[mediaPlayer.postId];
				}
			});
		}
	};

	if ( mediaPlayerCollectionLength > 0 ) {
		mediaPlayerCollection.forEach(mediaPlayer => {
			let playerParentNode = mediaPlayer.node.parentNode;
			let postId = playerParentNode != null ? playerParentNode.dataset.postId : null;;

			if(postId && mediaPlayer.hits === undefined){
				postIds.push(postId);
				mediaPlayer.postId = postId;
			}
		});

		let timestamp = localstorageHandle.get(storageKeyBase + hash(postIds) + '_timestamp');
		let hits = Date.now() - timestamp > (1000*60*60) ? null : localstorageHandle.get(storageKeyBase + hash(postIds));

		if ( !hits && postIds.length > 0) {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if ( xhr.readyState === 4 ) {
					localstorageHandle.update(storageKeyBase + hash(postIds), xhr.responseText);
					localstorageHandle.update(storageKeyBase + hash(postIds) + '_timestamp', Date.now());
					updateHits(xhr.responseText);
				}
			};

			xhr.open( 'POST', window.wpsofa.rest_url + 'wpffph/v1/hits' );
			xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
			xhr.send( "ids=" + postIds.join(','));
		}else{
			updateHits(hits, true);
		}
	}
};

applyfilters.addFilter( 'mediaPlayerCollection', ( resolve, mediaPlayerCollection ) => {
	fetchFeedpressHits(mediaPlayerCollection);
	resolve();
}, 1 );


