const applyfilters = require( 'applyfilters' );
const localstorageHandle = require( '@web-dev-media/localstorage' );

let likeEpisode = ( mediaPlayerObject ) => {
	const storageKey = '_episode_liked';

	if ( mediaPlayerObject ) {
		let liked = localstorageHandle.get( mediaPlayerObject.hash + storageKey );
		let likeBtn = mediaPlayerObject.node.parentNode.querySelector( '[class^="icon-star-"]' );

		if ( liked === null ) {

			if ( likeBtn ) {
				likeBtn.addEventListener( 'click', () => {
					let liked = localstorageHandle.get( mediaPlayerObject.hash + storageKey );

					if ( liked === null ) {
						let xhr = new XMLHttpRequest();
						xhr.onreadystatechange = function() {
							if ( xhr.readyState === 4 ) {
								likeBtn.innerHTML = xhr.responseText;
								likeBtn.classList.remove( 'icon-star-regular' );
								likeBtn.classList.add( 'icon-star-solid' );
							}
						};

						xhr.open( 'POST', window.wpsofa.ajax_url );
						xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
						xhr.send( "action=like_episode&post_id=" + mediaPlayerObject.node.parentNode.dataset.postId );

						localstorageHandle.update( mediaPlayerObject.hash + storageKey, true );
					}
				} );
			}
		}else{
			likeBtn.classList.remove('icon-star-regular');
			likeBtn.classList.add('icon-star-solid');
		}
	}
};

applyfilters.addFilter( 'mediaPlayerObject', ( resolve, mediaPlayerObject ) => {
	likeEpisode( mediaPlayerObject );
	resolve();
}, 1 );


