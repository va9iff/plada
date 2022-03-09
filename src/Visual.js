import {Kinematic} from './Kinematic.js'

export class Visual extends Kinematic{
	radius = 30
	color = ''
	text = "~"

	constructor() {
		super()
		this.element = document.createElement("div")
		this.element.className = 'Looper ' + this.constructor.name
		document.body.appendChild(this.element)
	}
	visualFix(){
		this.element.style.left = this.position.x + 'px'
		this.element.style.top = this.position.y + 'px'

		this.element.style.width = this.radius + "px"
		this.element.style.height = this.radius + "px"

		this.color ? this.element.style.backgroundColor = this.color : null
		// if there is no color, don't give inline, let the css class handle

		this.element.innerHTML = this.text
	}
	devFrame(delta){
		super.devFrame(delta)
		this.visualFix()
	}

}
