import { Plada } from "./core.js"
import { Body } from "./Body.js"
import { Vector } from "./Vector.js"

class NBody extends Body{
	color = "salmon"
}

class SBody extends Body{
	color = "cyan"
}

window.s = new SBody()
s.position.x = 300

window.k = new Body()
window.b = new NBody()


b.position.x = 100

k.position.x = -0
k.velocity.x = 0.5
k.frame = (k) => {
	k.velocity.multiply(1.08)
}
b.frame = function(){
	this.velocity.add(new Vector(0.0007,0))
}

Body.collide(NBody).during = (s,o)=>{
	console.log(s.constructor.name, o.constructor.name)
}

Body.collide(NBody).during = (body,nbody)=>{
	console.log(body.constructor.name, "nbod but overwritten")
}

Body.collide(SBody).during = (body,sbody)=>{
	console.log(body.constructor.name, "susuuuu")
}

// k.collide(b).start = ()=> console.log(999)
// k.collide(b).end = ()=> console.log(888)

window.Body=Body
window.NBody= NBody

document.onclick = e =>{
	k.velocity.add(new Vector(20,30))
	console.log('jfoidsjij')
}

Plada.simple()