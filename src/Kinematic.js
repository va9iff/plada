import { Vector } from "./Vector.js"
import { Body } from "./Body.js"

export class Kinematic extends Body {
	// velocity = new Vector(1,1)

	constructor() {
		super(...arguments)
		this.velocity = new Vector()
	}
	physicsFix(delta) {
		this.position.add(this.velocity.re().mul(delta))
	}
	devFrame(delta) {
		super.devFrame(delta)
		this.physicsFix(delta)
	}
}
