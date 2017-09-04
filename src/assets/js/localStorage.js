/* *
 * 本地存储模块
 * 2017/09/04
 */

 const LocalStorage = {
 	set(key, val) {
 		window.localStorage[key] = val;
 	},
 	get(key) {
 		return window.localStorage[key] === undefined? '': window.localStorage[key];
 	},
 	remove(key) {
 		window.localStorage.removeItem(key);
 	}
 };

 export {
 	LocalStorage
 };