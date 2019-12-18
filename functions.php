<?php

function child_theme_styles() {
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));

	$assetsPath = '/assets/dist/';
	$cssFiles = glob(get_stylesheet_directory() . $assetsPath . 'style.*.css' );

	foreach($cssFiles as $cssFile){
        $cssFile = basename($cssFile);
        $cssFileHash = explode('.',$cssFile);
	    wp_enqueue_style('style-' . $cssFileHash[1], get_stylesheet_directory_uri() . $assetsPath . $cssFile, null, $cssFileHash[1]);
    }
}

add_action('wp_enqueue_scripts', 'child_theme_styles');

/**
 * Google Font einbinden
 */

function load_google_fonts() {
	wp_register_style('googleFonts', 'http://fonts.googleapis.com/css?family=Roboto+Slab:400,700');
	wp_enqueue_style('googleFonts');
}

add_action('wp_print_styles', 'load_google_fonts');
