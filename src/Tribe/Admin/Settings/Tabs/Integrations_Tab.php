<?php
namespace Tribe\Events\Admin\Settings\Tabs;

class Integrations_Tab {
	public static $tab_id = 'tec_integrations';

	public static function do_section_content() {
		return [
			[
				'tab_id'        => self::$tab_id,
				'section_id'    => 'section_1',
				'section_title' => 'Integrations Section 1',
				'section_order' => 10,
				'fields'        => [
					[
						'id'      => 'text-1',
						'title'   => 'Text',
						'desc'    => 'This is a description.',
						'type'    => 'text',
						'default' => 'This is default',
					],
				],
			],
			[
				'tab_id'        => self::$tab_id,
				'section_id'    => 'section_2',
				'section_title' => 'Integrations Section 2',
				'section_order' => 10,
				'fields'        => [
					[
						'id'      => 'text-2',
						'title'   => 'Text',
						'desc'    => 'This is a description.',
						'type'    => 'text',
						'default' => 'This is default',
					],
				],
			],
		];
	}
}
