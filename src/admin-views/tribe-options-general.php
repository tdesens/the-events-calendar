<?php

use PDb_shortcodes\attributes;

$tec              = Tribe__Events__Main::instance();
$site_time_format = get_option( 'time_format' );


$posts_per_page_tooltip = esc_html__( 'The number of events per page on the List View. Does not affect other views.', 'the-events-calendar' );

if ( class_exists( 'Tribe__Events__Pro__Main' ) ) {
	$posts_per_page_tooltip = esc_html__( 'The number of events per page on the List, Photo, and Map Views. Does not affect other views.', 'the-events-calendar' );
}


$general_behavior_section = [
	'tec-general-behavior-section-start' => [
		'type' => 'html',
		'html' => '<section id="tec-general-settings-behavior-section" class="tec-settings-section">',
	],
	'tec-general-behavior-section-title'  => [
		'type' => 'html',
		'html' => '<h3>' . esc_html__( 'General Behaviors', 'the-events-calendar' ) . '</h3>',
	],
	'posts-per-page'                  => [
		'type'            => 'number',
		'attributes'      => [
			'min' => 0
		],
		'tooltip'         => $posts_per_page_tooltip,
		'size'            => 'small',
		'default'         => tribe_events_views_v2_is_enabled() ? 12 : get_option( 'posts_per_page' ),
		'validation_type' => 'positive_int',
	],
	'show-comments'                  => [
		'type'            => 'checkbox_bool',
		'tooltip'         => esc_html__( 'Enable comments on event pages.', 'the-events-calendar' ),
		'default'         => false,
		'validation_type' => 'boolean',
	],
	'showEventsInMainLoop'          => [
		'type'            => 'checkbox_bool',
		'tooltip'         => esc_html__( 'Show events with the site\'s other posts. Events will also continue to appear on the default events page.', 'the-events-calendar' ),
		'default'         => false,
		'validation_type' => 'boolean',
	],
	'donate-link'                   => [
		'type'            => 'checkbox_bool',
		'tooltip'         => esc_html__( 'Show The Events Calendar link', 'tribe-common' ),
		'default'         => false,
		'validation_type' => 'boolean',
		'conditional' => class_exists( 'Tribe__Events__Main' ),
	],
	'view-welcome-page'          => [
		'type'        => 'html',
		'html'        =>
			'<fieldset class="tribe-field tribe-field-html"><div class="tribe-field-wrap"><a href="' . tribe( 'tec.main' )->settings()->get_url( [ Tribe__Events__Main::instance()->activation_page->welcome_slug => 1 ] ) . '" class="button">' . esc_html__( 'View Welcome Page', 'the-events-calendar' ) . '</a><p class="tribe-field-indent description">' . esc_html__( 'View the page that displayed when you initially installed the plugin.', 'the-events-calendar' ) . '</p></div></fieldset><div class="clear"></div>',
	],
	'tec-general-behavior-section-end' => [
		'type' => 'html',
		'html' => '</section>',
	],
];

