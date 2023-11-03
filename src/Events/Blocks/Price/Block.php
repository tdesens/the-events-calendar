<?php
/**
 * Provides the information required to register the Price block server-side.
 *
 * @since   TBD
 *
 * @package TEC\Events\Blocks\Price;
 */

namespace TEC\Events\Blocks\Price;

use Tribe__Editor__Blocks__Abstract as Abstract_Block;
use Tribe__Events__Main as TEC;

/**
 * Class Block.
 *
 * @since   TBD
 *
 * @package TEC\Events\Blocks\Price;
 */
class Block extends Abstract_Block {
	/**
	 * Which is the name/slug of this block
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function slug() {
		return 'event-price';
	}

	/**
	 * Set the default attributes of this block
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function default_attributes() {

		return [
			'cost' => tribe_get_formatted_cost(),
		];
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since TBD
	 *
	 * @param array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = [] ) {
		$args['attributes'] = $this->attributes( $attributes );

		// Add the rendering attributes into global context
		tribe( 'events.editor.template' )->add_template_globals( $args );

		return tribe( 'events.editor.template' )->template( [ 'blocks', $this->slug() ], $args, false );
	}

	/**
	 * {@inheritDoc}
	 *
	 * @since TBD
	 */
	protected function get_registration_block_type() {
		return __DIR__ . '/block.json';
	}

	/**
	 * {@inheritDoc}
	 *
	 * @since TBD
	 */
	protected function get_registration_args( array $args ): array {
		$args['title']       = _x( 'Event Price', 'Block title', 'the-events-calendar' );
		$args['description'] = _x( 'Let visitors know the cost of this event or if it’s free to attend.', 'Block description', 'the-events-calendar' );

		return $args;
	}

	/**
	 * Overrides the parent method to register the editor scripts.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function register() {
		parent::register();
		add_action( 'admin_enqueue_scripts', [ $this, 'register_editor_scripts' ] );
	}

	/**
	 * Registers the editor scripts.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function register_editor_scripts() {
		$plugin = TEC::instance();
		$min    = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Using WordPress functions to register since we just need to register them.
		wp_register_script(
			'tec-events-price-block-editor-script',
			$plugin->plugin_url . "build/Events/Blocks/Price/editor.js",
			[ 'tribe-common-gutenberg-vendor' ]
		);

		wp_register_style(
			'tec-events-price-block-editor-style',
			$plugin->plugin_url . "build/Events/Blocks/Price/editor{$min}.css",
			[]
		);
	}
}