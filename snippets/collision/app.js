import { Plada, Body, v } from "../../import.js"
Plada.simple()

class Blue extends Body{
	color = "blue"
	position = v(20,30)
	velocity = v(40,40)
}

class Red extends Body{
	color = "red"
	position = v(100,120)
}

Blue.collide(Red).during = (blue,red)=>{
	let force = v(0.2,0.3)
	red.velocity.add(force)
}

new Blue()
new Red()
