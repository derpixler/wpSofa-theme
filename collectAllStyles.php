<?php
namespace WebDevMedia\wpsofa;

/**
 * Collect all via wp-enqueued registered styles
 * remove thy link-tag, minify them and print one style-tag
 *
 * @package MHS\Controller\GlobalHooks\Filters
 */
class collectAllStyles {

	/**
	 * The current wp-content dirname
	 * @var string
	 */
	private $wpContentDirName = '';

	/**
	 * path of the current theme
	 * @var string
	 */
	private $themePath = '';

	/**
	 * All collected styles
	 * @var array
	 */
	private $stylesCollection = [];

	/**
	 * All styles they not should minified
	 * @var array
	 */
	private $styleTagsNotRemove = [];

	/**
	 * collectAllStyles constructor.
	 */
	public function __construct() {
		$this->setWpContentDirName();
		$this->setThemePath();

		if (!is_admin()) {
			$this->addHooks();
		}
	}

	/**
	 * add used wp filter and action
	 */
	private function addHooks(){
		# Collect all styles into $this->stylesCollection
		/*add_action('wp_print_styles', function () {
			$this->parseStyles();
		}, 10);*/

		# Remove style-tag for collected styles
		add_filter('style_loader_tag', function ( $tag, $handle ) {
			$this->removeParsedStyles($tag, $handle);
		}, 99, 2);
/*
		# Print collected styles
		add_action('wp_head', function () {
			$this->printMinifiedStyles();
		}, 100, 2);*/
	}

	/**
	 * Grep the wp-content dirname
	 */
	public function setWpContentDirName(): void {
		$pathInfo = pathinfo(WP_CONTENT_DIR);
		$this->wpContentDirName = $pathInfo['basename'];
	}

	/**
	 * set current theme path
	 */
	public function setThemePath(): void {
		$themePath = explode($this->wpContentDirName, get_template_directory());
		$this->themePath = trailingslashit(trim($themePath[1], '/'));
	}

	/**
	 * loop trough all registered styles,
	 * fetch the content and save them into a collection (array)
	 */
	private function parseStyles(){
		global $wp_styles;

		if(!empty($wp_styles->registered)){

			/** @var  $_WP_Dependency \_WP_Dependency */
			foreach ($wp_styles->registered as $handle => $_WP_Dependency){
				$styles = $this->grepStyleContent($_WP_Dependency->src, $_WP_Dependency->handle);

				if(!empty($styles)) {
					$this->fillCollection($styles, $_WP_Dependency->handle, $_WP_Dependency->src);
				}
			}
		}

		$customStyles = wp_get_custom_css();

		if ( $customStyles){
			$customStylesHandle = 'wp_custom_css';
			$customStylesMinified = $this->minimize($customStyles, $customStylesHandle);
			$this->fillCollection($customStylesMinified, $customStylesHandle);
		}
	}

	/**
	 * Find styles to minify, grep the content an minimize them
	 *
	 * @param string $src
	 * @param string $handle
	 *
	 * @return string
	 */
	private function grepStyleContent(string $src, string $handle): string{
		$minifiedStyles = '';
		$doCollect = (bool) strpos($src, $this->wpContentDirName) && !strpos($handle,'admin') ?? false;

		if($doCollect) {
			$srcPathArr = explode($this->wpContentDirName, $src);
			$srcPath = WP_CONTENT_DIR . $srcPathArr[1];

			if(file_exists($srcPath)){
				$styles = file_get_contents($srcPath);
			}

			if(!empty($styles)) {
				$minifiedStyles = $this->minimize($styles, $srcPathArr[1]);
			}
		}

		return $minifiedStyles;
	}

	/**
	 * minimize css
	 *
	 * @param string $css
	 * @param string $filePath
	 *
	 * @return string
	 */
	private function minimize(string $css, string $filePath = ''): string{
		if(!$css){
			return '';
		}

		$css = $this->converRelativSources($css, $filePath);

		if(!empty($filePath)){
			$filePath = '/* css:origin:' . $filePath . ' */';
		}


		$css = preg_replace('/\/\*((?!\*\/).)*\*\//','',$css);
		$css = preg_replace('/\s{2,}/',' ',$css);
		$css = preg_replace('/\s*([:;{}])\s*/','$1',$css);
		$css = preg_replace('/;}/','}',$css);
		$css = str_replace(["\n","\r","\t"],'',$css);

		return $filePath . $css;
	}

