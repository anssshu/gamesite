//New component
	Crafty.c("BBox",{
	init:function(){
		Letters={A: 65,B: 66,C: 67,D: 68,E: 69,F: 70,G: 71,H: 72,I: 73,J: 74,K: 75,L: 76,M: 77,N: 78,O: 79,P: 80,Q: 81,R: 82,S: 83,T: 84,U: 85,V: 86,W: 87,X: 88,Y: 89,Z: 90};
		LetArrray=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]	
		this.addComponent("2D,DOM,Color,Image,Text,Delay,Tween")
		.tween({y:600},4000)
		//.color("rgba(255,255,255,1)")
		//.text("A")
		.image("yellow.png")
		.textColor("#00000")
		.textFont({size:"100px"})
		.attr({x:Math.random()*(Crafty.viewport.width-200),y:-10,height:100,width:100});
		this.css({"text-align":"center","vertical-align":"sub"});
		
		this.text(LetArrray[Math.floor(Math.random()*26)]);
		this.val=Letters[this.text()];
		//alert(this.val);
		this.bind("KeyDown",function(e){
			
			if (e.key==this.val){
				Crafty.audio.play("kill");
				this.timeout(function(){
				this.destroy();},100)
				}
			
			
			})
		this.delay(function(){this.destroy();},4000,0);	
		
		}
		
	});
		
	Crafty.c("TimerBox",{init:
		function(){
			this.addComponent("Delay");
			this.delay(function(){
				Crafty.e("BBox");
				
				
				},2000,-1);
			}
		});	
		
	
	





