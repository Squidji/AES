var links = [
	[
		{name: 'iPass', url: 'https://ipassweb.harrisschool.solutions/school/valleytech/syslogin.html'},
		{name: 'BVT', url: 'https://www.valleytech.k12.ma.us/'}
	],
	[
		{name: 'Discord', url: 'https://discordapp.com/channels/@me'},
		{name: 'Canvas', url: 'https://blackstonevalleyregional.instructure.com/'}
	]
]

function renderLinks() {
	for (let n=0; n<2; n++) {
		for (let i=0; i<links[n].length; i++) {
			let l = links[n][i];
			let d = $('<div>').text( l.name );
			d.addClass('link');
			d.click(function () { window.open(l.url, '_blank'); });
			$('#shortcuts').append(d);
		};
		$('#shortcuts').append( $('<br>') );
	};
};