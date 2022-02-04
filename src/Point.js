import { Vector } from "./Vector.js"
import { Looper } from "./core.js"

export class Point extends Looper {
	origin = null
	position = new Vector()
	_absolute = new Vector()

	constructor(x, y) {
		super()
		this.position = new Vector(x,y)
	}
	set absolute(value){
		console.log('you should not set absolute value')
	}
	get absolute() {
		let origin = this.origin
		this._absolute = this.position.re()
		while (origin != null) {
			this._absolute.add(origin.position)
			origin = origin.origin
		}
		return this._absolute
	}
	devFrame(delta) {
		super.devFrame(delta)
	}
	// fixAbsolute() {
		// let origin = this.origin
		// this.absolute = this.position.re()
		// while (origin != null) {
			// this.absolute.add(origin.position)
			// origin = origin.origin
		// }
	// }
}
