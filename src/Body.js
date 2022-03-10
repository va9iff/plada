import { Visual } from "./Visual.js"

// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

export class Body extends Visual {
	listenings = []


	addCollision(body, collideHandler=(self, body)=>{}, id=null) {
		let listening = {
			body: body,
			collideHandler: collideHandler,
			id: id
		}
		this.listenings.push(listening)
	}
	removeCollision(id){
		this.listenings = this.listenings.filter(listening=>listening.id!=id)
	}
	clearCollisions(){
		this.listenings = []
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
			if (this.isColliding(listening.body)) listening.collideHandler(this, listening.body)
		}
	}
	devFrame(delta) {
		super.devFrame(delta)
		this.runCollisions()
	}
	// obj-to-obj collision binding control object
	// get collide(){}
}
