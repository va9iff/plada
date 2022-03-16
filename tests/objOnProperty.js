let prox = new Proxy(
	{},
	{
		get: function(target, property, receiver){
			console.log(property)
		},
		set: function(target, property, value, receiver) {
			console.log(property,value)
		},
	}
)


a = {i:"shaft"}

prox[a]
// gives [object Object] T_T