(function(){
var O = 'UI.DatePicker',H = ' href="javascript:void(0)"',B = ' onfocus="this.blur()"'; //Common HTML
var body = UI.html('<div class="date_picker" onclick="' + O + '.closeSelect();"><div class="wrap"></div><div class="time"><span class="timeTip"></span><span class="timeWrap"><input type="text" maxlength="2" class="hInput" onfocus="this.select();' + O + '.currentTimeSet = this;" onblur="' + O + '.selectedDate.setHours(this.value);" />:<input type="text" maxlength="2" class="mInput" onfocus="this.select();' + O + '.currentTimeSet = this;" onchange="' + O + '.selectedDate.setMinutes(this.value);"/>:<input type="text" maxlength="2" class="sInput" onfocus="this.select();' + O + '.currentTimeSet = this;" onblur="' + O + '.selectedDate.setSeconds(this.value);"/><button class="timeUp" onmousedown="' + O + '.setTime(\'up\',\'auto\')" onmouseup="' + O + '.setTime(\'up\',\'no\')" onclick="' + O + '.setTime(\'up\');"></button><button class="timeDown" onmousedown="' + O + '.setTime(\'down\',\'auto\')" onmouseup="' + O + '.setTime(\'down\',\'no\')" onclick="' + O + '.setTime(\'down\');"></button></span><input type="button" class="timeConfirm" onclick="' + O + '.confirm();" /></div><ul class="list"></ul>' + (UI.B.ie6 ? '<iframe src="javascript:false"></iframe>' : '') + '</div>')[0],body_append;
UI.EA(body,'click',stop);

UI.DatePicker = {
	body : body,
	wrap : dom('wrap'),
	time : dom('time'),
	list : dom('list'),
	timeTip : dom('timeTip'),
	timeConfirm : dom('timeConfirm'),
	hInput : dom('hInput'),
	mInput : dom('mInput'),
	sInput : dom('sInput'),
	yInput : function(){ return UI.GC(this.wrap,'.yearInput')[0].firstChild; },
	MInput : function(){ return UI.GC(this.wrap,'.monthInput')[0].firstChild; },
	iframe : UI.GT(body,'iframe')[0], //Cover IE6 Select
	target : 0,
	format : 0,
	display : 0,
	lang : 0,
	weekStartDay : 1,
	closeSelectTarget : 0,
	disabledWeeks : [],
	disabledWeekDays : [],
	disabledDays : [],
	currentDate : 0,
	currentWeek : 0,
	currentTimeSet : 0,
	selectedDate : 0,
	selectedWeek : 0,
	selectWeek : 0,
	showWeek : 0,
	tmpDate : 0,
	call : null, //Call Back When Click Date
	date : {
		month : {
			en : ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
			en_US : ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
			zh_CN : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			zh_TW : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
		},
		week : {
			en : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Wk'],
			en_US : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Wk'],
			zh_CN : ['日','一','二','三','四','五','六','周'],
			zh_TW : ['日','一','二','三','四','五','六','週']
		},
		time : {
			en : 'Time',
			en_US : 'Time',
			zh_CN : '时间',
			zh_TW : '時間'
		},
		confirm : {
			en : 'Confirm',
			en_US : 'Confirm',
			zh_CN : '确 定',
			zh_TW : '確 定'
		},
		today : {
			en : 'Today',
			en_US : 'Today',
			zh_CN : '今 天',
			zh_TW : '今 天'
		},
		quick : {
			en : 'Quick Selection',
			en_US : 'Quick Selection',
			zh_CN : '快速选择',
			zh_TW : '快速選擇'
		}
	},
	show : function(e,o){ //Parameter:target,lang,format,self,disabledWeekDays,disabledWeeks,disabledDays,showWeek,selectWeek,call
		var E = UI.E(e);
		E.stop();
		if (top.UI && top.UI.DatePicker && !o.self && top != self) { //Top Popup
			UI.EA(document.documentElement,'click',hideTop);
			UI.EA(window,'unload',hideTop);
			top.UI.DatePicker.window = window;
			top.UI.DatePicker.top = true;
			top.UI.DatePicker.show(e,o);
			return false;
		}

		//Target Dom
		if (!o.target) {
			this.target = E.target;
			this.target.select();
		}
		else this.target = o.target;
		UI.EA(this.target,'click',stop);

		//Language
		this.lang = o.lang ? o.lang : 'zh_CN';

		//Call Back
		this.call = o.call ? o.call : null;

		//Week Start Day
		this.weekStartDay = o.weekStartDay ? o.weekStartDay : 1;

		//Show Week
		this.showWeek = o.showWeek ? o.showWeek : false;
		if (o.selectWeek) {
			this.selectWeek = this.showWeek = true;
		}
		else this.selectWeek = false;

		//Format
		if (o.format) this.format = o.format;
		else this.format = 'yyyy-MM-dd';

		//Conform
		this.timeConfirm.value = this.date.confirm[this.lang];

		//Disabled Days
		this.disabledWeekDays = [],this.disabledDays = [],this.disabledWeeks = [];
		var dWeekDays = new Array(7),dDays = [],dWeeks = [];
		if (o.disabledWeekDays) {
			UI.each(o.disabledWeekDays,function(o){
				dWeekDays[o - 1] = 1;
			});
		}
		if (o.disabledWeeks) {
			UI.each(o.disabledWeeks,function(o){
				dWeeks[o - 1] = 1;
			});
		}
		if (o.disabledDays) {
			UI.each(o.disabledDays,function(o){
				dDays[o - 1] = 1;
			});
		}
		this.disabledWeeks = dWeeks;
		this.disabledWeekDays = dWeekDays.concat(dWeekDays).slice(this.weekStartDay - 1,this.weekStartDay + 6); //Get Disabled Week Days By Star Day
		this.disabledDays = dDays;

		//Start Day And End Day
		this.startDay = UI.parseDate(o.startDay,this.format).getTime() || 0;
		this.endDay = UI.parseDate(o.endDay,this.format).getTime() || Infinity;

		//Current Date
		this.currentWeek = false;
		if (this.target.value) {
			this.currentDate = UI.parseDate(this.target.value,this.format);
			if (this.target.value.hasString(' - ')) { //Select Week
				this.currentWeek = true;
			}
		}
		else if (UI.isArray(this.target)) {
			var target_date = [];
			UI.each(this.target,function(o){
				target_date.push('INPUT,TEXTAREA'.hasString(o.nodeName) ? o.value : o.innerHTML);
			});
			if (target_date[0]) this.currentDate = UI.parseDate(target_date.join(','),this.format);
			else this.currentDate = null;
		}
		else this.currentDate = null;
		if (!UI.isDate(this.currentDate)) this.currentDate = null;
		this.selectedDate = UI.cloneDate(this.currentDate);
		this.fill();

		//Current Time Set
		if (!this.currentTimeSet) this.currentTimeSet = this.mInput;

		//Close Select Target
		this.closeSelectTarget = null;

		UI.EA(document.documentElement,'click',hide);
		if (!body_append) {
			document.body.appendChild(this.body);
			body_append = 1;
		}

		//Position
		var l_target = UI.getX(E.target),t_target = UI.getY(E.target) + UI.height(E.target),scrollX = UI.scrollX(E.target),scrollY = UI.scrollY(E.target);
		if (this.top) {
			l_target += UI.frameX(this.window) - this.window.UI.scrollX(E.target);
			t_target += UI.frameY(this.window) - this.window.UI.scrollY(E.target);
			this.top = false;
		}
		this.body.style.cssText = 'display:block;top:' + t_target + 'px;left:' + l_target + 'px;';
		var hWindow = UI.windowHeight(),hBody = UI.height(this.body),hTarget = UI.height(E.target),wWindow = UI.windowWidth(),wBody = UI.width(this.body),wTarget = UI.width(E.target);
		if (UI.getY(this.body) + hBody > hWindow + UI.scrollY()) this.body.style.marginTop = '-' + (hBody + hTarget + 1) + 'px';
		if (UI.getX(this.body) + wBody > wWindow + UI.scrollX()) this.body.style.marginLeft = '-' + (wBody - wTarget) + 'px';
		var xBody = UI.getX(this.body),yBody = UI.getY(this.body);
		if (yBody < 0) this.body.style.marginTop = parseInt(this.body.style.marginTop) - yBody + 'px';
		if (xBody < 0) this.body.style.marginLeft = parseInt(this.body.style.marginLeft) - xBody + 'px';
		if (this.iframe) this.iframe.style.cssText = 'width:' + UI.width(this.body) + 'px;height:' + hBody + 'px;';
		this.display = true;
	},
	hide : function(){
		if (this.display) {
			this.display = false;
			UI.hide(this.body);
			UI.ER(document.documentElement,'click',hide);
		}
	},
	selectMonthY : function(e,action){
		var E = UI.E(e);
		E.stop();
		if (action == 'prev' || action == 'next') {
			var num = action == 'prev' ? -10 : 10;
			var cont = UI.GC(this.wrap,'.yearCont')[0];
			var list = UI.GT(cont,'li');
			for (var i = 0;i < 10;i++) {
				list[i].innerHTML = Number(list[i].innerHTML) + num;
			}
		}
		else {
			var o = E.target;
			if (this.closeSelectTarget) {
				this.closeSelect();
				return false;
			}
			UI.addClass(o.parentNode,'on');
			this.closeSelectTarget = o.nextSibling;
			if (!action) {
				o.value = o.getAttribute('rel');
			}
			o.select();
		}
	},
	closeSelect : function(){
		var target = this.closeSelectTarget;
		if (target) {
			var parent = target.parentNode
			UI.removeClass(parent,'on');
			var v = target.previousSibling.value;
			if (UI.trim(parent.className) == 'monthInput') {
				if (v > 12) v = 12;
				if (v < 0) v = 0;
				this.fill(this.yInput().value,v);
			}
			else {
				this.fill(v,this.MInput().getAttribute('rel'));
			}
		}
		this.closeSelectTarget = null;
	},
	daySelected : function(y,m,d,w){
		if (arguments.length == 1) {
			var A = y.split(',');
			var y = A[0],m = A[1],d = A[2],w = A[3];
		}
		this.selectedDate.setFullYear(y);
		this.selectedDate.setMonth(m - 1);
		this.selectedDate.setDate(d);
		if (w == -1) {
			if(( (y % 4 ==0) && (y % 100 !=0) || (y % 400==0) ) && new Date(y,0,1).getDay() == 0) w = 54;
			else w = 53;
		}
		if (w == 0) {
			var first = new Date(y,0,1).getDay();
			if (first == 0) first = 7;
			w = Math.ceil(( d - (first != 1 ? 7 - first + 1 : 0) )/7) + (first != 1 ? 1 : 0);
		}
		this.selectedWeek = w;
		this.fillTarget();
		if (this.call) {
			this.call(this.selectedDate);
		}
	},
	weekSelected : function(e,n){
		var E = UI.E(e);
		var W = E.target,F = W.nextSibling,L = W.parentNode.lastChild,f = F.getAttribute('rel').split(','),l = L.getAttribute('rel').split(',');
		this.selectedWeek = W.innerHTML;
		this.target.value = this.formatWeek(UI.formatDate(D(this.selectedDate,f),this.format)) + ' - ' + this.formatWeek(UI.formatDate(D(this.selectedDate,l),this.format));
		this.hide();

		function D(d,v) {
			var Tmp = UI.cloneDate(d);
			Tmp.setYear(v[0]);
			Tmp.setMonth(v[1] - 1);
			Tmp.setDate(v[2]);
			return Tmp;
		}
	},
	formatWeek : function(n){
		if (!this.format.hasString('W')) return n;
		var w = 'W',week;
		if (this.format.hasString('WW')) {
			w = 'WW';
			week = UI.addZero(this.selectedWeek);
		}
		return n.replace(w,week);
	},
	confirm : function(n) {
		if (n == 'today') {
			this.selectedDate = new Date();
			this.fillTarget();
		}
		else this.daySelected(this.yInput().value,this.MInput().getAttribute('rel'),this.currentDate.getDate());
	},
	setTime : function(action,type) {
		if (type == 'auto') { //Auto Increase
			this.delay = setTimeout(O + '.delay = setInterval("' + O + '.setTime(\'' + action + '\')",50);',100);
		}
		else if (type == 'no') {
			clearTimeout(this.delay);
			clearInterval(this.delay);
		}
		else {
			this.closeSelectTarget = null;
			if (this.currentTimeSet.getAttribute('disabled')) this.currentTimeSet = this.hInput;
			var v = this.currentTimeSet.value,type = this.currentTimeSet.className,max,num;
			if (type == 'mInput' || type == 'sInput') max = 59;
			if (type == 'hInput') max = 23;

			if (action == 'up') num = Number(v) + 1;
			else num = Number(v) - 1;

			if (num < 0) num = max;
			if (num > max) num = 0;
			switch (type) {
				case 'hInput':
					this.selectedDate.setHours(num);
					break;
				case 'mInput':
					this.selectedDate.setMinutes(num);
					break;
				case 'sInput':
					this.selectedDate.setSeconds(num);
					break;
			}
			if (!this.format.hasString('d')) this.fill(this.selectedDate.getFullYear(),this.selectedDate.getMonth() + 1);
			this.currentTimeSet.value = UI.addZero(num);
			this.currentTimeSet.select();
		}
	},
	fill : function(){
		UI.show(this.body);
		var now = new Date();
		var html = [];
		if (!this.currentDate) {
			this.currentDate = now;
			this.selectedDate = UI.cloneDate(this.currentDate); //Select Date
		}
		if (!this.selectedDate) this.selectedDate = UI.cloneDate(this.currentDate);

		var year = arguments[0] ? Number(arguments[0]) : this.currentDate.getFullYear();
		var month = arguments[1] ? Number(arguments[1]) : this.currentDate.getMonth() + 1;
		this.selectedDate.setFullYear(year);
		this.selectedDate.setMonth(month - 1);
		this.tmpDate = UI.cloneDate(this.selectedDate); //Tmp Date

		var daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
		if (((year%4 == 0)&&(year%100 != 0)) || (year%400 == 0)) {
			daysInMonth[2] = 29;
		}
		var current_month = new Date(year,month - 1,1);
		var display_year = year;
		var display_month = month;
		var display_date = 1;
		var weekday = current_month.getDay();
		var offset = 0;
		offset = (weekday >= this.weekStartDay) ? weekday - this.weekStartDay : 7 - this.weekStartDay + weekday;
		if (offset > 0) {
			display_month--;
			if (display_month < 1) {
				display_month = 12;
				display_year--;
			}
			display_date = daysInMonth[display_month] - offset + 1;
		}
		var next_month = month + 1;
		var next_month_year = year;
		if (next_month > 12) {
			next_month = 1;
			next_month_year++;
		}
		var last_month = month - 1;
		var last_month_year = year;
		if (last_month < 1) {
			last_month = 12;
			last_month_year--;
		}
		var kill = O + '.closeSelectTarget = null;'; //Kill Select Target
		var monthCont = [],yearCont = [];
		UI.each(this.date.month[this.lang],function(o,i){
			var num = i;
			if (i > 5) {
				num = (i - 6)*2 + 1;
			}
			if (i < 6) {
				if (i != 0) num = i*2;
			}
			monthCont[num] = '<li onmouseover="this.className=\'on\'" onmouseout="this.className=\'\'" onclick="' + kill + O + '.fill(' + year + ',' + (i + 1) + ');">' + o + '</li>';
		});
		for (var i = 0;i < 10;i++) {
			var num = i;
			if (i > 4) {
				num = (i - 5)*2 + 1;
			}
			if (i < 5) {
				if (i != 0) num = i*2;
			}
			yearCont[9 - num] = '<li onmouseover="this.className=\'on\'" onmouseout="this.className=\'\'" onclick="' + kill + O + '.fill(this.innerHTML,' + month + ');">' + (year - i + 4) + '</li>';
		}
		yearCont[10] = '<li class="yearContTolls"><a' + H + ' onclick="' + O + '.selectMonthY(event,\'prev\');"' + B + '>←</a><a' + H + '>×</a><a' + H + ' onclick="' + O + '.selectMonthY(event,\'next\');"' + B + '>→</a></li>';

		html.push('<div class="title"><a' + H + B + ' class="prev_year" onclick="' + kill + O + '.fill(' + (year - 1) + ',' + month + ');"></a><a' + H + B + ' class="prev" onclick="' + kill + O + '.fill(' + (last_month == 12 ? year - 1 : year) + ',' + last_month + ');"></a><span class="monthInput"><input onclick="' + O + '.selectMonthY(event);" maxlength="2" type="text" rel="' + month + '" value="' + this.date.month[this.lang][month - 1] + '" /><ul class="monthCont">' + monthCont.join('') + '</ul></span><span class="yearInput"><input onclick="' + O + '.selectMonthY(event,\'year\');" maxlength="4" type="text" value="' + year + '" /><ul class="yearCont">' + yearCont.join('') + '</ul></span><a' + H + B + ' class="next" onclick="' + kill + '' + O + '.fill(' + (next_month == 1 ? year + 1 : year) + ',' + next_month + ');"></a><a' + H + B + ' class="next_year" onclick="' + kill + '' + O + '.fill(' + (year + 1) + ',' + month + ');"></a></div>');

		html.push('<div class="data"><table>');
		html.push('<tr class="weekHeader">');

		//For Show Week
		var wMonth = this.selectedDate.getMonth() + 1,wYear = this.selectedDate.getFullYear(),wDays = 1,wNum;
		for (var i = 1;i < wMonth;i++) {
			wDays += daysInMonth[i];
		}
		var wFirstDay = new Date(wYear,0,1).getDay();
		if (wFirstDay == 0) wFirstDay = 7;
		wNum = Math.ceil(( wDays - (wFirstDay != 1 ? 7 - wFirstDay + 1 : 0) )/7) + (wFirstDay != 1 ? 1 : 0);
		if (this.showWeek) html.push('<td class="week">' + this.date.week[this.lang][7] + '</td>');

		for (var j = 0;j < 7;j++) {
			html.push('<td><span>' + this.date.week[this.lang][(this.weekStartDay+j)%7] + '</td>');
		}
		html.push('</tr>');
		for (var row = 1,currentWeek;row < 7;row++) {
			html.push('<tr>');
			if (this.showWeek) html.push('<td class="week ' + (this.selectWeek ? '' : ' off') + '" onclick="' + (this.selectWeek ? O + '.weekSelected(event,\'' + wNum + '\')' : '') + '">' + wNum + '</td>');

			if (this.format.hasString('d')) {
				for (var col = 1;col < 8;col++) {
					var disabled = false,
						dateClass = "",
						displayDate = UI.parseDate(display_year + '-' + display_month + '-' + display_date,'yyyy-MM-dd');
					if ((display_month == this.currentDate.getMonth() + 1) && (display_date == this.currentDate.getDate()) && (display_year == this.currentDate.getFullYear())) {
						dateClass = "currentDate";
					}
					else if (display_month == month) {
						dateClass = "currentMonthDate";
					}
					else {
						dateClass = "otherMonthDate";
					}
					if (disabled || this.disabledWeekDays[col - 1] || this.disabledDays[display_date - 1] || this.disabledWeeks[row] || (col == 1 ? this.disabledWeekDays[7] : false) || displayDate.getTime() < this.startDay || displayDate.getTime() > this.endDay) {
						html.push('<td class="' + dateClass + ' disabled" rel="' + display_year + ',' + display_month + ',' + display_date + '">' + display_date + '</td>');
						if (currentWeek && currentWeek != 7) currentWeek--;
					}
					else {
						var selected_date = display_date;
						var selected_month = display_month;
						var selected_year = display_year;

						//Current Week
						if (this.currentWeek) {
							if (dateClass == "currentDate") currentWeek = 7;
							if (currentWeek) {
								dateClass += ' currentDate';
								currentWeek--;
							}
						}

						if (this.displayType == "week-end") {
							var d = new Date(selected_year,selected_month-1,selected_date,0,0,0,0);
							d.setDate(d.getDate() + (7-col));
							selected_year = d.getYear();
							if (selected_year < 1000) { selected_year += 1900; }
							selected_month = d.getMonth()+1;
							selected_date = d.getDate();
						}

						var wNumTrue = wNum; //True Week Number
						if (row < 2 && selected_month == 12 && selected_date > 9) {
							wNumTrue = -1;
						}
						else if (row > 4 && selected_month == 1 && selected_date < 15) {
							wNumTrue = 0;//row - (row == 6 && selected_date < 7 ? 5 : 4);
						}

						var weekEndA = Math.abs(this.weekStartDay - 7) + 1; //Check Week End
						var weekEndB = (weekEndA > 1 ? weekEndA - 1 : weekEndA + 6);
						html.push('<td class="' + dateClass + ((col == weekEndA || col == weekEndB) ? ' week_end' : '') + '" onmouseover="UI.addClass(this,\'hover\');" onmouseout="UI.removeClass(this,\'hover\');" onclick="' + O + '.daySelected(this.getAttribute(\'rel\'));" rel="' + selected_year + ',' + selected_month + ',' + selected_date + ',' + wNumTrue + '">' + display_date + '</td>');
					}
					display_date++;
					if (display_date > daysInMonth[display_month]) {
						display_date = 1;
						display_month++;
					}
					if (display_month > 12) {
						display_month = 1;
						display_year++;
					}
				}
			}
			else html.push('<td>N</td>');
			html.push('</tr>');
			wNum++;
		}
		html.push('</table></div>');

		var format = ['y','M','d','h','m','s'];
		for (var i = 0;i < 6;i++) {
			var S = s = format[i];
			if (format[i] == 'm') s = 'mi'; //mi is minute
			if (!this.format.hasString(S)) UI.addClass(this.body,'notHas_' + s);
			else UI.removeClass(this.body,'notHas_' + s);
		}

		//Time
		if (this.body.className.hasString(['notHas_h','notHas_mi','notHas_s'])) {
			UI.addClass(this.time,'btn');
			UI.hide(this.time);
		}
		else {
			this.hInput.value = UI.addZero(this.selectedDate.getHours());
			this.mInput.value = UI.addZero(this.selectedDate.getMinutes());
			this.sInput.value = UI.addZero(this.selectedDate.getSeconds());
			for (var i = 3;i < 6;i++) {
				var T = format[i];
				if (!this.format.hasString(T)) this[T + 'Input'].setAttribute('disabled','disabled');
				else this[T + 'Input'].removeAttribute('disabled');
			}
			this.timeTip.innerHTML = this.date.time[this.lang];
			UI.removeClass(this.time,'btn');
			UI.show(this.time);
		}
		this.wrap.innerHTML = html.join('');

		if (UI.hasClass(this.body,'notHas_d')) {
			var list = [];
			list.push('<li class="title">' + this.date.quick[this.lang] + '</li>');
			for (var i = 0;i < 5;i++) {
				var date = this.tmpDate,fun,num; //Tmp Date
				if (this.format.hasString('s')) {
					num = (i + 1)*10;
					date.setSeconds(num);
					fun = 'setSeconds(' + num + ')';
				}
				else if (this.format.hasString('m')) {
					num = (i + 1)*10;
					date.setMinutes(num);
					fun = 'setMinutes(' + num + ')';
				}
				else if (this.format.hasString('h')) {
					num = i*5;
					date.setHours(num);
					fun = 'setHours(' + num + ')';
				}
				else if (this.format.hasString('M')) {
					num = this.selectedDate.getMonth() + i;
					if (num > 12) num -= 12;
					date.setMonth(num);
					fun = 'setMonth(' + num + ')';
					UI.show(this.time);
				}
				else {
					num = this.selectedDate.getFullYear() + i;
					date.setFullYear(num);
					fun = 'setFullYear(' + num + ')';
					UI.show(this.time);
				}

				list.push('<li onmouseover="this.className=\'on\'" onmouseout="this.className=\'\'" onclick="' + O + '.selectedDate.' + fun + ';' + O + '.fillTarget();">' + UI.formatDate(date,this.format) + '</li>');
			}
			this.list.innerHTML = list.join('');
			UI.show(this.list);
		}
		else UI.hide(this.list);
	},
	fillTarget : function(){
		var date = this.formatWeek(UI.formatDate(this.selectedDate,this.format));
		if (UI.isArray(this.target)) {
			date = date.replace(/\D/g,',').split(',');
			UI.each(this.target,function(o,i){
				if ('INPUT,TEXTAREA'.hasString(o.nodeName)) o.value = date[i];
				else o.innerHTML = date[i];
			});
		}
		else if ('INPUT,TEXTAREA'.hasString(this.target.nodeName)) {
			this.target.value = date;
		}
		else this.target.innerHTML = date;
		this.hide();
	},

	//Interface For Cavy's Old Date Picker
	onOpen : function(e,target,format,lang,o){
		o.target = target;
		o.format = format.replace(/m/g,'M');
		o.lang = lang;
		this.show(e,o);
	},
	onWndClick : function(){
		
	}
};
function dom(n) {
	return UI.GC(body,'.' + n)[0];
}
function hide() {
	UI.DatePicker.hide();
}
function hideTop() {
	top.UI.DatePicker.hide();
}
function stop(e) {
	UI.E(e).stop();
}
})();