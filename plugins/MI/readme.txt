编码规范：
	1、svn中js文件采用GB2312，压缩后会自动转为UTF-8
	2、本地js文件采用UTF-8，通过Fiddler代理线上js文件
	3、t.qq.com使用的js文件里的中文使用“_('中文')”来处理，PHP文件里的中文使用“E_V('中文')”来处理
	4、统一使用Tab控制缩进
	5、模块功能注释符合JSDoc规范，确保JS文档生成后的可读性

命名规范：
	1、函数名不允许“_”结尾，会导致国际化脚本抓取文案出错
	2、统一使用英文命名，可适当使用简写（如：Btn - Button），统一用驼峰式（如：isUndefined）

开发工具：
	1、Debug模式，t.qq.com传参数?jsDebug=1，即可进入开发模式，加载独立的ui.js,mi.js,lang.js
	2、Fiddler（将线上文件指向到本地文件）
		http://mat1.gtimg.com/www/mb/js/ui.js
		http://mat1.gtimg.com/www/mb/js/mi.js
		regex:(?insx)^http://mat1.gtimg.com/www/mb/css/style_.*?.css$ #Match HTTPS-delivered GIFs
		regex:(?insx)^http://mat1.gtimg.com/www/mb/css/style.lab_.*?.css$ #Match HTTPS-delivered GIFs
		regex:(?insx)^http://mat1.gtimg.com/www/mb/js/mi.Base_.*?.js$ #Match HTTPS-delivered GIFs
	3、Willow（Fiddler插件，方便管理Host、线上文件整个目录指向到本地、查看Json数据等等）

JS文件：
	t.qq.com/login
		ui.mi.nano.js	UI基础库
		mi.Login.js	登录页面加载逻辑
		mi.Scroll.js	滚动信息控件
		mi.TalkListUpdate.js	滚动消息列表控件

	t.qq.com
		ui.mi.js	UI基础库
		ui.DatePicker.js	日历控件
		ui.ColorPicker.js	取色控件
		mi.js	MI微博库
		mi.lab.js	MI微博库（实验室）
		mi.Lang.js	语言包逻辑
		mi.Lang.zh_TW.js	中文繁体语言包
		mi.Slide.js	幻灯滚动
		mi.RelateSelect.js 联动下拉框控件
		mi.City	全球城市数据
		mi.CityAll	中国城市数据
		mi.Base.js 微博基础库（MI.Dialog等）
		mi.Capture.js 截屏逻辑
		mi.Theme.js 	皮肤设置
		mi.Tag.js	个人标签
		mi.List.js	名单逻辑
		mi.College.js	广播学院
		mi.SettingWork.js	工作信息设置
		mi.SettingEdu.js	教育信息设置
		mi.Validate.js	表单验证
		mi.ValidateNew.js	表单验证（注册页面）
		mi.TV.js	微博电视墙
		mi.Face.js	历史头像相关交互
		mi.Music.js 	音乐视频逻辑
		mi.QQMUsicInstance.js 	音乐的初始化逻辑
		mi.QQMusicPlayer.js 	音乐控件，安装了qq音乐插件的用户。目前还没有加无插件的容错提示。
		mi.QQMuiscHtml5Player.js 	html5的音乐控件，用于webkit浏览器
		mi.QQMusicWmpPlayer.js 	wmp音乐空间，用于firefox
		mi.NonTx.js	安全中心蠕虫监控

	www.qq.com
		

	QQ群
		