$general_location_section = [
	'tec-general-location-section-start' => [
		'type' => 'html',
		'html' => '<section id="tec-general-settings-location-section" class="tec-settings-section">',
	],
	'tec-general-location-section-title'  => [
		'type' => 'html',
		'html' => '<h3>' . esc_html__( 'Calendar Location', 'the-events-calendar' ) . '</h3>',
	],
	'unpretty-permalinks-url'         => [
		'type'  => 'wrapped_html',
		'html'  => '<p>'
			. sprintf(
				__( 'The current URL for your events page is %1$s. <br><br> You cannot edit the slug for your events page as you do not have pretty permalinks enabled. In order to edit the slug here, <a href="%2$s">enable pretty permalinks</a>.', 'the-events-calendar' ),
				sprintf (
					'<a href="%1$s">%2$s</a>',
					esc_url( $tec->getLink( 'home' ) ),
					esc_url( $tec->getLink( 'home' ) )
				),
				esc_url( trailingslashit( get_admin_url() ) . 'options-permalink.php' )
			)
			. '</p>',
		'conditional' => ( '' == get_option( 'permalink_structure' ) ),
	],
	'events-slug'                    => [
		'type'            => 'text',
		'tooltip'         => '<p class="tribe-field-indent tribe-field-description description">' . esc_html__( 'The slug used for building the events URL, ideally plural.', 'the-events-calendar' ) . '<br>' . sprintf( esc_html__( 'Your current events URL is: %s', 'the-events-calendar' ), '<code><a href="' . esc_url( tribe_get_events_link() ) . '">' . urldecode( tribe_get_events_link() ) . '</a></code>' ) . '</p>',
		'default'         => 'events',
		'validation_type' => 'slug',
		'conditional'     => ( '' != get_option( 'permalink_structure' ) ),
	],
	'single-event-slug'               => [
		'type'            => 'text',
		'tooltip'         => '<p class="tribe-field-indent tribe-field-description description">' . sprintf( __( 'The slug used for building the single events URL, ideally singular. <br>Your single event URL is: %s', 'the-events-calendar' ), '<code>' . trailingslashit( home_url() ) . urldecode( tribe_get_option( 'singleEventSlug', 'event' ) ) . '/single-post-name/</code>' ) . '</p>',
		'default'         => 'event',
		'validation_type' => 'slug',
		'conditional'     => ( '' != get_option( 'permalink_structure' ) ),
	],
	'ical-info'                     => [
		'type'             => 'html',
		'html' => '<p id="ical-link" class="tribe-field-indent">' . esc_html__( 'Here is the iCal feed URL for your events:', 'the-events-calendar' ) . ' <code>' . tribe_get_ical_link() . '</code></p>',
		'conditional'      => function_exists( 'tribe_get_ical_link' ),
	],
	'tec-general-location-section-end' => [
		'type' => 'html',
		'html' => '</section>',
	],
];

$map_section = [
	'tec-general-map-section-start' => [
		'type' => 'html',
		'html' => '<section id="tec-map-settings-location-section" class="tec-settings-section">',
	],
	'tec-general-map-section-title'  => [
		'type' => 'html',
		'html' => '<h3>' . esc_html__( 'Map Settings', 'the-events-calendar' ) . '</h3>',
	],
	'embed-google-maps'               => [
		'type'            => 'checkbox_bool',
		'label'           => esc_html__( 'Enable Maps', 'the-events-calendar' ),
		'tooltip'         => esc_html__( 'Check to enable maps for events and venues.', 'the-events-calendar' ),
		'default'         => true,
		'class'           => 'google-embed-size',
		'validation_type' => 'boolean',
	],
	'embed-google-maps-zoom'           => [
		'type'            => 'text',
		'label'           => esc_html__( 'Google Maps default zoom level', 'the-events-calendar' ),
		'tooltip'         => esc_html__( '0 = zoomed out; 21 = zoomed in.', 'the-events-calendar' ),
		'size'            => 'small',
		'default'         => 10,
		'class'           => 'google-embed-field',
		'validation_type' => 'number_or_percent',
	],
	'tec-general-location-section-end' => [
		'type' => 'html',
		'html' => '</section>',
	],
];

