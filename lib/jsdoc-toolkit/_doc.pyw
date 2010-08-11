import os,sys
op=os.popen('java -jar jsrun.jar app/run.js -a -t=templates/outline -d=../doc ui.js')
op.close()