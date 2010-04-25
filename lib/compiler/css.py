import glob
import re
import string
dir = glob.glob(r"*.css")
reg = [';}','(\/\*(\s|.)*?\*\/)|\r|\n']
regTo = ['}','']
for i in dir:
    print i
    regIndex = 0
    for j in reg:
        file = open(i,'r')
        content =  file.readlines()
        strcontent = ''
        filecontent = []
        image = re.compile(r''.join(j))
        for k in content:
            new = image.sub(regTo[regIndex],k)
            if k != '':
                filecontent.append(new)
            strcontent = "".join(filecontent)
            aa = open(i,'w')
            aa.write(strcontent)
        regIndex = regIndex + 1
print 'success'