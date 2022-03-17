import { Visual } from "./Visual.js"

// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

// A.collide(B) = ()=>{}
// A.collide(B).end = ()=>{}

export class Body extends Visual {
	constructor() {
		super(...arguments)
		this.listenings = []
	}

	static c2c = []
	static hasThisClassListener(cls) {
		return this.c2c.some(l => l.cls == cls)
		// return console.log()
	}
	static alreadyExistingListener(cls) {
		return this.c2c.filter(e => e.cls == cls)[0]
	}
	static collide(cls) {
		let c2cListener = this.hasThisClassListener(cls)
			? this.alreadyExistingListener()
			: {
					cls: cls,
					start: () => {},
					end: () => {},
					during: () => {},
			  }
		this.c2c.push(c2cListener)
		return c2cListener
	}

	addCollision(body, collideFun = (self, body) => {}, collType = "during") {
		let listening = {
			body: body,
			wasColliding: false,
			start: () => {},
			end: () => {},
			during: () => {},
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
			if (!listening.wasColliding && this.isColliding(listening.body)) 
				{
					listening.start(this, listening.body)
					listening.wasColliding = true
				}
			if (this.isColliding(listening.body))
				{
					listening.during(this, listening.body)
					listening.wasColliding = true
				}
			if (listening.wasColliding && !this.isColliding(listening.body)) 
				{
					listening.end(this, listening.body)
					listening.wasColliding = false
				}
		}
	}
	static runClassLevelCollisions(){
		for(let listening of this.c2c){}
	}
	devFrame(delta) {
		super.devFrame(delta)
		this.runCollisions()
	}
	// obj-to-obj collision binding control object
	// get collide(){}
}
