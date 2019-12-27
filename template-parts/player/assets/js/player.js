const localstorage = require('@web-dev-media/localstorage');
const hash = require('object-hash');

const player = () => {
	const mediaPlayer = document.querySelector( '.player' );


	console.log( {
		localstorage: localstorage,
		hash        : hash( {fooo:'bar'} )
	});
};

export default player;