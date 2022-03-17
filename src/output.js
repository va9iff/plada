
class Vector {
	// takes x and y. if aren't passed, take as 0
	constructor(x, y) {
		this.x = x || 0
		this.y = y || 0
	}

	// comments above "=>" describes modification
	// comments below "=>" describes return value

	// => this
	// reconstructed new Vector from "this"
  get copy (){
		return new Vector(this.x, this.y)
  }
	re() {
    return this.copy
	}

	// add vec
	// Vector => this
	add(vec = 0) {
		this.x += vec.x
		this.y += vec.y
		return this
	}

	// subtract vec
	// Vector => this
	subtract(vec = 0) {
		this.x -= vec.x
		this.y -= vec.y
		return this
	}

	// multiply with num
	// Number => this
	multiply(num = 1) {
		this.x *= num
		this.y *= num
		return this
	}

	// divide by num
	// Number => this
	divide(num = 1) {
		this.x /= num
		this.y /= num
		return this
	}

	// => Number
	// length or magnitude
	get length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	}

	// => Number
	// length square
	get lengthSquare() {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2)
	}

	// set length to 1
	// => this
	normalize() {
		if (!this.length) return this //0 Vector
		this.div(this.length)
		return this
	}

	// Vector => Number
	// dot product with vec
	dotProduct(vec) {
		return this.x * vec.x + this.y * vec.y
	}

	// Vector => Number
	// cross product with vec
	crossProduct(vec) {
		return this.x * vec.y - this.y * vec.x
	}

	// Vector => Vector
	//projection onto vec
	project(vec) {
		return vec.copy.normalize().multiply(this.dot(vec.normalize()))
	}

	// => Number
	// angle in radians
	get angle() {
		return Math.atan2(this.y, this.x)
	}

	// set angle to given angle in radians
	// Number => this
	set angle(angle) {
		let length = this.length
		this.x = Math.cos(angle) * length
		this.y = Math.sin(angle) * length
		return this
	}

	// rotate this by given angle
	// Number => this
	rotate(rotation = 0) {
		let length = this.length
		let angle = this.angle
		this.x = Math.cos(angle + rotation) * length
		this.y = Math.sin(angle + rotation) * length
		return this
	}

	// if length is 0, set it to smallest value possible
	// => this
	no0() {
		if (V == (0, 0)) {
			this.x = Number.MIN_VALUE
			this.y = Number.MIN_VALUE
		}
		return this
	}

	// set minimum length to minLength
	// Number => this
	min(minLength) {
		if (this.length < minLength) {
			return this.normalize().multiply(minLength)
		}
		return this
	}

	// set maximum length to maxLength
	// Number => this
	max(maxLength) {
		if (this.length > maxLength) {
			return this.normalize().multiply(maxLength)
		}
		return this
	}

	// set length to newLen
	// Number => this
	set length(newLength) {
		this.min(newLength).max(newLength)
		return this
	}

	// set X minimum to minX, maximum to maxX
	// Number, Number => this
	clampX(minX, maxX) {
		if (this.x < minX) {
			this.x = minX
		} else {
			this.x = maxX
		}
		return this
	}

	// set Y minimum to minY, maximum to maxY
	// Number, Number => this
	clampY(minY, maxY) {
		if (this.y < minY) {
			this.y = minY
		} else {
			this.y = maxY
		}
		return this
	}

	// Vector => Vector
	// Vector that points to vec from this
	vectorTo(vec) {
		return vec.copy.subtract(this)
	}

	// Vector => Number
	// distance from V to vec
	distanceTo(vec) {
		return this.vectorTo(vec).len()
	}
}


class MainLoop {

	//// loops
	oldStamp = 0 // timestamp to calculate delta
	isRunning = false
	delay = 1000 // minimum delay to call next loop !!!not implemented!!!
	lastDelta = 0
	lastFps = 0
	Loopers = [] // to hold all the Looper classes
	mainLoop(timeStamp) {
		const delta = timeStamp - this.oldStamp
		this.lastDelta = delta
		this.oldStamp = timeStamp
		// //
		if (this.isRunning) {
			window.requestAnimationFrame(tstamp => this.mainLoop(tstamp))
		}
		this.lastFps = 1000 / delta
		this.loop()
	}
	loop() {
		this.runLoop()
		this.runQueues()
	}
	runLoop() {
		for (let Looper of this.Loopers) {
			Looper.frame()
		}
	}

