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
	<source media="(max-width: 1024px)" data-srcset="<?=$small?>" srcset="<?=$small?>, <?=$small?> 2x">
	<source media="(max-width: 665px)" data-srcset="<?=$medium?>" srcset="<?=$medium?>, <?=$medium?> 2x">
	<img data-src="<?=$medium?>" src="<?=$medium?>" height="auto" width="400px">
</picture>