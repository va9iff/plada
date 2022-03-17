import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

class NBody extends Body{
	// static objects = []
	// static c2c = []
	color = "salmon"
}
// NBody.reAssignments()

class SBody extends Body{
	color = "cyan"
}

new SBody().position.x = 300

window.k = new Body()
window.b = new NBody()
// let r = new Body()
// r.x = 150
b.position.x = 100
k.velocity.x = 0.02
// k.frame = (d)=> console.log(k.isColliding(b))
// k.addCollision(b,()=>console.log('s'), "start")
// k.addCollision(b,()=>console.log('d'), "during")
// k.addCollision(b,()=>console.log('e'), "end")

window.p = {}

Body.collide(NBody).during = (s,o)=>{
	console.log(s.constructor.name, o.constructor.name)
}

Body.collide(SBody).during = (body,sbody)=>{
	console.log(body.constructor.name, sbody.constructor.name)
}

window.Body=Body

// console.log(Body.c2c)

// Body.collide[Body] = ()=>{}

k.position.x = -50

// console.log(k)
// console.log(Body)

window.Point = Point


window.Body= Body
window.NBody= NBody