/**
 * External dependencies
 */
import { uniq } from 'lodash';

/**
 * Internal dependencies
 */
import * as types from './../types';
import { editorDefaults } from '@moderntribe/common/utils/globals';

export const DEFAULT_STATE = [];

export const setInitialState = ( data ) => {
	const { meta } = data;

	const defaultOrganizer = editorDefaults().organizer ? editorDefaults().organizer : 0;

	if ( meta.hasOwnProperty( '_EventOrganizerID' ) ) {
		meta[ '_EventOrganizerID' ] = defaultOrganizer;
	}
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.ADD_CLASSIC_ORGANIZERS:
			return uniq( [ ...state, action.payload.organizer ] );
		case types.REMOVE_CLASSIC_ORGANIZERS:
			return state.filter( ( organizer ) => organizer !== action.payload.organizer );
		default:
			return state;
	}
};
