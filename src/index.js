import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

window.k = new Visual()
k.velocity.x = 3
// k.frame = ()=>console.log(k.position)

window.Point = Point
