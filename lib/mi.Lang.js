/**
 * Lang Author : xhlv@tencent.com Datetime : Last Eidt:
 */
/**
 * Lang ÓïÑÔ°ü
 * 
 * @namespace Lang ÓïÑÔ°ü
 * @type Object
 */
window._ = function(str) {
	if (arguments.length == 1) return Lang[str] || str;
	var str = Lang[str] || str, args = Array.prototype.slice.call(arguments, 1);
	return str.replace(/\{(\d+)\}/g, function(m, i) {
				return args[i];
			});
}