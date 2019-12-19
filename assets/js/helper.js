console.log('fooo');

    import WaveSurfer from 'wavesurfer.js';

    var wavesurfer = WaveSurfer.create( {
        container: document.querySelector( '#wave' ),
        backend  : 'MediaElement'
    } );

    wavesurfer.load( 'http://wpsofa.podcast/wp-content/themes/wpsofa-theme/assets/WCEU-Waputett.WAV' );

    document
      .querySelector( '[data-action="play"]' )
      .addEventListener( 'click', wavesurfer.playPause.bind( wavesurfer ) );
