import * as types from './mutation-types';

export const saveSession = ({commit}, item) => {
	commit(types.SAVE_SESSION, item);
};