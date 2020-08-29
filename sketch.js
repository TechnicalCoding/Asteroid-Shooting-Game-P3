var ship;
var bullets = [];
var sound;
var asteroids = [];
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  sound = loadSound('gun-gunshot-02.mp3');
  for(var i = 0; i < 8; i++)
  {
    asteroids.push(new Asteroid());
  }
}

function draw() 
{
  background(0);
  for(var i = 0; i < asteroids.length; i++)
  {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  for(var i = bullets.length - 1; i >= 0;i--)
  {
    bullets[i].render();
    bullets[i].update();
    if(bullets[i].offscreen())
    {
      bullets.splice(i,1);
    }
    else
    {
      for(var j = asteroids.length-1; j>= 0; j--)
      {
        if(bullets[i].hits(asteroids[j]))
        {
          if(asteroids[j].r > 10)
          {
            var newAsteroids = asteroids[j].displaced();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }
  }
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}
function keyReleased() 
{
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() 
{
  if(keyCode === 32)
  {
    bullets.push(new Bullet(ship.pos,ship.heading));
    sound.play();
  }
  if (keyCode == RIGHT_ARROW) 
  {
    ship.setRotation(0.1);
  } 
  else if (keyCode == LEFT_ARROW) 
  {
    ship.setRotation(-0.1);
  } 
  else if (keyCode == UP_ARROW) 
  {
    ship.boosting(true);
  }
}
