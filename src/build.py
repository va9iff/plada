modules = [
	"Vector.js",
	"core.js",
	"Point.js",
	"Kinematic.js",
	"Visual.js",
	"Body.js",
	"addcss.js"
]


merged = ""
for module in modules:
	with open(module,'r') as m:
		merged += '\n'+m.read()


finalized = ""

bad_words = ['export','import']

for line in merged.split('\n'):
	if not any(bad_word in line for bad_word in bad_words):
		finalized+=line+'\n'

with open("../onefile/Plada.js",'w') as output:
	output.write(finalized)