$event_creation_section = [
	'tec-general-event-creation-section-start' => [
		'type' => 'html',
		'html' => '<section id="tec-general-settings-event-creation-section" class="tec-settings-section">',
	],
	'tec-general-event-creation-section-title'  => [
		'type' => 'html',
		'html' => '<h3>' . esc_html__( 'Event Creation', 'the-events-calendar' ) . '</h3>',
	],
	'disable_metabox_custom_fields' => [
		'type'            => 'checkbox_bool',
		'tooltip'         => esc_html__( 'Enable WordPress Custom Fields metabox on events in the classic editor.', 'the-events-calendar' ),
		'default'         => true,
		'validation_type' => 'boolean',
	],
	'multiDayCutoff'                => [
		'type'            => 'dropdown',
		'tooltip'         => '<p class="tribe-field-indent tribe-field-description description">' . sprintf( esc_html__( "Have an event that runs past midnight? Select a time after that event's end to avoid showing the event on the next day's calendar.", 'the-events-calendar' ) ) . '</p>',
		'validation_type' => 'options',
		'size'            => 'small',
		'default'         => date_i18n( $site_time_format, strtotime( '12:00 am' ) ),
		'options'         => [
			'00:00' => date_i18n( $site_time_format, strtotime( '12:00 am' ) ),
			'01:00' => date_i18n( $site_time_format, strtotime( '01:00 am' ) ),
			'02:00' => date_i18n( $site_time_format, strtotime( '02:00 am' ) ),
			'03:00' => date_i18n( $site_time_format, strtotime( '03:00 am' ) ),
			'04:00' => date_i18n( $site_time_format, strtotime( '04:00 am' ) ),
			'05:00' => date_i18n( $site_time_format, strtotime( '05:00 am' ) ),
			'06:00' => date_i18n( $site_time_format, strtotime( '06:00 am' ) ),
			'07:00' => date_i18n( $site_time_format, strtotime( '07:00 am' ) ),
			'08:00' => date_i18n( $site_time_format, strtotime( '08:00 am' ) ),
			'09:00' => date_i18n( $site_time_format, strtotime( '09:00 am' ) ),
			'10:00' => date_i18n( $site_time_format, strtotime( '10:00 am' ) ),
			'11:00' => date_i18n( $site_time_format, strtotime( '11:00 am' ) ),
		],
	],
	'defaultCurrencySymbol'         => [
		'type'            => 'text',
		'tooltip'         => esc_html__( 'Set the default currency symbol for event costs. Note that this only impacts future events, and changes made will not apply retroactively.', 'the-events-calendar' ),
		'validation_type' => 'textarea',
		'size'            => 'small',
		'default'         => '$',
	],
	'defaultCurrencyCode'         => [
		'type'            => 'text',
		'tooltip'         => esc_html__( 'Set the default currency ISO-4217 code for event costs. This is a three-letter code and is mainly used for data/SEO purposes.', 'the-events-calendar' ),
		'validation_type' => 'textarea',
		'size'            => 'small',
		'default'         => 'USD',
		'attributes'      => [
			'minlength'   => 3,
			'maxlength'   => 3,
			'placeholder' => __( 'USD', 'the-events-calendar' ),
		],
	],
	'reverseCurrencyPosition'       => [
		'type'            => 'checkbox_bool',
		'tooltip'         => esc_html__( 'The currency symbol normally precedes the value. Enabling this option positions the symbol after the value.', 'the-events-calendar' ),
		'default'         => false,
		'validation_type' => 'boolean',
	],
	'tec-general-event-creation-section-end' => [
		'type' => 'html',
		'html' => '</section>',
	]
];

$recurring_events_section = [
	'tec-general-recurring-events-section-start' => [
		'type' => 'html',
		'html' => '<section id="tec-general-settings-behavior-section" class="tec-settings-section">',
	],
	'tec-general-recurring-events-section-title'  => [
		'type' => 'html',
		'html' => '<h3>' . esc_html__( 'Recurring Events', 'the-events-calendar' ) . '</h3>',
	],
	'tec-general-recurring-events-section-end' => [
		'type' => 'html',
		'html' => '</section>',
	]
];

