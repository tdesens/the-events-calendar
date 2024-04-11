<?php
/**
 * View: Elementor Event Cost widget header.
 *
 * You can override this template in your own theme by creating a file at
 * [your-theme]/tribe/events/integrations/elementor/widgets/event-cost/header.php
 *
 * @since TBD
 *
 * @var bool   $show         Whether to show the header.
 * @var Tribe\Events\Integrations\Elementor\Widgets\Event_Cost $widget The widget instance.
 */

if ( ! $show_header ) {
	return;
}
?>
<<?php echo tag_escape( $header_tag ); ?> <?php tribe_classes( $widget->get_header_class() ); ?>>
	<?php echo esc_html( $widget->get_header_text() ); ?>
</<?php echo tag_escape( $header_tag ); ?>>
