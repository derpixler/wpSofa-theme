<?php

/**
 * load wpsoaf theme assets like styles & scripts
 */
function wpsofa_enqueue_assets() {
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));

	$assetsPath = get_stylesheet_directory() . '/assets/dist/';
	$assetsJson = '/assets.json';

	if(file_exists($assetsPath . $assetsJson)){
		$assets = file_get_contents($assetsPath . $assetsJson);
	}



	echo '<pre>';
	print_r([
		        'DEBUG_LOCATION' => ['PATH' => dirname(__FILE__), 'FILE' => basename(__FILE__), 'FUNCTION' => __FUNCTION__ . ':' . __LINE__],
		        'DEBUG'          => [
			        '$assets' => $assets,
		        ]
	        ]);
	die();

	foreach($cssFiles as $cssFile){
        $cssFile = basename($cssFile);
        $cssFileHash = explode('.',$cssFile);
	    wp_enqueue_style('style-' . $cssFileHash[1], get_stylesheet_directory_uri() . $assetsPath . $cssFile, null, $cssFileHash[1]);
    }

	$jsFiles = glob(get_stylesheet_directory() . $assetsPath . 'main.*.js' );

	foreach($jsFiles as $jsFile){
		$jsFile = basename($jsFile);
		$jsFileHash = explode('.',$jsFile);
		wp_enqueue_script('js-' . $jsFileHash[1], get_stylesheet_directory_uri() . $assetsPath . $jsFile, null, $jsFileHash[1]);
		wp_script_add_data( 'js-' . $jsFileHash[1], 'async', true );
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