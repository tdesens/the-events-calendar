<?php
/**
 * Controls the main event query.  Allows for recurring events.
 */

use Tribe__Utils__Array as Arr;
use Tribe__Date_Utils as Dates;
use Tribe__Events__Main as TEC;

class Tribe__Events__Query {
	/**
	 * @since 4.9.4
	 *
	 * @var array The WP_Query arguments used in the last `getEvents` method
	 *            query.
	 */
	protected static $last_result = [];

	/**
	 * Set any query flags
	 *
	 * @param WP_Query $query
	 */
	public static function parse_query( $query ) {
		if ( is_admin() ) {
			return $query;
		}

		// If this is set then the class will bail out of any filtering.
		if ( $query->get( 'tribe_suppress_query_filters', false ) ) {
			return $query;
		}

		$context = tribe_context();

		// These are only required for Main Query stuff.
		if ( ! ( $context->is( 'is_main_query' ) && $context->is( 'tec_post_type' ) ) ) {

			if ( $query->is_home() ) {
				/**
				 * The following filter will remove the virtual page from the option page and return a 0 as it's not
				 * set when the SQL query is constructed to avoid having a is_page() instead of a is_home().
				 */
				add_filter( 'option_page_on_front', [ __CLASS__, 'default_page_on_front' ] );
				// check option for including events in the main wordpress loop, if true, add events post type
				if ( tribe_get_option( 'showEventsInMainLoop', false ) && ! get_query_var( 'tribe_events_front_page' ) ) {
					$query->query_vars['post_type']   = isset( $query->query_vars['post_type'] )
						? ( array ) $query->query_vars['post_type']
						: [ 'post' ];

					if ( ! in_array( Tribe__Events__Main::POSTTYPE, $query->query_vars['post_type'], true ) ) {
						$query->query_vars['post_type'][] = Tribe__Events__Main::POSTTYPE;
					}
					$query->tribe_is_multi_posttype   = true;
				}
			}


			if ( ( (array) $query->get( 'post_type', [] ) ) === [ Tribe__Events__Main::POSTTYPE ] ) {
				// Not the main query in Event context, but it's an event query: check back later.
				add_filter( 'parse_query', [ __CLASS__, 'filter_and_order_by_date' ], 1000 );
			}

			return $query;
		}

		// set paged
		if ( isset( $_GET['tribe_paged'] ) ) {
			$query->set( 'paged', absint( tribe_get_request_var( 'tribe_paged' ) ) );
		}

		// Add tribe events post type to tag queries only in tag archives
		if (
			$query->is_tag
			&& (array) $query->get( 'post_type' ) != [ Tribe__Events__Main::POSTTYPE ]
		) {
			$types = $query->get( 'post_type' );

			if ( empty( $types ) ) {
				$types = [ 'post' ];
			}

			if ( is_array( $types ) && $query->is_main_query() ) {
				$types[] = Tribe__Events__Main::POSTTYPE;
			} elseif ( $query->is_main_query() ) {
				if ( is_string( $types ) ) {
					$types = [ $types, Tribe__Events__Main::POSTTYPE ];
				} else {
					if ( $types != 'any' ) {
						$types = [ 'post', Tribe__Events__Main::POSTTYPE ];
					}
				}
			}

			$query->set( 'post_type', $types );
		}

		$types = (array) $context->get( 'post_type' );

		// check if any possibility of this being an event query
		$query->tribe_is_event = $context->is( 'event_post_type' );

		$query->tribe_is_multi_posttype = ( $query->tribe_is_event && count( $types ) >= 2 ) || in_array( 'any', $types );

		// check if any possibility of this being an event category
		$query->tribe_is_event_category = $context->is( 'event_category' );

		$query->tribe_is_event_venue = $context->is( 'venue_post_type' );

		$query->tribe_is_event_organizer = $context->is( 'organizer_post_type' );

		$query->tribe_is_event_query = $context->is( 'tec_post_type' );

		$query->tribe_is_past = 'past' === $context->get( 'event_display' );

		// never allow 404 on month view
		if (
			$query->is_main_query()
			&& 'month' === $query->get( 'eventDisplay' )
			&& ! $query->is_tax
			&& ! $query->tribe_is_event_category
		) {
			$query->is_post_type_archive = true;
			$query->queried_object       = get_post_type_object( Tribe__Events__Main::POSTTYPE );
			$query->queried_object_id    = 0;
		}

		if ( tribe_is_events_front_page() ) {
			$query->is_home = true;
		} else {
			$query->is_home = empty( $query->query_vars['is_home'] ) ? false : $query->query_vars['is_home'];
		}

		// Hook reasonably late on the action that will fire next to filter and order Events by date, if required.
		add_filter( 'tribe_events_parse_query', [ __CLASS__, 'filter_and_order_by_date' ], 1000 );

		/**
		 * Fires after the query has been parsed by The Events Calendar.
		 * If this action fires, then the query is for the Event post type, is the main
		 * query, and TEC filters are not suppressed.
		 *
		 * @since 3.5.1
		 *
		 * @param WP_Query $query The parsed WP_Query object.
		 */
		do_action( 'tribe_events_parse_query', $query );
	}

