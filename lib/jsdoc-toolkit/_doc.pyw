import os,sys
#op=os.popen('java -jar jsrun.jar app/run.js -a -t=templates/outline -d=../doc ../mi.js')
op=os.popen('java -jar jsrun.jar app/run.js -t=templates/outline -d=../doc ../ui.js')
#op=os.popen('java -jar jsrun.jar app/run.js -e=gb2312 -t=templates/outline -d=../doc ../mi.Tag.js')
op.close()