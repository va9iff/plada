import { Visual } from "./Visual.js"

// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

export class Body extends Visual {
	listenings = [] // bodies

	collide(body){}
	isColliding(body){
		return this.position.vectorTo(body.position).len() < this.radius + body.radius
	}
	runCollisions(){
		for(body of this.listenings){
			this.isColliding(body) ? this.collide(body) : null
		}
	}
	// devFrame(delta){
	// 	super.devFrame(delta)
	// }
}
