<?php
/**
 * The podcast player template for json ld the audio player
 *
 * @package    WordPress
 * @subpackage wpsofa-theme
 * @since      1.0.4
 */

if (!is_singular()) {
	return;
}

global $wpSofaPlayer;

if (empty($wpSofaPlayer['mediafiles'])) {
	return;
}

/* @var $episode \WP_Post */
$episode = $wpSofaPlayer['episode'];
$episodeLikes = $wpSofaPlayer['likes'];
$episodeHits = $wpSofaPlayer['hits'];
$audio   = $wpSofaPlayer['mediafiles'][0];
?>

<script type="application/ld+json">
{
   "@context": "http://schema.org/",
   "@type": "PodcastEpisode",
   "url": "<?= home_url('podcasts/' . $episode->post_name) ?>",
   "name": "<?= $episode->post_title ?>",
   "datePublished": "<?= $episode->post_date ?>",
   "timeRequired": "<?= time_to_iso8601_duration(strtotime($audio['duration'])) ?>",
   "description": "<?= $episode->post_title ?>",
   "interactionStatistic":[
        {
            "@type": "InteractionCounter",
            "interactionType": "http://schema.org/ListenAction",
            "userInteractionCount": "<?=$episodeHits?>"
		},
		{
			"@type": "InteractionCounter",
              "interactionService": {
                "@type": "WebSite",
                "name": "<?= $episode->post_title ?> - <?=bloginfo('name')?> <?=bloginfo('description')?>",
                "@id": "<?= home_url('podcasts/' . $episode->post_name) ?>"
              },
              "interactionType": "http://schema.org/LikeAction",
              "userInteractionCount": "<?=$episodeLikes?>"}
	],
   "associatedMedia": {
        "@context": "http://schema.org",
		"@type": "MediaObject",
		"contentUrl": "<?= $audio['medialink'] ?>",
		"thumbnailUrl": "<?= $wpSofaPlayer['image'] ?>",
		"duration": "<?= time_to_iso8601_duration(strtotime($audio['duration'])) ?>",
		"encodingFormat": "<?= $audio['medialink'] ?>",
		"name": "<?= basename($audio['medialink']) ?>"
   },
   "partOfSeries": {
     "@type": "PodcastSeries",
     "name": "<?= bloginfo('blogname') ?>",
     "url": ""
   }
 }

</script>