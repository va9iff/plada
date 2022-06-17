import { Visual } from "./Visual.js"

// Todo: .parent property
// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

class Body extends Visual {
	constructor() {
		super(...arguments)
		this.listenings = []
		this.wasCollidings = [] // for c2c
	}

	// static ready(){
		// super.ready()
	// }
	static hasThisClassListener(cls) {
		return this.c2c.some(l => l.cls == cls)
		// return console.log()
	}
	static alreadyExistingListener(cls) {
		return this.c2c.filter(l => l.cls == cls)[0]
	}
	static collide(cls) {
		!this.isReady() ? this.ready() : null
		
		let c2cListener = this.hasThisClassListener(cls)
			? this.alreadyExistingListener(cls)
			: {
					cls: cls,
					// start: () => {},
					// end: () => {},
					during: (thisBody,targetBody) => {},
			  }
		this.c2c.push(c2cListener)
		return c2cListener
	}

	// old way by passing function as argument
	// addCollision(body, collideFun = (self, body) => {}, collType = "during") {
		// let listening = {
			// body: body,
			// wasColliding: false,
			// start: () => {},
			// end: () => {},
			// during: () => {},
		// }
		// listening[collType] = collideFun
		// this.listenings.push(listening)
	// }

	// new way passing only object then setting the function according attribute
	collide(body) {
		let listening = {
			body: body,
			wasColliding: false,
			start: (thisBody, targetBody) => {},
			end: (thisBody, targetBody) => {},
			during: (thisBody, targetBody) => {},
		}
		this.listenings.push(listening)
		return listening
	}

	isColliding(body) {
		return (
			this.position.vectorTo(body.position).length < this.radius + body.radius
		)
	}
	// for running o2o collisions
	runCollision(listening) {
		// console.log(this.listenings[body])
		if (!listening.wasColliding && this.isColliding(listening.body)) {
			listening.start(this, listening.body)
			listening.wasColliding = true
		}

		// during will also be fired on start and stop
		if (this.isColliding(listening.body)) {
			listening.during(this, listening.body)
			listening.wasColliding = true
		}
		if (listening.wasColliding && !this.isColliding(listening.body)) {
			listening.end(this, listening.body)
			listening.wasColliding = false
		}
	}
	// call runCollision for every object of the class
	runCollisions() {
		for (let listening of this.listenings) {
			this.runCollision(listening)
		}
	}

	runClassLevelCollision(body, listeningC) {
		if (listeningC.start || listeningC.end) {
			console.error(`
Classes doesn't support collision start or end. 
They don't keep track of their object's realtion with other classes' objects. 
So they can't tell if they were colliding last frame.
Use it on Body instance, pass target Body instance.`)
		// yet. we may get around this by tracking last collideds in an array.
			listeningC.start = null
			listeningC.end = null
		}
		if (this.isColliding(body)) {
			listeningC.during(this, body)
		}
	}
	static runClassLevelCollisions() {
		for (let listeningC of this.c2c) {
			for (let selfObj of this.objects) {
				for (let otherObj of listeningC.cls.objects) {
					selfObj.runClassLevelCollision(otherObj, listeningC)
				}
			}
		}
	}
	devFrame(self) {
		super.devFrame()
		this.runCollisions()
	}
	static reAssignments(){
		super.reAssignments()
		this.c2c = [] // for Body
	}
	static frame() {
		super.frame()
		this.runClassLevelCollisions()
	}
	// obj-to-obj collision binding control object
	// get collide(){}
}

export {Body}