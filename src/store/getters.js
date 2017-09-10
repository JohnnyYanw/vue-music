export const songInfo =  () => {
	return JSON.parse(window.sessionStorage.getItem('song_info'))
};