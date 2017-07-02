var data;
var graph;
function preload(){
	data = loadJSON('library_b-fs.json');
}

function setup(){
	graph = new Graph();
	noCanvas();
	console.log(data);

	var movies = data.movies;

	for(var i = 0; i < movies.length; i++){
		var movie = movies[i].title;
		var cast = movies[i].cast;
		var movieNode = new Node(movie);
		graph.addNode(movieNode);

	}

	for (var j = 0; j < cast.length; j++){
		var actor = cast[j];
		var actorNode = graph.getNode(actor);
		
		if(actorNode === undefined){
			actorNode = new Node(actor);
		}

		
		graph.addNode(actorNode);
		movieNode.addEdge(actorNode);
		
	}


	var start = graph.setStart("Stanley Tucci");
	var end = graph.setEnd("Kevin Bacon");


	console.log(graph);

	var queue = [];

	//start.searched = true;
	queue.push(start);

	while(queue.length > 0){
		var current = queue.shift();
		if(current == end){
			console.log("Found " + current.value);
			break;	
		}

		var edges = current.edges;
		for(var i = 0; i <edges.length; i++){
			var neighor = edges[i]
			if(!neighbor.searched){
				neighbor.searched = true;
				neghbor.parent = current;
				queue.push(neighbor);
			}
		}

	}


}

function draw(){

}

function Graph(){
	this.nodes = [];
	this.graph = {};
	this.end = null;
	this.start = null;
}

Graph.prototype.setStart = function(actor){

	this.start = this.graph[actor];
	return this.start;

}
Graph.prototype.setEnd = function(actor){
	this.end = this.graph[actor];
	return this.end;
}

Graph.prototype.addNode = function(n){
	this.nodes.push(n);
	var title = n.value;
	this.graph[title] = n;
}

Graph.prototype.getNode = function(actor){
	var n = this.graph[actor];
	return n;
}

function Node(value){
	this.value = value;
	this.edges = [];
	this.searched = false;
	this.parent = null;
}

Node.prototype.addEdge = function(neighbor){
	this.edges.push(neighbor);
	//both direction
	neighbor.edges.push(this);
}