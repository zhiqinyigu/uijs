#!/usr/bin/python
import os,sys
def convert(filename,in_enc = "GB2312",out_enc="UTF-8"):
    # read the file
    content = open(filename).read()
    # convert the concent
    try:
        new_content = content.decode(in_enc).encode(out_enc)
        #write to file
        open(filename,'w').write(new_content)
    except:
        print " error... "

import time, os, string, sys
ONE_DAY = (24 * 60 * 60)
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print "argv error, useage: python " + __file__ + " foldername int"
        sys.exit()
    if len(sys.argv)==2:
        intrday = 1
    else:
        intrday = int(sys.argv[2])
    folder = sys.argv[1]
    localtime = time.localtime()
    todate = str(localtime[0]) + str(localtime[1]) + str(localtime[2])
    targettime = time.localtime(time.time() - ONE_DAY*intrday)
    newdate = str(targettime[0]) + str(targettime[1]) + str(targettime[2])
    print folder
    for file in os.listdir(folder):
        newname = string.join(string.split(file, todate), newdate)
        os.rename(folder+file, folder+newname)

import glob
import re
import string
dir = glob.glob(r"*.css")
reg = [';}','(\/\*(\s|.)*?\*\/)|\r|\n|\t']
regTo = ['}','']
for i in dir:
    print i
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
    aa = open(i,'w')
    aa.write(strcontent)
    convert(i);
    os.rename(i,'style_.css')
print 'success'
