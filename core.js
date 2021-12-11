class MainLoop {
	static isRunning = false
	static oldStamp = 0
	// static inQueue = []
	static main(timeStamp) {

		if (MainLoop.isRunning) window.requestAnimationFrame(MainLoop.main)
		const delta = timeStamp - MainLoop.oldStamp
		MainLoop.oldStamp = timeStamp
		const fps = 1000 / delta
		console.log(fps)
	}
	static start() {
		this.isRunning = true
		window.requestAnimationFrame(MainLoop.main)
	}
	static stop() {
		this.isRunning = false
	}
	static initialStart() {
		this.isRunning = true
		window.requestAnimationFrame(MainLoop.initialLoop)
	}
	static initialLoop(timeStamp) {
		MainLoop.oldStamp = timeStamp
		MainLoop.main(timeStamp)
	}
	static looperClasses = {}
}

class Looper {
	process() {}
	constructor() {
		this.checkReady()
		this.addToList()
	}
	static listInMainLoop = null
	static isReady = false
	ready() {
		if (!MainLoop.looperClasses.hasOwnProperty(this.constructor.name)) {
			MainLoop.looperClasses[this.constructor.name] = []
			this.constructor.listInMainLoop =
				MainLoop.looperClasses[this.constructor.name]
		}
	}
	checkReady() {
		if (!this.constructor.isReady) {
			this.ready()
		}
	}
	addToList() {
		this.constructor.listInMainLoop.push(this)
	}
}

// console.log(MainLoop.looperClasses)

MainLoop.initialStart()
