import { Vector } from "./Vector.js"
import { Looper } from "./core.js"

export class Point extends Looper {
	origin = null
	// position = new Vector()
	// _absolute = new Vector()

	constructor(x, y) {
		super(...arguments)
		this.position = new Vector(x, y)
	}
	nearest(cls=false){
		if (!cls) cls=this.constructor
		let theNearest = cls.objects[0]
		for (let obj of cls.objects){
			if(this.position.vectorTo(obj.position).length < this.position.vectorTo(theNearest.position).length && obj!=this) theNearest = obj
		}
	return theNearest
	}
	set absolute(value) {
		console.log("you should not set absolute value")
	}
	get absolute() {
		let origin = this.origin
		this._absolute = this.position.copy
		while (origin != null) {
			this._absolute.add(origin.position)
			origin = origin.origin
		}
		return this._absolute
	}
	// devFrame(self) {
	// super.devFrame()
	// }
}
