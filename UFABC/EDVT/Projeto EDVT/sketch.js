// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of p5.Vectors
// Each p5.Vector acts as a force for each frame of animation
// Imagine a booster on the end of the rocket that can point in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifetime; // How long should each generation live

let population; // Population

let lifeCounter; // Timer for cycle of generation

let qtdDeFoguetes;

let cores;

let target; // Target position

let info;

let valor = 0;

let melhorAdaptado = 0;

let mutationRate = 0.01;

let gens;

function setup() {
  var canvasQueCriei = createCanvas(640, 360);
  //var canvasQueCriei = createCanvas(1300, 487);
  canvasQueCriei.position(30, 100);
  // The number of cycles we will allow a generation to live
  lifetime = height-150;//MUDEI DE 150 PARA 100

  // Initialize variables
  lifeCounter = 0;
  qtdDeFoguetes = 50;

  target = createVector(width / 2, 24);

  pcMutacao = createP("");
  pcMutacao.position(675, 85);

  sliderMutacao = createSlider(0.01, 1, 0.01, 0.01);
  sliderMutacao.position(pcMutacao.x+219, pcMutacao.y+19);
  sliderMutacao.style('background', 'blue');

  //sliderQtd = createSlider(2, 50, 20, 1);
  //sliderQtd.position(pcMutacao.x+280, pcMutacao.y+19);

  // Create a population with a mutation rate, and population max
  mutationRate = sliderMutacao.value();
  population = new Population(mutationRate, qtdDeFoguetes);

  //testes = createP("");
  //testes.html("VALOR: " + valor);
	
  info = createP("");
  info.position(30, 460);

  tituloPrincipal = createP("");
  tituloPrincipal.position(30, 35);
  tituloPrincipal.style("background-color", "black");
  
 // a = createP("");
  //a.html("<iframe width=\"420\" height=\"315\" src=\"https://www.youtube.com/watch?v=QH2-TGUlwu4\"></iframe>");
  //createDiv('<iframe id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"360\" src=\"https://www.youtube.com/watch?v=QH2-TGUlwu4?autoplay=1&origin=http://example.com\"frameborder=\"0\"></iframe>');
  video = createDiv('<iframe width="560" height="315" src="https://www.youtube.com/embed/QH2-TGUlwu4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  video.position(675,145);


  botao = createButton("bai");
  botao.mousePressed();

  cores = [];
  for(var z = 0; z < qtdDeFoguetes; z++){
    cores[z] = [random(0, 255),random(0, 255),random(0, 255)];

  }

}

function draw() {
  //background(180);
  clear();
  // Draw the start and target positions
  fill('red');
  stroke(0);
  ellipse(target.x, target.y, 24, 24);


  // If the generation hasn't ended yet
  if (lifeCounter < lifetime) {
    population.live();
    lifeCounter++;
    // Otherwise a new generation
  } else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  // Display some info
  fill(0);

  tituloPrincipal.html("Projeto EDVT - Agora vai");
  pcMutacao.html("Taxa de mutação: " + int(sliderMutacao.value()*100) + "%")

  info.html("Geração Nº " + population.getGenerations() + "<br>" + "Passos restantes: " + (lifetime - lifeCounter)
  + "<br>" + "Quantos acertaram o alvo: " + valor + "<br>" + "Indivíduo da geração anterior mais apto a se reproduzir: " + melhorAdaptado
  + "<br>" + "Gens: " + gens);


}


// Move the target if the mouse is pressed
// System will adapt to new target

/*function mousePressed() {
  if((mouseX <= 640) && (mouseY <= 360)){
  target.x = mouseX;
  target.y = mouseY;
  }
}*/