	/**
	 * Customized WP_Query wrapper to set up event queries with default arguments.
	 *
	 * @param array $args {
	 *		Optional. Array of Query parameters.
	 *
	 *      @type bool $found_posts Return the number of found events.
	 * }
	 * @param bool  $full Whether the full WP_Query object should returned (`true`) or just the
	 *                    found posts (`false`)
	 *
	 * @return array|WP_Query
	 */
	public static function getEvents( $args = [], $full = false ) {
		$defaults = [
			'orderby'              => 'event_date',
			'order'                => 'ASC',
			'posts_per_page'       => tribe_get_option( 'posts_per_page', tribe_get_option( 'postsPerPage', get_option( 'posts_per_page', 10 ) ) ),
			'tribe_render_context' => 'default',
		];

		$args = wp_parse_args( $args, $defaults );
		$event_display = tribe_get_request_var(
			'tribe_event_display',
			Tribe__Utils__Array::get( $args, 'eventDisplay', false )
		);

		$search = tribe_get_request_var( 'tribe-bar-search' );

		/**
		 * @todo Move this to each one of the views and their ajax requests
		 */
		// if a user provides a search term we want to use that in the search params
		if ( ! empty( $search ) ) {
			$args['s'] = $search;
		}

		$return_found_posts = ! empty( $args['found_posts'] );

		if ( $return_found_posts ) {
			unset( $args['found_posts'] );

			$args['posts_per_page'] = 1;
			$args['paged']          = 1;
		}

		// remove empty args and sort by key, this increases chance of a cache hit
		$args = array_filter( $args, [ __CLASS__, 'filter_args' ] );
		ksort( $args );

		/** @var Tribe__Cache $cache */
		$cache     = tribe( 'cache' );
		$cache_key = 'get_events_' . get_current_user_id() . serialize( $args );

		$result = $cache->get( $cache_key, 'save_post' );

		if (
			false !== $result
			&& (
				$result instanceof WP_Query
				|| (
					$return_found_posts
					&& is_int( $result )
				)
			)
		) {
			do_action( 'log', 'cache hit', 'tribe-events-cache', $args );
		} else {
			do_action( 'log', 'no cache hit', 'tribe-events-cache', $args );

			/** @var Tribe__Events__Repositories__Event $event_orm */
			$event_orm = tribe_events();

			$hidden = false;

			if ( isset( $args['tribe_render_context'] ) ) {
				$event_orm->set_render_context( $args['tribe_render_context'] );
			}

			if ( ! empty( $event_display ) ) {
				$event_orm->set_display_context( $event_display );
			}

			// Backcompat defaults.
			if ( isset( $args['hide_upcoming'] ) ) {
				// Negate the hide_upcoming for $hidden
				if ( true !== (boolean) $args['hide_upcoming'] ) {
					$hidden = null;
				}

				unset( $args['hide_upcoming'] );
			}

			$display = Arr::get( $args, 'eventDisplay' );
			$has_date_args = array_filter( [
				Arr::get( $args, 'start_date' ),
				Arr::get( $args, 'startDate' ),
				Arr::get( $args, 'starts_after' ),
				Arr::get( $args, 'starts_before' ),
				Arr::get( $args, 'end_date' ),
				Arr::get( $args, 'endDate' ),
				Arr::get( $args, 'ends_after' ),
				Arr::get( $args, 'ends_before' ),
			] );

			// Support for `eventDisplay = 'upcoming' || 'list'` for backwards compatibility
			if (
				! $has_date_args
				&& in_array( $display, [ 'upcoming', 'list' ] )
			) {
				if ( empty( $args['tribe_is_past'] ) ) {
					$args['start_date'] = 'now';
				}
				unset( $args['eventDisplay'] );
			}

			// Support for `eventDisplay = 'day'` for backwards compatibility
			if (
				! $has_date_args
				&& in_array( $display, [ 'day' ] )
			) {
				$args['start_date'] = 'today';
				unset( $args['eventDisplay'] );
			}

			// Support `tribeHideRecurrence` old param
			if ( isset( $args['tribeHideRecurrence'] ) ) {
				$args['hide_subsequent_recurrences'] = $args['tribeHideRecurrence'];
				unset( $args['tribeHideRecurrence'] );
			}

			if ( isset( $args['start_date'] ) && false === $args['start_date'] ) {
				unset( $args['start_date'] );
			}

			if ( isset( $args['end_date'] ) && false === $args['end_date'] ) {
				unset( $args['end_date'] );
			}

			if ( isset( $args['eventDate'] ) && ! isset( $args['start_date'], $args['end_date'] ) ) {
				$args['on_date'] = $args['eventDate'];
				unset( $args['eventDate'] );
			}

			if ( ! empty( $args['orderby'] ) ) {
				$event_orm->order_by( $args['orderby'] );

				unset( $args['orderby'] );
			}

			if ( 'all' === $event_display  ) {
				if ( empty( $args['post_parent'] ) ) {
					// Make sure the `post_parent` ID is set in /all requests.
					$parent_name = Tribe__Utils__Array::get(
						$args,
						'name',
						Tribe__Utils__Array::get( $args, 'tribe_events', false )
					);

					if ( ! empty( $parent_name ) ) {
						$post_parent         = tribe_events()->where( 'name', $parent_name )->fields( 'ids' )
						                                     ->first();
						$args['post_parent'] = $post_parent;
					}

					// Make sure these are unset to avoid 'post_name' comparisons.
					unset( $args['name'], $args['post_name'], $args['tribe_events'] );
				}

				if ( class_exists( 'Tribe__Events__Pro__Recurrence__Event_Query' ) ) {
					$recurrence_query = new Tribe__Events__Pro__Recurrence__Event_Query();
					$parent_post      = get_post( $args['post_parent'] );
					if ( $parent_post instanceof WP_Post ) {
						$recurrence_query->set_parent_event( $parent_post );
						add_filter( 'posts_where', [ $recurrence_query, 'include_parent_event' ], 100 );
					}
				}
			}

			$is_past = ! empty( $args['tribe_is_past'] ) || 'past' === $event_display;
			if ( $is_past ) {
				$args['order'] = 'DESC';
				/*
				 * If in the context of a "past" view let's try to use, as limit, the same
				 * end date limit passed, if any.
				 */
				$now = isset( $args['ends_before'] ) ? $args['ends_before'] : 'now';
				$pivot_date = tribe_get_request_var( 'tribe-bar-date', $now );
				$date       = Tribe__Date_Utils::build_date_object( $pivot_date );
				// Remove any existing date meta queries.
				if ( isset( $args['meta_query'] ) ) {
					$args['meta_query'] = tribe_filter_meta_query(
						$args['meta_query'],
						[ 'key' => '/_Event(Start|End)Date(UTC)/' ]
					);
				}

				/**
				 * We used to use the `tribe_beginning_of_day` for part of the query.
				 *
				 * Intentionally changed the behavior here to use "now" as part of the code
				 *
				 * @link https://central.tri.be/issues/123950
				 */
				$args['starts_before'] = $date->format( Tribe__Date_Utils::DBDATETIMEFORMAT );
			}

			if ( null !== $hidden ) {
				$event_orm->by( 'hidden', $hidden );
				if ( isset( $args['meta_query'] ) ) {
					$args['meta_query'] = tribe_filter_meta_query(
						$args['meta_query'],
						[ 'key' => '_EventHideFromUpcoming' ]
					);
				}
			}

			/**
			 * Some key arguments have been passed as arrays but will require unpacking.
			 * Due to the dynamic nature of the ORM implementation this is a curated list
			 * that should be updated here. Do not try to move this conditional unpacking logic
			 * in the ORM: this is an issue the proxy function should handle ad-hoc.
			 */
			$requiring_unpack = [ 'date_overlaps', 'runs_between' ];
			foreach ( array_intersect( array_keys( $args ), $requiring_unpack ) as $key ) {
				$event_orm->by( $key, ...$args[ $key ] );
				unset( $args[ $key ] );
			}

			$event_orm->by_args( $args );

			if ( $return_found_posts ) {
				$result = $event_orm->found();
			} else {
				$result = $event_orm->get_query();

				// Set the event display, if any, for back-compatibility purposes.
				if ( ! empty( $event_display ) ) {
					$result->set( 'eventDisplay', $event_display );
				}

				// Run the query.
				$result->get_posts();
				self::$last_result = empty( $result->posts ) ? [] : $result->posts;
			}

			$cache->set( $cache_key, $result, Tribe__Cache::NON_PERSISTENT, 'save_post' );
		}


		if ( $return_found_posts ) {
			return $result;
		}

		if ( ! empty( $result->posts ) ) {
			self::$last_result = empty( $result->posts ) ? [] : $result->posts;
			if ( $full ) {
				return $result;
			}
			return $result->posts;
		}

		if ( $full ) {
			self::$last_result = empty( $result->posts ) ? [] : $result->posts;
			return $result;
		}

		self::$last_result = [];
		return [];
	}

