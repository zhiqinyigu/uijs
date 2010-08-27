#!/usr/bin/python
import os,sys
def convert(filename,in_enc = "gb2312",out_enc="UTF-8"):
    # read the file
    content = open(filename).read()
    # convert the concent
    try:
        new_content = content.decode(in_enc).encode(out_enc)
        #write to file
        open(filename,'w').write(new_content)
    except:
        print " error... "

def addZero(str):
    if len(str) < 2:
        str = '0' + str
    return str

import glob
import time
import re
import string
dir = glob.glob(r"*.js")
reg = ['(\/\*(\s|.)*?\*\/)|\r|\n|\t']
regTo = ['']
for i in dir:
    f,ext=os.path.splitext(i);
    if len(i.split('_')) > 1:
        continue
    localtime = time.localtime()
    filename = f + '_' + str(localtime[0])[2:4] + addZero(str(localtime[1])) + addZero(str(localtime[2])) + ext

    print i
    convert(i);
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

    file = open(filename,'w').write(strcontent)
print 'success'