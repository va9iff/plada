import { Kinematic } from "./Kinematic.js"

export class Visual extends Kinematic {
	radius = 30
	color = ""
	text = ""

	constructor() {
		super()
		this.element = document.createElement("div")
		this.element.className = "Looper " + this.constructor.name
		document.body.appendChild(this.element)
	}
	visualFix() {
		this.element.style.left = `${this.position.x - this.radius}px`
		this.element.style.top = `${this.position.y - this.radius}px`

		this.element.style.width = `${this.radius * 2}px`
		this.element.style.height = `${this.radius * 2}px`

		this.color ? (this.element.style.backgroundColor = this.color) : null
		// if there is no color, don't give inline, let the css class handle

		this.element.innerHTML = this.text
	}
	devFrame(self) {
		super.devFrame()
		this.visualFix()
	}
}
