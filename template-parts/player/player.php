<?php
/**
 * The podcast player template for displaying the audio player
 *
 * @package    WordPress
 * @subpackage wpsofa-theme
 * @since      1.0.0
 */

global $wpSofaPlayer;

if (empty($wpSofaPlayer['mediafiles'])) {
	return;
}
?>

<div class='media-controls'>
	<div class="status">
		<span class="icon-progress-0 current-time">0:00</span>
		<span class="icon-watch-light total-time">3:00</span>
	</div>

	<div class='media-action' title=''>
		<div class="pause"></div>
	</div>
</div>

<div class='progress'>
	<div class="status" width='0'></div>
</div>



<!--<div class="wave" data-media-source=""></div>-->
