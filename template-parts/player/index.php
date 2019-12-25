<?php
/**
* The podcast template for displaying a single audio
*
* @package WordPress
* @subpackage wpsofa-theme
* @since 1.0.0
*/

global $wpSofaPlayer;
$wpSofaPlayer = [];

/* @var $theme WP_Theme */
$theme = wp_get_theme(dirname(__FILE__));

if (!empty($theme)) {
	$wpSofaPlayer['themePartName'] = wp_basename(dirname($theme->get('Name'))) . '/' . wp_basename($theme->get('Name')) . '/';
}

$wpSofaPlayer['episode'] = $post;

/* @var $podcastEpisode WP_Post */
if($post->post_type !== 'dipo_podcast'){
	$podcastEpisode = wp_get_recent_posts([
		                                      'numberposts'      => 1,
		                                      'post_type'        => 'dipo_podcast',
		                                      'post_status'      => 'publish,'
	                                      ], OBJECT);

	$wpSofaPlayer['episode'] = $podcastEpisode[0];
}

$wpSofaPlayer['subtitle'] = get_post_meta($wpSofaPlayer['episode']->ID, '_dipo_subtitle', true);
$wpSofaPlayer['summary'] = get_post_meta($wpSofaPlayer['episode']->ID, '_dipo_summary', true);
$wpSofaPlayer['image'] = get_post_meta($wpSofaPlayer['episode']->ID, '_dipo_image', true);
$wpSofaPlayer['mediafiles'] = [
	get_post_meta($wpSofaPlayer['episode']->ID, '_dipo_mediafile1', true),
	get_post_meta($wpSofaPlayer['episode']->ID, '_dipo_mediafile2', true),
	get_post_meta($wpSofaPlayer['episode']->ID, '_dipo_mediafile3', true),
]; ?>

<section class="podcastPlayer">
	<?php get_template_part($wpSofaPlayer['themePartName'] . 'cover'); ?>
	<?php get_template_part($wpSofaPlayer['themePartName'] . 'player'); ?>
	<?php get_template_part($wpSofaPlayer['themePartName'] . 'userInterAction'); ?>
	<?php get_template_part($wpSofaPlayer['themePartName'] . 'content'); ?>
</section>
