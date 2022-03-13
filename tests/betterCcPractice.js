let main = "mainimiz"
const jj = {
    for: main
}

const j = new Proxy(
	jj,
	{
		get: function (target, property, receiver) {
			console.log(j)

			// main.stack = main.stack ? main.stack : []
			// main.stack.push(property)
			return j
		},
	}
)
main.j = j

j.jj.faef.jeafio



// Red.collide.Blue = (red,blue)=>{}
// Red.collide.Blue.start = (red,blue)=>{}
// Red.collide.Blue.end = (red,blue)=>{}