<?php

/**
 * load wpsoaf theme assets like styles & scripts
 */
function wpsofa_enqueue_assets() {
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));

	$assetsPath = '/assets/dist/';

	foreach(glob(get_stylesheet_directory() . $assetsPath . '*.bundle.*.js') as $i => $assetFile) {
		$assetFile       = basename($assetFile);
		$assetFileHash   = explode('.', $assetFile)[2];
		$assetFileHandle = explode('.', $assetFile)[0];

		wp_enqueue_script('js-webpack-' . $assetFileHandle, get_stylesheet_directory_uri() . $assetsPath . $assetFile, NULL, $assetFileHash);

		if($i === 0){
			wp_add_inline_script('js-webpack-' . $assetFileHandle, '
			window.wpsofa = {
				stylesheet_directory_uri: "' . get_stylesheet_directory_uri() . '",
				stylesheet_directory: "' . get_stylesheet_directory() . '",
				template_parts_uri: "template-parts"
			};', TRUE);
		}
	}
}

add_action('wp_enqueue_scripts', 'wpsofa_enqueue_assets');

/**
 * Google Font einbinden
 */

function load_google_fonts() {
	wp_register_style('googleFonts', 'http://fonts.googleapis.com/css?family=Roboto+Slab:400,700');
	wp_enqueue_style('googleFonts');
}

add_action('wp_print_styles', 'load_google_fonts');