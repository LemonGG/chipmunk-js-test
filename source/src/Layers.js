var HelloWorld = cc.Layer.extend({
	
	ctor:function(){
		this._super()
		game = this
		game.width = cc.winSize.width
		//-------start

		var rect = cp.v(0,-100)
		game.space = new cp.Space()
		game.space.gravity = (rect)

		game.init_()
		game.showDebug()

		

		this.scheduleUpdate();
		


		game.test_001()
		
	},

	init_:function(){

		// 创建静态的一条线
		game.createStaticLine = function(){
			var static_line = new cp.SegmentShape(game.space.staticBody,cp.v(10 , 100),cp.v(game.width-10,100),0)
			static_line.setFriction(1)
			return static_line
		}

		// 创建静态的多边形
		game.createStaticPoly = function(){
			var mass = 1;
	        var NUM_VERTS = 5;
	        var verts = new Array(NUM_VERTS * 2);
	        for(var i=0; i<NUM_VERTS*2; i+=2){
	            var angle = -Math.PI*i/NUM_VERTS;
	            verts[i]   = 30*Math.cos(angle);
	            verts[i+1] = 30*Math.sin(angle);
	        }
	        var poly = new cp.PolyShape(game.space.staticBody, verts, cp.v(300,300));
	        return poly
	        // game.space.addStaticShape(poly);
		}

		// 创建静态的矩形
		game.createStaticBox = function(){
			 var static_box = new cp.BoxShape2(game.space.staticBody,{l:100,r:160,b:260,t:280})
             static_box.setElasticity(0);
             static_box.setFriction(0.8);
             return static_box
		}

		// 创建静态圆形
		game.createStaticCircle = function(){
			
		}

		game.createDynamicCircle = function(){
            var radius = 20;
            mass = 300;

            var body = game.space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, cp.v(0, 0))));
            body.setPos(cp.v(300 , (600) ));
            var circle = new cp.CircleShape(body, radius, cp.v(0, 0));
            //circle.setElasticity(0.8);
            circle.setFriction(0.1);
        	return circle

		}

		game.showDebug = function(){
			if(!game._debugNode){
				  // debug only
		        game._debugNode = new cc.PhysicsDebugNode(game.space );
		        game.addChild( game._debugNode );
			}

			//game._debugNode.visible = bool ;
	      
	    }

	    game.test_001 = function(){
	    	
	    	var floor = game.createStaticLine()
	    	game.space.addShape(floor)

	    	var poly = game.createStaticPoly()
	    	game.space.addShape(poly)

	    	var circle = game.createDynamicCircle()
	    	game.space.addShape(circle)
	    	//circle.setPos(cp.v(280,280))

	    	var box = game.createStaticBox()
	    	game.space.addShape(box)
	    	//box.setVerts([40,40],cp.v(100,200)) 

	    	this.schedule(function(){
	    		var c = game.createDynamicCircle()
	    		game.space.addShape(c)
	    	},1)
	    }
	},

	update : function(dt){
		var steps = 3;
        dt /= steps;
        for (var i = 0; i < 3; i++){
            this.space.step(dt);
        }
	}

})