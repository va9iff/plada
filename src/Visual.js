import { Kinematic } from "./Kinematic.js"
import { Plada } from "./core.js"

class Visual extends Kinematic {
	radius = 30
	color = ""
	text = ""

	constructor() {
		super()
		this.element = document.createElement("div")
		this.element.className = "Looper " + this.constructor.name
		Plada.element.appendChild(this.element)
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


// !!! maybe push it to body instead of linking with another tag for its css :) ?
// its css is so small, siomple and non-changing at base.
// let style = document.createElement("style")
// style.innerHTML = `.Looper {
	// position: absolute;
	// text-align: center;
	// border-radius: 50%;
	// background-color: #ff3333;
	// opacity: 0.8;
// 
	// /*
		// set by Plada 
		// top, left, width, height
	// */
// 
	// /*
		// optional
		// background-color
	// */
// }
// 
// .Visual {
	// /*background-color: blue;*/
// }
// `
// document.body.appendChild(style)

export {Visual}