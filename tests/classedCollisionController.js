class c {
	static collide = new Proxy(
		{},
		{
			get: function (target, property, receiver) {
				let cc = {
					cls: this,
					stack: []
				}
				return this.collide
			},
		}
	)
}

c.collide.j.jj.jdsio
