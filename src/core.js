var totalLoopes = 0

export class MainLoop {
	isRunning = false
	oldStamp = 0 // timestamp to calculate delta
	Loopers = [] // to hold all the Looper classes
	delay = 1000 // minimum delay to call next loop !!!not implemented!!!

	lastDelta = 0
	lastFps = 0
	mainLoop(timeStamp) {
		const delta = timeStamp - this.oldStamp
		this.lastDelta = delta
		this.oldStamp = timeStamp
		// //
		if (this.isRunning) {
			window.requestAnimationFrame(tstamp => this.mainLoop(tstamp))
		}
		this.lastFps = 1000 / delta
		this.loopWrapper()
	}
	loopWrapper() {
		this.doLoop()
		this.accapetQueues()
	}
	accapetQueues() {
		this.doQueues()
		this.clearQueues()
	}
	doQueues() {
		for (let Looper of this.Loopers) {
			for (let looperInQueue of Looper.inQueues) {
				looperInQueue.onQueueDone()
			}
		}
	}
	clearQueues() {
		for (let Looper of this.Loopers) {
			Looper.inQueues = []
		}
	}
	doLoop() {
		for (let Looper of this.Loopers) {
			let loopers = Looper.objects
			for (let looper of loopers) {
				looper.frameWrapper()
			}
		}
	}
	start() {
		this.isRunning = true
		window.requestAnimationFrame(arg => this.mainLoop(arg))
	}
	initialStart() {
		this.isRunning = true
		window.requestAnimationFrame(arg => this.initialLoop(arg))
	}
	initialLoop(timeStamp) {
		this.oldStamp = timeStamp
		this.mainLoop(timeStamp)
	}
	stop() {
		this.isRunning = false
		//
	}
}

let main = new MainLoop()

export class Looper {
	static Loop = main //default loop
	static isReady = false
	static objects = []
	static inQueues = []
	constructor() {
		this.checkReady()
		this.appendToQueue()
		this.idx = arguments[0]
		this.addToObjects()
	}
	static ready() {
		this.addToLoopers()
	}
	static readyWrapper(){
		this.ready()
		this.constructor.isReady = true
	}
	static addToLoopers() {
		this.Loop.Loopers.push(this)
	}
	checkReady() {
		if (!this.constructor.isReady) {
			this.constructor.readyWrapper()
		}
	}
	appendToQueue() {
		this.constructor.inQueues.push(this)
	}
	onQueueDone() {
		// this.addToObjects()
		// I don't want to wait 1 loop for this
	}
	addToObjects() {
		this.constructor.objects.push(this)
	}
	devFrame(delta){}
	frameWrapper() {
		// console.log(this.constructor.Loop.lastDelta)
		const delta = this.constructor.Loop.lastDelta
		this.devFrame(delta)
		this.frame(delta)
	}
	frame(delta) {
		totalLoopes += 1
		// document.body.innerHTML = totalLoopes
		//
		// console.log(delta)
	}
	static reAssignments(){
		// when working with child classes,
		// we want them to have their own
		// variants of these properties.
		// so we reAssign them, as
		// this.p is child's attr
		// and =this.p will look
		// up to the parent.
		// will go to parent,
		this.Loop = this.Loop
		this.isReady = this.isReady
		this.objects = this.objects
		this.inQueues = this.inQueues
		// probably do in .onReady()
	}
}

	
main.initialStart()


// document.onclick = ()=>document.body.innerHTML = totalLoopes
