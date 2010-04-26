import os,sys
os.popen('java -jar compiler.jar --charset=gb2312 --js=../ui.mi.js --js=../mi.js --js_output_file=mi.js')
execfile(r'_js.pyw')
execfile(r'_css.pyw')