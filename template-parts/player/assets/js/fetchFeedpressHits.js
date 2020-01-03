const applyfilters = require( 'applyfilters' );

let fetchFeedpressHits = ( mediaPlayerCollection ) => {
	mediaPlayerCollectionLength = mediaPlayerCollection.length;
	postIds = [];

	if ( mediaPlayerCollectionLength > 0 ) {
		mediaPlayerCollection.forEach(mediaPlayer => {
			let playerParentNode = mediaPlayer.node.parentNode;
			let postId = playerParentNode != null ? playerParentNode.dataset.postId : null;

			if(postId){
				postIds.push(postId);
				mediaPlayer.postId = postId;
			}

		});

		if ( postIds.length > 0 ) {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if ( xhr.readyState === 4 ) {
					let hits = JSON.parse(JSON.parse(xhr.responseText));

					if(hits != {}){
						mediaPlayerCollection.forEach(mediaPlayer => {
							let hitsElem = mediaPlayer.node.parentNode.querySelector('.icon-cassette .hitsCount');
							if(hitsElem.innerText){
								hitsElem.innerText = hits[mediaPlayer.postId];
							}
						});
					}
				}
			};

			xhr.open( 'POST', window.wpsofa.rest_url + 'wpffph/v1/hits' );
			xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
			xhr.send( "ids=" + postIds.join(','));
		}
	}
};

applyfilters.addFilter( 'mediaPlayerCollection', ( resolve, mediaPlayerCollection ) => {
	fetchFeedpressHits(mediaPlayerCollection);
	resolve();
}, 1 );


