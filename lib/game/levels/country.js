ig.module( 'game.levels.country' )
.requires( 'impact.image','game.entities.start_player' )
.defines(function(){
LevelCountry=/*JSON[*/{
	"entities": [
		{
			"type": "EntityStart_player",
			"x": 228,
			"y": 162
		}
	],
	"layer": [
		{
			"name": "collision",
			"width": 24,
			"height": 12,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "background",
			"width": 12,
			"height": 7,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/new_media/country-platform-files/layers/country-platform-back.png",
			"repeat": true,
			"preRender": false,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[1,2,3,4,5,6,7,8,9,10,11,12],
				[13,14,15,16,17,18,19,20,21,22,23,24],
				[25,26,27,28,29,30,31,32,33,34,35,36],
				[37,40,40,40,41,42,43,44,45,46,47,48],
				[49,60,60,60,60,60,60,60,60,60,60,60],
				[61,60,60,60,60,60,60,60,60,60,60,60],
				[73,73,74,75,76,76,77,77,77,78,79,80]
			]
		},
		{
			"name": "forest",
			"width": 12,
			"height": 7,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/new_media/country-platform-files/layers/country-platform-forest.png",
			"repeat": true,
			"preRender": false,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,13,14,0,0,0,13,14,0,0,0],
				[16,17,18,19,20,16,17,18,19,20,16,17],
				[21,22,23,24,25,21,22,23,24,25,21,22],
				[26,27,28,29,30,26,27,28,29,30,26,27],
				[0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "grass",
			"width": 12,
			"height": 7,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/new_media/country-platform-files/layers/country-platform-tiles-example.png",
			"repeat": true,
			"preRender": false,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,31,32,33,0,0,0],
				[0,0,0,0,0,42,43,44,45,0,0,0],
				[0,0,0,0,0,54,55,56,57,0,0,0],
				[61,62,63,64,65,66,67,68,69,70,71,72],
				[73,74,75,76,77,78,79,80,81,82,83,84]
			]
		},
		{
			"name": "ocean",
			"width": 1,
			"height": 10,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/new_media/country-platform-files/country-platform-preview.png",
			"repeat": true,
			"preRender": false,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0],
				[0],
				[0],
				[0],
				[0],
				[0],
				[0],
				[74],
				[4],
				[4]
			]
		}
	]
}/*]JSON*/;
LevelCountryResources=[new ig.Image('media/new_media/country-platform-files/layers/country-platform-back.png'), new ig.Image('media/new_media/country-platform-files/layers/country-platform-forest.png'), new ig.Image('media/new_media/country-platform-files/layers/country-platform-tiles-example.png'), new ig.Image('media/new_media/country-platform-files/country-platform-preview.png')];
});