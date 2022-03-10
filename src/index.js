import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

window.k = new Body()
window.b = new Body()
b.position.x = 140
k.velocity.x = 0.03
// k.frame = (d)=> console.log(k.isColliding(b))
k.addCollide(b,()=>console.log('afsdjf'))

window.Point = Point
