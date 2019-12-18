<?php

function child_theme_styles() {
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));

	echo '<pre>';
	print_r([
		        'DEBUG_LOCATION' => ['PATH' => dirname(__FILE__), 'FILE' => basename(__FILE__), 'FUNCTION' => __FUNCTION__ . ':' . __LINE__],
		        'DEBUG'          => [
			        'glob' => glob(get_stylesheet_directory() . '/assets/dist/style.*.css' ),
		        ]
	        ]);
	die();

	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

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
