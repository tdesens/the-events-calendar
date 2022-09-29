<?php
namespace Tribe\Events\Admin\Settings;
/**
 * This file contains only the *initial* data for the tabs themselves.
 *
 * Use the tec_events_settings_tabs filter to add/remove tabs.
 * Removed tabs will not display - whether they have content or not.
 *
 * @since TBD
 */

class Tabs extends \tad_DI52_ServiceProvider {
	/**
	 * Undocumented variable
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $tabs;

	public function register() {
		$this->build_initial_tabs();
		add_filter( 'wpsf_register_settings_tec_events', [ $this, 'do_tabs' ],10 );
	}

	protected function build_initial_tabs() {
		$this->tabs = [
			'general' => [
				'id'    => 'tec_general',
				'title' => esc_html_X( 'General', 'The title for the general settings tab.','the-events-calendar' ),
			],
			'display' => [
				'id'    => 'tec_display',
				'title' => esc_html_X( 'Display', 'The title for the display settings tab.','the-events-calendar' ),
			],
			'licenses' => [
				'id'    => 'tec_licenses',
				'title' => esc_html_X( 'Licenses', 'The title for the licenses settings tab.','the-events-calendar' ),
			],
			'filters' => [
				'id'    => 'tec_filters',
				'title' => esc_html_X( 'Filters', 'The title for the filters settings tab.','the-events-calendar' ),
			],
			'integrations' => [
				'id'    => 'tec_integrations',
				'title' => esc_html_X( 'Integrations', 'The title for the integrations settings tab.','the-events-calendar' ),
			],
			'imports' => [
				'id'    => 'tec_imports',
				'title' => esc_html_X( 'Imports', 'The title for the imports settings tab.','the-events-calendar' ),
			],
		];
	}

	public function do_tabs( $settings ) {
		if ( ! empty( $settings['tabs'] ) ) {
			$this->tabs = array_merge( $this->tabs, (array) $settings['tabs'] );
		}

		$settings['tabs'] = apply_filters( 'tec_events_settings_tabs', $this->tabs );

		return $settings;

	}
}
