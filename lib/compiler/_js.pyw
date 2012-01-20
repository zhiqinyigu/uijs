#!/usr/bin/python
import os,sys
def convert(filename,in_enc = "gbk",out_enc="UTF-8"):
    return
    # read the file
    content = open(filename).read()
    # convert the concent
    try:
        new_content = content
        #new_content = content.decode(in_enc).encode(out_enc)
        #write to file
        open(filename,'w').write(new_content)
    except:
        print " error... " + filename

def addZero(str):
    if len(str) < 2:
        str = '0' + str
    return str

import glob
import time
import re
import string
dir = glob.glob(r"*.js")
reg = ['(\/\*(\s|.)*?\*\/)|\r|\n|\t|\\\\t\\\\t']
regTo = ['']
for i in dir:
    f,ext=os.path.splitext(i);
    if len(i.split('_1')) > 1:
        continue
    localtime = time.localtime()
    date = str(localtime[0])[2:4] + addZero(str(localtime[1])) + addZero(str(localtime[2]))
    if suffix:
        date = suffix;
    filename = f + '_' + date + suffixSecond + ext

    #print i
        #convert(i);
    file = open(i,'r')
    content =  file.readlines()
    strcontent = ''
    filecontent = []
    for k in content:
        regIndex = 0
        new = k
        for j in reg:
            image = re.compile(r''.join(j))
            new = image.sub(regTo[regIndex],new)
            regIndex = regIndex + 1
        if k != '':
            filecontent.append(new)
    strcontent = "".join(filecontent)

    if filename.split('_1')[0] == 'mi.api':
        filename = filename.split('_1')[0] + ext
    #print filename
    file = open(filename,'w').write(strcontent)
#    file = open(f + '.test' + ext,'w').write(strcontent)
print 'success'