	//// queues
	runQueues(){
		for (let looper of this.Loopers){
			looper.accapetQueues()
		}
	}

	//// handlers
	start() {
		this.isRunning = true
		window.requestAnimationFrame(tstamp => {
			this.timeStamp = tstamp // don't count delta from last. instead from now
			this.mainLoop(tstamp)
		})
	}
	stop() {
		this.isRunning = false
	}
}

let main = new MainLoop()

class Looper {
	// init
	static Loop = main //default loop
	static objects 	= []
	constructor() {
		this.constructor.checkReady()

		this.appendToQueue()
		// this.idx = arguments[0]
		this.addToObjects()
	}
	addToObjects() {
		this.constructor.objects.push(this)
	}

	//// ready
	static theClass = Looper
	static isReady(){
		return this.theClass == this
	}
	static ready() {
		this.reAssignments()
		this.announceAsLooper()
		this.theClass = this
	}
	static announceAsLooper() {
		this.Loop.Loopers.push(this)
	}
	static checkReady() {
		!this.isReady() ? this.ready() : null
	}
	static reAssignments() {
		this.inQueues = []
		this.objects = []
	}


	//// frame
	frameWrapper() {
		// const delta = this.constructor.Loop.lastDelta
		window.delta = this.constructor.Loop.lastDelta
		this.devFrame(this)
		this.frame(this)
	}
	frame(self) {}
	devFrame(self) {}
	static frame(){
		this.runFrames()
		this.accapetQueues()
	}
	static runFrames(){
		for (let looper of this.objects) {
			looper.frameWrapper()
		}
	}

	//// queues
	static inQueues = []
	appendToQueue() {
		this.constructor.inQueues.push(this)
	}
	onQueueDone() {}
	static doQueues() {
		for (let looperInQueue of this.inQueues) {
			looperInQueue.onQueueDone()
		}
	}
	static clearQueues() {
		this.inQueues = []
	}
	static accapetQueues() {
		this.doQueues()
		this.clearQueues()
	}

	//// extras
}

main.start()

// document.onclick = ()=>document.body.innerHTML = totalLoopes



class Point extends Looper {
	origin = null
	// position = new Vector()
	// _absolute = new Vector()

	constructor(x, y) {
		super(...arguments)
		this.position = new Vector(x, y)
	}
	nearest(cls=false){
		if (!cls) cls=this.constructor
		let theNearest = cls.objects[0]
		for (let obj of cls.objects){
			if(this.position.vectorTo(obj.position).length < this.position.vectorTo(theNearest.position).length && obj!=this) theNearest = obj
		}
	return theNearest
	}
	set absolute(value) {
		console.log("you should not set absolute value")
	}
	get absolute() {
		let origin = this.origin
		this._absolute = this.position.copy
		while (origin != null) {
			this._absolute.add(origin.position)
			origin = origin.origin
		}
		return this._absolute
	}
	// devFrame(self) {
	// super.devFrame()
	// }
}



class Kinematic extends Point {
	// velocity = new Vector(1,1)

	constructor() {
		super(...arguments)
		this.velocity = new Vector()
	}
	physicsFix() {
		this.position.add(this.velocity.copy.multiply(delta))
	}
	devFrame(self) {
		super.devFrame()
		this.physicsFix()
	}
}



class Visual extends Kinematic {
	radius = 30
	color = ""
	text = ""
	teleport = false

	constructor() {
		super()
		this.element = document.createElement("div")
		this.element.className = "Looper " + this.constructor.name
		document.body.appendChild(this.element)
	}
	visualFix() {
		this.element.style.left = `${this.position.x - this.radius}px`
		this.element.style.top = `${this.position.y - this.radius}px`

		this.element.style.width = `${this.radius * 2}px`
		this.element.style.height = `${this.radius * 2}px`

		this.color ? (this.element.style.backgroundColor = this.color) : null
		// if there is no color, don't give inline, let the css class handle

		this.element.innerHTML = this.text
	}
	teleportCheck(){
		if (this.teleport) this.teleportDo()
	}
	teleportDo(){
		let width = this.element.parentElement.getBoundingClientRect().width
		let height = this.element.parentElement.getBoundingClientRect().height
		if(this.position.x<0) this.position.x = width
		if(this.position.x>width) this.position.x = 0

		if(this.position.y<0) this.position.y = height
		if(this.position.y>height) this.position.y = 0
	}
	devFrame(self) {
		super.devFrame()
		this.visualFix()
		this.teleportCheck()
	}
}


