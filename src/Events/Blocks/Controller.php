<?php
/**
 * Handles the registration of all the Blocks managed by the plugin.
 *
 * @since   TBD
 *
 * @package TEC\Events\Blocks;
 */

namespace TEC\Events\Blocks;

use Tribe__Events__Editor__Assets as Assets;
use Tribe__Events__Editor__Meta as Meta;
use Tribe__Events__Editor__Settings;
use Tribe__Events__Editor__I18n;
use Tribe__Events__Editor__Template as Template;
use Tribe__Events__Editor__Template__Overwrite as Template_Overwrite;
use Tribe__Events__Editor__Configuration as Configuration;

use Tribe__Events__Editor__Blocks__Classic_Event_Details;
use Tribe__Events__Editor__Blocks__Event_Datetime;
use Tribe__Events__Editor__Blocks__Event_Venue;
use Tribe__Events__Editor__Blocks__Event_Organizer;
use Tribe__Events__Editor__Blocks__Event_Links;
use Tribe__Events__Editor__Blocks__Event_Price;
use Tribe__Events__Editor__Blocks__Event_Category;
use Tribe__Events__Editor__Blocks__Event_Tags;
use Tribe__Events__Editor__Blocks__Event_Website;
use Tribe__Events__Editor__Blocks__Featured_Image;

/**
 * Class Controller.
 *
 * @since   TBD
 *
 * @package TEC\Events\Blocks;
 */
class Controller extends \TEC\Common\Contracts\Provider\Controller {
	/**
	 * Binds and sets up implementations.
	 *
	 * @since TBD
	 */
	public function do_register(): void {

		// Register these all the time - as we now use them in most of the templates, blocks or otherwise.
		$this->container->singleton( 'events.editor.template.overwrite', Template_Overwrite::class, [ 'hook' ] );
		$this->container->singleton( 'events.editor.template', Template::class );
		$this->container->singleton( 'events.editor.configuration', Configuration::class, [ 'hook' ] );
		$this->container->singleton( 'events.editor.settings', 'Tribe__Events__Editor__Settings' );
		$this->container->singleton( 'events.editor.i18n', 'Tribe__Events__Editor__I18n', [ 'hook' ] );

		$this->container->singleton( 'events.editor.blocks.classic-event-details', Tribe__Events__Editor__Blocks__Classic_Event_Details::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-datetime', Tribe__Events__Editor__Blocks__Event_Datetime::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-venue', Tribe__Events__Editor__Blocks__Event_Venue::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-organizer', Tribe__Events__Editor__Blocks__Event_Organizer::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-links', Tribe__Events__Editor__Blocks__Event_Links::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-price', Tribe__Events__Editor__Blocks__Event_Price::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-category', Tribe__Events__Editor__Blocks__Event_Category::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-tags', Tribe__Events__Editor__Blocks__Event_Tags::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.event-website', Tribe__Events__Editor__Blocks__Event_Website::class, [ 'load' ] );
		$this->container->singleton( 'events.editor.blocks.featured-image', Tribe__Events__Editor__Blocks__Featured_Image::class, [ 'load' ] );

		$this->register_for_blocks();
	}

	/**
	 * Handle registration for blocks-functionality separately.
	 *
	 * @since TBD
	 */
	public function register_for_blocks() {
		/** @var \Tribe__Editor $editor */
		$editor = tribe( 'editor' );

		// Only register for blocks if we are using them.
		if ( ! $editor->should_load_blocks() ) {
			return;
		}

		$this->container->singleton( 'events.editor.meta', Meta::class );
		$this->container->singleton( 'events.editor.assets', Assets::class, [ 'register' ] );

		$this->hook();

		// Initialize the correct Singleton.
		tribe( 'events.editor.assets' );
		tribe( 'events.editor.configuration' );
		tribe( 'events.editor.template.overwrite' )->hook();
	}

	/**
	 * Register the blocks after plugins are fully loaded.
	 *
	 * @since TBD
	 */
	public function register_blocks() {
		// Register blocks.
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.classic-event-details' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-datetime' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-venue' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-organizer' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-links' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-price' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-category' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-tags' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.event-website' ), 'register' ] );
		add_action( 'tribe_editor_register_blocks', [ tribe( 'events.editor.blocks.featured-image' ), 'register' ] );
	}

	/**
	 * Any hooking any class needs happen here.
	 *
	 * In place of delegating the hooking responsibility to the single classes they are all hooked here.
	 *
	 * @since TBD
	 */
	protected function hook() {
		// Setup the Meta registration.
		add_action( 'init', tribe_callback( 'events.editor.meta', 'register' ), 15 );
		add_filter( 'register_meta_args', tribe_callback( 'events.editor.meta', 'register_meta_args' ), 10, 4 );
		add_action( 'tribe_plugins_loaded', [ $this, 'register_blocks' ], 300 );

		// Handle REST specific meta filtering.
		add_filter( 'rest_dispatch_request', tribe_callback( 'events.editor.meta', 'filter_rest_dispatch_request' ), 10, 3 );

		global $wp_version;
		if ( version_compare( $wp_version, '5.8', '<' ) ) {
			// WP version is less then 5.8.
			add_action( 'block_categories', tribe_callback( 'events.editor', 'block_categories' ) );
		} else {
			// WP version is 5.8 or above.
			add_action( 'block_categories_all', tribe_callback( 'events.editor', 'block_categories' ) );
		}
	}

	/**
	 * {@inheritDoc}
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function unregister(): void {
		remove_action( 'init', tribe_callback( 'events.editor.meta', 'register' ), 15 );
		remove_filter( 'register_meta_args', tribe_callback( 'events.editor.meta', 'register_meta_args' ) );
		remove_action( 'tribe_plugins_loaded', [ $this, 'register_blocks' ], 300 );
		remove_filter( 'rest_dispatch_request', tribe_callback( 'events.editor.meta', 'filter_rest_dispatch_request' ) );
		remove_action( 'block_categories', tribe_callback( 'events.editor', 'block_categories' ) );
		remove_action( 'block_categories_all', tribe_callback( 'events.editor', 'block_categories' ) );
	}
}
