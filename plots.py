# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import numpy as np 
import matplotlib.pyplot as plt
import csv 
import re

#v = np.fromfile('v.dat', dtype=float, sep=" ")

def is_float(string):
    """ True if given string is float else False"""
    try:
        return float(string)
    except ValueError:
        return False
    
data = []
with open('v.dat', 'r') as f:
    d = f.readlines()
    for i in d:
        k = i.rstrip().split(",")
        data.append([float(i) if is_float(i) else i for i in k]) 

data = np.array(data, dtype='O')
data = np.split(data,50)
#data = np.array(data)
v = []
x = []
t = []
for i in range(50):
    for j in range(49):
        b = []
        a = str(data[i][i])
        b = a.split()
        v.append(float(b[1]))
        x.append(float(b[2]))
        c = re.sub("'", '', b[3][0:2])
        t.append(float(c))
        print(x[-1],t[-1])
    
print(np.shape(v))
print(range(50))
#t = np.linspace(0,49,50)

plt.figure()
plt.plot(t, v)
plt.plot(x, v)
plt.xlabel('$x$')
plt.ylabel('$v$')
plt.show()
