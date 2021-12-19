class MainLoop {
	isRunning = false // is the main loop running
	oldStamp = 0 // timestamp to calculate delta
	Loopers = [] // to hold all the Looper classes
	fps = 0 // updated every loop to inverse of delta
	delay = 1000 // minimum delay to call next loop !!!not implemented!!!

	mainLoop(timeStamp) {
		const delta = timeStamp - this.oldStamp
		this.oldStamp = timeStamp
		// //
		if (this.isRunning) {
			// if (delta > this.delay) {
			window.requestAnimationFrame(arg => this.mainLoop(arg))
			// } else {
			// setTimeout(arg => this.mainLoop(arg), delay - delta)
			// }
			// idk what is wrong with this
		}
		// console.log(this.fps)
		this.fps = 1000 / delta
		this.mainProcess()
	}
	mainProcess() {
		this.processLoop()
		this.accapetQueues()
	}
	accapetQueues() {
		this.doQueues()
		this.clearQueues()
	}
	doQueues() {
		for (let Looper of this.Loopers) {
			for (let looperInQueue of Looper.queue) {
				looperInQueue.onQueueDone()
			}
		}
	}
	clearQueues() {
		for (let Looper of this.Loopers) {
			Looper.queue = []
		}
	}
	processLoop() {
		for (let Looper of this.Loopers) {
			let loopers = Looper.objects
			for (let looper of loopers) {
				looper.mainProcess()
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

main = new MainLoop()

class Looper {
	static Loop = main //default loop
	static isReady = false
	static objects = []
	static queue = []
	constructor() {
		this.checkReady()
		this.appendToQueue()
		this.idx = arguments[0]
	}
	static ready() {
		this.addToLoopers()
	}
	static addToLoopers() {
		this.Loop.Loopers.push(this)
	}
	checkReady() {
		if (!this.constructor.isReady) {
			this.constructor.ready()
			this.constructor.isReady = true
		}
	}
	appendToQueue() {
		this.constructor.queue.push(this)
	}
	onQueueDone() {
		this.addToObjects()
	}
	addToObjects() {
		this.constructor.objects.push(this)
	}
	mainProcess() {
		this.process()
	}
	process() {
		//
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
		this.queue = this.queue
	}
}


// new Looper(4)
// new Looper(6)
new Looper(8)
// console.log(MainLoop.Loopers)

main.initialStart()
