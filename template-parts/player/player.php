<?php
/**
 * The podcast player template for displaying the audio player
 *
 * @package    WordPress
 * @subpackage wpsofa-theme
 * @since      1.0.0
 */

global $wpSofaPlayer;

if(empty($wpSofaPlayer['mediafiles'])){
	return;
}
?>

<div class="madia">
	<div class="wave" data-media-source="<?=$wpSofaPlayer['mediafiles'][0]?>"></div>

	<div class='media-controls'>
		<progress class='progress-bar' min='0' max='100' value='0'>0% played</progress>
		<div class='media-action' title='''>
		<div class="play"></div>
	</div>
</div>
