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

	addCollision(body, collideFun=(self, body)=>{}) {
		let listening = {
			body: body,
			collideFun: collideFun,
			wasColliding: false
		}
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
			if (this.isColliding(listening.body)) listening.collideFun(this, listening.body)
		}
	}
	devFrame() {
		super.devFrame()
		this.runCollisions()
	}
	// obj-to-obj collision binding control object
	// get collide(){}
}
