<?php
/**
 * The podcast player template for displaying the audio content
 *
 * @package WordPress
 * @subpackage wpsofa-theme
 * @since 1.0.0
 */

global $wpSofaPlayer;

if (empty($wpSofaPlayer['episode'])) {
	return;
}

/** @var $episode WP_Post */
$episode = $wpSofaPlayer['episode'];

?>

<div class="episode">
	<h2 class="title"><a href="<?=home_url() . '/' . $episode->post_name?>"><?=$episode->post_title?></a></h2>
	<?/*=get_tableOfContent($episode);*/?>
</div>