<?php

namespace TEC\Events\Settings;

/**
 * Class Prepopulate
 *
 * @since   TBD
 *
 * @package TEC\Events\Settings
 */
class Prepopulate {
	/**
	 * Which settings need to be prepopulated on the WordPress Options.
	 *
	 * @since TBD
	 *
	 * @var array<string,mixed>
	 */
	protected const NOT_EXIST = '#-#-#-NOT-EXIST-#-#-#';

	/**
	 * Which settings need to be prepopulated on the WordPress Options.
	 *
	 * @since TBD
	 *
	 * @var array<string,mixed>
	 */
	protected array $settings = [];

	/**
	 * Whether the list of setting is currently unsorted.
	 *
	 * @since TBD
	 *
	 * @var bool
	 */
	protected bool $is_sorted = false;

	/**
	 * Fetches all the settings that will be prepopulated.
	 *
	 * This method specifically is not filtered because of how sorting behaves here, to add new prepopulated settings
	 * you just need to use the `add_setting` method before the pre-population action, which by default will happen
	 * on a high priority of `plugins_loaded`.
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function get_all(): array {
		if ( ! $this->is_sorted ) {
			uasort( $this->settings, 'tribe_sort_by_priority' );

			// Mark as sorted.
			$this->is_sorted = true;
		}

		return $this->settings;
	}

	/**
	 * Adds a new WordPress Option to be prepopulated.
	 *
	 * @since TBD
	 *
	 * @param string $name
	 * @param mixed  $value
	 * @param int    $priority
	 * @param bool   $autoload
	 *
	 * @return void
	 */
	public function add_setting( string $name, $value, int $priority = 10, bool $autoload = true ): void {
		$this->settings[ $name ] = [
			'name' => $name,
			'value' => $value,
			'priority' => $priority,
			'autoload' => $autoload,
		];

		$this->is_sorted = false;
	}

	/**
	 * Executes the pre-population for all the settings.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function run(): void {
		$settings = $this->get_all();

		foreach ( $settings as $option ) {
			// Determine if this particular setting needs to be prepopulated.
			if ( static::NOT_EXIST !== get_option( $option['name'], static::NOT_EXIST ) ) {
				continue;
			}

			add_option( $option['name'], $option['value'], '', $option['autoload'] ? 'yes' : 'no' );
		}
	}

	public function register_defaults(): void {
		$this->add_setting( 'pue_install_key_promoter', '', true );
		$this->add_setting( 'tribe_customizer', [], true );
		$this->add_setting( 'tec_custom_tables_v1_active', true, true );
		$this->add_setting( 'tribe_events_pro_customizer', [], true );
		$this->add_setting( 'tribe_events_calendar_options', [], true );
		$this->add_setting( 'widget_tribe-mini-calendar', [], true );
		$this->add_setting( 'widget_tribe-this-week-events-widget', [], true );
	}
}