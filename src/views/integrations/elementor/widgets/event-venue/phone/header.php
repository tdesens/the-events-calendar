<?php
/**
 * View: Elementor Single Event Venue widget phone header.
 *
 * You can override this template in your own theme by creating a file at
 * [your-theme]/tribe/events/integrations/elementor/widgets/venue/event-venue/phone/header.php
 *
 * @since TBD
 *
 * @var bool   $show_phone_header Whether to show the website header.
 * @var string $header_tag        The HTML tag to use for the website header.
 * @var string $header_text       The website header text.
 * @var string $venue_id          The venue ID.
 * @var Tribe\Events\Pro\Integrations\Elementor\Widgets\Event_Venue $widget The widget instance.
 */

if ( ! $show_phone_header ) {
	return;
}
?>
<<?php echo tag_escape( $header_tag ); ?> <?php tribe_classes( $widget->get_phone_base_class() . '-header' ); ?>>
	<?php echo wp_kses_post( $header_text ); ?>
</<?php echo tag_escape( $header_tag ); ?>>