$cleanup_section = [
	'tec-general-cleanup-section-start' => [
		'type' => 'html',
		'html' => '<section id="tec-general-settings-behavior-section" class="tec-settings-section">',
	],
	'tec-general-cleanup-section-title'  => [
		'type' => 'html',
		'html' => '<h3>' . esc_html__( 'Cleanup', 'the-events-calendar' ) . '</h3>',
	],
	'amalgamate-duplicates'          => [
		'type'        => 'html',
		'html'        => '<fieldset class="tribe-field tribe-field-html"><div class="tribe-field-wrap">' . Tribe__Events__Amalgamator::migration_button( esc_html__( 'Merge Duplicates', 'the-events-calendar' ) ) . '<p class="description">' . esc_html__( 'Click this button to automatically merge identical venues and organizers.', 'the-events-calendar' ) . '</p></div></fieldset><div class="clear"></div>',
	],
	tribe( 'tec.event-cleaner' )->key_trash_events  => [
		'type'            => 'dropdown',
		'tooltip'         => esc_html__( 'This option allows you to automatically move past events to trash.', 'the-events-calendar' ),
		'validation_type' => 'options',
		'size'            => 'small',
		'default'         => null,
		'options'         => [
			null => esc_html__( 'Disabled', 'the-events-calendar' ),
			1    => esc_html__( '1 month', 'the-events-calendar' ),
			3    => esc_html__( '3 months', 'the-events-calendar' ),
			6    => esc_html__( '6 months', 'the-events-calendar' ),
			9    => esc_html__( '9 months', 'the-events-calendar' ),
			12   => esc_html__( '1 year', 'the-events-calendar' ),
			24   => esc_html__( '2 years', 'the-events-calendar' ),
			36   => esc_html__( '3 years', 'the-events-calendar' ),
		],
	],
	tribe( 'tec.event-cleaner' )->key_delete_events => [
		'type'            => 'dropdown',
		'tooltip'         => esc_html__( 'This option allows you to bulk delete past events. Be careful and backup your database before removing your events as there is no way to reverse the changes.', 'the-events-calendar' ),
		'validation_type' => 'options',
		'size'            => 'small',
		'default'         => null,
		'options'         => [
			null => esc_html__( 'Disabled', 'the-events-calendar' ),
			1    => esc_html__( '1 month', 'the-events-calendar' ),
			3    => esc_html__( '3 months', 'the-events-calendar' ),
			6    => esc_html__( '6 months', 'the-events-calendar' ),
			9    => esc_html__( '9 months', 'the-events-calendar' ),
			12   => esc_html__( '1 year', 'the-events-calendar' ),
			24   => esc_html__( '2 years', 'the-events-calendar' ),
			36   => esc_html__( '3 years', 'the-events-calendar' ),
		],
	],
	'debugEvents' => [
		'type'            => 'checkbox_bool',
		'tooltip'         => sprintf(
			esc_html__(
				'Enable this option to log debug information. By default this will log to your server PHP error log. If you\'d like to see the log messages in your browser, then we recommend that you install the %s and look for the "Tribe" tab in the debug output.',
				'tribe-common'
			),
			'<a target="_blank" rel="noopener noreferrer" href="https://wordpress.org/extend/plugins/debug-bar/">' . esc_html__( 'Debug Bar Plugin', 'tribe-common' ) . '</a>'
		),
		'default'         => false,
		'validation_type' => 'boolean',
		'conditional'     => is_super_admin(),

	],
	'tec-general-cleanup-section-end' => [
		'type' => 'html',
		'html' => '</section>',
	]
];

// Avengers Assemble!
$general_tab_fields = $general_behavior_section + $general_location_section + $event_creation_section + $recurring_events_section + $cleanup_section;

$general_tab_fields = Tribe__Main::array_insert_after_key(
	'tribe-form-content-start',
	$generalTabFields,
	$general_tab_fields
);

$general_tab_fields = apply_filters( 'tribe-event-general-settings-fields', $general_tab_fields );

// @TODO - move to Filterbar.
if ( tribe_events_views_v2_is_enabled() ) {
	$filter_activation = [
		'liveFiltersUpdate'             => [
			'default'         => 'automatic',
			'label'           => esc_html__( 'Filter Activation', 'the-events-calendar' ),
			'options'         => [
				'automatic' => __( 'Calendar view is updated immediately when a filter is selected', 'the-events-calendar' ),
				'manual'    => __( 'Submit button activates any selected filters', 'the-events-calendar' ),
			],
			'tooltip'         => esc_html__( 'Note: Automatic update may not be fully compliant with Web Accessibility Standards.', 'the-events-calendar' ),
			'type'            => 'radio',
			'validation_type' => 'options',
		]
	];

	// Push the control to the Filters tab.
	add_filter( 'tribe-event-filters-settings-fields', function ( $fields ) use ( $filter_activation ) {
		$fields += $filter_activation;
		return $fields;
	} );
}

return $general_tab_fields;
