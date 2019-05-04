ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'game.levels.test',
	'game.levels.level0',
	'game.levels.country',
	'game.levels.ocean',
	'game.levels.forest',
	'game.levels.station'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity : 325,
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),


	init: function() {
		// Initialize your game here; bind keys etc.

		// Start game (Load Level)
		this.loadLevel(LevelStation);

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


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 576, 256, 2 );

});
