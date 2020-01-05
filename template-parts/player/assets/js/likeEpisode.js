const applyfilters = require( 'applyfilters' );
const localstorageHandle = require( '@web-dev-media/localstorage' );


let likeEpisode = ( mediaPlayerObject ) => {
	const storageKey = '_episode_liked';

	if ( mediaPlayerObject ) {
		let liked = localstorageHandle.get( mediaPlayerObject.hash + storageKey );
		let likeBtn = mediaPlayerObject.node.parentNode.querySelector( '.episodeLike' );
		let likeCount = mediaPlayerObject.likes !== undefined ? mediaPlayerObject.likes : null;

		console.log({before: mediaPlayerObject.likes});

		if(!mediaPlayerObject.likes) {
			new Promise((resolve, reject) => {
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if ( xhr.readyState === 4 ) {
						likeBtn.innerHTML = xhr.responseText.replace( '"', '' ).replace( '"', '' );
						mediaPlayerObject.likes = JSON.parse( xhr.responseText );
						resolve();
					}
				};

				xhr.open( 'POST', window.wpsofa.rest_url + 'wpsofa/v1/like_post/get' );
				xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
				xhr.send( "id=" + mediaPlayerObject.node.parentNode.dataset.postId );
			});
		}

		if ( liked === null ) {

			if ( likeBtn ) {
				likeBtn.addEventListener( 'click', () => {
					let liked = localstorageHandle.get( mediaPlayerObject.hash + storageKey );

					if ( liked === null ) {

						new Promise((resolve, reject) => {
							let xhr = new XMLHttpRequest();
							xhr.onreadystatechange = function() {
							if ( xhr.readyState === 4 ) {
								likeBtn.innerHTML =  JSON.parse(xhr.responseText);
								likeBtn.classList.remove( 'icon-star-regular' );
								likeBtn.classList.add( 'icon-star-solid' );
							}
						};

							xhr.open( 'POST', window.wpsofa.rest_url + 'wpsofa/v1/like_post/put' );
							xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
							xhr.send( "id=" + mediaPlayerObject.node.parentNode.dataset.postId );

							localstorageHandle.update( mediaPlayerObject.hash + storageKey, true );
						});
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


