import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

class NBody extends Body{
	// static objects = []
	// static c2c = []
}
// NBody.reAssignments()

window.k = new Body()
window.b = new NBody()
let r = new Body()
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

window.Body=Body

// console.log(Body.c2c)

// Body.collide[Body] = ()=>{}

k.position.x = -50

// console.log(k)
// console.log(Body)

window.Point = Point


window.Body= Body
window.NBody= NBody