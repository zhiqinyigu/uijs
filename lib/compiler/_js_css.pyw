import os,sys
import glob
import time
import re
import string
suffix = '';
suffixSecond = 'a';
dir = glob.glob(r"*.css")
for i in dir:
    print i
    os.remove(i)
dir = glob.glob(r"*.js")
for i in dir:
    os.remove(i)
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.mi.js --js_output_file=ui.mi.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.js --js_output_file=ui.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.mi.js --js=../mi.js --js_output_file=mi.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.mi.js --js=../mi.lab.js --js_output_file=mi.lab.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Slide.js --js_output_file=mi.Slide.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.RelateSelect.js --js_output_file=mi.RelateSelect.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.ValidateNew.js --js_output_file=mi.ValidateNew.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Validate.js --js_output_file=mi.Validate.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Tag.js --js_output_file=mi.Tag.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.List.js --js_output_file=mi.List.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Theme.js --js_output_file=mi.Theme.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.City.js --js_output_file=mi.City.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.City.zh_TW.js --js_output_file=mi.City.zh_TW.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.CityAll.js --js_output_file=mi.CityAll.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.CityAll.zh_TW.js --js_output_file=mi.CityAll.zh_TW.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.DatePicker.js --js_output_file=ui.DatePicker.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.ColorPicker.js --js_output_file=ui.ColorPicker.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.College.js --js_output_file=mi.College.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.SettingEdu.js --js_output_file=mi.SettingEdu.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.SettingWork.js --js_output_file=mi.SettingWork.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Music.js --js_output_file=mi.Music.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.QQMusicInstance.js --js_output_file=mi.QQMusicInstance.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.QQMusicPlayer.js --js_output_file=mi.QQMusicPlayer.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.QQMusicWmpPlayer.js --js_output_file=mi.QQMusicWmpPlayer.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.QQMuicHtml5Player.js --js_output_file=mi.QQMuicHtml5Player.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.mi.nano.js --js=../mi.MiniSite.js --js_output_file=mi.MiniSite.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.mi.nano.js --js=../mi.Login.js --js=../mi.TalkListUpdate.js --js_output_file=mi.Login.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.TalkListUpdate.js --js_output_file=mi.TalkListUpdate.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Scroll.js --js_output_file=mi.Scroll.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Capture.js --js_output_file=mi.Capture.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Base.js --js_output_file=mi.Base.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Base.lab.js --js_output_file=mi.Base.lab.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.NonTx.js --js_output_file=mi.NonTx.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Face.js --js_output_file=mi.Face.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.MapPop.js --js_output_file=mi.MapPop.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Group.js --js_output_file=mi.Group.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.QunList.js --js_output_file=mi.QunList.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.WebQQ.js --js_output_file=mi.WebQQ.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.WebQQFull.js --js_output_file=mi.WebQQFull.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.PicList.js --js_output_file=mi.PicList.js')
op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../mi.Lang.zh_TW.js --js=../mi.Lang.js --js_output_file=mi.Lang.zh_TW.js')
#op=os.popen('java -jar compiler.jar --charset=utf-8 --js=../ui.mi.js --js=../mi.TV.js --js_output_file=mi.TV.js')
op.close()
execfile(r'_js.pyw')
execfile(r'_css.pyw')
dir = glob.glob(r"*.js")
for i in dir:
    if len(i.split('_1')) == 1:
        os.remove(i)
