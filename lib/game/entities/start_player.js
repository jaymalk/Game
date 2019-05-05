ig.module(
    'game.entities.start_player'
)
.requires(
    'game.entities.player'
)
.defines(function() {
    EntityStart_player = EntityPlayer.extend({
        update: function(x, y, settings) {
            if (Math.abs(this.pos.x -612) <= 10)
                this.pos.x = this.pos.x -612 +228;
            this.parent();
        }
    })
});
