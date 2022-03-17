import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

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
k.velocity.x = 0.02
// k.frame = (d)=> console.log(k.isColliding(b))

Body.collide(NBody).during = (s,o)=>{
	console.log(s.constructor.name, o.constructor.name)
}

Body.collide(NBody).during = (body,nbody)=>{
	console.log(body.constructor.name, "nbod but overwritten")
}

Body.collide(SBody).during = (body,sbody)=>{
	console.log(body.constructor.name, "susuuuu")
}

k.collide(b).start = ()=> console.log(999)
k.collide(b).end = ()=> console.log(888)

window.Body=Body
window.Point = Point
window.Body= Body
window.NBody= NBody