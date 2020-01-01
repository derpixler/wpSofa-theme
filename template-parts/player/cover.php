<?php
/**
 * The podcast player template for displaying the audio cover
 *
 * @package WordPress
 * @subpackage wpsofa-theme
 * @since 1.0.0
 */

global $wpSofaPlayer;

$coverScrset = wpsofa_get_episode_cover_image($wpSofaPlayer['episode']);

if(empty($coverScrset)){
	return;
}

$small = $coverScrset['podcast-cover-small'];
$medium = $coverScrset['podcast-cover-medium'];
?>

<picture class="cover">
	<source media="(max-width: 375px)" data-srcset="<?=$small?>" srcset="<?=$small?>, <?=$small?> 2x">
	<img data-src="<?=$small?>" src="<?=$small?>" height="auto" width="400px">
</picture>