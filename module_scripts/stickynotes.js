// Initialize the Module
_modules['stickynotes'] = {};

_modules.stickynotes.displayName = 'Sticky Notes'

// Runs when the module is switched on & on page load.
_modules.stickynotes['startRun'] = function () {
	// Create Save Data Slot

	// Add CSS
	let style = $('<style id="stickynotes_style">'+_modules.stickynotes.SOURCE_style+'</style>')
	$('head').append(style);
	// If New Instance
	if (!currentsave.stickynotes) {
		currentsave.stickynotes = {
			notes: [
				{
					text: 'Welcome to the Sticky Note Module.',
					top: '10px', left: '10px', width: '300px', height: '300px'
				}
			]
		};
		saveSettings();
	};

	// Create Sticky Notes
	for (let i=0; i<currentsave.stickynotes.notes.length; i++) {
		_modules.stickynotes.newNote(i);
		let nd = currentsave.stickynotes.notes[i];
		$('#noteid_'+i).css('top', nd.top).css('left', nd.left)
			.css('width', nd.width).css('height', nd.height);
		$('#noteid_'+i+' textarea').text(nd.text);
	};

};

// Runs when the module is switched off.
_modules.stickynotes['endRun'] = function () {
	// Remove Save Data Slot
	currentsave.stickynotes = undefined;
	$('#stickynotes_style').remove();
	$('.stickynote_box').remove();
};

// Run when links are rendered.
_modules.stickynotes['onRender'] = function () {
	//alert('is this it?');
};



_modules.stickynotes['newNote'] = function (number) {
	let ok = $(_modules.stickynotes.SOURCE_window);
	ok.attr('id', 'noteid_'+number);
	ok.attr('stickyid', number);
	$('body').append(ok);

	// Make resizable and draggable, and save changes
	$('#noteid_'+number).draggable({ handle: '.header', containment: 'window', stack: '.stickynote_box',
		stop: function (event, ui) {
			let id = ui.helper.attr('stickyid');
			currentsave.stickynotes.notes[id].top = ui.helper.css('top');
			currentsave.stickynotes.notes[id].left = ui.helper.css('left');
			saveSettings();
		}
	});
	$('#noteid_'+number).resizable({
		stop: function (event, ui) {
			let id = ui.helper.attr('stickyid');
			currentsave.stickynotes.notes[id].height = ui.helper.css('height');
			currentsave.stickynotes.notes[id].width = ui.helper.css('width');
			saveSettings();
		}
	});

	// Save the changes to text
	$('#noteid_'+number+' textarea').on('input', function(handler) {
		let win = $(handler.target).parent().parent().attr('stickyid');
		let val = $(handler.target).val();
		currentsave.stickynotes.notes[win].text = val;
		saveSettings();
	});

	// Stickynote Buttons
	$('#noteid_'+number+' .header .close').click( function(handler) {
		let win = $(handler.target).parent().parent();
		let stickyid = win.attr('stickyid');
		win.remove();
		currentsave.stickynotes.notes.splice(stickyid, 1);
		saveSettings();
		if (currentsave.stickynotes.notes.length === 0) {
			toggleModule('stickynotes');
		}
	});
	$('#noteid_'+number+' .header .new').click( function(handler) {
		currentsave.stickynotes.notes.push(
			{
				text: '',
				top: '10px', left: '10px', width: '300px', height: '300px'
			}
		);
		saveSettings();
		_modules.stickynotes.newNote(currentsave.stickynotes.notes.length - 1);
	});
};



_modules.stickynotes['SOURCE_window'] = `<div class='stickynote_box'>
	<div class='header'>
		<div class='close'>X</div>
		<div class='new'>+</div>
	</div>
	<div class='container'>
		<textarea spellcheck='false'></textarea>
	</div>
</div>`;
_modules.stickynotes['SOURCE_style'] = `

.stickynote_box {
	position: fixed;
	top: 10px;
	left: 10px;
	display: block;
	width: 300px;
	height: 300px;
	background-color: #707070;
	color: black;
	border: solid 1px #707070;
}

.stickynote_box .header {
	cursor: default;
	height: 20px;
	color: white;
	font-size: 14px;
}
.stickynote_box .header div {
	width: 16px;
	height: 16px;
	display: block;
	cursor: pointer;
}
.stickynote_box .header div.new {
	margin-left: 5px;
	font-size: 16px;
}
.stickynote_box .header div.close {
	float: right;
}

.stickynote_box .container {
	width: calc(100% - 10px);
	height: calc(100% - 30px);
	display: block;
	padding: 1px;
}

.stickynote_box .container textarea {
	resize: none;
	border: none;
	width: 100%;
	height: 100%;
	padding: 4px;
	display: block;
	font-size: 15px;
	font-family: 'Lexend Tera', sans-serif;
	background-color: #eee;
}

`;