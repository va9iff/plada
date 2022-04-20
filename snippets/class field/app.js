import { Body, v } from "../../import.js"

class Blue extends Body{
	color = "blue"
	position = v(50,70)
}

class Red extends Body{
	color = "red"
	position = v(80,70)
	velocity = v(10,20)
}

new Blue()
new Red()