	/**
	 * Convert relative urls into absolute
	 * @param string $css
	 * @param string $filePath
	 *
	 * @return string
	 */
	private function converRelativSources(string $css, string $filePath): string{
		preg_match_all("/url\(['|\"](((\.{2}\/)+)(.+?))['|\"]\)/", $css, $matches);

		if(!empty($matches[0])){
			$originPathObj = array_reverse(array_merge(array_filter(explode('/', dirname(str_replace($this->themePath, '', $filePath))))));

			foreach ($matches[0] as $i => $file){
				$currentOriginPathObj = $originPathObj;
				$relativeTrail = $matches[2][$i];
				$relativePath = array_filter(explode('/', $relativeTrail));

				foreach ($relativePath as $index => $item) {
					unset($currentOriginPathObj[$index]);
				}

				$srcPath = trailingslashit($this->wpContentDirName) . $this->themePath . trailingslashit(implode('/', $currentOriginPathObj));
				$filePath = str_replace($relativeTrail, $srcPath, $matches[1][$i]);

				$css = str_replace('//', '/', str_replace($matches[1][$i], $filePath, $css));
			}
		}

		return $css;
	}

	/**
	 * store minified styles in a collection
	 *
	 * @param string $styles
	 * @param string $handle
	 */
	private function fillCollection(string $styles, string $handle, string $src): void{
		$documentQuerySelectors = [];
		$cssSelectors = [];
		$srcHash = md5($styles);

		$srcPathArr = explode($this->wpContentDirName, $src);
		$srcPath = '../../..' . $srcPathArr[1];

		if(file_exists($srcPath)){}

		$styles = preg_replace('/\/\*.*?\*\//', '', $styles);
		preg_match_all('/([#|.].*?)\{.*?\}/', $styles, $selectors);

		if(!empty($selectors[1])){
			foreach (array_unique(array_filter($selectors[1])) as $selector){
				$selectors = explode('.', explode(')', explode(',.', explode('>', explode('./',  explode('[', explode(' ', explode(',', explode(' .', explode(' > ', explode(' > #', explode(' > .', explode(':', $selector)[0] )[0] )[0] )[0] )[0])[0])[0])[0])[0])[0])[0])[0]);

				if(!empty($selectors[1])){
					$cssSelectors[] = $selectors[1];
				}
			}

			$jsArrayName = substr(str_shuffle(str_repeat($x='abcdefghijklmnopqrstuvwxyz', ceil(16/strlen($x)) )),1,16);

			foreach (array_unique(array_filter($cssSelectors)) as $i => $selector){
				$prefix = substr(str_shuffle(str_repeat($x='abcdefghijklmnopqrstuvwxyz', ceil(6/strlen($x)) )),1,6);
				$jsVar = str_replace(['-',')','(','}'],['_','','',''], $prefix . '_' . $selector);
				$documentQuerySelectors[] = $jsArrayName . "[$i] = document.querySelectorAll( \".$selector\" );\n";
			}

			file_put_contents(dirname(__FILE__) . '/assets/' . $handle . '.webpack.imports.js', "let $jsArrayName = [];\n\n" . implode($documentQuerySelectors) . "window.observeElements( $jsArrayName, () => {\n\timport(/* webpackChunkName: \"" . $prefix . "_" . $handle . "\" */'$srcPath');\n} );\n\n");
		}

		array_push($this->styleTagsNotRemove, $handle);
	}

	/**
	 * Remove style-tags for styles thy are minified
	 *
	 * @param string $tag
	 * @param string $handle
	 *
	 * @return string|null
	 */
	private function removeParsedStyles(string $tag, string $handle): ?string {
		if(!in_array($handle, $this->styleTagsNotRemove)){
			return $tag;
		}

		return null;
	}

	/**
	 * print minified styles inline
	 */
	private function printMinifiedStyles(){
/*		echo '<pre>';
		print_r([
			        'DEBUG_LOCATION' => ['PATH' => dirname(__FILE__), 'FILE' => basename(__FILE__), 'FUNCTION' => __FUNCTION__ . ':' . __LINE__],
			        'DEBUG'          => [
				        '$this->stylesCollection' => $this->stylesCollection,
			        ]
		        ]);
		die();*/

		remove_filter( 'wp_head', 'wp_custom_css_cb', 101 );
	}
}