/**
*	QQ FAQBox
*	Author: nickwu
*	Date: 2011-11-4
*	Url: MI.version['faqbox'] = 'http://mat1.gtimg.com/www/mb/js/mi.FAQBox_111111.js'
*/

MI.FAQBox = {
	talkBox: null,
	FAQParam: null,
	AnswerCount: 0,
	QuestionIndex: 0,
	objFAQBox: null,
	tmpl: {
		FAQBox: '<div style="text-align:center;">\
					<p style="color:#999; padding:10px 5px 5px; width:520px;text-align:left"><%=text%></p>\
					<div><%for(var i=0,n=questions.length;i<n;i++) {%><div class="questions" index="<%=i%>" style="display:none;"><span class="ques_num">问题<%=(i+1)%><b></b></span><span class="fs14"><%=((questions[i] && questions[i].text)?questions[i].text:"")%></span> <span class="cNote">(<%=(i+1)%>/<%=questions.length%>)</span><%if(i<(n-1)) {%> <a onclick="MI.FAQBox.NextQuestion();return false;" href="#">跳过此问</a><%}%></div><%}%></div>\
					<div class="cont"><textarea class="edit_notice"><%=talkbox%><%=questions[0].talkbox%></textarea></div>\
					<div class="bot">\
						<div class="insertFun"><div class="sendList insertFace"><a class="txt" href="#" title="' + _('表情') + '"><em class="sico ico_face"></em></a></div><div class="sendList atSome"><a class="txt" href="#" title="' + _('@朋友帐号就可以提到他') + '"><em class="sico ico_at"></em>' + _('朋友') + '</a></div></div>\
						<div class="left"></div>\
						<input type="button" class="mg_btn right sendBtn" value="" style="margin-left:10px;" /><a hrer="#" class="autoBackspace" style="display:none">'+_('[自动缩减]')+'</a><span class="countTxt"></span>\
					</div>\
				</div>'
	},
	Init: function(param) {
		var Self = this;
		this.AnswerCount = 0;
		this.QuestionIndex = 0;
		Self.FAQParam = param;
		UI.css('.edit_notice{height:50px;border:1px solid #D0D0D0;border-radius:3px;font-family: Tahoma,Arial; font-size:12px;line-height: 21px;overflow-y: auto;width:99%; text-align:left} .mg_btn,.mg_btn1{background-image: url("http://mat1.gtimg.com/www/mb/images/group/b8_111027.png"); background-repeat:no-repeat;display:inline-block;border: 0 none;width:85px;height:26px;line-height:26px;cursor: pointer;font-size: 14px;overflow: hidden;text-align: center;vertical-align: middle;} .mg_btn {background-position:0 -179px;color:#FFF;} .mg_btn1 {background-position:0 -153px;color:#999; margin-left:10px;} .mg_btn:hover,.mg_btn1:hover{ text-decoration:none;} .sendFun{ width:98%; padding:10px 0 20px;} .questions{ text-align:left; padding:0 5px 5px;} .ques_num{ display:inline-block; background:#91C1D6; padding:0 5px; border-radius:3px; color:#fff; font-family:"simhei"; font-size:16px; position:relative;line-height:23px;margin-right:15px;} .ques_num b{width:0px;height:0px;_line-height:0;font-size:0;border-width:6px 6px 6px 6px;position:absolute;border-style:dotted dotted  dotted solid;border-color: transparent transparent transparent #91C1D6; right:-12px; top:5px;} .questions .fs14{ color:#333; font-size:16px;}');
		Self.objFAQBox = UI.html(new UI.tmplString(Self.tmpl.FAQBox)(param))[0];
		Self.talkBox = new MI.TalkBox(Self.objFAQBox);
		Self.talkBox._btn.value = '广播';
		Self.talkBox.txtTipSend = _('广播中');
		Self.talkBox.success=function(){
			Self.Answer();
		}
	},
	Show: function(idx) {
		var Self = this;
		var curIndex;
		MI.dialog.show({
			width: 560,
			title: '<h1 class="DmainTit">'+Self.FAQParam.title+'</h1>',
			html: Self.objFAQBox,
			end: function() {
				if(Self.FAQParam.OnClose)
					Self.FAQParam.OnClose();

				MI.dialog.end = null;
				MI.tip('您回答了'+Self.AnswerCount+'道题。');
				Self.AnswerCount = 0;
				Self.QuestionIndex = 0;
				
				UI.each($$('.questions'),function(o){
					UI.hide(o);
				});
			}
		});

		if (idx != undefined && idx <= $$(".questions").length)
		{
			curIndex = Self.QuestionIndex = idx;
		}
		else
		{
			curIndex = Self.QuestionIndex;
		}
		UI.show($$(".questions")[curIndex]);
		tmpText = (Self.FAQParam && Self.FAQParam.questions && Self.FAQParam.questions[Self.QuestionIndex] && Self.FAQParam.questions[Self.QuestionIndex].talkbox)?Self.FAQParam.questions[Self.QuestionIndex].talkbox:"";
		$$(".edit_notice")[0].value = Self.FAQParam.talkbox + tmpText;
	},
	Answer: function() {
		var Self = this;
		++Self.AnswerCount;
		if(Self.FAQParam.OnAnswer)
			Self.FAQParam.OnAnswer();
		if(Self.FAQParam.questions.length == (Self.QuestionIndex + 1))
		{
			MI.dialog.end = null;
			MI.tip('您回答了'+Self.AnswerCount+'道题。');
			Self.AnswerCount = 0;
			Self.QuestionIndex = 0;

			UI.each($$('.questions'),function(o){
					UI.hide(o);
			});
		}
		else
			Self.ReadNextQuestion();
	},
	ReadNextQuestion: function() {
		var ele = $$(".questions")[this.QuestionIndex];
		var tmpText;
		if(ele && ele.nextSibling)
		{
			ele.nextSibling.style.display = '';
			ele.style.display = 'none';
			tmpText = (this.FAQParam && this.FAQParam.questions && this.FAQParam.questions[this.QuestionIndex + 1] && this.FAQParam.questions[this.QuestionIndex + 1].talkbox)?this.FAQParam.questions[this.QuestionIndex + 1].talkbox:"";
			$$(".edit_notice")[0].value = this.FAQParam.talkbox + tmpText;
			++this.QuestionIndex;
		}
	},
	NextQuestion: function() {
		this.ReadNextQuestion();
		if(this.FAQParam.OnNextQuestion)
			this.FAQParam.OnNextQuestion();
	}
};

