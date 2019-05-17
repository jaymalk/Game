/*
-------------------
Player Entity
-------------------
*/
ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){

    // Defining the player entity in the module
    EntityPlayer  = ig.Entity.extend({
        // ===========================
        // Importing the player sprite
        animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),

        // Sound loop handle
        i : 0,

        // ===========================
        // Setting collision properties to support in-built collision handling
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        // ===========================
        // Setting the parameters, w.r.t. sprite
        size: {x: 8, y:14}, // Actual size of sprite
        offset: {x: 4, y: 2},   // Offset for collision
        flip: false,    // Blocking the flip action for sprite
        startPosition: null, // Starting position of the sprite

        // ===========================
        // Setting physical features of player
        health: 100,

        // ===========================
        // Setting movement features of player
        maxVel: {x: 100, y: 250},   // Velocity
        friction: {x: 600, y: 0},   // Friction
        accelGround: 400,   // Acceleration on ground
        accelAir: 200,  // Acceleration in air
        jump: 500,  // Jump


        // Sound elementes
        jumpSFX: new ig.Sound( 'media/sounds/jump.*' ),
        shootSFX: new ig.Sound( 'media/sounds/shoot.*' ),
        deathSFX: new ig.Sound( 'media/sounds/death.*' ),
        walkSFX: new ig.Sound( 'media/sounds/walk.*' ),

        // ===========================
        // Initialising animation sequence for the entity
        init: function( x, y, settings ) {
            this.startPosition = {x:x, y:y};
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
            this.addAnim( 'jump', 1, [9] );
            this.addAnim( 'fall', 0.4, [6,7] );
        },

        // ===========================
        // Interacting with the player
        update: function() {
        // move left or right
            var accel = this.standing ? this.accelGround : this.accelAir;
            if( ig.input.state('left') ) {
                this.accel.x = -accel;
                this.flip = true;
            } else if( ig.input.state('right') ) {
                this.accel.x = accel;
                this.flip = false;
            } else{
                this.accel.x = 0;
            }
        // jump
            if( this.standing && ig.input.pressed('jump') ) {
                this.vel.y = -this.jump;
                this.jumpSFX.play();
            }
        // Shooting maneuver
            if( ig.input.pressed('shoot') ) {
                ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip} );
                this.shootSFX.play();
            }
        // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
                this.currentAnim = this.anims.jump;
            }else if( this.vel.y > 0 ) {
                this.currentAnim = this.anims.fall;
            }else if( this.vel.x != 0 ) {
                this.currentAnim = this.anims.run;
                if (this.i === 0) {
                    this.walkSFX.play();
                }
                this.i = (this.i+1)%11;
            }else{
                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
        // move!
            this.parent();
        },

        // ===========================
        // Overriding the kill function to support re-spawning
        kill: function() {
            this.parent();
            this.deathSFX.play();
            ig.game.respawnPosition = this.startPosition;
            this.onDeath();
        },
        // ===========================
        // Overriding the behaviour on death
        onDeath: function(){
            ig.game.stats.deaths ++;
            ig.game.lives --;
            if(ig.game.lives < 0){
                ig.game.gameOver();
            }
            else{
                ig.game.spawnEntity( EntityPlayer, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
            }
        }

    });

    // Defining bullet entity
    EntityBullet = ig.Entity.extend({
        // ===========================
        // Importing the player sprite
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),

        // ===========================
        // Setting collision properties to support in-built collision handling
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

        // ===========================
        // Setting the parameters, w.r.t. sprite
        size: {x: 5, y: 3}, // Actual size of sprite
        flip: false,    // Blocking the flip action for sprite

        // ===========================
        // Setting movement features of bullet
        maxVel: {x: 200, y: 0},   // Velocity

        // ===========================
        // Initialising animation sequence for the entity
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8), y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },

        // ===========================
        // Handling collision cases
        // 1. Colliding with wall or platform
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ) {
                this.kill();
            }
        },
        // 2. Colliding with a zombie (type.B)
        check: function( other ) {
            if(other instanceof  EntityZombie) {
                other.receiveDamage(5, this);
            }
            else if(other instanceof EntityDog) {
                other.receiveDamage(10, this);
            }
            else {
                other.receiveDamage(10, this);
            }
            this.kill();
        }
    });
});
