var totalLoopes = 0

export class MainLoop {
	isRunning = false
	oldStamp = 0 // timestamp to calculate delta
	Loopers = [] // to hold all the Looper classes
	delay = 1000 // minimum delay to call next loop !!!not implemented!!!

	lastDelta = 0
	lastFps = 0
	//// loops
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
	static Loop = main //default loop
	static isReady = false
	static objects = []
	static inQueues = []
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
	static ready() {
		this.announceAsLooper()
		this.constructor.isReady = true
	}
	static announceAsLooper() {
		this.Loop.Loopers.push(this)
	}
	static checkReady() {
		!this.isReady ? this.ready() : null
	}

	//// frame
	frame(delta) {
		totalLoopes += 1
		// document.body.innerHTML = totalLoopes
		//
		// console.log(delta)
	}
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
	appendToQueue() {
		this.constructor.inQueues.push(this)
	}
	onQueueDone() {
		// this.addToObjects()
		// I don't want to wait 1 loop for this
	}
	frameWrapper() {
		// console.log(this.constructor.Loop.lastDelta)
		const delta = this.constructor.Loop.lastDelta
		this.devFrame(delta)
		this.frame(delta)
	}
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
	static reAssignments() {
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

main.start()

// document.onclick = ()=>document.body.innerHTML = totalLoopes
