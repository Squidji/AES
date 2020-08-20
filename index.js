var currentsave = {
	theme: 'aesx',
	links: [
		[
			{name: 'iPass', url: 'https://ipassweb.harrisschool.solutions/school/valleytech/syslogin.html'},
			{name: 'BVT', url: 'https://www.valleytech.k12.ma.us/'}
		],
		[
			{name: 'Discord', url: 'https://discordapp.com/channels/@me'},
			{name: 'Canvas', url: 'https://blackstonevalleyregional.instructure.com/'}
		]
	]
};

function renderLinks() {
	for (let n=0; n<2; n++) {
		for (let i=0; i<currentsave.links[n].length; i++) {
			let l = currentsave.links[n][i];
			let d = $('<div>').text( l.name );
			d.addClass('link');
			d.click(function () { window.open(l.url, '_blank'); });
			$('#shortcuts').append(d);
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
};

function saveSettings() {
	localStorage.setItem('saveslot', JSON.stringify(currentsave));
	$('#savebutton').css('background-color', '#59e03e');
	setTimeout( function() { $('#savebutton').css('background-color', '#eee'); }, 200);
};

function loadSettings() {
	if ( localStorage.getItem('saveslot') !== null ) {
		currentsave = JSON.parse(localStorage.getItem('saveslot'));
		setTheme(currentsave.theme); 
	};
	renderLinks();
};