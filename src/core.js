export class MainLoop {

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

export class Looper {
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
		this.c2c = [] // for Body
		this.objects = []
	}


	//// frame
	frameWrapper() {
		const delta = this.constructor.Loop.lastDelta
		this.devFrame(delta)
		this.frame(delta)
	}
	frame(delta) {}
	devFrame(delta) {}
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
