document.addEventListener( 'DOMContentLoaded', function( event ) {
	import(/* webpackChunkName: "styles-scss" */'../scss/font.scss');
	import(/* webpackChunkName: "styles-scss" */'../scss/styles.scss');

	let heighlighter = document.querySelectorAll( "pre code" );

	console.log(heighlighter);
/*

	window.observeElements( heighlighter, () => {
		import(/!* webpackChunkName: "heighlight-scss" *!/'../scss/heighlight.scss');
		import(/!* webpackChunkName: "heighlight-js" *!/ "./heighlight.js").then( controls => {
			const hljs = require('./highlight.js');
			console.log('heighlight');
			hljs.highlightBlock(heighlighter);
		} );
	}, {loop: false} );
*/

});