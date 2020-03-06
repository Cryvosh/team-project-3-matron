let cyStyle = [
	{
		selector: "node",
		style: {
			"label": "data(label)",
			"background-color": 'blue'
		}
	},
	{
		selector: ":selected",
		style: {
			"border-width": "5px",
			"border-color": "cyan",
			"line-color": "cyan"
		}
	},
	{
		selector: ":active",
		style: {
			"overlay-opacity": "0"
		}
	},
	{
		selector: ".hover",
		style: {
			"border-width": "5px",
			"border-color": "cyan",
			"line-color": "cyan"
		}
	},
	{
		selector: ".noEvent",
		style: {
			"events": "no"
		}
	},
	{
		selector: ".ghostCursor",
		style: {
			"visibility": "hidden",
			"events": "no"
		}
	},
	{
		selector: ".ghostEdge",
		style: {
			"events": "no",
			"line-style": "dashed"
		}
	},
	{
		selector: "node[type = 'hallway']",
		style: {
			"background-color": 'red',
			"width": "10",
			"height": "10"
		}
	}
]

let defaulttHoverThresh = [5,1];
let ghostHOverThresh = [25, 5];
setHoverThresh(defaulttHoverThresh[0], defaulttHoverThresh[1]);

let cy = cytoscape({
	container: document.getElementById("cy"),
	layout: {
		name: "preset"
	},
	style: cyStyle,
	wheelSensitivity: 0.2
});

function mod(n, m) {
	return ((n%m)+m)%m;
}

function unselectAll() {
	cy.$(":selected").forEach(e => {
		e.selectify();
		e.unselect();
		e.unselectify();
	});
}

function toggleSelected(e) {
	e.selectify();
	if (e.selected()) {
		e.unselect();
	} else {
		e.select();
	}
	e.unselectify();
}

function addEdge(cyNode1, cyNode2) {
	if (cyNode1 == cyNode2) {
		return;
	}

	let id1 = cyNode1.id() + "-" + cyNode2.id();
	let id2 = cyNode2.id() + "-" + cyNode1.id();

	if (cy.$id(id1)[0] || cy.$id(id2)[0]) {
		return;
	}

	let edge = {
		data: {
			id: id1,
			label: "",
			source: cyNode1.id(),
			target: cyNode2.id(),
		},
		classes: []
	}
	return cy.add(edge);
}

function addNode(posX, posY) {
	let node = {
		data: {
			label: "",
			type: ""
		},
		position: {
			x: posX,
			y: posY
		},
		classes: []
	}
	return cy.add(node)[0];
}

let ghost = {
	enabled: false,
	source: -1,
	cursor: -1,
	edge: -1,
	snapPos: -1,
	enable: function() {
		this.enabled = true;
		if (this.cursor != -1) {
			cy.remove(this.cursor);
		}
		this.cursor = addNode(0,0);
		this.cursor.addClass("ghostCursor");
		setHoverThresh(ghostHOverThresh[0], ghostHOverThresh[1]);
	},
	disable: function() {
		this.enabled = false;
		if (this.source != -1) {
			this.source.removeClass("noEvent");
		}
		if (this.cursor != -1) {
			cy.remove(this.cursor);
		}
		setHoverThresh(defaulttHoverThresh[0], defaulttHoverThresh[1]);
	},
	redraw: function() {
		if (this.source != -1) {
			if (this.edge != -1) {
				cy.remove(this.edge);
			}
			this.edge = addEdge(this.source, this.cursor);
			this.edge.addClass("ghostEdge");
		}
	},
	setSource: function(src) {
		if (this.source != -1) {
			this.source.removeClass("noEvent");
		}
		this.source = src;
		this.source.addClass("noEvent");
	},
	updateCursor: function(x,y) {
		if (this.cursor == -1) {return;}

		// let hovered = cy.$(".hover")[0];

		// if (hovered) {
		// 	if (hovered.group() == "nodes") {
		// 		this.snapPos = {x:hovered.position().x, y:hovered.position().y};
		// 	} else {
		// 		//this.snapPos = 
		// 	}
		// } else {
			this.cursor.position({x:x, y:y});
		//}	
	}
}

cy.on("tap", function(e) {
	let target = e.target;

	if (target == cy) {
		if (!ghost.enabled) {
			addNode(e.position.x, e.position.y);
		}
		
		ghost.disable();
		unselectAll();
		return;
	}

	if (!target.selected() && !e.originalEvent.ctrlKey) {
		unselectAll();
	}

	ghost.disable();
	toggleSelected(target);	
});

function setHoverThresh(node, edge) {
	window.nodeThreshMultiplier = node;
	window.edgeThreshMultiplier = edge;
}