	/**
	 * Remove empty values from the query args
	 *
	 * @param mixed $arg
	 *
	 * @return bool
	 **/
	private static function filter_args( $arg ) {
		if ( empty( $arg ) && $arg !== false && 0 !== $arg ) {
			return false;
		}

		return true;
	}

	/**
	 * If the user has the Main events page set on the reading options it should return 0 or the default value in
	 * order to avoid to set the:
	 * - p
	 * - page_id
	 *
	 * variables when using  pre_get_posts or posts_where
	 *
	 * This filter is removed when this functions has finished the execution
	 *
	 * @since 4.6.15
	 *
	 * @param $value
	 *
	 * @return int
	 */
	public static function default_page_on_front( $value ) {
		return tribe( 'tec.front-page-view' )->is_virtual_page_id( $value ) ? 0 : $value;
	}

	/**
	 * Provided a query for Events, the method will set the query variables up to filter
	 * and order Events by start and end date.
	 *
	 * @since TBD
	 *
	 * @param WP_Query $query The query object to modify.
	 *
	 * @return void The query object is modified by reference.
	 */
	public static function filter_and_order_by_date( $query ) {
		if ( ! $query instanceof WP_Query ) {
			return;
		}

		if ( $query->get( 'tribe_suppress_query_filters', false ) ) {
			// Filters were suppressed by others, bail.
			return;
		}

		// If this is a query for a single event, we don't need to order it.
		if ( $query->is_single ) {
			return;
		}

		// Work done: stop filtering.
		remove_filter( current_action(), [ __CLASS__, 'filter_and_order_by_date' ] );

		$query_vars = $query->query_vars ?? [];

		// If a clause on the '_Event(Start|End)Date(UTC)' meta key is present in any query variable, bail.
		if ( ! empty( $query_vars ) && preg_match( '/_Event(Start|End)Date(UTC)?/', serialize( $query_vars ) ) ) {
			return;
		}

		/**
		 * Filters the value that will be used to indicate the current moment in an
		 * Event query. The query will return Events ending after the current moment.
		 *
		 * @since TBD
		 *
		 * @param string|int|DateTimeInterface $current_moment The current moment, defaults to `now`.
		 * @param WP_Query                     $query          The query object being filtered.
		 */
		$current_moment = apply_filters( 'tec_events_query_current_moment', 'now', $query );

		// Only get Events ending after now altering the current meta query.
		$meta_query = $query_vars['meta_query'] ?? [];
		$meta_query['tec_event_start_date'] = [
			'key'     => '_EventStartDate',
			'compare' => 'EXISTS',
		];
		$meta_query['tec_event_end_date'] = [
			'key'     => '_EventEndDate',
			'value'   => Dates::immutable( $current_moment )->format( Dates::DBDATETIMEFORMAT ),
			'compare' => '>=',
			'type'    => 'DATETIME',
		];
		$query->query_vars['meta_query'] = $meta_query;

		// Order the resulting events by start date, then post date.
		$orderby = $query_vars['orderby'] ?? '';
		$order = $query_vars['order'] ?? null;
		$query->query_vars['orderby'] = tribe_normalize_orderby( $orderby, $order );
		$query->query_vars['orderby']['tec_event_start_date'] = 'ASC';
		$query->query_vars['orderby']['post_date'] = 'ASC';

		// Duplicate the values on the `query` property of the query.
		$query->query['meta_query'] = $query->query_vars['meta_query'];
		$query->query['orderby'] = $query->query_vars['orderby'];
	}

