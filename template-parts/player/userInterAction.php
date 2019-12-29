<?php
/**
 * The podcast interaction template for displaying the icons | actions for user interacting options
 *
 * @package    WordPress
 * @subpackage wpsofa-theme
 * @since      1.0.0
 */

global $wpSofaPlayer;

if (empty($wpSofaPlayer)) {
	return;
}
?>

<div class="userInterActions">
	<div>
		<span class="icon-cassette"><?=!empty($wpSofaPlayer['hits']) ? $wpSofaPlayer['hits'] : 0?></span>
		<span class="icon-star-regular"><?=!empty($wpSofaPlayer['likes']) ? $wpSofaPlayer['likes'] : 0?></span>
	</div>
	<div>
		<span class="icon-itunes"></span>
		<span class="icon-spotify"></span>
		<span class="icon-youtube"></span>
		<span class="icon-twitch"></span>
		<span class="icon-twitter"></span>
	</div>
</div>

