<?php
/**
* The podcast template for displaying a single audio
*
* @package WordPress
* @subpackage wpsofa-theme
* @since 1.0.0
*/

global $player;
$player = [];

/* @var $theme WP_Theme */
$theme = wp_get_theme(dirname(__FILE__));

if (!empty($theme)) {
	$player['themePartName'] = wp_basename(dirname($theme->get('Name'))) . '/' . wp_basename($theme->get('Name')) . '/';
}

$player['episode'] = $post;

/* @var $podcastEpisode WP_Post */
if($post->post_type !== 'dipo_podcast'){
	$podcastEpisode = wp_get_recent_posts([
		                                      'numberposts'      => 1,
		                                      'post_type'        => 'dipo_podcast',
		                                      'post_status'      => 'publish,'
	                                      ], OBJECT);
	$player['episode'] = $podcastEpisode[0];
}

$player['subtitle'] = get_post_meta($player['episode']->ID, '_dipo_subtitle', true);
$player['summary'] = get_post_meta($player['episode']->ID, '_dipo_summary', true);
$player['image'] = get_post_meta($player['episode']->ID, '_dipo_image', true);
$player['mediafiles'] = [
	get_post_meta($player['episode']->ID, '_dipo_mediafile1', true),
	get_post_meta($player['episode']->ID, '_dipo_mediafile2', true),
	get_post_meta($player['episode']->ID, '_dipo_mediafile3', true),
]; ?>

<section class="podcastPlayer">
	<?php get_template_part($player['themePartName'] . 'cover'); ?>
	<?php get_template_part($player['themePartName'] . 'player'); ?>
	<?php get_template_part($player['themePartName'] . 'content'); ?>
	<?php get_template_part($player['themePartName'] . 'intersection'); ?>
</section>
