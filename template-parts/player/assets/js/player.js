
    import WaveSurfer from 'wavesurfer.js';

    var wavesurfer = WaveSurfer.create( {
        container: document.querySelector( '.wave' ),
        backend  : 'MediaElement'
    } );

    wavesurfer.load( 'http://cdn.podseed.org/webschale/wp-sofa/wp-sofa-02.mp3' );

    /*document
      .querySelector( '[data-action="play"]' )
      .addEventListener( 'click', wavesurfer.playPause.bind( wavesurfer ) );
*/