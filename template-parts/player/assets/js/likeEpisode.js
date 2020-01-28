const localstorageHandle = require( '@web-dev-media/localstorage' );

/**
 * fetch and store likes for an media player object
 *
 * @author web dev media UG  <info@web-dev-media.de>
 * @version 1.2.0
 *
 * @namespace LikeEpisode
 *
 * @return {Promise}
 */
const likeEpisode = async () => {
  /** @constant {string} likeEpisode.storageKey */
  const storageKey = '_episode_liked';

  /** @constant {string}  likeEpisode.restBaseUrl */
  const restBaseUrl = window.wpsofa.rest_url;

  /** @var {int} currentLikes */
  let currentLikes = 0;

  /**
   * @namespace LikeEpisodeObject
   * @property {function} init  - initialise likeEpisode method
   * @property {object} fetch   - provides methods for fetch data via restAPi and localstorage
   * @property {object} toggle  - handle toggle events
   */
  const likeEpisodeObject = {
    /**
     * @constant {int} likeCount  - exiting like counts
     * @constant {bool} liked     - still liked episode by fetch state from users localstorage
     * @constant {Node} likeBtn
     */
    init: ( resolve, reject ) => {
      const likeBtnNodes = document.querySelectorAll( '.episodeLike' );

      if ( likeBtnNodes ) {
        likeBtnNodes.forEach( ( likeBtn ) => {
          likeEpisodeObject.validate.datasetAttributes( likeBtn, reject );

          if ( likeBtn ) {

            /* switch classes if already liked */
            if (likeEpisodeObject.validate.liked( likeBtn )) {
              likeEpisodeObject.toggle.classes(likeBtn);
            }

            /* update likeBtn count state */
            likeEpisodeObject.fetch.restApi(
                'get', {
                  id: likeBtn.dataset.episodeId,
                } ).then( () => {
              likeBtn.innerHTML = likeEpisode.currentLikes;
              resolve();
            } );

            /* handle like update if user have not liked yet*/
            likeEpisodeObject.toggle.eventListener( likeBtn, 'click', likeEpisodeObject.events.click );
          }
        } );
      }
    },

    /**
     * Collection of events methods
     *
     * @namespace LikeEpisodeObject/events
     * @property {function} click - click event for likeBtn
     */
    events: {
      /**
       * Handle the click on a likeBtn
       * @namespace LikeEpisodeObject/events/click
       * @param {Node} event - MouseClickEvent
       */
      click: ( event ) => {
        const likeBtn = event.target;

        likeEpisodeObject.fetch.restApi(
            'put', {
              id: likeBtn.dataset.episodeId,
            },
        ).then( () => {
          likeEpisodeObject.toggle.classes( likeBtn );
          likeBtn.innerHTML = likeEpisode.currentLikes;

          localstorageHandle.update( likeBtn.dataset.episodeId + storageKey, true );
          likeEpisodeObject.toggle.eventListener( likeBtn, 'click', likeEpisodeObject.events.click );
        } );
      },
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
      restApi: async ( restPath, args ) => {
        if ( restBaseUrl === undefined ) {
          console.warn( 'RestBaseUrl is undefined. Define a "restBaseUrl" like window.wpsofa.rest_url = "URL"' );
          return;
        }

        if ( args === undefined ) {
          console.warn( 'POST arguments are missing' );
          return;
        }

        const fetchSettings = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( args ),
        };

        if ( restPath !== '' ) {
          await fetch( restBaseUrl + 'wpsofa/v1/like_post/' + restPath, fetchSettings )
              .then( ( response ) => response.json() )
              .then( ( contents ) => {
                return likeEpisodeObject.setCurrentLikes( contents );
              } )
              .catch( () => console.log( 'Can`t access ' + restPath + ' response. Blocked by browser?' ) );
        }
      },
    },

    /**
     * Collection of toggle methods
     *
     * @namespace LikeEpisodeObject/toggle
     * @property {function} classes - change classes on likeBtn node
     * @property {function} eventListener - add ore remove eventListener on a node
     */
    toggle: {
      /**
       * Change classes on likeBtn node
       *
       * @namespace LikeEpisodeObject/toggle/classes
       * @param {Node} node
       * @return void
       */
      classes: ( node ) => {
        node.classList.remove( 'icon-heart-light' );
        node.classList.add( 'rotate-vert-center' );
        node.classList.add( 'icon-heart-solid' );
      },

      /**
       * Toggle eventListener for an note
       *
       * @namespace LikeEpisodeObject/toggle/eventListener
       * @param {Node} node
       * @param {string} event - eventListener like click ..
       * @param {function} callback
       *
       * @return void
       */
      eventListener: ( node, event, callback ) => {
        likeEpisodeObject.validate.liked( node ) === null ? node.addEventListener( event, callback ) : node.removeEventListener( event, callback );
      },
    },

    /**
     * Collection of validators
     *
     * @namespace LikeEpisodeObject/validate
     * @property {function} liked - validator for liked stats
     */
    validate: {
      datasetAttributes: ( likeBtn, reject ) => {
        if ( !likeBtn.dataset.episodeId ) {
          console.error( new Error('\n Dataset \'episodeId\' are undefined! \n Define a data attribute on your \'.episodeLike\' Element. \n example: <span class=\'episodeLike\' data-episode-id=\'[VALUE]]\'></span>' ));
          reject();
        }

        return true;
      },

      liked: ( node ) => {
        return localstorageHandle.get( node.dataset.episodeId + storageKey );
      },
    },

    /**
     * setter for likeEpisode.currentLikes
     * @param {string} likes - counter for likes
     * @return {string}
     */
    setCurrentLikes: ( likes ) => {
      likeEpisode.currentLikes = likes;
    },
  };

  new Promise( ( resolve, reject ) => {
    likeEpisodeObject.init( resolve, reject );
  } );
};

new likeEpisode();


