import Vue from 'vue';
import * as types from '../mutation-types';

const state = {
	songInfo: {}
};

const mutations = {
	[types.SAVE_SESSION](state, {item}) {
		state.songInfo.resId = item;
		window.sessionStorage.setItem('song_info', JSON.stringify(state.songInfo))
		// console.log(this);
		// Vue.$router.push({path: 'song', query: {id: item.id}});
	}
};

export default {
	state,
	mutations
}