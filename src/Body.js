import { Visual } from "./Visual.js"

// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

export class Body extends Visual {
	constructor(){
		super(...arguments)
		this.listenings = []
	}


	// underdevelopment
	// static C2Ccolls = []
	// static get collide() {
	// 	let that = this
	// 	let prox = new Proxy(
	// 		{},
	// 		{
	// 			// a.collide.b = ()=>{}
	// 			// a.collide.b.end = ()=>{}

	// 			get: function(target, property, receiver){
	// 				let controller = {}
	// 				controller.cls = property
	// 				that.C2Ccolls.push(controller)
	// 				return controller
	// 			},
	// 			set: function(target, property, value, receiver) {
	// 				if (target.cls){
	// 					// for extra collisions
	// 					// property = ["end"||"start"||...]
	// 					target[property] = value
	// 					that.C2Ccolls.push(target)
	// 					return target
	// 				}
	// 				target.cls = property
	// 				target.during = value
	// 				that.C2Ccolls.push(target)
	// 				// return target
	// 			},
	// 		}
	// 	)
	// 	return prox
	// }



	addCollision(body, collideFun=(self, body)=>{}, collType = "during") {
		let listening = {
			body: body,
			wasColliding: false,
			start: ()=>{},
			end: ()=>{},
			during: ()=>{}
		}
		listening[collType] = collideFun
		this.listenings.push(listening)
	}

	isColliding(body) {
		return (
			this.position.vectorTo(body.position).length < this.radius + body.radius
		)
	}
	runCollisions() {
		// console.log(this.listenings)
		for (let listening of this.listenings) {
			// console.log(this.listenings[body])
			if (this.isColliding(listening.body)) listening.during(this, listening.body)
		}
	}
	devFrame(delta) {
		super.devFrame(delta)
		this.runCollisions()
	}
	// obj-to-obj collision binding control object
	// get collide(){}
}
