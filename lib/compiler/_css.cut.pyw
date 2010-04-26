import glob
import re
import string
dir = glob.glob(r"*.css")
reg = ['#talkBox','.moreFoot','.picBox','.replyBox','.delChose','.tabStyle2','.searchTit','.tSearch','.dropTips','.userPic','.pubSuc','.userNums','.cusTopic','.dotList','.noSearchResult','.processBox','.tbList','.alterPic','.tbSendMsg','.autoCmt','.uCard','.uCardcnt','.txtShadow']
regTo = ['#tB','.mF','.pB','.rB','.dC','.tS','.sT','.tS','.dT','.uP','.pS','.uN','.cT','.dL','.nSR','.pB','.tL','.aP','.tSM','.aC','.uC','.uCc','.xS']
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
print 'success'