// !!! maybe push it to body instead of linking with another tag for its css :) ?
// its css is so small, siomple and non-changing at base.
// let style = document.createElement("style")
// style.innerHTML = `.Looper {
	// position: absolute;
	// text-align: center;
	// border-radius: 50%;
	// background-color: #ff3333;
	// opacity: 0.8;
// 
	// /*
		// set by Plada 
		// top, left, width, height
	// */
// 
	// /*
		// optional
		// background-color
	// */
// }
// 
// .Visual {
	// /*background-color: blue;*/
// }
// `
// document.body.appendChild(style)


// Todo: .parent property
// .parent is much like .origin.
// instead of adding up the .origins' position recursively,
// it will fire .parents' .collision() on its own collision.
// as the collision will fire .parent's collision too, it's recursive by nature.

class Body extends Visual {
	constructor() {
		super(...arguments)
		this.listenings = []
		this.wasCollidings = [] // for c2c
	}

	static c2c = []
	static hasThisClassListener(cls) {
		return this.c2c.some(l => l.cls == cls)
		// return console.log()
	}
	static alreadyExistingListener(cls) {
		return this.c2c.filter(l => l.cls == cls)[0]
	}
	static collide(cls) {
		let c2cListener = this.hasThisClassListener(cls)
			? this.alreadyExistingListener(cls)
			: {
					cls: cls,
					// start: () => {},
					// end: () => {},
					during: (thisBody,targetBody) => {},
			  }
		this.c2c.push(c2cListener)
		return c2cListener
	}

	// old way by passing function as argument
	// addCollision(body, collideFun = (self, body) => {}, collType = "during") {
		// let listening = {
			// body: body,
			// wasColliding: false,
			// start: () => {},
			// end: () => {},
			// during: () => {},
		// }
		// listening[collType] = collideFun
		// this.listenings.push(listening)
	// }

	// new way passing only object then setting the function according attribute
	collide(body) {
		let listening = {
			body: body,
			wasColliding: false,
			start: (thisBody, targetBody) => {},
			end: (thisBody, targetBody) => {},
			during: (thisBody, targetBody) => {},
		}
		this.listenings.push(listening)
		return listening
	}

	isColliding(body) {
		return (
			this.position.vectorTo(body.position).length < this.radius + body.radius
		)
	}
	// for running o2o collisions
	runCollision(listening) {
		// console.log(this.listenings[body])
		if (!listening.wasColliding && this.isColliding(listening.body)) {
			listening.start(this, listening.body)
			listening.wasColliding = true
		}
		if (this.isColliding(listening.body)) {
			listening.during(this, listening.body)
			listening.wasColliding = true
		}
		if (listening.wasColliding && !this.isColliding(listening.body)) {
			listening.end(this, listening.body)
			listening.wasColliding = false
		}
	}
	// call runCollision for every object of the class
	runCollisions() {
		for (let listening of this.listenings) {
			this.runCollision(listening)
		}
	}

	runClassLevelCollision(body, listeningC) {
		if (listeningC.start || listeningC.end) {
			console.error(`
Classes doesn't support collision start or end. 
They don't keep track of their object's realtion with other classes' objects. 
So they can't tell if they were colliding last frame.
Use it on Body instance, pass target Body instance.`)
		// yet. we may get around this by tracking last collideds in an array.
			listeningC.start = null
			listeningC.end = null
		}
		if (this.isColliding(body)) {
			listeningC.during(this, body)
		}
	}
	static runClassLevelCollisions() {
		for (let listeningC of this.c2c) {
			for (let selfObj of this.objects) {
				for (let otherObj of listeningC.cls.objects) {
					selfObj.runClassLevelCollision(otherObj, listeningC)
				}
			}
		}
	}
	devFrame(self) {
		super.devFrame()
		this.runCollisions()
	}
	static reAssignments(){
		super.reAssignments()
		this.c2c = [] // for Body
	}
	static frame() {
		super.frame()
		this.runClassLevelCollisions()
	}
	// obj-to-obj collision binding control object
	// get collide(){}
}

let style = document.createElement("style")
style.innerHTML = `.Looper {
	position: absolute;
	text-align: center;
	border-radius: 50%;
	background-color: #ff3333;
	opacity: 0.8;

	/*
		set by Plada 
		top, left, width, height
	*/

	/*
		optional
		background-color
	*/
}

.Visual {
	/*background-color: blue;*/
}
`
document.body.appendChild(style)

