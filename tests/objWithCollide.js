class Body {
	constructor() {
		this.collisionListeners = []
	}
	get collide() {
		let prox = new Proxy(
			{},
			{
				get: (target, property, receiver) =>{
					if (!target.body) target.body = property
					this.collisionListeners.push(target)
					return prox
				},
				set: function (target, property, value, receiver) {
					// console.log(property)
					if (property == "end") return target.end = value
					if (property == "start") return target.start = value
					target.fun = value
				},
			}
		)
		return prox
	}
}

let a = new Body()
let b = new Body()
let c = new Body()

a.collide.b.end = "() => console.log()"
a.collide.c.end = "() => console.log()"

console.log(a)
