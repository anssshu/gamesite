//Define the crafty scene here

//Srart of Scene
Crafty.defineScene("MyGameScene",function(){
    //create a background
    Crafty.background("red");
    Crafty.background("url(res/bg.svg)");
    //add your game entities	
  
    Crafty.e("Hood");
    Crafty.e("Tail");

    var a=Crafty.e("Bat");
    Crafty.sprite(200,"res/mos.svg",{"mos":[0,0]});
    
  
     });//End of Scene

