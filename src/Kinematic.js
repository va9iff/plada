import { Vector } from "./Vector.js"
import { Point } from "./Point.js"

class Kinematic extends Point {
	// velocity = new Vector(1,1)

	constructor() {
		super(...arguments)
		this.velocity = new Vector()
	}
	physicsFix() {
		// devide 1000 to give meaningful speeds in intagers (also ms to s)
		this.position.add(this.velocity.copy.multiply(delta/1000))
	}
	devFrame(self) {
		super.devFrame()
		this.physicsFix()
	}
}


export {Kinematic}