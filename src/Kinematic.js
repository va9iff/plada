import { Vector } from "./Vector.js"
import { Point } from "./Point.js"

export class Kinematic extends Point {
	// velocity = new Vector(1,1)

	constructor() {
		super(...arguments)
		this.velocity = new Vector()
	}
	physicsFix() {
		this.position.add(this.velocity.copy.multiply(delta))
	}
	devFrame(self) {
		super.devFrame()
		this.physicsFix()
	}
}
