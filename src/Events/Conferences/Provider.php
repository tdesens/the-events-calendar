<?php
/**
 * Registers the Conferences functionality.
 *
 * @since   6.0.0
 *
 * @package TEC\Events\Conferences
 */

namespace TEC\Events\Conferences;

use \tad_DI52_ServiceProvider as Service_Provider;

/**
 * Class Provider.
 *
 * @since   TBD
 *
 * @package TEC\Events\Conferences
 */
class Provider extends Service_Provider {
	/**
	 * Constant name storing whether to disable the Conferences codebase or not.
	 *
	 * @since TBD
	 *
	 * @var string
	 */
	protected const DISABLED = 'TEC_CONFERENCES_DISABLED';

	/**
	 * Registers the filters and implementations required by the Conferences implementation.
	 *
	 * @since TBD
	 *
	 * @return bool Whether the Provider did register or not.
	 */
	public function register() {
		if ( ! static::is_active() ) {
			return false;
		}

		// Register all singles and classes with the container.
		add_action( 'tec_events_conferences_loaded', [ $this, 'bind_implementations' ], 1 );

		// Registers the hooks service provider.
		add_action( 'tec_events_conferences_loaded', [ $this, 'register_hooks' ], 5 );

		// Registers the assets service provider.
		add_action( 'tec_events_conferences_loaded', [ $this, 'register_assets' ], 15 );

		/**
		 * Allows the loading of external code only after conferences is fully loaded.
		 * It's specifically important to make sure we load all the internal pieces of the conference module via an
		 * action and hooks because it will allow third-party modification of the loading too.
		 *
		 * @since TBD
		 */
		do_action( 'tec_events_conferences_loaded' );
	}

	/**
	 * Registers the container bindings.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function bind_implementations(): void {

	}

	/**
	 * Registers the provider handling all the assets for Conferences module.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function register_assets(): void {
		$assets = new Assets_Provider( $this->container );

		$this->container->register( $assets );
		$this->container->singleton( Assets_Provider::class, $assets );
	}

	/**
	 * Registers the provider handling all the 1st level filters and actions for Conferences module.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function register_hooks(): void  {
		$hooks = new Hooks_Provider( $this->container );

		$this->container->register( $hooks );
		$this->container->singleton( Hooks_Provider::class, $hooks );
	}

	/**
	 * Returns whether the Conferences implementation should register, thus activate,
	 * or not.
	 *
	 * @since TBD
	 *
	 * @return bool Whether the Conferences implementation should register or not.
	 */
	public static function is_active(): bool {
		if ( defined( static::DISABLED ) && constant( static::DISABLED ) ) {
			// The disabled constant is defined and it's truthy.
			return false;
		}

		if ( getenv( static::DISABLED ) ) {
			// The disabled env var is defined, and it's truthy.
			return false;
		}

		/**
		 * Allows filtering whether the whole Conferences implementation
		 * should be activated or not.
		 *
		 * Note: this filter will only apply if the disabled constant or env var
		 * are not set or are set to falsy values.
		 *
		 * @since TBD
		 *
		 * @param bool $activate Defaults to `true`.
		 */
		return (bool) apply_filters( 'tec_events_conferences_enabled', true );
	}
}