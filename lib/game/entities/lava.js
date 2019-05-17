/*
-------------------
Glee Entity
-------------------
*/
ig.module(
    'game.entities.lava'
)
    .requires(
        'impact.entity',
        'impact.sound'
    )
    .defines(function(){

        EntityLava  = ig.Entity.extend({
            // ===========================
            // Importing the player sprite
            animSheet: new ig.AnimationSheet( 'media/main/items.png', 16, 16 ),

            // ===========================
            // Setting collision properties to support in-built collision handling
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            // ===========================
            // Setting the parameters, w.r.t. sprite
            size: {x: 8, y:14}, // Actualy size of sprite
            offset: {x: 4, y: 2},   // Offset for collision
            flip: false,    // Blocking the flip action for sprite

            // ===========================
            // Setting physical features of zombie
            health: 1000,

            // ===========================
            // Setting movement features of zombie
            maxVel: {x: 100, y: 100},   // Velocity
            friction: {x: 150, y: 0},
            speed: 60,

            // ===========================
            // Initialising animation sequence for the entity
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'walk', 0.07, [0,1,2,1] );
            },

            // ===========================
            // Interacting with the player
            update: function() {
                // move left or right
                if(!ig.game.collisionMap.getTile(
                    this.pos.x + (this.flip ? +4 : this.size.x-4),
                    this.pos.y + this.size.y+1
                )
                ) {
                    this.flip = ! this.flip;
                }
                var dir_x = this.flip ? -1 : 1;
                this.vel.x = this.speed * dir_x;
                this.currentAnim.flip.x = this.flip;
                // move!
                this.parent();
            },

            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x ) {
                    this.flip = !this.flip;
                }
            },

            check: function( other ) {
                other.kill();
            },

            kill: function() {
                ig.game.stats.kills++;
                this.parent();
            }
        });
    });