cy.on("cxttapend", function(e) {
	let target = e.target;
	let hovered = cy.$(".hover")[0];

	if (!ghost.enabled) {
		if (hovered && hovered.group() == "nodes") {
			
			ghost.enable();
			ghost.setSource(hovered);
			ghost.updateCursor(e.position.x, e.position.y);
			ghost.redraw();
			return;
		}

		if (target == cy) {
			let newNode = addNode(e.position.x, e.position.y);
			newNode.data("type", "hallway");

			ghost.enable();
			ghost.setSource(newNode);
			ghost.updateCursor(e.position.x, e.position.y);
			ghost.redraw();
			return;
		}
	} else {
		if (!hovered) {
			let newNode = addNode(e.position.x, e.position.y);
			newNode.data("type", "hallway");
			addEdge(ghost.source, newNode);
			ghost.setSource(newNode)
			ghost.redraw();
			return;
		}

		if (hovered.group() == "nodes") {
			addEdge(ghost.source, hovered);
			ghost.setSource(hovered);
			ghost.redraw();
			return;
		}

		if (hovered.group() == "edges") {
			let source = hovered.source();
			let target = hovered.target();

			if (ghost.source == source || ghost.source == target) {
				return;
			}

			let intersectPos = window.finiteLinesIntersect(
				e.position.x,
				e.position.y,
				e.position.x + (target.position().y - source.position().y),
				e.position.y + (source.position().x - target.position().x),

				source.position().x,
				source.position().y,
				target.position().x,
				target.position().y,

				true
			);

			cy.remove(hovered);
			let newNode = addNode(intersectPos[0], intersectPos[1]);
			newNode.data("type", "hallway");
			addEdge(newNode, source);
			addEdge(newNode, target);
			addEdge(newNode, ghost.source);
			ghost.setSource(newNode);
			ghost.redraw();
		}
	}
});

cy.on("mousemove", function(e) {
	ghost.updateCursor(e.position.x, e.position.y);
});

cy.on("mouseover", "elements", function(e) {
	e.target.addClass("hover");
});

cy.on("mouseout", "elements", function(e) {
	e.target.removeClass("hover");
});

cy.on("cxtdragout", "elements", function(e) {
	e.target.removeClass("hover");
});

cy.on("boxstart", function(e) {
	ghost.disable();
})

cy.on("box", "elements", function(e) {
	let target = e.target;
	toggleSelected(target);
})

window.addEventListener("keydown", function(e) {
	if (e.code == "Escape") {
		ghost.disable();
	}

	if (e.code == "KeyX") {
		cy.remove(cy.$(":selected"));
	}
});

function load_graph_editor() {
	document.querySelector('#select_floor').style.display = 'none';
}

const info = document.querySelector('#node_info');
const node_label_input = document.querySelector('#node_label_input').value = '';


function getMapFromServer(name) {
	return [];
}

function getMapNamesFromServer() {
	return [{name: "lel", value: "lel"}, {name: "kek", value: "kek"}];
}
values = getMapNamesFromServer()
$('.ui.dropdown').dropdown({
	allowAdditions: true, 
	hideAdditions: false,
	values: values,
	onChange: function(value, name) {
		console.log(value, name);

		// if exists in list
		if (values.some(value => value.name == name)) {
			document.querySelector('#create_floor_inputs').style.display = "none";
			document.querySelector('#edit_floor').style.display = 'block';
			document.querySelector('#select_floor_header').innerText = 'Select unit';

			getMapFromServer(value);
		} else {
			document.querySelector('#create_floor_inputs').style.display = "block";
			document.querySelector('#edit_floor').style.display = 'none';
			document.querySelector('#select_floor_header').innerText = 'Create unit';

			// load blueprint if one has been uploaded
		}
	}	
});

// Create/Select Buttons
const edit_floor_btn = document.querySelector('#edit_floor');
const create_floor_btn = document.querySelector('#create_floor');
edit_floor_btn.addEventListener('click', (e) => {
	let graphMap = getMapFromServer($('.ui.dropdown').dropdown("get value"));
	// now load the graph and image returned by the server

	document.querySelector('#select_floor').style.display = 'none';
});
create_floor_btn.addEventListener('click', (e) => {
	img_src = document.querySelector('#img');
	// load empty graph with this img (we'll send it to server on save)

	document.querySelector('#select_floor').style.display = 'none';
});




const new_type_btn = document.querySelector('#add_new_type');
const types = ['Supply', 'Treatment'];

const floor_input = document.querySelector('.search').childNodes[5];

// initialized later
let input;

 // hard coded colors for new types :
const colors = ['green', 'orange', 'red', 'yellow', 'olive', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
function add_new_node_type(name){
	// make the element, with a possible hard coded color option
	// append the element to the list
	types.push(name)
	info.style.display = "none";
	const type_list = document.querySelector('#type_list');
	let div = document.createElement('div');
	div.innerHTML = `<div class="item" data-value="${types.length}"> <a class="ui ${colors[types.length]} empty circular label"></a> ${name} </div>`;
	type_list.appendChild(div.firstChild);
}

function clear_label_inputs(){
	console.log('clearing label inputs');
	document.querySelector('#node_label_input').value = '';
	document.querySelector('.search').childNodes[5].value = '';
}