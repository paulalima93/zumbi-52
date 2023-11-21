var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bala, balaImg;
var zombie, zombieImg1, zombieImg2, zombieImg3;
var grupoDeBalas, grupoDeZumbis;

function preload(){
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg");
  balaImg = loadImage("assets/3.png");

  zombieImg1 = loadImage("assets/zombie.png"); 
  zombieImg2 = loadImage("assets/zumbi.png");
  zombieImg3 = loadImage("assets/zumbi2.png");
}

function setup() {
  createCanvas(1200,800);

  //adicionando a imagem de fundo
  bg = createSprite(width/2,height/2+110);
  bg.addImage(bgImg);
  bg.scale = 1.1;
  

  //criando o sprite do jogador
  player = createSprite(100, height-300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
 
  player.debug = true;
  player.setCollider("rectangle",0,0,300,350);

  grupoDeBalas = new Group();
  grupoDeZumbis = new Group();

}

function draw() {
  background(0); 

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  if(keyWentDown("space")){
    player.addImage(shooter_shooting)
    atirar();
  }
//player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
  player.addImage(shooterImg)
  }
drawSprites();

gerarZombie();
}

function atirar(){
  bala = createSprite(player.x+60, player.y-24)
  bala.velocityX = 10;
  bala.lifetime = 60;
  bala.addImage(balaImg);
  bala.scale = 1.5;
  grupoDeBalas.add(bala)
}

function gerarZombie(){
  if (frameCount % 100 ===0){
    var zombie = createSprite(600,height-100);
    zombie.velocityX=-3
   
    var aleatorio = Math.round(random(1,3));
    switch(aleatorio){
      case 1: zombie.addImage(zombieImg1);
              zombie.scale = 0.15;
              break;
      case 2: zombie.addImage(zombieImg2);
              zombie.scale = 0.2;
              break;
      case 3: zombie.addImage(zombieImg3);
              zombie.scale = 0.1;
              break;
              default: break;
    }

    //atribui tempo de duração do zombie
    zombie.lifetime = 200; 
    
    //adiciona cada zombie ao grupo
    grupoDeZumbis.add(zombie)
    
  }
}
