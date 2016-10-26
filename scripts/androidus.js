(function(window){ 

   
    //Androidus the robot has starting coordinates x,y
    function Android(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = 120; 

       

         this.newPos = function() {
        this.x += this.y;
        this.y += this.y; 
    } 

        this.model = new Image(); 
        this.model.src = "game_assets/androdiusLeft.jpg"; 
    }

    Android.prototype.draw = function() { 
            this.ctx.drawImage(this.model, this.x, this.y);
    }

    window.Android = Android; 

})(window);
