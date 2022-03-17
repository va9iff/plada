(()=>{class A{
	static p=0
	constructor(){
		this.constructor.construct()
	}
	static construct(){
		this.p=this.p //!!!!!!!!!
	}
}


class B extends A{}


let a = new A()
let b = new B()

a.constructor.p = 5

console.log(a.constructor.p)
console.log(b.constructor.p)
})();
// this will log 5 5 if you comment the line 7.
// in line 7, it assigns a new property for the
// class. if won't do that, it will look for
// B.p and won't find, then go to A and take.
// when the A.p changes, it will affect B too.
// so if we want to do logic depending on the
// static properties, we should write new ones
// from the parent class.
///////////////////////////////////////////////

(()=>{
class A{
	static p=0
	static attr="a"
	static overWritings = [
		"p",
		"attr"
	]
	constructor(){
		this.constructor.construct()
	}
	static construct(){
		for(let p of this.overWritings){
			this[p]=this[p]
			//its class's prop = parent class's prop
		}
	}
}


class B extends A{}


let a = new A()
let b = new B()

A.p = 7851200
A.attr = "88o"

console.log(a.constructor.p, a.constructor.attr)
// B stayed unchanged
console.log(b.constructor.p, b.constructor.attr)
})()
// but things get tricky, when you
// swap 56;57 with 59;60.
// as we re-assign in constructor, it's better to
// call it right after the class decleration.
// it brings an annoying syntax feature.
// but isn't required, as we can put it as a
// warning and make it able to bypass .ready()

// so we need to .read() before extending it.



// one way around may be calling from `this` to
// library grandparent class ready'ing them.

// so we don't need to call .ready() manually ever.
// call to the grand .ready() in every object construction.