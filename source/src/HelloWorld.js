var HelloWorld = cc.Layer.extend({
	ctor:function(){
		this._super()
		var game = this
		game.width = cc.winSize.width
		//-------start

		var rect = cp.v(0,-100)

		var space = new cp.Space()
		space.gravity = (rect)

		var static_line = game.createStaticLine()
		space.addShape(static_line)


		game.createStaticLine = function(){
			var static_line = new cp.SegmentShape(space.staticBody,cp.v(10 , 100),cp.v(game.width-10,200))
			static_line.setFriction(1)
			return static_line
		}
	}
})