import {Point} from './Point.js'

export class Body extends Point{
	shapes = [
		Circle(130,40,30),
		Rectangle(20,20,10,10)
	]
	checkCollisions(){
		//...
	}
	devFrame(delta){
		super.devFrame(delta)
	}
}