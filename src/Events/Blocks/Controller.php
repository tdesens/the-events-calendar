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
use TEC\Events\Blocks\Price\Block as Price_Block;
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
		$this->container->singleton( 'events.editor.meta', 'Tribe__Events__Editor__Meta' );
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
		$this->container->singleton( 'events.editor.blocks.event-price', Price_Block::class, [ 'load' ] );
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
		// Setup to check if gutenberg is active
		$this->container->singleton( 'events.editor', 'Tribe__Events__Editor' );
		$this->container->singleton( 'events.editor.compatibility', 'Tribe__Events__Editor__Compatibility' );
		tribe( 'events.editor.compatibility' )->hook();

		tribe( 'events.editor' )->hook();

		if ( ! tribe( 'editor' )->should_load_blocks() && ! tec_is_full_site_editor() ) {
			return;
		}
		$this->hook();
		$this->call_singletons();
	}

	/**
	 * Call all the Singletons that need to be set up.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function call_singletons() {
		/**
		 * Call all the Singletons that need to be setup/hooked
		 */
		tribe( 'events.editor.i18n' );
		tribe( 'events.editor.template.overwrite' );
		tribe( 'events.editor.configuration' );
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
		add_action( 'tribe_plugins_loaded', [ $this, 'register_blocks' ], 300 );

		global $wp_version;
		if ( version_compare( $wp_version, '5.8', '<' ) ) {
			// For WordPress versions before 5.8, use the block_categories filter
			add_filter( 'block_categories', [ $this, 'block_categories' ], 10, 2 );
		} else {
			// For WordPress version 5.8 and above, use the block_categories_all filter
			add_filter( 'block_categories_all', [ $this, 'block_categories_all' ], 10, 2 );
		}
	}

	/**
	 * Add "Event Blocks" category to the editor
	 *
	 * @since      4.7
	 *
	 * @deprecated 5.8.2
	 *
	 * @param array<array<string|string>> $categories An array of categories each an array
	 *                                                in the format property => value.
	 * @param WP_Post                     $post       The post object we're editing.
	 *
	 * @return array
	 */
	public function block_categories( $categories, $post ) {
		// Handle where someone is using this outside of this object
		global $wp_version;
		if ( version_compare( $wp_version, '5.8', '>=' ) ) {
			_deprecated_function( __FUNCTION__, '5.8.2', 'block_categories_all' );
		}

		if ( Tribe__Events__Main::POSTTYPE !== $post->post_type ) {
			return $categories;
		}

		return array_merge(
			$categories,
			[
				[
					'slug'  => 'tribe-events',
					'title' => __( 'Event Blocks', 'the-events-calendar' ),
				],
			]
		);
	}

	/**
	 * Add "Event Blocks" category to the editor.
	 *
	 * @since 5.8.2 block_categories() modified to cover WP 5.8 change of filter in a backwards-compatible way.
	 *
	 * @param array<array<string,string>> $categories An array of categories each an array.
	 *                                                in the format property => value.
	 * @param WP_Block_Editor_Context     $context    The Block Editor Context object.
	 *                                                In WP versions prior to 5.8 this was the post object.
	 *
	 * @return array<array<string,string>> The block categories, filtered to add the Event Categories if applicable.
	 */
	public function block_categories_all( $categories, $context ) {
		if ( ! $context instanceof WP_Block_Editor_Context ) {
			return $categories;
		}

		// Make sure we have the post available.
		if ( empty( $context->post ) ) {
			return $categories;
		}

		return array_merge(
			$categories,
			[
				[
					'slug'  => 'tribe-events',
					'title' => __( 'Event Blocks', 'the-events-calendar' ),
				],
			]
		);
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
