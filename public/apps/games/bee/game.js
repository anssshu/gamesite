//Create the Game object
Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's 
    //Create a crafty  stage 
    Crafty.init(Crafty.DOM.window[0],Crafty.DOM.window[1],"MyGameStage");
    //create a scene on the crafty stage
     Crafty.background('#eeffee');
    //add your game entities below	
   
    
    var bee=Crafty.e("MainPlayer");
    var spa=Crafty.e("Spatula");

    Crafty.e("Delay").delay(function(){if (spa.state==1){
        if(bee.x-spa.x<150 && bee.x-spa.x>10&&bee.y-spa.y>-100 && bee.y-spa.y<180){
            console.log("smack");
            bee.timeout(function(){bee=Crafty.e("MainPlayer").attr({x:800*Math.random()});},1000);
            bee.destroy();
            
            Crafty.e("Explosion").setAt(spa.x,spa.y);
            bee.x=-100;
            bee.y=-100;
            }
        
        };},300,-1);;
			      }
	      }

//End of Game Objects


Crafty.audio.add("smak","res/smak.wav");
Crafty.c("Spatula",{init:function(){this.addComponent("DOM","2D","Mouse","SpriteAnimation","Spa");
         this.state=0;
         this.z=1;
         this.reel("Smak",100,0,0,3);
          this.bind("MouseDown",function(e){
                 this.animate("Smak",1);
                 Crafty.audio.play("smak");
                 this.state=1;
                 this.timeout(function(){this.state=0;},300)
            });
         this.bind("EnterFrame",function(e){
            this.x=Crafty.mousePos.x-50;
            this.y=Crafty.mousePos.y-180;
         });
         
         }});

//######################################
//Explosiotion
Crafty.c("Explosion",{init:function(){
	this.addComponent("DOM","2D","Color","Image").image("res/mos_kill.svg");
        this.bind("EnterFrame",function(e){this.y+=1;});
	this.timeout(function(){this.destroy();},10000);
	},
	setAt:function(xp,yp){this.attr({x:xp,y:yp});}
});
//Create Sprites
Crafty.sprite(200,"res/mos.svg",{"Bug":[0,0]});
Crafty.sprite(200,400,"res/spa.svg",{"Spa":[2,0]});
//########################################################
//RandomMove
Crafty.c("RandMove",{init:function(){
    this.dx=((window.innerWidth-200)*Math.random()-this.x)/80.0;
    this.dy=((window.innerHeight-200)*Math.random()-this.y)/80.0;
   this.addComponent("Delay");
   this.delay(function(){
     this.dx=((window.innerWidth-200)*Math.random()-this.x)/80.0;
    this.dy=((window.innerHeight-200)*Math.random()-this.y)/80.0;
    if (this.dx<0) {this.animate("back",-1);
        //code
       }
       if (this.dy>=0) {
        this.animate("for",-1);//code
       }
    },1000,-1);
    this.bind("EnterFrame",function(e){
        this.x+=this.dx;
        this.y+=this.dy;
       
        });
    }});
//#########################################################
//Player Component which defines the player control
Crafty.c(
         "MainPlayer",
         {
            init:function(){
               this.addComponent("DOM","2D","Color","Mouse","SpriteAnimation","Bug","RandMove");
               this.reel("for",100,0,0,4);
               this.reel("back",100,0,1,4);
               this.animate("for",-1);
                this.bind("KeyDown",function(e){
                    if (e.key==37) {
                        this.animate("back",-1);//code
                    }
                    if (e.key==39) {
                        this.animate("for",-1);//code
                    
                    }
                    
                    });
                
             
            }
            
            
         }
         );
//end of main player component
