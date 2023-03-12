<?php
/**
 * Handles The Events Calendar Settings.
 *
 * @since   TBD
 *
 * @package TEC\Events\Integrations
 */

namespace TEC\Events\Settings;

/**
 * Class Provider
 *
 * @since   TBD
 *
 * @package TEC\Events\Integrations
 */
class Provider extends \tad_DI52_ServiceProvider {
	/**
	 * Binds and sets up implementations.
	 *
	 * @since TBD
	 */
	public function register() {
		$this->container->singleton( static::class, $this );
		$this->container->singleton( Prepopulate::class, Prepopulate::class, [ 'register_defaults' ] );

		$this->add_actions();
	}

	/**
	 * Adds the filters required the setting components.
	 *
	 * @since TBD
	 */
	protected function add_filters(): void {
	}

	/**
	 * Adds the actions required the setting components.
	 *
	 * @since TBD
	 */
	protected function add_actions(): void {
		add_action( 'plugins_loaded', [ $this, 'action_run_prepopulate' ], 10000 );
	}

	/**
	 * Run the prepopulate action for the settings.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function action_run_prepopulate(): void {
		$this->container->make( Prepopulate::class )->run();
	}
}
