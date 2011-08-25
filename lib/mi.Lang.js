/**
 * Lang Author : xhlv@tencent.com Datetime : Last Eidt:
 */
/**
 * Lang 语言包
 * 
 * @namespace Lang 语言包
 * @type Object
 */
window._ = function(str) {
	if (arguments.length == 1) return Lang[str] || str;
	var str = !UI.isUndefined(Lang[str]) ? Lang[str] : str, args = Array.prototype.slice.call(arguments, 1);
	return str.replace(/\{(\d+)\}/g, function(m, i) {
				return args[i];
			});
}