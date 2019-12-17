<?php
/**
 * The podcast player template for displaying the audio cover
 *
 * @package WordPress
 * @subpackage wpsofa-theme
 * @since 1.0.0
 */

global $player;

echo '<pre>';
print_r([
	        'DEBUG_LOCATION' => ['PATH' => dirname(__FILE__), 'FILE' => basename(__FILE__), 'FUNCTION' => __FUNCTION__ . ':' . __LINE__],
	        'DEBUG'          => [
		        '$post' => $player,
	        ]
        ]);
die();
?>

