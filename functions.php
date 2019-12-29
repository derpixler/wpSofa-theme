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

		wp_enqueue_script('js-webpack-' . $assetFileHandle, get_stylesheet_directory_uri() . $assetsPath . $assetFile, NULL, $assetFileHash, true);

		if($i === 0){
			wp_add_inline_script('js-webpack-' . $assetFileHandle, '
			window.wpsofa = {
				stylesheet_directory_uri: "' . get_stylesheet_directory_uri() . '",
				stylesheet_directory: "' . get_stylesheet_directory() . '",
				template_parts_uri: "template-parts",
				ajax_url: "' . admin_url( 'admin-ajax.php' ) . '"
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

/** add custom podcast cover formats */
add_action( 'after_setup_theme', function (){
	add_image_size( 'podcast-cover-small', 420, 400, true );
	add_image_size( 'podcast-cover-medium', 600, 400, true );
} );

/**
 * @param WP_Post $episode
 *
 * @return array
 */
function wpsofa_get_episode_cover_image(WP_Post $episode): array {
	$episodeId = $episode->ID ?? false;
	$coverImgId = get_post_meta( $episodeId, '_thumbnail_id', true );
	$coverFormatPrefix = 'podcast-cover';
	$srscet = [];

	if(!$episodeId && !empty($coverImgId)){
		return $srscet;
	}

	$imageMeta = wp_get_attachment_metadata($coverImgId);
	$uploadsUrl = wp_get_upload_dir()['url'];

	foreach($imageMeta['sizes'] as $formatKey => $formatData){
		if(strpos($formatKey, $coverFormatPrefix) === 0) {
			$srscet[$formatKey] = $uploadsUrl . '/' . $formatData['file'];
		}
	}

	return $srscet;
}

/**
 * Strip table of content from episode
 *
 * @param WP_Post $episode
 * @return string
 */
function get_tableOfContent(WP_Post $episode): string {
	$tableOfContent = '';

	if(!empty($episode)){
		$ul = explode('</ul>', $episode->post_content);

		if(!empty($ul)) {
			$ul   = explode('<ul>', $ul[0]);
			$tableOfContent = '<ul>' . str_replace('href="#', 'href="' . $episode->guid . '#', $ul[1]) . '</ul>';
		}
	}

	return $tableOfContent;
}

add_action( 'wp_ajax_like_episode', 'like_episode');
add_action( 'wp_ajax_nopriv_like_episode', 'like_episode');

function like_episode(){
	$metaKey = '_post_like_count';

	if(!empty($_POST['post_id'])){
		$currentVal = get_post_meta($_POST['post_id'], $metaKey, true);
		$newVal = $currentVal+1;
		update_post_meta($_POST['post_id'], $metaKey, $newVal);
		echo $newVal;
	}
	wp_die();
}