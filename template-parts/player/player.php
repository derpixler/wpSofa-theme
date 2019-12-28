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
	<audio>
		<?php foreach ($wpSofaPlayer['mediafiles'] as $media) : ?>
		<source src="<?=$media['medialink']?>" type="<?=$media['mediatype']?>" data-media-id="<?=$media['id']?>">
		<?php endforeach; ?>
	</audio>

	<div class="status">
		<span class="icon-progress current-time" data-progress="0">00:00:00</span>
		<span class="icon-watch-light total-time"><?=$media['duration']?></span>
	</div>

	<div class='media-action' title=''>
		<div class="play"></div>
	</div>
</div>

<div class='progress'>
	<div class="status" style="width: 0;"></div>
</div>



<!--<div class="wave" data-media-source=""></div>-->
