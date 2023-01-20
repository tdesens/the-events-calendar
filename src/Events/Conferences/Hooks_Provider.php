<?php

/**
 * Handles hooking all the actions and filters used by the module.
 *
 * To remove a filter:
 * remove_filter( 'some_filter', [ tribe( Tribe\Events\Views\V2\Hooks::class ), 'some_filtering_method' ] );
 *
 * To remove an action:
 * remove_action( 'some_action', [ tribe( Tribe\Events\Views\V2\Hooks::class ), 'some_method' ] );
 *
 * @since   TBD
 *
 * @package TEC\Events\Conferences
 */

namespace TEC\Events\Conferences;

use \tad_DI52_ServiceProvider as Service_Provider;

/**
 * Class Hooks_Provider
 *
 * @since   TBD
 *
 * @package TEC\Events\Conferences
 */
class Hooks_Provider extends Service_Provider {

	/**
	 * Binds and sets up implementations.
	 *
	 * @since   TBD
	 */
	public function register() {
		$this->add_actions();
		$this->add_filters();
	}

	/**
	 * Adds the actions required by the conferences module.
	 *
	 * @since   TBD
	 */
	protected function add_actions(): void {

	}

	/**
	 * Adds the filters required by the conferences module.
	 *
	 * @since   TBD
	 */
	protected function add_filters(): void {

	}


}