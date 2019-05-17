/*
-------------------
Glee Entity
-------------------
*/
ig.module(
    'game.entities.fly'
)
    .requires(
        'impact.entity',
        'impact.sound'
    )
    .defines(function(){

        EntityFly  = ig.Entity.extend({
            // ===========================
            // Importing the player sprite
            animSheet: new ig.AnimationSheet( 'media/main/enemies.png', 16, 16 ),

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
            startPosition: null, // Starting position of the sprite

            // ===========================
            // Setting physical features of zombie
            health: 10,

            // ===========================
            // Setting movement features of zombie
            maxVel: {x: 100, y: 100},   // Velocity
            friction: {x: 150, y: 0},
            speed: 40,
            i : 0,

            // ===========================
            // Initialising animation sequence for the entity
            init: function( x, y, settings ) {
                this.startPosition = {x:x, y:y};
                this.parent( x, y, settings );
                this.addAnim( 'walk', 0.07, [8,9,10] );
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
                    ig.game.spawnEntity(EntityBadBullet, this.pos.x, this.pos.y );
                }
                this.pos.y = this.startPosition.y;
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
                other.receiveDamage(5, this);
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
            maxVel: {x: 0, y: 50},   // Velocity

            // ===========================
            // Initialising animation sequence for the entity
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.vel.y = this.maxVel.y;
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
                    other.receiveDamage(25, this);
                }
                this.kill();
            }
        });
    });
