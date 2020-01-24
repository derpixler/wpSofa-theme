const applyfilters = require( 'applyfilters' );
const localstorageHandle = require( '@web-dev-media/localstorage' );

/**
 * fetch and store likes for an media player object
 *
 * @author web dev media UG  <info@web-dev-media.de>
 * @version 1.2.0
 *
 * @namespace LikeEpisode
 * @param {object} mediaPlayerObject
 * @param {function} resolve
 *
 * @return {Promise}
 */
const likeEpisode = async ( mediaPlayerObject, resolve ) => {

  /** @constant {string} */
  const storageKey = '_episode_liked';

  /** @constant {string} */
  const restBaseUrl = window.wpsofa.rest_url;

  /** @var {int} */
  let currentLikes = 0;

  /**
   * @namespace LikeEpisodeObject
   * @property {function} init  - initialise likeEpisode method
   * @property {object} fetch   - provides methods for fetch data via restAPi and localstorage
   * @property {object} toggle  - handle toggle events
   */
  const likeEpisodeObject = {

    /**
     * @constant {Node} mediaPlayerParentNode
     * @constant {int} likeCount  - exiting like counts
     * @constant {bool} liked     - still liked episode by fetch state from users localstorage
     * @constant {Node} likeBtn
     */
    init: () => {
      const likeBtnNodes   = document.querySelectorAll( '.episodeLike' );

      if(likeBtnNodes){
        likeBtnNodes.forEach( (likeBtn) => {
          likeEpisodeObject.validate.datasetHash(likeBtn);
          likeEpisodeObject.validate.datasetEpisodeId(likeBtn);

          const liked = localstorageHandle.get( likeBtn.dataset.episodeHash + storageKey );

          if(likeBtn) {
            /* update likeBtn count state */
            likeEpisodeObject.fetch.restApi(
              'get', {
                id: likeBtn.dataset.episodeId
              }).then( () => {
              likeBtn.innerHTML = likeEpisode.currentLikes;
            } );


            /* handle like update if user have not liked yet*/
            if ( liked === null ) {
              likeBtn.addEventListener( 'click', likeEpisodeObject.events.click(this));
            }else{
              likeBtn.removeEventListener('click');
            }

          }
        });
      }
    },

    events: {
      click: (likeBtn) => {
        likeEpisodeObject.fetch.restApi(
          'put', {
            id: likeBtn.dataset.episodeId
          }
        ).then( () => {
          likeBtn.innerHTML = likeEpisode.currentLikes;
          localstorageHandle.update( mediaPlayerObject.hash + storageKey, true );
        } );
      }
    },

    /**
     * Collection of fetch methods like fetch restApi
     *
     * @namespace LikeEpisodeObject/fetch
     * @property {async.function} restApi - fetch wpsofa/v1 wordpress rest endpoint
     */
    fetch: {
      /**
       * Async wordpress restApi fetch method
       * @namespace LikeEpisodeObject/fetch/restApi
       *
       * @example  likeEpisodeObject.fetch.restApi( 'like_post/get', {id: 987}, 'GET').then();
       *
       * @param {string} restPath - restApi base path
       * @param {object} args - request arguments {post_id: 23, post_foo: 'bar'}
       *
       * @return {Promise|string} - response data
       */
      restApi: async (restPath, args) => {
        if(restBaseUrl === undefined){
          console.warn('RestBaseUrl is undefined. Define a "restBaseUrl" like window.wpsofa.rest_url = "URL"');
          return;
        }

        if(args === undefined){
          console.warn('POST arguments are missing');
          return;
        }

        let fetchSettings = {
          method : 'POST',
          headers: {
            Accept        : 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args)
        };

        if(restPath !== ''){
          await fetch( restBaseUrl + 'wpsofa/v1/like_post/' + restPath, fetchSettings )
            .then( ( response ) => response.json() )
            .then( ( contents ) => {
              return likeEpisodeObject.setCurrentLikes(contents);
            } )
            .catch( () => console.log( 'Can`t access ' + restPath + ' response. Blocked by browser?' ) );
        }
      }
    },

    toggle: {
        class: () => {},
        state: () => {}
    },

    /**
     * Collection of validators
     *
     * @namespace LikeEpisodeObject/validate
     * @property {function} datasetHash - validator for dataset.episodeHash
     */
    validate: {
        datasetHash: ( likeBtn ) => {
          if ( !likeBtn.dataset.episodeHash ) {
            throw new Error( "\n Dataset 'episodeHash' is undefined! \n Define a data attribute on your '.episodeLike' Element. \n example: <span class='episodeLike' data-episode-hash='[VALUE]]'></span>");
          }

          return true;
        },
        datasetEpisodeId: ( likeBtn ) => {
          if ( !likeBtn.dataset.episodeId ) {
            throw new Error( "\n Dataset 'episodeId' is undefined! \n Define a data attribute on your '.episodeLike' Element. \n example: <span class='episodeLike' data-episode-id='[VALUE]]'></span>");
          }

          return true;
        }
    },

    /**
     * setter for likeEpisode.currentLikes
     * @param {string} likes - counter for likes
     * @return {string}
     */
    setCurrentLikes: (likes) => {
      likeEpisode.currentLikes = likes;
    }
  };

  if(mediaPlayerObject){
    return new Promise((resolve, reject) => {
       likeEpisodeObject.init();
    });
  }
};

/*
const likeEpisode = ( mediaPlayerObject, resolve ) => {
  const storageKey = '_episode_liked';

    //resolve();
    // rotate-vert-center

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


