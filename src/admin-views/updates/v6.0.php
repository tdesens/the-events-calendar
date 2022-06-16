<?php
/**
 * The template that displays the welcome message when the plugin is first activated.
 */

$main = Tribe__Main::instance();
?>

<div class="tribe-events-admin-content-wrapper">
	<img
		class="tribe-events-admin-graphic tribe-events-admin-graphic--desktop-only"
		src="<?php echo esc_url( tribe_resource_url( 'update-page-graphic.png', false, 'src/resources/images/', null ) ); ?>"
		alt="<?php esc_attr_e( 'Shapes and lines for visual interest', 'the-events-calendar' ); ?>"
	/>

	<div class="tribe-events-admin-title">
		<img
		class="tribe-events-admin-title__logo"
		src="<?php echo esc_url( tribe_resource_url( 'images/logo/the-events-calendar.svg', false, null, $main ) ); ?>"
		alt="<?php esc_attr_e( 'The Events Calendar logo', 'the-events-calendar' ); ?>"
		/>

		<div class="tribe-events-admin-title__heading-wrapper">
			<p class="tribe-events-admin-title__sub-heading"><?php esc_html_e( 'Welcome to', 'the-events-calendar' ); ?></p>
			<h2 class="tribe-events-admin-title__heading"><?php esc_html_e( 'The Events Calendar 6.0', 'the-events-calendar' ); ?></h2>
		</div>
	</div>

	<?php echo tribe( 'tec.admin.notice.update' )->notice(); ?>

	<div class="tec-update-page-intro">
		<h3><?php esc_html_e( 'You are almost done completing your update!', 'the-events-calendar' ); ?></h3>

		<p><?php esc_html_e( 'Once you migrate to the new data storage system, you’ll find improved performance for The Events Calendar. What does this mean for you? Faster event creation and editing on the backend and quicker loading times for your frontend calendar.', 'the-events-calendar' ); ?></p>

		<div style="padding:56.25% 0 0 0;position:relative;">
			<iframe src="https://player.vimeo.com/video/480516958?h=dda22d4e01" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="The Events Calendar 6.0"></iframe>
			<script src="https://player.vimeo.com/api/player.js"></script>
		</div>
	</div>

	<div class="tec-update-page-event-series">
		<h3><span>⚡</span> <?php esc_html_e( 'New Features for Events Calendar Pro', 'the-events-calendar' ); ?></h3>
		<div class="tec-update-page-grid">
			<div class="tec-update-page-grid__item">
				<p><?php esc_html_e( 'A game-changing ✨new✨ post type, called Series, that allows you to group and manage any single or recurring events together like never before.', 'the-events-calendar' ); ?></p>
				<p><?php esc_html_e( 'With Series, you can edit an individual occurrence of a recurring event without disconnecting it from the others, allowing you to build complex event Series with different venues, images, and more.', 'the-events-calendar' ); ?></p>
			</div>

			<div class="tec-update-page-grid__item">
				<img src="<?php echo esc_url( tribe_resource_url( 'update-page-features-1.png', false, 'src/resources/images/', null ) ); ?>" alt="<?php esc_attr_e( 'Event series graphic', 'the-events-calendar' ); ?>" />
			</div>
		</div>
		<div class="tec-update-page-grid">
			<div class="tec-update-page-grid__item has-media">
				<img src="<?php echo esc_url( tribe_resource_url( 'update-page-features-2.png', false, 'src/resources/images/', null ) ); ?>" alt="<?php esc_attr_e( 'Event series graphic', 'the-events-calendar' ); ?>" />
				<p><b><?php esc_html_e( 'Advanced editing options', 'the-events-calendar' ); ?></b> <?php esc_html_e( 'for recurring events to provide you with even more event possibilities.', 'the-events-calendar' ); ?></p>				
			</div>
			<div class="tec-update-page-grid__item has-media">
				<img src="<?php echo esc_url( tribe_resource_url( 'update-page-features-3.png', false, 'src/resources/images/', null ) ); ?>" alt="<?php esc_attr_e( 'Event series graphic', 'the-events-calendar' ); ?>" />
				<p><b><?php esc_html_e( 'Duplicate Event Tool', 'the-events-calendar' ); ?></b> <?php esc_html_e( 'allows you to recreate and modify your events in seconds, making event creation a breeze.', 'the-events-calendar' ); ?></p>				
			</div>
		</div>
		<?php if( ! class_exists( 'Tribe__Events__Pro__Main' ) ): ?>
			<div class="tec-update-page-upgrade-notice tec-update-page-box">
				<img src="<?php echo esc_url( tribe_resource_url( 'lightning.svg', false, 'src/resources/images/icons/', null ) ); ?>" alt="<?php esc_attr_e( 'Event series graphic', 'the-events-calendar' ); ?>" />
					<p><?php printf( wp_kses( __( 'Upgrade to <a href="%s">Events Calendar Pro</a> to unlock these features.', 'the-events-calendar' ), [ 'a' => [ 'href' => [] ] ] ), esc_url( 'https://theeventscalendar.com/products/wordpress-events-calendar/' ) ); ?></p>
			</div>
		<?php endif; ?>
	</div>

	<div class="tec-update-page-resources">
		<div class="tec-update-page-grid">
			<div class="tec-update-page-grid__item tec-update-page-box ">
				<h3><span>💡</span><?php esc_html_e( 'Legacy Views', 'the-events-calendar' ); ?></h3>
				<p><?php esc_html_e( 'We have fully removed the legacy views from The Events Calendar 6.0. Your views have been automatically updated.', 'the-events-calendar' ); ?></p>
				<a href="<?php echo esc_url( tribe_get_events_link() ); ?>"><?php esc_html_e( 'View your calendar', 'the-events-calendar' ); ?></a>
				<a href="/"><?php esc_html_e( 'Learn more', 'the-events-calendar' ); ?></a>
			</div>	
			<div class="tec-update-page-grid__item tec-update-page-box ">
				<h3><?php esc_html_e( 'Resources', 'the-events-calendar' ); ?></h3>
				<ul>
					<li><a href="https://theeventscalendar.com/knowledgebase/k/using-wordpress-export-tools-to-migrate-events-content/"><?php esc_html_e( 'Migrating Your Site', 'the-events-calendar' ); ?></a></li>
					<li><a href="/"><?php esc_html_e( 'Event Series', 'the-events-calendar' ); ?></a></li>
					<li><a href="https://theeventscalendar.com/knowledgebase/k/recurring-events-event-series-in-events-calendar-pro/"><?php esc_html_e( 'Creating Recurring Events', 'the-events-calendar' ); ?></a></li>
					<li><a href="/"><?php esc_html_e( 'Duplicating Events', 'the-events-calendar' ); ?></a></li>
					<li><a href="/"><?php esc_html_e( 'Recurring Events & Tickets', 'the-events-calendar' ); ?></a></li>
					<li><a href="/"><?php esc_html_e( 'Community Events & Series', 'the-events-calendar' ); ?></a></li>
					<li><a href="https://theeventscalendar.com/category/release-notes/"><?php esc_html_e( 'Release Notes', 'the-events-calendar' ); ?></a></li>
					<li><a href="https://theeventscalendar.com/support/"><?php esc_html_e( 'Get Support', 'the-events-calendar' ); ?></a></li>
				</ul>
			</div>
		</div>
	</div>

</div>