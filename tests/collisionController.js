const p = new Proxy({}, {
  get: function(target, property, receiver) {
  	console.log(...arguments)
  	return p
  }
});



p.j.jj.jdsio