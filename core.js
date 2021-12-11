class MainLoop {
	isRunning = false
	oldStamp = 0
	Loopers = {}
	// inQueue = []

	mainLoop(timeStamp) {
		if (this.isRunning) window.requestAnimationFrame(arg => this.mainLoop(arg))
		const delta = timeStamp - this.oldStamp
		this.oldStamp = timeStamp
		const fps = 1000 / delta
		console.log(fps)
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
	process() {}
	constructor() {
		this.checkReady()
		this.addToList()
		// this.addToQueue()
	}
	static Loop = main
	static objects = []
	static isReady = false
	ready() {
		this.addToLoop()
	}
	checkReady() {
		if (!this.constructor.isReady) {
			this.ready()
		}
	}
	addToList() {
		this.constructor.objects.push(this)
	}
	addToLoop() {
		this.constructor.Loop.Loopers[this.constructor.name] = []
		this.constructor.objects = this.constructor.Loop.Loopers[
			this.constructor.name
		]
	}
	// it will be called in the ready() anyway. we don't need to check again
	// addToLoop(){
	// 	if (!this.constructor.Loop.Loopers.hasOwnProperty(this.constructor.name)) {
	// 		this.constructor.Loop.Loopers[this.constructor.name] = []
	// 		this.constructor.objects = this.constructor.Loop.Loopers[
	// 			this.constructor.name
	// 		]
	// 	}
	// }

	// this would cut .constructor in some function, but isn't necessary.
	// get Loop() {
	// 	return this.constructor.Loop
	// }
}

// console.log(MainLoop.Loopers)

main.initialStart()
