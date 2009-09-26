function selector(pattern, context) {
	var re = new RegExp('([a-z]*)([\.#:]*)(.*|$)', 'ig');
	var match = re.exec(pattern);
	var conditions = [];	
	if (match[2] == '#')	conditions.push(['id', match[3]]);
	else if(match[2] == '.')	conditions.push(['className', match[3]]);
	else if(match[2] == ':')	conditions.push(['type', match[3]]);	
	var s = match[3].replace(/\[(.*)\]/g,'$1').split('@');
	for(var i=0; i<s.length; i++) {
		var cc = null;
		if (cc = /([\w]+)([=^%!$~]+)(.*)$/.exec(s[i])){
			conditions.push([cc[1], cc[2], cc[3]]);
		}
	}
	var list = (context || document).getElementsByTagName(match[1] || "*");	
	if(conditions) {
		var elements = [];
		var attrMapping = {'for': 'htmlFor', 'class': 'className'};
		for(var i=0; i<list.length; i++) {
			var pass = true;
			for(var j=0; j<conditions.length; j++) {
				var attr = attrMapping[conditions[j][0]] || conditions[j][0];
				var val = list[i][attr] || (list[i].getAttribute ? list[i].getAttribute(attr) : '');
				var pattern = null;
				if(conditions[j][1] == '=') {
					pattern = new RegExp('^'+conditions[j][2]+'$', 'i');
				} else if(conditions[j][1] == '^=') {
					pattern = new RegExp('^' + conditions[j][2], 'i');
				} else if(conditions[j][1] == '$=') {
					pattern = new RegExp(conditions[j][2] + '$', 'i');
				} else if(conditions[j][1] == '%=') {
					pattern = new RegExp(conditions[j][2], 'i');
				} else if(conditions[j][1] == '~=') {
					pattern = new RegExp('(^|[ ])' + conditions[j][2] + '([ ]|$)', 'i');
				}
				if(pattern && !pattern.test(val)) {
					pass = false;
					break;
				}
			}
			if(pass) elements.push(list[i]);
		}
		return elements;
	} else {
		return list;
	}
}