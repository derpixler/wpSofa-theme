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
 *
 * @return {Promise}
 */
const likeEpisode = async ( mediaPlayerObject ) => {

  /** @constant {string} */
  const storageKey = '_episode_liked';
  const restBaseUrl = window.wpsofa.rest_url;

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
      const mediaPlayerParentNode = mediaPlayerObject.node.parentNode;
      const likeCount = parseInt(mediaPlayerObject.likes !== undefined ? mediaPlayerObject.likes : 0);
      const liked     = localstorageHandle.get( mediaPlayerObject.hash + storageKey );
      const likeBtn   = mediaPlayerParentNode.querySelector( '.episodeLike' );

      if ( !likeCount ) {
        likeEpisodeObject.fetch.restApi(
          'like_post/get',
          {
            id: mediaPlayerParentNode.dataset.postId
          }
        ).then(
          data => console.log( data )
        );
      }
    },

    /**
     * @namespace LikeEpisodeObject/fetch
     * @property {function} localStorage  - read and store data in users localstorage
     * @property {async.function} restApi - fetch wpsofa/v1 wordpress rest endpoint
     */
    fetch: {
      localStorage: () => {},

      /**
       * Async wordpress restApi fetch method
       *
       * @example  likeEpisodeObject.fetch.restApi( 'like_post/get', {id: 987}, 'GET').then();
       *
       * @namespace LikeEpisodeObject/fetch/restApi
       * @param {string} restPath - restApi base path
       * @param {object} args - request arguments {post_id: 23, post_foo: 'bar'}
       * @param {string} method - request method, means GET or POST - default method is POST
       *
       * @return {Promise|string} - response data
       */
      restApi: async (restPath, args, method = 'POST') => {
        if(restBaseUrl === undefined){
          console.warn('RestBaseUrl is undefined. Define a "restBaseUrl" like window.wpsofa.rest_url = "URL"');
          return;
        }

        let fetchSettings = {
          method : method,
          headers: {
            Accept        : 'application/json',
            'Content-Type': 'application/json',
          }
        };

        const setFetchBody = (args) => {
          let a = [];

          if(typeof args === "object"){
            for (let arg in args) {
              if(args.hasOwnProperty(arg)) {
                a.push( arg + "=" + args[ arg ] );
              }
            }
          }

          return a;
        };

        const fetchBody = setFetchBody(args);

        if(method === 'POST' && fetchBody.length > 0) {
          fetchSettings.body = JSON.stringify(fetchBody);
        }else if(method === 'GET'){
          restPath += '?' + fetchBody.join('&');
        }


        if(restPath !== ''){
          await fetch( restBaseUrl + 'wpsofa/v1/' + restPath, fetchSettings )
            .then( ( response ) => response.text() )
            .then( ( contents ) => {
              console.log(contents);
              return contents;
            } )
            .catch( () => console.log( 'Can`t access ' + url + ' response. Blocked by browser?' ) );
        }
      }
    },

    toggle: {
        class: () => {},
        state: () => {}
    },
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


