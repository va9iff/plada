let body = {
	collisionListeners: []
}
let jj = {'jname':'j'}


let collide = new Proxy(
	{},
	{
		get: function (target, property, receiver) {
			if (!target.body) target.body = property // right collide class
			body.collisionListeners.push(target) // left class will have higher view
			return collide
		},
		set: function (target, property, value, receiver) {
			// console.log(property)
			if (property == "end") {
				target.end = value
				return
			}
			if (property == "self") {
				target.self = value
				return
			}
			if (property == "start") {
				target.start = value
				return
			}
			target.fun = value
		},
	}
)
body.collide = collide

body.collide.jj.end = () => console.log()

console.log(body)
