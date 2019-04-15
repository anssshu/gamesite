window.onload=function(){
	Crafty.init();
	Crafty.background("rgb(255,255,255)  url(page.jpg)repeat  center");
	
	Crafty.audio.add({"honey":["back.mp3"],"kill":["zap.wav"]});
	
	
	
	Crafty.audio.play("honey",-1);
	
	Crafty.e("2D,DOM,Image").image("gif/boy.gif").attr({x:200,y:290});
	
	
	
	Crafty.e("2D,DOM,Image").image("gif/piggy.gif").attr({x:450,y:150});
	Crafty.e("2D,DOM,Image").image("gif/chiti.gif").attr({x:480,y:280});
	
	Crafty.e("2D,DOM,Image").image("gif/panda.gif").attr({x:470,y:380});
	
	
	
		Crafty.e("2D,DOM,Image").image("gif/sona.gif").attr({x:700,y:280});
	
	Crafty.e("BBox");
	Crafty.e("TimerBox");
	
	}
