const key = 'pk.eyJ1IjoibXIwNzIzMTciLCJhIjoiY2ttYmU3cDM1MjB3cDJvcXI2MGNlY3cyaCJ9.MKIX-PoFAgdDH0ixeoGWWg';

const options = {
  lat: 41.6662,
  lng: -81.3396,
  zoom: 5,
  style: 'mapbox://styles/mr072317/ckmbfcniv9hmf17lfe89um586',
  pitch: 0,
}

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  maddy = loadTable('Places_I_Have_Vacationed.csv', 'csv', 'header');
}


function draw() {
  clear();
  const zoom = myMap.zoom();
  const Home = myMap.latLngToPixel(41.6662, -81.3396)
  // stroke(255,0,89);
  // strokeWeight(5);
ellipse(Home.x, Home.y, 7*zoom, 7*zoom);
  
  if(dist(Home.x, Home.y, mouseX, mouseY)<zoom*3/2){
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text('Home',Home.x,Home.y-20);
  }else{
    fill(255);
  }
  
  for (let i = 0; i < maddy.getRowCount(); i++) {
    const latitude = Number(maddy.getString(i, 'Latitude'));
    const longitude = Number(maddy.getString(i,'Longitude'));
    const pos = myMap.latLngToPixel(latitude, longitude);
    
    ellipse(pos.x, pos.y, 7*myMap.zoom(), 7*myMap.zoom());
    if (dist(pos.x,pos.y,mouseX,mouseY)<6*myMap.zoom()){
      fill(255);
    }else{
      stroke(255,30,40);
      strokeWeight(7);
      fill(255,0,0,0);
    }
    
    const name = maddy.getString(i, 'City');
    if(dist(pos.x,pos.y,mouseX,mouseY)< 6*myMap.zoom()){
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text(name,pos.x,pos.y-40)
      
    }
  
 const location = maddy.getString(i,'Place');
  if(dist(pos.x,pos.y,mouseX,mouseY)< 6*myMap.zoom()){
    fill(0);
    textAlign(CENTER);
    textSize(16);
    text(location,pos.x,pos.y-20)
  }
    print(zoom);
  }
  
}

$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false);
  }, 200)
});
