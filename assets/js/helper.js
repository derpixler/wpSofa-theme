console.log('fooo');

const WaveSurfer = require('wavesurfer');

var wavesurfer = WaveSurfer.create({
    container: '#waveform'
});

wavesurfer.load('https://cdn.podseed.org/wpsofa/wp-sofa-news-38.mp3');
