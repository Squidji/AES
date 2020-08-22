var currentsave = {
	theme: 'aesx',
	links: [
		[
			{name: 'Welcome', url: 'Welcome'}
		],
		[

		]
	]
};

function renderLinks() {
	$('#shortcuts').html('');
	$('#links .linklist').html('');
	for (let n=0; n<2; n++) {
		for (let i=0; i<currentsave.links[n].length; i++) {
			
			let l = currentsave.links[n][i];

			// Shortcuts
			let d = $('<div>').text( l.name );
			d.addClass('link');
			if (l.url === 'Welcome') {
				d.click(function () { toggleMenu() });
			} else if (l.url !== '') {
				d.click(function () { window.open(l.url, '_blank'); });
			};
			$('#shortcuts').append(d);

			// Links Menu
			let a = $('<div>').addClass('label');
			a.append( $('<b>').text('X').addClass('del').click( function() {
				currentsave.links[n].splice(i, 1); renderLinks();
				saveSettings();
			}));
			a.append( $('<b>').text('✎').addClass('edt').click( function() {
				openMenu('linkedit');
				$('#linkedit #label').val(l.name);
				$('#linkedit #url').val(l.url);

				$('#linkedit .topbutton').click( function () {
					currentsave.links[n][i].name = $('#linkedit #label').val();
					currentsave.links[n][i].url  = $('#linkedit #url').val();
					renderLinks();
					$('#linkedit .topbutton').off();
					openMenu('links');
				});
				saveSettings();

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
	$('#'+id).show();
};

function setTheme(theme) {
	$('body').removeClass();
	$('body').addClass(theme);
	currentsave.theme = theme;
	saveSettings();
};

function saveSettings() {
	localStorage.setItem('saveslot', JSON.stringify(currentsave));
	//$('#savebutton').css('background-color', '#59e03e');
	//setTimeout( function() { $('#savebutton').css('background-color', '#eee'); }, 200);
};

function loadSettings() {
	if ( localStorage.getItem('saveslot') !== null ) {
		currentsave = JSON.parse(localStorage.getItem('saveslot'));
		setTheme(currentsave.theme); 
	};
	renderLinks();
};