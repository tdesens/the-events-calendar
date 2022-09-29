<?php
namespace Tribe\Events\Admin\Settings;
/**
 * This file contains only the *initial* data for the tab content (sections).
 *
 * Use the tec_events_settings_sections filter to add/remove sections.
 *
 * @since TBD
 */

use Tribe\Events\Admin\Settings\Tabs\Display_Tab;
use Tribe\Events\Admin\Settings\Tabs\Filters_Tab;
use Tribe\Events\Admin\Settings\Tabs\General_Tab;
use Tribe\Events\Admin\Settings\Tabs\Integrations_Tab;
use Tribe\Events\Admin\Settings\Tabs\Licenses_Tab;

class Sections extends \tad_DI52_ServiceProvider {

	protected $sections = [];

	public function register() {
		$this->build_initial_sections();
		add_filter( 'wpsf_register_settings_tec_events', [ $this, 'do_sections' ], 12 );
	}

	protected function build_initial_sections() {
		$this->sections = array_merge(
			$this->sections,
			General_Tab::do_section_content(),
			Display_Tab::do_section_content(),
			Licenses_Tab::do_section_content(),
			Filters_Tab::do_section_content(),
			Integrations_Tab::do_section_content(),
		);
	}

	public function do_sections( $settings ) {
		if ( ! empty( $settings['sections'] ) ) {
			$this->sections = array_merge( $this->sections, (array) $settings['sections'] );
		}

		foreach( $settings['tabs'] as $tab_slug => $tab ) {
			// 'tec_events_settings_sections_tab_general' etc
			$this->sections = apply_filters( 'tec_events_settings_sections_tab_' . $tab_slug, $this->sections );
		}

		$settings['sections'] = apply_filters( 'tec_events_settings_sections', $this->sections );

		return $settings;
	}
}
