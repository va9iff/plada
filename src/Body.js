import { Visual } from "./Visual.js"

// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

	// A.collide(B) = ()=>{}
	// A.collide(B).end = ()=>{}

export class Body extends Visual {
	constructor(){
		super(...arguments)
		this.listenings = []
	}


	static c2cbasic = [Body]
	static hasThisClassListener(cls){
		console.log(this.c2cbasic.some((l)=>l==cls))
		// return console.log()
	}
	static collide(cls){
		// if (){}
		let c2cListener = !
		{
			cls: cls
		}
		this.c2cbasic.push()
	}


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


Body.hasThisClassListener(Body)