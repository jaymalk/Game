// Entity for switching between levels!

ig.module(
     'game.entities.levelexit'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityLevelexit = ig.Entity.extend({
        // For displaying on weltmiester
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 8, y: 8},

        // Checking if player has reached the level!
        checkAgainst: ig.Entity.TYPE.A,

        // Taking action as soon as accessed
        check: function( other ) {
            if(other instanceof EntityPlayer) {
                if( this.level ) {
                    var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) { return a.toUpperCase() + b; });
                    ig.game.loadLevelDeferred( ig.global['Level'+levelName] ); }
            }
        }
    });
});
