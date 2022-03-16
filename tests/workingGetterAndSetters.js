cc = {}
let collide = new Proxy(cc, {
	get: function (target, property, receiver) {
		// console.log(target)
		if (property=="collc") return
		if (!cc.collc) {
			cc.collc = property
			return collide
		}

		return collide
	},
	set: function(target, property, value, receiver) {
		if (cc.collc){
			cc.fun = value
		}
	}
})

collide.jj.faef = "fasd"

console.log()
console.log()
console.log()
console.log(cc)

