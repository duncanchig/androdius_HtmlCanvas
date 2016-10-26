(function () { 
    var canvas; 
    var ctx; 
    var android; 
    var keysDown = {}; 
    var bgImage, bgReady = false; 
    var then; 

    function init() { 
        canvas = document.getElementById("tableTop"); 
       document.getElementById ("moveRobot");

        ctx = canvas.getContext('2d'); 

        bgImage = new Image(); 
        bgImage.onload = function() { 
            bgReady = true;
            ctx.drawImage(bgImage, 500, 500); 
        }
        
    bgImage.src = "game_assets/tabletop.jpg"; 

        // moving Androdius
        window.addEventListener("keydown", function(e) {
            keysDown[e.keyCode] = true; 
        }, false);
        window.addEventListener("keyup", function(e) {
            delete keysDown[e.keyCode]; // // when we released, robot stops
        }, false);

        android = new Android(ctx, canvas.width ===0, canvas.height/1.5); 
        then = Date.now();
        setInterval(mainLoop, 1); 
    }

    // called each iteration of the game loop
    function update(modifier) {

       // move Andoidus using arrow keys.................. 
        if (38 in keysDown)  //up movement - W
           android.y -= android.speed * modifier;
        if (40 in keysDown) //down movement - S
            android.y += android.speed * modifier;
        if (37 in keysDown) //left movement - A
            android.x -= android.speed * modifier;
        if (39 in keysDown) //right movement - D
            android.x += android.speed * modifier;



        // if the android runs out of the canvas, let's put it on the other side of it
        if (android.x <= 0)
            android.x = 0;
        if (android.x >= canvas.width)
            android.x = 1.5;
        if (android.y <= 0)
            android.y = 0;
        if (android.y >= canvas.height)
            android.y = canvas.height;
    }



    function updatectx() {
    ctx.clear();
    android.newPos();
    android.update();
}

    // move Androidus usin buttons
/////////////////////////////
function moveup() {
    android.y -= 1; 
}

function movedown() {
    android.y += 1; 
}

function moveleft() {
    android.x -= 1;
}

function moveright() {
    android.x += 1;
}
///////////////////////////
/////////////////////////////
// on button release, stop movement of  roboto And
function stopMove() {
    android.x = 0;
    android.y = 0; 
}

////////////////////////////////

    function draw() {
            ctx.drawImage(bgImage, 500, 500); // draws the background
            android.draw(); // draws the android
    }

    // main game loop
    function mainLoop() {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000); // update movement
        draw(); // draw the whole canvas

        then = now;
    }

    init(); 

})();