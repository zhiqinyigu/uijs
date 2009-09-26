/**
 * shortcut for document.getElementById()
 */
var $D = function(id) {
	return document.getElementById(id) || null;
};

/**
 * disable links' default onclick behaviour; enable when javascript is forbidden.
 */
function disableLink(eL) {
	eL.onclick = function(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		}
		else {
			window.event.returnValue = false;
		}
		return false;
	}
}

/**
 * enable drop menu animation
 * eP : parent element.
 * eL : list element.
 * nD : time delay in ms.
 */
function doDropMenu(eP, eL, nD) {
	var nT = null;

	function clearTimer() {
		if (nT) {
			clearTimeout(nT);
			nT = null;
		}
	}

	eP.onmouseover = function() {
		clearTimer();
		nT = setTimeout(function() {
			eL.style.display = 'block';
		}, nD);
	};
	eP.onmouseout = function() {
		clearTimer();
		nT = setTimeout(function() {
			eL.style.display = 'none';
		}, nD);
	};
}

/**
 * facade for activating bar drop-menu
 */
function actBarMenu() {
	var eBarMore = $D('s_bar_more');

	if (!eBarMore) {
		return;
	}

	var eBarDrop = eBarMore.getElementsByTagName('ul')[0],
		eBarLink = eBarMore.getElementsByTagName('a')[0];

	disableLink(eBarLink);
	doDropMenu(eBarMore, eBarDrop, 500);
}

/**
 * facade for activating user drop-menu
 */
function actUserMenu() {
	var eUserMore = $D('s_user_more');

	if (!eUserMore) {
		return;
	}

	var eUserDrop = eUserMore.getElementsByTagName('ul')[0],
		eUserLink = eUserMore.getElementsByTagName('a')[0];

	//disableLink(eUserLink);
	doDropMenu(eUserMore, eUserDrop, 500);
}

/**
 * facade for switching between products with user-input parameter
 */
function switchProducts() {
	var sBar = $D('s_bar');
	if(sBar) {
		var sBarLink = sBar.getElementsByTagName('a');
		for (var i=0, len=sBarLink.length; i<len; i++) {
			sBarLink[i].onclick = function() {
				if(this.href && (this.href.indexOf('?') > 0)) {
					var si = $D('s_input') || $D('sb') || $D('smart_input');
					if(si) {
						if(this.href.indexOf('ie=gb2312') > 0) {
							var charset = document.charset || document.characterSet;
							if((charset.indexOf('gb') >= 0) || (charset.indexOf('GB') >= 0)) {
								this.href += si.value;
							} else {
								if(document.charset) {
									document.charset = 'gb2312';
									this.href += si.value;
								}
							}
						} else {
							this.href += encodeURIComponent(si.value);
						}
					}
				}
				return true;
			}
		}
	}
}


// install before onload
try {
	switchProducts();
	actBarMenu();
	actUserMenu();
} catch (e) {
	//
}