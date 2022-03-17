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

k.position.x = -50
k.velocity.x = 0.03
k.frame = (k) => {
	k.velocity.multiply(1.01)
}
b.frame = function(){
	this.velocity.add(new Vector(0.0007,0))
}

Body.collide(NBody).during = (s,o)=>{
	// console.log(s.constructor.name, o.constructor.name)
}

Body.collide(NBody).during = (body,nbody)=>{
	// console.log(body.constructor.name, "nbod but overwritten")
}

Body.collide(SBody).during = (body,sbody)=>{
	// console.log(body.constructor.name, "susuuuu")
}

// k.collide(b).start = ()=> console.log(999)
// k.collide(b).end = ()=> console.log(888)

window.Body=Body
window.NBody= NBody