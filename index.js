/*
	AESIKA // index.js
	Created by Aeraki
*/

// Default Variable Set
/* if (localStorage.getItem('bgColor') == null) {
	localStorage.setItem('bgColor', '#222');
}; */

// The lynx variable holds a list of rows, each a list with their own link objects
var lynx = [
	[
		{'name': 'iPass', 'link': 'https://ipassweb.harrisschool.solutions/school/valleytech/syslogin.html','img': '_ipass.png'},
		// {'name': 'TestOut', 'link': 'https://cdn.testout.com/client-v5-1-10-552/startlabsim.html', 'img': '_testout.png'},
		{'name': 'BVT', 'link': 'https://www.valleytech.k12.ma.us/', 'img': '_bvt.png'},
	],
	[
		{'name': 'Discord', 'link': 'https://discordapp.com/channels/@me', 'img': '_discord.png'},
		{'name': 'Canvas', 'link': 'https://blackstonevalleyregional.instructure.com/', 'img': '_canvas.png'}
	]
];

// The customs variable describes what the user can change and customize
var customCategories = ['Header', 'Background', 'Link Style']
var customs = {
	'Header': [
		{'id': 'headerText','title': 'Header Text:', 'default': 'AES','type': 'text', 'affect': [
			['id', 'header', 'innerText', ''], ['id', 'title', 'innerText', '']
		]},
		{'id': 'headerColor', 'title': 'Header Color', 'default': '#FFFFFF', 'type': 'color', 'affect': [
			['id', 'header', 'color', 'style'], ['id', 'editButton', 'color', 'style']
		]},
		{'id': 'headerSize', 'title': 'Header Size', 'default': '50', 'type': 'number', 'end': 'px', 'affect': [
			['id', 'header', 'fontSize', 'style']
		], 'min': 10, 'max': 100},
		{'id': 'headerTop', 'title': 'Header From Top', 'default': '20', 'type': 'number', 'end': '%', 'affect': [
			['id', 'header', 'top', 'style']
		], 'min': 0, 'max': 70}
	],

	'Background': [
		{'id': 'bgColor', 'title': 'Background Color:', 'default': '#222222','type': 'color', 'affect': [
			['id', 'body', 'backgroundColor', 'style']
		]},
		{'id': 'bgImage', 'title': 'Background Image: (URL)', 'default': '', 'type': 'text', 'start': 'url(', 'end': ')', 'affect': [
			['id', 'body', 'backgroundImage', 'style']
		]}
	],

	'Link Style': [
		{'id': 'lnkColor', 'title': 'Link Text Color:', 'default': '#FFFFFF', 'type': 'color', 'affect': [
			['class', 'link', 'color', 'style']
		]},
		{'id': 'lnkBorderColor', 'title': 'Border Color:', 'default': '#FFFFFF', 'type': 'color', 'affect': [
			['class', 'link', 'borderColor', 'style']
		]},
		{'id': 'lnkBorderRadius', 'title': 'Rounded Border Size', 'default': '12', 'type': 'number', 'end': 'px', 'affect': [
			['class', 'link', 'borderRadius', 'style']
		], 'min': 0, 'max': 100},
		{'id': 'lnkMargin', 'title': 'Link Margins', 'default': '8', 'type': 'number', 'end': 'px', 'affect': [
			['class', 'link', 'margin', 'style']
		]},
		{'id': 'linkBgImage', 'title': 'Link BG Image', 'default': '', 'type': 'text', 'start': 'url(', 'end': ')', 'affect': [
			['class', 'link', 'backgroundImage', 'style']
		]}
	]
};

// Changes whether the edit window is displayed or not
function setEdit(i) {document.getElementById('editWindow').style.display=i};

var currentcategory = '';
function saveChanges() {

	for (let peram=0; peram<customs[currentcategory].length; peram++) {

		let full = customs[currentcategory][peram];
		let value = document.getElementById(full.id).value;

		if (value !== '' && value != undefined) {
			localStorage.setItem(full.id, value);
		};

	};

	renderStyle();

};

