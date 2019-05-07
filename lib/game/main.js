ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'game.levels.station',
	'game.levels.easyExit',
	'game.levels.country',
	'game.levels.ocean',
	'game.levels.forestHard',
	'game.levels.forestEasy',
	'game.levels.scaryShit'
)
.defines(function(){

// Game object
MyGame = ig.Game.extend({
	gravity : 325,
	// Player Lives
	lives: 4,
	// Drawing sprites for status
	lifeSprite: new ig.Image('media/life-sprite.png'),
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	// Adding status info.
	instructText: new ig.Font( 'media/04b03.font.png' ),
	background: new ig.Image('media/black.png'),
	// Status
	showStats: false,
	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: {time: 0, kills: 0, deaths: 0},


	init: function() {
		// Start game (Load Level)
		this.loadLevel(LevelStation);

		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
		ig.input.bind( ig.KEY.C, 'jump' );
		ig.input.bind( ig.KEY.X, 'shoot' );
		ig.input.bind( ig.KEY.SPACE, 'continue' );
	},

	update: function() {
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/3;
			this.screen.y = player.pos.y - 3*ig.system.height/5;
		}
		// Update all entities and backgroundMaps
		// Checking for status show
		if(!this.showStats){
			this.parent();
		}
		else{
			this.showStats = false;
			this.levelExit.nextLevel();
			this.lives++;
			this.parent();
		}
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},
	// Override loading function
	loadLevel: function( data ) {
		this.parent(data);
		this.levelTimer.reset();
	},
	// Status FSM
	toggleStats: function(levelExit){
		this.showStats = true;
		this.stats.time = Math.round(this.levelTimer.delta()); this.levelExit = levelExit;
	},
	// Game Over Screen
	gameOver: function(){
		ig.finalStats = ig.game.stats;
		ig.system.setGame(GameOverScreen);
	}
});

// Start screen
StartScreen = ig.Game.extend({
	// Adding the font type
	instructText: new ig.Font( 'media/04b03.font.png' ),
	pageText: new ig.Font('media/text.png'),

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
			this.screen.x = player.pos.x-ig.system.width/2;
			this.screen.y = player.pos.y - 7*ig.system.height/8;
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
		this.pageText.draw('STUDENT ADVENTURE', x, y*2, ig.Font.ALIGN.CENTER );
	}
});

// Game Over Screen
	GameOverScreen = ig.Game.extend({
		instructText: new ig.Font( 'media/04b03.font.png' ),
		background: new ig.Image('media/black.png'),
		gameOver: new ig.Image('media/game-over.png'),
		stats: {},
		init: function() {
			ig.input.bind( ig.KEY.SPACE, 'start');
			this.stats = ig.finalStats;
			},
		update: function() {
			if(ig.input.pressed('start')){
				ig.system.setGame(StartScreen)
			}
			this.parent();
			},
		draw: function() {
			this.parent();
			this.background.draw(0,0, 0, 0, 576, 256);
			var x = ig.system.width/2;
			var y = ig.system.height/2 - 20;
			this.gameOver.draw(x - (this.gameOver.width * .5), y - 30);
			var score = (this.stats.kills * 100) - (this.stats.deaths * 50);
			this.instructText.draw('Total Kills: '+this.stats.kills, x, y+30, ig.Font.ALIGN.CENTER);
			this.instructText.draw('Total Deaths: '+this.stats.deaths, x, y+40, ig.Font.ALIGN.CENTER);
			this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
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
