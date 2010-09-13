import os,sys
op=os.popen('java -jar compiler.jar --charset=gb2312 --js=../ui.mi.js --js=../mi.js --js_output_file=mi.js')
op.close()
op=os.popen('java -jar compiler.jar --charset=gb2312 --js=../ui.mi.js --js=../mi.lab.js --js_output_file=mi.lab.js')
op.close()
execfile(r'_js.pyw')
execfile(r'_css.pyw')