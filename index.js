var currentsave = {
	theme: 'aesx',
	links: [
		[
			{name: 'Welcome', url: 'Welcome'}
		],
		[

		]
	],
	custom_themes: [
		/*{
			name: 'Test Theme',
			base: 'aesx',
			font: 'Default',
			style: ''
		}*/
	],
	title: 'AES',
	data_version: 1
};

var themedictionary = {
	'AES X': 'aesx',
	'MATERIAL': 'mtrl',
	'AES Classic': 'aesc',
	'Retro': 'rtro',
	'Vaporwave': 'vapo',
	'SPICE ORANGE': 'spor',
	'Persona 5': 'psn5',
	'Persona 3': 'psn3',
	'K-ON!': 'konb'
};
var fontdictionary = {
	'Default': 0,
	'Arial': 'Arial, Helvetica, sans-serif',
	'Monospace': "'Courier New', monospace",
	'Cursive': "'Brush Script MT', cursive",
	'Comic Sans': '"Comic Sans MS", cursive, sans-serif'
};

var custom_theme_default = `body {
	background-color: darkred;
	color: cyan;
}
`;

function renderLinks() {
	$('#shortcuts').html('');
	$('#menu_links .linklist').html('');
	$('#HEADER').text(currentsave.title);
	$('#menu_other #title_input').val(currentsave.title);
	for (let n=0; n<2; n++) { // For each row.
		for (let i=0; i<currentsave.links[n].length; i++) { // For each link in the row
			
			let l = currentsave.links[n][i];

			// Create Link Boxes
			let d = $('<div>');
			d.append( $('<span>').text(l.name) );
			d.addClass('link');
			if (l.url === 'Welcome') {
				d.click(function () { toggleMenu() });
			} else if (l.url !== '') {
				d.click(function () { window.open(l.url, '_blank'); });
			};
			$('#shortcuts').append(d);

			// Update Links Menu
			let a = $('<div>').addClass('label');
			a.append( $('<b>').text('X').addClass('del').click( function() {
				currentsave.links[n].splice(i, 1); renderLinks();
				saveSettings();
			}));
			a.append( $('<b>').text('✎').addClass('edt').click( function() {
				// Open Link Edit Menu
				openMenu('linkedit');
				$('#menu_linkedit #label').val(l.name);
				$('#menu_linkedit #url').val(l.url);
				// Set 'Save' Button to Enact Changes on CLick
				$('#menu_linkedit .topbutton').click( function () {
					currentsave.links[n][i].name = $('#menu_linkedit #label').val();
					currentsave.links[n][i].url  = $('#menu_linkedit #url').val();
					saveSettings();
					renderLinks();
					openMenu('links');
					$('#menu_linkedit .topbutton').off(); // Removes function after being used.
				});

			}));
			a.append( $('<b>').text('⬇').addClass('mov').click( function() {
				if (i === currentsave.links[n].length - 1) { // last in list
					if (n === 0) { // is row 1
						currentsave.links[1].unshift(l);
						currentsave.links[0].pop();
					};
				} else {
					let thislink = l;
					let underlink = currentsave.links[n][i+1];
					currentsave.links[n][i] = underlink;
					currentsave.links[n][i+1] = thislink;
				};
				renderLinks();
				saveSettings();

			}));
			a.append( $('<b>').text('⬆').addClass('mov').click( function() {
				if (i === 0) { // first in list
					if (n === 1) { // is row 2
						currentsave.links[0].push(l);
						currentsave.links[1].shift();
					};
				} else {
					let thislink = l;
					let abovelink = currentsave.links[n][i-1];
					currentsave.links[n][i] = abovelink;
					currentsave.links[n][i-1] = thislink;
				};
				renderLinks();
				saveSettings();

			}));
			a.append( $('<div>').text(l.name) );
			$('#row' + (n+1) + 'linklist').append(a);
		};
		$('#shortcuts').append( $('<br>') );
	};
};

function toggleMenu() {
	$('#menubutton').toggle();
	$('#menu').toggle();
	openMenu('home');
};

function openMenu(id) {
	$('.menupage').hide();
	$('#menu_'+id).show();
};

function setTheme(theme) {
	// Wash Theming
	$('body').removeClass();
	$('#customtheme').empty();

	// Add Theming
	if (theme.startsWith('custom_')) {
		let ctheme = currentsave.custom_themes[parseInt(theme.substring(7))];
		$('body').addClass(ctheme.base);
		$('#customtheme').text('body { font-family: '+
		fontdictionary[ctheme.font]+' !important;}\n'+ctheme.style);
	} else {
		$('body').addClass(theme);
	};
	currentsave.theme = theme;
	saveSettings();
};

function renderCustomThemeMenu() {
	$('#customthemelist').empty();
	for (let i=0; i<currentsave.custom_themes.length; i++) {
		let ct = currentsave.custom_themes[i];
		let d = $('<div>').addClass('label');
		$('#customthemelist').append(d);

		// Buttons
		d.append( $('<b>').text('X').addClass('del').click( function() {
			currentsave.custom_themes.splice(i, 1);
			renderCustomThemeMenu();
			setTheme('aesx');
		}));
		d.append( $('<b>').text('✎').addClass('edt').click( function() {

			setTheme('custom_'+i);

			// Render Editor
			$('#menu_customtheme #name').val(ct.name);
			$('#menu_customtheme #base').val(ct.base);
			$('#menu_customtheme #font').val(ct.font);
			csseditor.setValue(ct.style);

			// Open Editor
			openMenu('customtheme');

			// On Save & Exit
			$('#menu_customtheme .topbutton').click( function () {
				saveCustomTheme(i);
				openMenu('themes');
				$('#menu_linkedit .topbutton').off(); // Removes function after being used.
				$('#menu_linkedit #savechanges').off();
			});
			$('#menu_customtheme #savechanges').click( function() {
				saveCustomTheme(i);
			});
		}));
		d.append( $('<div>').text(ct.name).addClass('theme_name').click( function() {
			setTheme('custom_'+i);
		}));
	};
};

function saveCustomTheme(array_index) {
	//ADD SAVE FEATURE
	let themepacket = {
		name: $('#menu_customtheme #name').val(),
		base: $('#menu_customtheme #base').val(),
		font: $('#menu_customtheme #font').val(),
		style: csseditor.getValue()
	};
	currentsave.custom_themes[array_index] = themepacket;
	renderCustomThemeMenu();
	setTheme('custom_'+array_index);
	saveSettings();
};

function addCustomTheme() {
	currentsave.custom_themes.push({
		name: 'New Theme',
		base: 'aesx',
		font: 'Default',
		style: custom_theme_default
	});
	renderCustomThemeMenu();
	saveSettings();
};

function resetSettings() {
	let confirmation = prompt('Resetting AESLink will remove all links and Custom Themes. \
	Type `Reset` to confirm the reset.');
	if (confirmation === 'Reset') {
		localStorage.clear();
		location.reload();
	} else {
		alert('Reset Aborted');
	};
};

function saveSettings() { localStorage.setItem('saveslot', JSON.stringify(currentsave)) };

function loadSettings() {
	if ( localStorage.getItem('saveslot') !== null ) {
		// Load and Update LocalStorage Settings
		currentsave = JSON.parse(localStorage.getItem('saveslot'));
		if (currentsave.data_version === undefined) {
			currentsave.data_version = 1;
			currentsave.title = 'AES';
			currentsave.custom_themes = [];
			saveSettings();
		};


		setTheme(currentsave.theme); 
	};
	renderLinks();
	renderCustomThemeMenu();
};