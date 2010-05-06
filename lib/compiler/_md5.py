# coding=UTF-8
''''' 
Created on 2009-12-12 
'''
import hashlib

src = 'test'
m = hashlib.md5()
m.update(src)
dest = m.hexdigest()

print 'source string:', src
print dest