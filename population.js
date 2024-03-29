// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class to describe a population of "creatures"

// Initialize the population
class Population {
  constructor(m, num) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // Array to hold the current population
    this.matingPool = []; // ArrayList which we will use for our "mating pool"

    this.IdentMatingPool = [];

    this.generations = 0; // Number of generations
    //make a new set of creatures
    for (var i = 0; i < num; i++) {
      var location = createVector(width / 2, height-30);
      this.population[i] = new Rocket(location, new DNA());
    }
  }

  criaMaisUm(){
  	var location = createVector(width / 2, height -30);
    this.population.push( new Rocket(location, new DNA()));
    tamAtualPopulacao++;
  }

  mataUm(){
  	this.population.splice(this.population.length-1, 1);
  	tamAtualPopulacao--;
  }


  live() {
    // Run every rocket
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].run(i);
    }
  }

  // Calculate fitness for each creature
  fitness() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  }

  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      var n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
        this.IdentMatingPool.push(i);

      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    valor = 0;
    for (var i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      var m = floor(random(this.matingPool.length));
      var d = floor(random(this.matingPool.length));
      // Pick two parents
      var mom = this.matingPool[m];
      //var dad = this.matingPool[d];

      /*if(this.IdentMatingPool[m] != this.IdentMatingPool[d]){
      	var dad = this.matingPool[d];
  	  }else{
  	  	print("Rolou partenogenese");
  	  	var dad = this.matingPool[d];
  	  }*/

  	  while(this.IdentMatingPool[m] == this.IdentMatingPool[d]){
  	     var d = floor(random(this.matingPool.length));
  	     //print("Rolou partenogenese");
  	  }
  	  var dad = this.matingPool[d];

      // Get their genes
      var momgenes = mom.getDNA();
      var dadgenes = dad.getDNA();
      // Mate their genes
      var child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(sliderMutacao.value());
      // Fill the new population with the new child
      var location = createVector(width / 2, height -30);
      this.population[i] = new Rocket(location, child);
    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    var record = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
        melhorAdaptado = i;
      }
    }

    return record;
  }
}
