Crafty.c("RandMove",{init:function(){
    this.dx=(600*Math.random()-this.x)/40.0;
    this.dy=(100*Math.random()-this.y)/40.0;
   this.addComponent("Delay");
   this.delay(function(){
    this.dx=(600*Math.random()-this.x)/40.0;
    this.dy=(100*Math.random()-this.y)/40.0;
   
    },1000,-1);
    this.bind("EnterFrame",function(e){
        this.x+=this.dx;
        this.y+=this.dy;
       
        });
    }});
//######################################
//Explosiotion
Crafty.c("Explosion",{init:function(){
	this.addComponent("DOM","2D","Color","Image").image("res/exp.gif");
	this.timeout(function(){this.destroy();},300);
	},
	setAt:function(xp,yp){this.attr({x:xp,y:yp});}
});

//Create Bat
//################################################################
Crafty.c("Bat",{init:function(){
this.addComponent("DOM","2D","Color","Image").attr({x:500*Math.random(),y:40,w:100,h:100}).image("res/Bat.gif");
this.addComponent("RandMove");
//bat move


}});
//######################################################################
//Player Component which defines the player control
Crafty.c("Poison",{init:
         function(){
            this.state=1;
            this.addComponent("DOM","2D","Color","Collision","Gravity").gravity().collision()
            
            .color("blue");
            this.onHit("Bat",function(t){
			this.timeout(function(){Crafty.e("Bat")},1000);	
			this.destroy();
			t[0].obj.destroy();
			Crafty.e("Explosion").setAt(t[0].obj.x,t[0].obj.y);
			
                    
                       });
           this.timeout(function(){this.destroy()},2000); 
         },
         spray:function(obj){
            var angle=obj.rotation;
            this.bind("EnterFrame",function(e){
            if (this.state==1) {
                 this.x+=13*Math.cos(Math.PI*angle/180);
            this.y+=13*Math.sin(Math.PI*angle/180); //code
            }
          })
            
         }
         });
//#################################################
Crafty.c("Hood",{init:function(){
    this.addComponent("DOM","2D","Color","Image").attr({x:320,y:420});
    
    this.image("res/hood_50.png");
    this.state=0;
    this.bind("KeyDown",function(e){
      //  alert(e.key);
	//move forward
	if (e.key==39){this.state="forward";}
	//move backward
	if (e.key==37){this.state="backward"}
	//rotate hood down
        if (e.key==38) {
            this.origin(25,118);
            this.state="r+";//code
        }
	//rotate hood up        
	if (e.key==40) {
            this.origin(25,118);
            this.state="r-";//code
        }
	//spit poison
        if (e.key==32 && this.rotation<5) {
             var p=Crafty.e("Poison").attr({w:5,h:5,x:this.x+65+118*Math.sin(this.rotation*Math.PI/180),y:this.y+30});
            p.spray(this);
            //alert(this.rotation);
            this.origin(25,118);
            this.rotation+=50;
            this.timeout(function(){this.rotation-=50;},100);
           
        
        }
        });//end of binding
    this.bind("EnterFrame",function(e){
        if (this.state=="r+" && this.rotation<30) {
            this.rotation+=5;
        }
        if (this.state=="r-" && this.rotation>-60) {
            this.rotation-=5;
        }
	if (this.state=="forward"){if(this.x<670)this.x+=4;}
	if(this.state=="backward"){if(this.x>140)this.x-=4;}
        });//end of binding
    
    this.bind(
              "KeyUp",function(e){
                this.state=0;
              }
              );//end of binding
    }//end of init function
    });//end of Hood component
//####################################################
Crafty.c("Tail",{init:function(){
    this.addComponent("DOM","2D","Color","Image").attr({x:200,y:520});
    this.image("res/tail_50.png");
    this.state=0;
    this.bind("KeyDown",function(e){
	if (e.key==39){this.state="forward";}
	//move backward
	if (e.key==37){this.state="backward"}
	if (e.key==38) {
            this.state="r+";//code
        }
	//rotate hood up        
	if (e.key==40) {
            this.state="r-";//code
        }

});
    
	this.bind("KeyUp",function(e){this.state=0;});
        this.bind("EnterFrame",function(e){
	if (this.state=="forward"){if(this.x<550)this.x+=4;}
	if(this.state=="backward"){if(this.x>20)this.x-=4;}
	});
}//end of init function
    
    });//end of tail component
//#######################################################
