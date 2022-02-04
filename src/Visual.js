import {Kinematic} from './Kinematic.js'

export class Visual extends Kinematic{
	constructor() {
		super()
		this.element = document.createElement("div")
		this.element.innerHTML ='u'
		this.element.className = 'Looper'
		document.body.appendChild(this.element)
	}
	visualFix(){
		this.element.style.left = this.position.x + 'px'
		this.element.style.top = this.position.y + 'px'
	}
	devFrame(delta){
		super.devFrame(delta)
		this.visualFix()
	}

}
