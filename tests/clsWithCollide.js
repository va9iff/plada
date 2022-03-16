class Body {
	static collisionListeners = []
	static get collide() {
		let prox = new Proxy(
			{},
			{
				get: (target, property, receiver) => {
					if (!target.collBody) target.collBody = property // right collide class
					this.collisionListeners.push(target) // left class will have higher view
					return prox
				},
				set: (target, property, value, receiver) =>{
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
		return prox
	}
}

Body.collide.Body.end = ()=>{}
Body.collide.Body.end = function j(){}

console.log(Body)
