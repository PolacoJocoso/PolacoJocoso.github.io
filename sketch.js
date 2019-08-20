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

let tamAtualPopulacao = 50;

let table;

let mediaFit = 0;

function setup() {

  if(detectaMobile()){
  	tamX = 320;
  	tamY = 180;
  }
  //var canvasQueCriei = createCanvas(640, 360);
  var canvasQueCriei = createCanvas(tamX, tamY);
  //var canvasQueCriei = createCanvas(1300, 487);
  canvasQueCriei.position(30, 100);
  // The number of cycles we will allow a generation to live
  //lifetime = height-150;//MUDEI DE 150 PARA 100
  lifetime = height;

  // Initialize variables
  lifeCounter = 0;
  qtdDeFoguetes = 50;

  target = createVector(width / 2, 24);

  pcMutacao = createP("");
  pcMutacao.position(675, 85);

  sliderMutacao = createSlider(0, 0.05, 0.001, 0.001);
  sliderMutacao.position(pcMutacao.x+215, pcMutacao.y+22);
  //sliderMutacao.style('background', 'blue');
  sliderMutacao.style('width', '60px');

  pcQtdInd = createP("");
  pcQtdInd.position(pcMutacao.x+290, pcMutacao.y);

  sliderQtd = createSlider(2, 50, 50, 1);
  sliderQtd.position(sliderMutacao.x+270, sliderMutacao.y);
  //sliderQtd.style('background', 'blue');
  sliderQtd.style('width', '90px');


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


  botao = createButton("Adiciona");
  botao.mousePressed(adicionaIndividuo);

  botaoRemove = createButton("Tira");
  botaoRemove.mousePressed(removeIndividuo);



  cores = [];
  for(var z = 0; z < qtdDeFoguetes+100; z++){
    cores[z] = [random(0, 255),random(0, 255),random(0, 255)];
  }
 
  //PImage img;
  img = loadImage("logo.png");

  table = new p5.Table();

  table.addColumn('Geracao');
  table.addColumn('Acertaram o alvo');
  table.addColumn('Tx. de mutacao');
  table.addColumn('Qtd. de individuos');

  

  botaoSalvaTabela = createButton("Exportar dados");
  botaoSalvaTabela.mousePressed(salvaTab);

}

function detectaMobile(){
	if(displayWidth < 1400){
		return true;
	}else{
		return false;
	}
}

function salvaTab(){
	saveTable(table, 'dados_sobre_indivíduos.csv');
}

function adicionaIndividuo(){
	population.criaMaisUm();
}

function removeIndividuo(){
	population.mataUm();
}


function draw() {

  clear();
  background(189, 123, 212);
  //image(img, 0, 0);


  fill('red');
  stroke(0);
  ellipse(target.x, target.y, 24, 24);


  // If the generation hasn't ended yet
  if (lifeCounter < lifetime) {
    population.live();
    lifeCounter++;

    if((lifetime - lifeCounter)  <= 50){
    fill(0, 102, 153);
    textSize(20);
    text('Novos indivíduos serão gerados', width/2-150, height/2);
    }


    textSize(10);
    // Otherwise a new generation
  } else {

   let newRow = table.addRow();
   newRow.setNum('Geracao', population.getGenerations());
   newRow.setNum('Acertaram o alvo', valor);
   newRow.setNum('Tx. de mutacao', sliderMutacao.value()*100);
   newRow.setNum('Qtd. de individuos', sliderQtd.value());

    mediaFit = 0;
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();

  }

  if(sliderQtd.value() > tamAtualPopulacao){
  	for(var i = 0; (sliderQtd.value() - tamAtualPopulacao) != 0; i++){
  		population.criaMaisUm();
  	}
  }else if(tamAtualPopulacao > sliderQtd.value()){
  	for(var i = 0; (tamAtualPopulacao - sliderQtd.value()) != 0; i++){
  		population.mataUm();
  	}

  }


  // Display some info
  fill(0);

  tituloPrincipal.html("Projeto EDVT - Agora vai");
  pcMutacao.html("Taxa de mutação: " + nf(sliderMutacao.value()*100, 0, 2) + "%");

  pcQtdInd.html("Qtd. de indivíduos: " + sliderQtd.value());


  info.html("Geração Nº " + population.getGenerations() + "<br>" + "Passos restantes: " + (lifetime - lifeCounter)
  + "<br>" + "Quantos acertaram o alvo: " + valor + "<br>" + "Indivíduo da geração anterior mais apto a se reproduzir: " + melhorAdaptado
  + "<br>" + "Gens: " + gens + "<br>" + "Tamanho display: " + displayWidth + " " + displayHeight + 
  "<br>" + "Aptidão média da geração anterior: " + mediaFit + "<br>" + "Frame rate: " + frameRate());


}


// Move the target if the mouse is pressed
// System will adapt to new target

/*function mousePressed() {
  if((mouseX <= 640) && (mouseY <= 360)){
  target.x = mouseX;
  target.y = mouseY;
  }
}*/