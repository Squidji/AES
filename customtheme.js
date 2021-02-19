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
	'Comic Sans': '"Comic Sans MS", cursive, sans-serif',
	'8-Bit': 'retro',
	'Radical': 'Vaporwave',
	'Space': 'stars',
	'Collage': 'EarwigFactory'
};

var custom_theme_default = `body {
	background-color: darkred;
	color: cyan;
}`;

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