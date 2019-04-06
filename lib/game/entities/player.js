/*
-------------------
Player Entity
-------------------
*/
ig.module(
    'games.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

    Player  = ig.entity.extend({
        // ===========================
        // Importing the player sprite
        animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),

        // ===========================
        // Setting the parameters, w.r.t. sprite
        size: {x: 8, y:14}, // Actualy size of sprite
        offset: {x: 4, y: 2},   // Offset for collision
        flip: false,    // Blocking the flip action for sprite

        // ===========================
        // Setting physical features of player
        maxVel: {x: 100, y: 150},   // Velocity
        friction: {x: 600, y: 0},   // Friction
        accelGround: 400,   // Acceleration on ground
        accelAir: 200,  // Acceleration in air
        jump: 200,  // Jump

        // ===========================
        // Initialising animation sequence for the entity
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
            this.addAnim( 'jump', 1, [9] );
            this.addAnim( 'fall', 0.4, [6,7] );
        },
    });
});