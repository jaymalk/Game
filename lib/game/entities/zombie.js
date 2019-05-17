/*
-------------------
Player Entity
-------------------
*/
ig.module(
    'game.entities.zombie'
)
    .requires(
        'impact.entity',
        'impact.sound'
    )
    .defines(function(){

        EntityZombie  = ig.Entity.extend({
            // ===========================
            // Importing the player sprite
            animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 16 ),

            // ===========================
            // Setting collision properties to support in-built collision handling
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            i : 0,

            // ===========================
            // Setting the parameters, w.r.t. sprite
            size: {x: 8, y:14}, // Actualy size of sprite
            offset: {x: 4, y: 2},   // Offset for collision
            flip: false,    // Blocking the flip action for sprite

            // ===========================
            // Setting physical features of zombie
            health: 15,

            // ===========================
            // Setting movement features of zombie
            maxVel: {x: 100, y: 100},   // Velocity
            friction: {x: 150, y: 0},
            speed: 60,

            // ===========================
            // Initialising animation sequence for the entity
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'walk', 0.07, [0,1,2,3,4,5] );
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
                this.i = (this.i+1)%100;
                if(this.i === 0) {
                    ig.game.spawnEntity(EntityBadBullet, this.pos.x, this.pos.y, {flip:this.flip} );
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


        EntityBadBullet = ig.Entity.extend({
            // Defining bullet entity
            // ===========================
            // Importing the player sprite
            animSheet: new ig.AnimationSheet( 'media/main/items.png', 16, 16 ),

            // ===========================
            // Setting collision properties to support in-built collision handling
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            // ===========================
            // Setting the parameters, w.r.t. sprite
            size: {x: 5, y: 3}, // Actual size of sprite
            offset: {x: 4, y: 2},
            flip: false,    // Blocking the flip action for sprite

            // ===========================
            // Setting movement features of bullet
            maxVel: {x: 200, y: 0},   // Velocity

            // ===========================
            // Initialising animation sequence for the entity
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 8), y, settings );
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim( 'idle', 0.1, [11] );
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
                if(other instanceof  EntityPlayer) {
                    other.receiveDamage(10, this);
                }
                this.kill();
            }
        });
    });
