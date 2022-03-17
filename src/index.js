import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

window.k = new Body()
window.b = new Body()
let r = new Body()
r.x = 150
b.position.x = 100
k.velocity.x = 0.02
// k.frame = (d)=> console.log(k.isColliding(b))
// k.addCollision(b,()=>console.log('afsdjf'), "during")
// k.addCollision(r,()=>console.log('r'))

Body.collide[Body] = ()=>{}

k.position.x = -50

console.log(k)
console.log(Body)

window.Point = Point