function renderStyle() {
	
	// For every category
	for (let cat=0; cat<customCategories.length; cat++) {
		// For every perameter in the category
		for (let peram=0; peram<customs[customCategories[cat]].length; peram++) {

			// If this perm exists in local storage
			let peramid = customs[customCategories[cat]][peram].id;
			if (localStorage.getItem(peramid) !== null) {

				// For every element the peram affects
				for (let af=0; af<customs[customCategories[cat]][peram].affect.length; af++) {

					// The affecting peram list
					let temp = customs[customCategories[cat]][peram].affect[af];

					let tempval = localStorage.getItem(peramid);
					if (customs[customCategories[cat]][peram].start !== undefined) {
						tempval = customs[customCategories[cat]][peram].start + tempval;
					};
					if (customs[customCategories[cat]][peram].end !== undefined) {
						tempval = tempval + customs[customCategories[cat]][peram].end;
					};

					// 0 // ELEMENT SCOPE
					// For Setting by ID
					if (temp[0] === 'id') {
						
						if (temp[3] === '') {
							document.getElementById(temp[1])[temp[2]] = tempval;
						} else if (temp[3] === 'style') {
							document.getElementById(temp[1]).style[temp[2]] = tempval;
						};

					// For Setting by Class
					} else if (temp[0] === 'class') {

						let cluster = document.getElementsByClassName(temp[1]);

						// For each element in the class
						for (let i=0; i<cluster.length; i++) {

							if (temp[3] === '') {
								document.getElementsByClassName(temp[1])[i][temp[2]] = tempval;
							} else if (temp[3] === 'style') {
								document.getElementsByClassName(temp[1])[i].style[temp[2]] = tempval;
							};

						};

					};

				};

			};

		};
	};

};

// Uses the lynx variable to create the html to display them
function renderLynx() {
	document.getElementById('shortcuts').innerHTML='';

	// For every row
	for (let row=0; row<lynx.length; row++) {

		// For every box in the row
		for (let box=0; box<lynx[row].length; box++) {

			// Create box node with the specified name, link, etc.
			let temp = document.createElement('a');
			temp.innerText = lynx[row][box].name;
			temp.href = lynx[row][box].link;
			temp.target = '_blank';
			temp.class = 'box';

			temp.classList.add('link');

			// Add the box element to the shortcuts
			document.getElementById('shortcuts').appendChild(temp);

		};

		// Create a breakline every row
		document.getElementById('shortcuts').appendChild(document.createElement('br'));

	};
};

// Uses the customCategories variable to make buttons for each
function renderCategories() {

	// Sets the CLOSE button to visible
	document.getElementById('end').style.display = 'inline-block';
	document.getElementById('reset').style.display = 'block';
	document.getElementById('save').style.display = 'none';
	document.getElementById('back').style.display = 'none';

	// Clears the body of the edit window
	document.getElementById('editWindowBody').innerHTML = '';

	// For every category
	for (let cats=0; cats<customCategories.length; cats++) {

		let tab = document.createElement('div');
		tab.classList.add('cat');
		tab.innerText = customCategories[cats];
		tab.onclick = renderCustoms;

		document.getElementById('editWindowBody').appendChild(tab);

	};

};

// Uses the customs variable to create the html to display the inputs
function renderCustoms(mouseEvent) {

	// Sets the BACK and SAVE buttons to visible
	document.getElementById('end').style.display = 'none';
	document.getElementById('reset').style.display = 'none';
	document.getElementById('save').style.display = 'inline-block';
	document.getElementById('back').style.display = 'inline-block';

	// Gets the text inside of the clicked element and uses as category
	var cat = mouseEvent.target.innerText;
	currentcategory = cat;

	// Clears the body of the edit window
	document.getElementById('editWindowBody').innerHTML = '';

	// For every customizable perameter
	for (let peram=0; peram<customs[cat].length; peram++) {

		// Create the input label
		let label = document.createElement('p');
		label.innerText = customs[cat][peram].title;

		// Create the input
		let input = document.createElement('input');
		input.type = customs[cat][peram].type;
		input.id = customs[cat][peram].id;

		// Set the default input values
		if (localStorage.getItem(input.id) === null) {
			input.value = customs[cat][peram].default;
		} else {
			input.value = localStorage.getItem(input.id);
		};

		if (input.type === 'number') {
			input.min = customs[cat][peram].min;
			input.max = customs[cat][peram].max;
		}

		// Add the label and input to the window
		document.getElementById('editWindowBody').appendChild(label);
		document.getElementById('editWindowBody').appendChild(input);

	};

};

function resetStyle() {
	let conf = prompt('Type the page title to reset the styling to default.');
	if (conf === localStorage.getItem('headerText')) {
		localStorage.clear();
		location.reload();
	} else {
		alert('Reset Cancelled');
	}
};