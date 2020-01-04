<?php

/**
 * load wpsoaf theme assets like styles & scripts
 */
function wpsofa_enqueue_assets() {

	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));

	$mode       = home_url() === 'http://wpsofa.podcast' ? 'development' : 'production';
	$assetsPath = '/assets/dist/' . $mode . '/';

	foreach (glob(get_stylesheet_directory() . $assetsPath . '*.bundle.*.js') as $i => $assetFile) {
		$assetFile       = basename($assetFile);
		$assetFileHandle = explode('.', $assetFile)[0];

		if ($i === 0) {
			$assetsHandles = 'js-webpack-' . $assetFileHandle;
		}

		$file    = $assetsPath . $assetFile;
		$version = filemtime(get_stylesheet_directory() . $file);

		wp_enqueue_script('js-webpack-' . $assetFileHandle, get_stylesheet_directory_uri() . $file, ($i > 0 ? $assetsHandles : NULL), $version, FALSE);

		if ($i === 0) {
			wp_add_inline_script('js-webpack-' . $assetFileHandle, '
			window.wpsofa = {
				stylesheet_directory_uri: "' . get_stylesheet_directory_uri() . '",
				stylesheet_directory: "' . get_stylesheet_directory() . '",
				template_parts_uri: "template-parts",
				ajax_url: "' . admin_url('admin-ajax.php') . '",
				rest_url: "' . home_url('wp-json/') . '"
			};', FALSE);
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
add_action('after_setup_theme', function () {

	add_image_size('podcast-cover-small', 420, 400, TRUE);
	add_image_size('podcast-cover-medium', 600, 500, TRUE);
});

/**
 * @param WP_Post $episode
 *
 * @return array
 */
function wpsofa_get_episode_cover_image( WP_Post $episode ): array {

	$episodeId         = $episode->ID ?? FALSE;
	$coverImgId        = get_post_meta($episodeId, '_thumbnail_id', TRUE);
	$coverFormatPrefix = 'podcast-cover';
	$srscet            = [];

	if (!$episodeId && !empty($coverImgId)) {
		return $srscet;
	}

	$imageMeta  = wp_get_attachment_metadata($coverImgId);
	$uploadsUrl = wp_get_upload_dir()['url'];

	foreach ($imageMeta['sizes'] as $formatKey => $formatData) {
		if (strpos($formatKey, $coverFormatPrefix) === 0) {
			$srscet[$formatKey] = $uploadsUrl . '/' . $formatData['file'];
		}
	}

	return $srscet;
}

/**
 * Strip table of content from episode
 *
 * @param WP_Post $episode
 *
 * @return string
 */
function get_tableOfContent( WP_Post $episode ): string {

	$tableOfContent = '';

	if (!empty($episode)) {
		$ul = explode('</ul>', $episode->post_content);

		if (!empty($ul)) {
			$ul             = explode('<ul>', $ul[0]);
			$tableOfContent = '<ul>' . str_replace('href="#', 'href="' . $episode->guid . '#', $ul[1]) . '</ul>';
		}
	}

	return $tableOfContent;
}

add_action('rest_api_init', function () {

	$version   = '1';
	$namespace = 'wpsofa/v' . $version;
	$base      = 'like_post';

	register_rest_route($namespace, '/' . $base . '/put', [
		'methods'  => 'POST',
		'callback' => 'write_likes_by_post_id',
	]);

	register_rest_route($namespace, '/' . $base . '/get', [
		'methods'  => 'POST',
		'callback' => 'get_likes_by_post_ids',
	]);
});

/**
 * get likes for post_id
 * usage:
 *      URI: wp-json/wpsofa/v1/like_post/get
 *      POST: ids=post_id,post_id,post_id,
 *
 * @param \WP_REST_Request $request
 */
function get_likes_by_post_ids( \WP_REST_Request $request ): string {
	$post_ids = $request->get_body_params();
	$values   = [];

	if (!empty($post_ids['ids'])) {
		foreach (explode(',', $post_ids['ids']) as $post_id) {
			$hits = get_post_meta($post_id, '_post_like_count', TRUE);

			if (!empty($hits)) {
				$values[$post_id] = $hits;
			}
		}
	}

	return json_encode($values, JSON_FORCE_OBJECT | JSON_HEX_QUOT);
}

/**
 * Write like to post by there id
 *
 * usage:
 *      URI: wp-json/wpsofa/v1/like_post/put
 *      POST: id=post_id
 *
 * @param \WP_REST_Request $request
 */
function write_likes_by_post_id( \WP_REST_Request $request ): string {
	$post_id = $request->get_body_params();
	$metaKey = '_post_like_count';
	$newVal = 0;

	if (!empty($post_id['id'])) {
		$currentVal = get_post_meta($post_id['id'], $metaKey, TRUE);
		$newVal     = $currentVal > 0 ? $currentVal + 1 : 0;
		#update_post_meta($_POST['post_id'], $metaKey, $newVal);
	}

	return json_encode($newVal);
}

/**
 * @param WP_Query $query
 */
add_action('pre_get_posts', function ( WP_Query $query ) {

	$queriedPostType = !empty($query->query['post_type']) ? $query->query['post_type'] : 'dipo_podcast';

	if (!is_admin() && !is_page()) {
		$query->set('post_type', $queriedPostType);
	}
});