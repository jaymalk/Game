ig.module(
    'game.entities.start_player'
)
.requires(
    'game.entities.player'
)
.defines(function() {
    EntityStart_player = EntityPlayer.extend({
        update: function(x, y, settings) {
            y = 178;
            this.parent();
        }
    })
});
