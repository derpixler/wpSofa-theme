const applyfilters = require( 'applyfilters' );
const localstorageHandle = require( '@web-dev-media/localstorage' );

const likeEpisode = ( mediaPlayerObject ) => {
  const likeEpisodeObject = {
    construct: () => {
      console.log(likeEpisodeObject);
    },
    fetch: {
        localStorage: () => {},
        restApi: () => {}
    },
    toggle: {
        class: () => {},
        state: () => {}
    },
  };

  if(mediaPlayerObject){
    return new Promise((resolve, reject) => {
      likeEpisodeObject.construct();
    });
  }
};

/*
const likeEpisode = ( mediaPlayerObject, resolve ) => {
  const storageKey = '_episode_liked';

  if ( mediaPlayerObject ) {
    const mediaPlayerParentNode = mediaPlayerObject.node.parentNode;
    const liked                 = localstorageHandle.get( mediaPlayerObject.hash + storageKey );
    const likeBtn               = mediaPlayerParentNode.querySelector( '.episodeLike' );
    const likeCount             = mediaPlayerObject.likes !== undefined ? mediaPlayerObject.likes : null;

    //resolve();
    // rotate-vert-center

    if (!likeCount) {
      console.log({
        likes: mediaPlayerObject.likes,
        mediaPlayerParentNode: mediaPlayerParentNode,
        liked: liked,
        likeBtn: likeBtn,
        likeCount: likeCount,
      });



      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if ( xhr.readyState === 4 ) {
            likeBtn.innerHTML = xhr.responseText.replace( '"', '' ).replace( '"', '' );
            mediaPlayerObject.likes = JSON.parse( xhr.responseText );
            resolve();
          }
        };

        xhr.open( 'POST', window.wpsofa.rest_url + 'wpsofa/v1/like_post/get' );
        xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
        xhr.send( 'id=' + mediaPlayerParentNode.dataset.postId );
      });
    }

    /!*
    if ( liked === null ) {
      if ( likeBtn ) {
        likeBtn.addEventListener( 'click', () => {
          const liked = localstorageHandle.get( mediaPlayerObject.hash + storageKey );

          if ( liked === null ) {
            new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function() {
                if ( xhr.readyState === 4 ) {
                  likeBtn.innerHTML = JSON.parse(xhr.responseText);
                  likeBtn.classList.remove( 'icon-star-regular' );
                  likeBtn.classList.add( 'icon-heart-solid' );
                }
              };

              xhr.open( 'POST', window.wpsofa.rest_url + 'wpsofa/v1/like_post/put' );
              xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
              xhr.send( 'id=' + mediaPlayerParentNode.dataset.postId );

              localstorageHandle.update( mediaPlayerObject.hash + storageKey, true );
            });
          }
        } );
      }
    } else {
      likeBtn.classList.remove('icon-heart-light');
      likeBtn.classList.add('icon-heart-solid');
    }*!/
  }
};
*/


applyfilters.addFilter( 'mediaPlayerObject', ( resolve, mediaPlayerObject ) => {
  likeEpisode( mediaPlayerObject, resolve ).then(
    resolve()
  );
}, 1 );


