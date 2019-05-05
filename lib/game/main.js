ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'game.levels.test',
	'game.levels.level0',
	'game.levels.country',
	'game.levels.ocean',
	'game.levels.forest'
)
.defines(function(){

// Game object
MyGame = ig.Game.extend({
	gravity : 325,
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),


	init: function() {
		// Initialize your game here; bind keys etc.

		// Start game (Load Level)
		this.loadLevel(LevelForest);

		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
		ig.input.bind( ig.KEY.C, 'jump' );
		ig.input.bind( ig.KEY.X, 'shoot' );
	},

	update: function() {
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/3;
			this.screen.y = player.pos.y - 3*ig.system.height/4;
		}
		// Update all entities and backgroundMaps
		this.parent();
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});

// Start screen
StartScreen = ig.Game.extend({
	// Adding the font type
	instructText: new ig.Font( 'media/04b03.font.png' ),
	// // Adding the start screen
	// background: new ig.Image('media/start_screen.png'),
	// Initialising screen
	init: function() {
		// Theme song
		ig.music.add( 'media/sounds/theme.*' ); ig.music.volume = 0.5;
		ig.music.play();
		// Loading intro level
		this.loadLevel(LevelCountry);
		// Loading keys
		ig.input.bind( ig.KEY.SPACE, 'start');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
	},
	// Updating screen
	update: function() {
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/3;
			this.screen.y = player.pos.y - 5*ig.system.height/6;
		}
		// Starting the game
		if(ig.input.pressed ('start')) {
			ig.music.stop();
			ig.system.setGame(MyGame);
		}
		this.parent();
	},
	// Drawing function
	draw: function() {
		this.parent();
		// Drawing Game Name
		var x = ig.system.width/2,
		    y = ig.system.height/10;
		this.instructText.draw( 'PRESS SPACEBAR TO START', x+40, y, ig.Font.ALIGN.CENTER );
	}
});

if( ig.ua.mobile ) {
	// Disable sound for all mobile devices
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 576, 256, 2 );

});
