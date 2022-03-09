import { MainLoop, Looper } from "./core.js"
import { Point } from "./Point.js"
import { Body } from "./Body.js"

import { Vector } from "./Vector.js"

import { Kinematic } from "./Kinematic.js"
import { Visual } from "./Visual.js"

window.k = new Visual()
k.velocity.x = 0.03
k.frame = (d)=> d>20 ? console.log(d):null

window.Point = Point
