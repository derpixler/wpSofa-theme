document.addEventListener( 'DOMContentLoaded', function( event ) {
	import(/* webpackChunkName: "styles-scss" */'../scss/font.scss');
	import(/* webpackChunkName: "styles-scss" */'../scss/styles.scss');

	let heighlighter = document.querySelectorAll( "pre code" );

	window.observeElements( heighlighter, (codeBLock) => {
		import(/* webpackChunkName: "heighlight-scss" */'../scss/prism.scss');
			const Prism = require('prismjs');
			codeBLock.innerHTML = Prism.highlight(codeBLock.innerText, Prism.languages.javascript, 'javascript');
	}, {loop: false} );
});