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

$hits = !empty($wpSofaPlayer['hits']) ? $wpSofaPlayer['hits'] : 0;
$postId = !empty($wpSofaPlayer['episode']) ? $wpSofaPlayer['episode']->ID : null;
$postHash = md5(json_encode($wpSofaPlayer));
?>

<div class="userInterActions">
	<div>
		<span class="icon-tape tooltip">
			<span class="hitsCount"><?=$hits?></span>
			<span class="tooltipContent">Du bist einer von <span class="hitsCount"><?=$hits?></span> Höhren. <b>Danke!</b><br />Gefält dir diese Folge, dann gib ihr doch einen <span class="icon-star-solid"></span></span>
		</span>
		<span class="icon-heart-light episodeLike" data-episode-i="<?=$postId?>" data-episode-hash="<?=$postHash?>"><?=!empty($wpSofaPlayer['likes']) ? $wpSofaPlayer['likes'] : 0?></span>
	</div>
	<div>
		<a class="icon-itunes" title="wp-sofa auf iTunes" href="https://itunes.apple.com/de/podcast/wp-sofa/id1090434579?mt=2" target="_blank"></a>
		<a class="icon-spotify" title="wp-sofa auf spotify" href="https://open.spotify.com/show/5deyJkxMw1cAMKGxnrx5wO" target="_blank"></a>
		<a class="icon-youtube" title="wp-sofa auf youtube" href="https://www.youtube.com/channel/UCy_5ynkyKoIXkd4l2nskJUA/featured" target="_blank"></a>
		<a class="icon-twitch" title="wp-sofa auf twitch" href="https://www.twitch.tv/wp_sofa" target="_blank"></a>
		<a class="icon-twitter" title="wp-sofa auf twitter" href="https://twitter.com/wp_sofa" target="_blank"></a>
		<a class="icon-google-podcasts" title="wp-sofa auf google-podcasts" href="https://podcasts.google.com/?feed=aHR0cHM6Ly9tcDMud3Atc29mYS5kZS8%3D" target="_blank"></a>
		<span class="icon-download tooltip">
			<span class="tooltipContent">Du kannst diese Folge direkt Herunterladen.<br />
				<?php foreach ($wpSofaPlayer['mediafiles'] as $media) : ?>
					<a href="<?=$media['medialink']?>" type="<?=$media['mediatype']?>" target="_blank"><?=str_replace('audio/', '', $media['mediatype'])?></a>,
				<?php endforeach; ?>
			</span>
		</span>
	</div>
</div>

