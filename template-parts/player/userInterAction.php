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
		<a class="icon-itunes" href="https://itunes.apple.com/de/podcast/wp-sofa/id1090434579?mt=2" target="_blank"></a>
		<a class="icon-spotify" href="https://open.spotify.com/show/5deyJkxMw1cAMKGxnrx5wO" target="_blank"></a>
		<a class="icon-youtube" href="https://www.youtube.com/channel/UCy_5ynkyKoIXkd4l2nskJUA/featured" target="_blank"></a>
		<a class="icon-twitch" href="https://www.twitch.tv/wp_sofa" target="_blank"></a>
		<a class="icon-twitter" href="https://twitter.com/wp_sofa" target="_blank"></a>
		<a class="icon-google" href="https://podcasts.google.com/?feed=aHR0cHM6Ly9tcDMud3Atc29mYS5kZS8%3D" target="_blank"></a>
	</div>
</div>