	/**
	 * Is hooked by init() filter to parse the WP_Query arguments for main and alt queries.
	 *
	 * @param object $query WP_Query object args supplied or default
	 *
	 * @return object $query (modified)
	 */
	public static function pre_get_posts( $query ) {
		// If this is set then the class will bail out of any filtering.
		if ( $query->get( 'tribe_suppress_query_filters', false ) ) {
			return $query;
		}

		if ( $query->is_main_query() && is_home() ) {
			/**
			 * The following filter will remove the virtual page from the option page and return a 0 as it's not
			 * set when the SQL query is constructed to avoid having a is_page() instead of a is_home().
			 */
			add_filter( 'option_page_on_front', array( __CLASS__, 'default_page_on_front' ) );
			// check option for including events in the main wordpress loop, if true, add events post type
			if ( tribe_get_option( 'showEventsInMainLoop', false ) ) {
				$query->query_vars['post_type']   = isset( $query->query_vars['post_type'] )
					? ( array ) $query->query_vars['post_type']
					: array( 'post' );

				if ( ! in_array( Tribe__Events__Main::POSTTYPE, $query->query_vars['post_type'] ) ) {
					$query->query_vars['post_type'][] = Tribe__Events__Main::POSTTYPE;
				}
				$query->tribe_is_multi_posttype   = true;
			}
		}

		if ( $query->tribe_is_multi_posttype ) {
			do_action( 'log', 'multi_posttype', 'default', $query->tribe_is_multi_posttype );
			add_filter( 'posts_fields', array( __CLASS__, 'multi_type_posts_fields' ), 10, 2 );
			add_filter( 'posts_join', array( __CLASS__, 'posts_join' ), 10, 2 );
			add_filter( 'posts_join', array( __CLASS__, 'posts_join_venue_organizer' ), 10, 2 );
			add_filter( 'posts_distinct', array( __CLASS__, 'posts_distinct' ) );
			add_filter( 'posts_orderby', array( __CLASS__, 'posts_orderby' ), 10, 2 );
			do_action( 'tribe_events_pre_get_posts', $query );

			return;
		}

		if ( $query->tribe_is_event || $query->tribe_is_event_category ) {
			/**
			 * Filters whether or not to use the Start Date meta hack to include meta table.
			 *
			 * We only add the `postmeta` hack if it's not the main admin events list
			 * because this method filters out drafts without EventStartDate.
			 * For this screen we're doing the JOIN manually in `Tribe__Events__Admin_List`.
			 *
			 * Important to note, this need to happen as the first thing, due to how we depend on
			 * StartDate been the first param on the Meta Query.
			 *
			 * @param boolean $use_hack Whether to include the start date meta or not.
			 * @param \WP_Query|null $query The query that is currently being filtered or `null` if no query is
			 *                              being filtered.
			 *
			 * @since 4.9
			 */
			$include_date_meta = apply_filters( 'tribe_events_query_include_start_date_meta', true, $query );
			if (
				$include_date_meta
				&& ! tribe( 'context' )->is_editing_post( Tribe__Events__Main::POSTTYPE )
			) {
				$date_meta_key = Tribe__Events__Timezones::is_mode( 'site' )
					? '_EventStartDateUTC'
					: '_EventStartDate';

				$meta_query[] = array(
					'key'  => $date_meta_key,
					'type' => 'DATETIME',
				);

				$query->set( 'tribe_include_date_meta', true );
			}

			if ( ! ( $query->is_main_query() && 'month' === $query->get( 'eventDisplay' ) ) ) {
				add_filter( 'option_page_on_front', array( __CLASS__, 'default_page_on_front' ) );
				add_filter( 'posts_fields', array( __CLASS__, 'posts_fields' ), 10, 2 );
				add_filter( 'posts_join', array( __CLASS__, 'posts_join' ), 10, 2 );
				add_filter( 'posts_join', array( __CLASS__, 'posts_join_venue_organizer' ), 10, 2 );
				add_filter( 'posts_where', array( __CLASS__, 'posts_where' ), 10, 2 );
				add_filter( 'posts_distinct', array( __CLASS__, 'posts_distinct' ) );
			} else {

				// reduce number of queries triggered by main WP_Query on month view
				$query->set( 'posts_per_page', 1 );
				$query->set( 'no_found_rows', true );
				$query->set( 'cache_results', false );
				$query->set( 'update_post_meta_cache', false );
				$query->set( 'update_post_term_cache', false );
				do_action( 'tribe_events_pre_get_posts', $query );

				return $query;
			}

			// if a user selects a date in the event bar we want it to persist as long as possible
			if ( ! empty( $_REQUEST['tribe-bar-date'] ) ) {
				$query->set( 'eventDate', $_REQUEST['tribe-bar-date'] );
				do_action( 'log', 'changed eventDate to tribe-bar-date', 'tribe-events-query', $_REQUEST['tribe-bar-date'] );
			}

			// if a user provides a search term we want to use that in the search params
			if ( ! empty( $_REQUEST['tribe-bar-search'] ) ) {
				$query->query_vars['s'] = $_REQUEST['tribe-bar-search'];
			}

			$query->set( 'eventDisplay', $query->get( 'eventDisplay', Tribe__Events__Main::instance()->displaying ) );

			// By default we'll hide events marked as "hidden from event listings" unless
			// the query explicity requests they be exposed
			$maybe_hide_events = (bool) $query->get( 'hide_upcoming', true );

			$skip_event_display_filters = is_admin() && $query->is_main_query() && ! tribe_is_ajax_view_request();

			//@todo stop calling EOD cutoff transformations all over the place
			if ( ! empty( $query->query_vars['eventDisplay'] ) && ! $skip_event_display_filters ) {
				switch ( $query->query_vars['eventDisplay'] ) {
					case 'custom':
						// if the eventDisplay is 'custom', all we're gonna do is make sure the start and end dates are formatted
						$start_date = $query->get( 'start_date' );

						if ( $start_date ) {
							$start_date_string = $start_date instanceof DateTime
								? $start_date->format( Tribe__Date_Utils::DBDATETIMEFORMAT )
								: $start_date;

							$query->set( 'start_date', date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT, strtotime( $start_date_string ) ) );
						}

						$end_date = $query->get( 'end_date' );

						if ( $end_date ) {
							$end_date_string = $end_date instanceof DateTime
								? $end_date->format( Tribe__Date_Utils::DBDATETIMEFORMAT )
								: $end_date;

							$query->set( 'end_date', date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT, strtotime( $end_date_string ) ) );
						}
						break;
					case 'month':

						// make sure start and end date are set
						if ( $query->get( 'start_date' ) == '' ) {
							$event_date = ( $query->get( 'eventDate' ) != '' )
								? $query->get( 'eventDate' )
								: date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT );
							$query->set( 'start_date', tribe_beginning_of_day( $event_date ) );
						}

						if ( $query->get( 'end_date' == '' ) ) {
							$query->set( 'end_date', tribe_end_of_day( $query->get( 'start_date' ) ) );
						}
						$query->set( 'hide_upcoming', $maybe_hide_events );

						break;
					case 'day':
						$event_date = $query->get( 'eventDate' ) != '' ? $query->get( 'eventDate' ) : date( 'Y-m-d', current_time( 'timestamp' ) );
						$query->set( 'eventDate', $event_date );
						$beginning_of_day = strtotime( tribe_beginning_of_day( $event_date ) );
						$query->set( 'start_date', date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT, $beginning_of_day ) );
						$query->set( 'end_date', tribe_end_of_day( $event_date ) );
						$query->set( 'posts_per_page', - 1 ); // show ALL day posts
						$query->set( 'hide_upcoming', $maybe_hide_events );
						$query->set( 'order', self::set_order( 'ASC', $query ) );
						break;
					case 'single-event':
						if ( $query->get( 'eventDate' ) != '' ) {
							$query->set( 'start_date', $query->get( 'eventDate' ) );
							$query->set( 'eventDate', $query->get( 'eventDate' ) );
						}
						break;
					case 'future':
						$event_date = ( '' !== $query->get( 'eventDate' ) )
							? $query->get( 'eventDate' )
							: date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT );
						$query->set( 'start_date', ( '' != $query->get( 'eventDate' ) ? tribe_beginning_of_day( $event_date ) : tribe_format_date( current_time( 'timestamp' ), true, 'Y-m-d H:i:00' ) ) );
						$query->set( 'order', self::set_order( 'ASC', $query ) );
						$query->set( 'orderby', self::set_orderby( null, $query ) );
						$query->set( 'hide_upcoming', $maybe_hide_events );
						break;
					case 'all':
						$query->set( 'orderby', self::set_orderby( null, $query ) );
						$query->set( 'order', self::set_order( 'ASC', $query ) );
						$query->set( 'hide_upcoming', $maybe_hide_events );
						$query->set( 'start_date', tribe_format_date( current_time( 'timestamp' ), true, 'Y-m-d H:i:00' ) );
						break;
					case 'list':
					default: // default display query
						if ( '' != $query->get( 'eventDate' ) ) {
							$event_date = $query->get( 'eventDate' );
						} else {
							$event_date = date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT );
						}

					if ( ! $query->get( 'tribe_remove_date_filters', false ) ) {
						if ( $query->tribe_is_past ) {
							// on past view, set the passed date as the end date
							$query->set( 'start_date', '' );
							$query->set( 'end_date', $event_date );
							$query->set( 'order', self::set_order( 'DESC', $query ) );
						} else {
							if ( '' != $query->get( 'eventDate' ) ) {
								$event_date = tribe_beginning_of_day( $event_date );
							} else {
								$event_date = tribe_format_date( current_time( 'timestamp' ),
																	true,
																	'Y-m-d H:i:00' );
							}

							$orm_meta_query = tribe_events()->filter_by_ends_after( $event_date );

							$meta_query['ends-after'] = $orm_meta_query['meta_query']['ends-after'];

							$query->set( 'order', self::set_order( 'ASC', $query ) );
						}
					}

					$query->set( 'orderby', self::set_orderby( null, $query ) );
					$query->set( 'hide_upcoming', $maybe_hide_events );
					break;
				}
			} else {
				$query->set( 'hide_upcoming', $maybe_hide_events );
				$query->set( 'start_date', date_i18n( Tribe__Date_Utils::DBDATETIMEFORMAT ) );
				$query->set( 'orderby', self::set_orderby( null, $query ) );
				$query->set( 'order', self::set_order( null, $query ) );
			}

			// eventCat becomes a standard taxonomy query - will need to deprecate and update views eventually
			if ( ! in_array( $query->get( Tribe__Events__Main::TAXONOMY ), array( '', '-1' ) ) ) {
				$tax_query[] = array(
					'taxonomy'         => Tribe__Events__Main::TAXONOMY,
					'field'            => 'slug',
					'terms'            => $query->get( Tribe__Events__Main::TAXONOMY ),
					'include_children' => apply_filters( 'tribe_events_query_include_children', true ),
				);
			}
		}

		// filter by Venue ID
		if ( $query->tribe_is_event_query && $query->get( 'venue' ) != '' ) {
			$meta_query[] = array(
				'key'   => '_EventVenueID',
				'value' => $query->get( 'venue' ),
			);
		}

		// filter by Organizer ID
		if ( $query->tribe_is_event_query && $query->get( 'organizer' ) != '' ) {
			$meta_query[] = array(
				'key'   => '_EventOrganizerID',
				'value' => $query->get( 'organizer' ),
			);
		}

		// enable pagination setup
		if ( $query->tribe_is_event_query && $query->get( 'posts_per_page' ) == '' ) {
			$query->set( 'posts_per_page', (int) tribe_get_option( 'postsPerPage', 10 ) );
		}

		// hide upcoming events from query (only not in admin)
		if ( $query->tribe_is_event_query && $query->get( 'hide_upcoming' ) && ! $query->get( 'suppress_filters' ) ) {
			$hide_upcoming_ids = self::getHideFromUpcomingEvents();
			if ( ! empty( $hide_upcoming_ids ) ) {
				// Merge if there is any items and remove empty items
				$hide_upcoming_ids = array_filter( array_merge( $hide_upcoming_ids, (array) $query->get( 'post__not_in' ) ) );

				$query->set( 'post__not_in', $hide_upcoming_ids );
			}
		}

		if ( $query->tribe_is_event_query && ! empty( $meta_query ) ) {
			// setup default relation for meta queries
			$meta_query['relation'] = 'AND';
			$meta_query_combined    = array_merge( (array) $meta_query, (array) $query->get( 'meta_query' ) );
			$query->set( 'meta_query', $meta_query_combined );
		}

		if ( $query->tribe_is_event_query && ! empty( $tax_query ) ) {
			// setup default relation for tax queries
			$tax_query_combined = array_merge( (array) $tax_query, (array) $query->get( 'tax_query' ) );
			$query->set( 'tax_query', $tax_query_combined );
		}

		if ( $query->tribe_is_event_query ) {
			add_filter( 'posts_orderby', array( __CLASS__, 'posts_orderby' ), 10, 2 );
		}

		if ( $query->tribe_is_event_query ) {
			do_action( 'tribe_events_pre_get_posts', $query );
		}

		/**
		 * If is in the admin remove the event date & upcoming filters, unless is an ajax call
		 * It's important to note that `tribe_remove_date_filters` needs to be set before calling
		 * self::should_remove_date_filters() to allow the date_filters to be actually removed
		 */
		if ( self::should_remove_date_filters( $query ) ) {
			remove_filter( 'option_page_on_front', array( __CLASS__, 'default_page_on_front' ) );
			remove_filter( 'posts_where', array( __CLASS__, 'posts_where' ), 10, 2 );
			remove_filter( 'posts_fields', array( __CLASS__, 'posts_fields' ) );
			remove_filter( 'posts_orderby', array( __CLASS__, 'posts_orderby' ), 10, 2 );
			$query->set( 'post__not_in', '' );

			// set the default order for posts within admin lists
			if ( ! isset( $query->query['order'] ) ) {
				$query->set( 'order', 'DESC' );
			} else {
				// making sure we preserve the order supplied by the query string even if it is overwritten above
				$query->set( 'order', $query->query['order'] );
			}
		}

		return $query;
	}

	/**
	 * Returns whether or not the event date & upcoming filters should be removed from the query
	 *
	 * @since 4.0
	 * @param WP_Query $query WP_Query object
	 * @return boolean
	 */
	public static function should_remove_date_filters( $query ) {
		// if the query flag to remove date filters is explicitly set then remove them
		if ( true === $query->get( 'tribe_remove_date_filters', false ) ) {
			return true;
		}

		// if we're doing ajax, let's keep the date filters
		if ( tribe( 'context' )->doing_ajax() ) {
			return false;
		}

		// otherwise, let's remove the date filters if we're in the admin dashboard and the query is
		// an event query on the tribe_events edit page
		return is_admin()
			&& $query->tribe_is_event_query
			&& Tribe__Admin__Helpers::instance()->is_screen( 'edit-' . Tribe__Events__Main::POSTTYPE );
	}

	/**
	 * Custom SQL join for event end date
	 *
	 * @param string   $join_sql
	 * @param wp_query $query
	 *
	 * @return string
	 */
	public static function posts_join( $join_sql, $query ) {
		global $wpdb;
		$joins = array();

		$postmeta_table = self::postmeta_table( $query );

		/**
		 * Which param will be queried in the Database for Events Date Start.
		 *
		 * @since  1.0
		 *
		 * @var string
		 */
		$event_start_key = Tribe__Events__Timezones::is_mode( 'site' )
			? '_EventStartDateUTC'
			: '_EventStartDate';

		/**
		 * Which param will be queried in the Database for Events Date End.
		 *
		 * @since  1.0
		 *
		 * @var string
		 */
		$event_end_key = Tribe__Events__Timezones::is_mode( 'site' )
			? '_EventEndDateUTC'
			: '_EventEndDate';

		// if it's a true event query then we want create a join for where conditions
		if ( $query->tribe_is_event || $query->tribe_is_event_category || $query->tribe_is_multi_posttype ) {
			if ( $query->tribe_is_multi_posttype ) {
				// if we're getting multiple post types, we don't need the end date, just get the start date
				// for events-only post type queries, the start date postmeta join is already added by the main query args
				$joins['event_start_date'] = " LEFT JOIN {$wpdb->postmeta} as {$postmeta_table} on {$wpdb->posts}.ID = {$postmeta_table}.post_id AND {$postmeta_table}.meta_key = '$event_start_key'";
			} else {
				// for events-only post type queries, we should also get the end date for display
				$joins['event_end_date'] = " LEFT JOIN {$wpdb->postmeta} as tribe_event_end_date ON ( {$wpdb->posts}.ID = tribe_event_end_date.post_id AND tribe_event_end_date.meta_key = '$event_end_key' ) ";
			}
			$joins = apply_filters( 'tribe_events_query_posts_joins', $joins, $query );

			return $join_sql . implode( '', $joins );
		}

		return $join_sql;
	}

	/**
	 * Determine what postmeta table should be used,
	 * to avoid conflicts with previous postmeta joins
	 *
	 * @return string
	 **/
	private static function postmeta_table( $query ) {
		/** @var \wpdb $wpdb */
		global $wpdb;
		$postmeta_table = $wpdb->postmeta;

		if ( ! $query->tribe_is_multi_posttype ) {
			return $postmeta_table;
		}

		$qv = $query->query_vars;

		// check if are any meta queries
		if ( ! empty( $qv['meta_key'] ) ) {
			$postmeta_table = 'tribe_event_postmeta';
		} else {
			if ( isset( $qv['meta_query'] ) ) {
				if (
					( is_array( $qv['meta_query'] ) && ! empty( $qv['meta_query'] ) ) ||
					( $qv['meta_query'] instanceof WP_Meta_Query && ! empty( $qv['meta_query']->queries ) )
				) {
					$postmeta_table = 'tribe_event_postmeta';
				}
			} else {
				$postmeta_table = $wpdb->postmeta;
			}
		}

		return $postmeta_table;
	}

	/**
	 * Adds a custom SQL join when ordering by venue or organizer is desired.
	 *
	 * @param string   $join_sql
	 * @param wp_query $query
	 *
	 * @return string
	 */
	public static function posts_join_venue_organizer( $join_sql, $query ) {
		// bail if this is not a query for event post type
		if ( $query->get( 'post_type' ) !== Tribe__Events__Main::POSTTYPE ) {
			return $join_sql;
		}

		global $wpdb;

		switch ( $query->get( 'orderby' ) ) {
			case 'venue':
				$join_sql .= " LEFT JOIN {$wpdb->postmeta} tribe_order_by_venue_meta ON {$wpdb->posts}.ID = tribe_order_by_venue_meta.post_id AND tribe_order_by_venue_meta.meta_key='_EventVenueID' LEFT JOIN {$wpdb->posts} tribe_order_by_venue ON tribe_order_by_venue_meta.meta_value = tribe_order_by_venue.ID ";
				break;
			case 'organizer':
				$join_sql .= " LEFT JOIN {$wpdb->postmeta} tribe_order_by_organizer_meta ON {$wpdb->posts}.ID = tribe_order_by_organizer_meta.post_id AND tribe_order_by_organizer_meta.meta_key='_EventOrganizerID' LEFT JOIN {$wpdb->posts} tribe_order_by_organizer ON tribe_order_by_organizer_meta.meta_value = tribe_order_by_organizer.ID ";
				break;
			default:
				return $join_sql;
				break;
		}

		/**
		 * Ensures we add the matching corresponding code to the order clause.
		 *
		 * We use posts_clauses (as opposed to posts_orderby) in this case to avoid
		 * it being overwritten by Tribe__Events__Admin_List methods.
		 *
		 * @see Tribe__Events__Admin_List
		 */
		add_filter( 'posts_clauses', array( __CLASS__, 'posts_orderby_venue_organizer' ), 100, 2 );

		if ( has_filter( 'tribe_events_query_posts_join_orderby' ) ) {
			/**
			 * Historically this filter has only been useful to modify the joins setup
			 * in relation to organizers and venues. In future it may have a more general
			 * application or may be removed.
			 *
			 * @deprecated since 4.0.2
			 *
			 * @var string $join_sql
			 */
			$join_sql = apply_filters( 'tribe_events_query_posts_join_orderby', $join_sql );

			_doing_it_wrong(
				'tribe_events_query_posts_join_orderby (filter)',
				'To modify joins in relation to venues and organizers specifically you are encouraged to use the tribe_events_query_posts_join_venue_organizer hook.',
				'4.0.2'
			);
		}

		/**
		 * Provides an opportunity to modify the join condition added to the query when
		 * ordering by venue or organizer.
		 *
		 * @var string $join_sql
		 */
		return apply_filters( 'tribe_events_query_posts_join_venue_organizer', $join_sql );
	}

	/**
	 * Appends the necessary conditions to the order clause to sort by either venue or
	 * organizer.
	 *
	 * @param  array    $clauses
	 * @param  WP_Query $query
	 * @return string
	 */
	public static function posts_orderby_venue_organizer( array $clauses, $query ) {
		// This filter has to be added for every individual query that requires it
		remove_filter( 'posts_clauses', array( __CLASS__, 'posts_orderby_venue_organizer' ), 100 );

		$order   = ( isset( $query->order ) && ! empty( $query->order ) ) ? $query->order : $query->get( 'order' );
		$orderby = ( isset( $query->orderby ) && ! empty( $query->orderby ) ) ? $query->orderby : $query->get( 'orderby' );

		switch ( $orderby ) {
			case 'venue':
				$clauses['orderby'] = "tribe_order_by_venue.post_title {$order}, " . $clauses['orderby'];
				break;
			case 'organizer':
				$clauses['orderby'] = "tribe_order_by_organizer.post_title {$order}, " . $clauses['orderby'];
				break;
			default:
				return $clauses;
				break;
		}

		// Trim trailing characters
		$clauses['orderby'] = trim( $clauses['orderby'], ", \t\n\r\0\x0B" );

		return $clauses;
	}

	/**
	 * Custom SQL order by statement for Event Start Date result order.
	 *
	 * @param string   $order_sql
	 * @param wp_query $query
	 *
	 * @return string
	 */
	public static function posts_orderby( $order_sql, $query ) {
		global $wpdb;

		if ( $query->tribe_is_event || $query->tribe_is_event_category ) {
			$order   = ( isset( $query->query_vars['order'] ) && ! empty( $query->query_vars['order'] ) ) ? $query->query_vars['order'] : $query->get( 'order' );
			$orderby = ( isset( $query->query_vars['orderby'] ) && ! empty( $query->query_vars['orderby'] ) ) ? $query->query_vars['orderby'] : $query->get( 'orderby' );

			if ( self::can_inject_date_field( $query ) && ! $query->tribe_is_multi_posttype ) {
				$old_orderby = $order_sql;
				$order_sql = "EventStartDate {$order}";

				if ( $old_orderby ) {
					$order_sql .= ", {$old_orderby}";
				}
			}

			do_action( 'log', 'orderby', 'default', $orderby );

			switch ( $orderby ) {
				case 'title':
					$order_sql = "{$wpdb->posts}.post_title {$order}, " . $order_sql;
					break;
				case 'menu_order':
					$order_sql = "{$wpdb->posts}.menu_order ASC, " . $order_sql;
					break;
				case 'event_date':
					// we've already setup $order_sql
					break;
				case 'rand':
					$order_sql = 'RAND()';
					break;
			}

			// trim trailing characters
			$order_sql = trim( $order_sql, ", \t\n\r\0\x0B" );
		} else {
			if ( $query->tribe_is_multi_posttype && self::can_inject_date_field( $query ) ) {
				if ( $query->get( 'orderby' ) == 'date' || $query->get( 'orderby' ) == '' ) {
					$order_sql = str_replace( "$wpdb->posts.post_date", 'post_date', $order_sql );
				}
			}
		}

		$order_sql = apply_filters( 'tribe_events_query_posts_orderby', $order_sql, $query );

		return $order_sql;
	}

	/**
	 * determines whether a date field can be injected into various parts of a query
	 *
	 * @param $query WP_Query Query object
	 *
	 * @return boolean
	 */
	public static function can_inject_date_field( $query ) {
		$can_inject = true;

		if ( 'ids' === $query->query_vars['fields'] ) {
			$can_inject = false;
		}

		if ( 'id=>parent' === $query->query_vars['fields'] ) {
			$can_inject = false;
		}

		if ( isset( $query->query_vars['do_not_inject_date'] ) && $query->query_vars['do_not_inject_date'] ) {
			$can_inject = false;
		}

		/**
		 * When using the ORM we cannot use EventStartDate injection
		 */
		if ( isset( $query->builder ) && $query->builder instanceof Tribe__Repository ) {
			$can_inject = false;
		}

		/**
		 * Determine whether a date field can be injected into various parts of a query.
		 *
		 * @param boolean  $can_inject Whether the date field can be injected
		 * @param WP_Query $query      Query object
		 *
		 * @since 4.5.8
		 */
		return apply_filters( 'tribe_query_can_inject_date_field', $can_inject, $query );
	}

	/**
	 * Adds DISTINCT to the query.
	 *
	 * @param string $distinct The current DISTINCT statement.
	 *
	 * @return string The modified DISTINCT statement.
	 */
	public static function posts_distinct( $distinct ) {
		return 'DISTINCT';
	}

	/**
	 * Adds the proper fields to the FIELDS statement in the query.
	 *
	 * @param string   $field_sql The current/original FIELDS statement.
	 * @param WP_Query $query     The current query object.
	 *
	 * @return string The modified FIELDS statement.
	 */
	public static function multi_type_posts_fields( $field_sql, $query ) {
		if (
			! empty( $query->tribe_is_multi_posttype )
			&& self::can_inject_date_field( $query )
		) {
			global $wpdb;
			$postmeta_table = self::postmeta_table( $query );
			$fields         = array();
			$fields[]       = "IF ({$wpdb->posts}.post_type = 'tribe_events', $postmeta_table.meta_value, {$wpdb->posts}.post_date) AS post_date";
			$fields         = apply_filters( 'tribe_events_query_posts_fields', $fields, $query );

			return $field_sql . ', ' . implode( ', ', $fields );
		} else {
			return $field_sql;
		}
	}
}
