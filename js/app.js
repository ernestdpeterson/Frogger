// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

Object.prototype.reset = function(){
    player.x = 300;
    player.y = 400;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 750){
        this.x += this.speed * dt;
    }
    else{
        this.x = -2;
    }

    if(player.x >= this.x -30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var cn = [0, 100, 200, 300, 400, 500, 600];
var rn = [60, 140, 220, 300];
var cNum;
var cnr;
var rNum;
var rnr;

function randFunc(){
    cNum = Math.round(Math.random() * 10);
    rNum = Math.round(Math.random() * 10);
    if(cNum <= 6){
        cnr = cNum;
    }
    else{
        cnr = cNum - 4;
    }
    if(rNum <= 3){
        rnr = rNum;
    }
    else if(rNum > 3 && rNum <= 6){
        rnr = rNum - 3;
    }
    else{
        rnr = rNum - 7;
    }

};

randFunc();

console.log('cnr is:  ' + cnr + '  rnr is:  ' + rnr + '  cNum is:  ' + cNum);

var Gem = function(){
    this.sprite = 'images/Gem Blue.png';
    this.x = cn[cnr];
    this.y = rn[rnr];
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-horn-girl.png';
    this.x = 300;
    this.y = 400;
};

Player.prototype.update = function(){
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x -100;
    }
    else if(this.ctlKey === 'right' && this.x != 600){
        this.x = this.x + 100;
    }
    else if(this.ctlKey === 'up'){
        this.y = this.y - 90;
    }
    else if(this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 90;
    }
    this.ctlKey =null;

    //Goal
    if(this.y < 25){
        this.reset();
    }
    //Gem
    if(this.x >= cn[cnr] -30 && this.x <= cn[cnr] + 30){
        if(this.y >= rn[rnr] - 30 && this.y <= rn[rnr] + 30){
            this.reset();
            gem.x = 0;
            gem.y = 60;
        }
    }
};

// Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 140));
    allEnemies.push(new Enemy(-2, 220));
    allEnemies.push(new Enemy(-2, 300));
}());

var player = new Player();
var gem = new Gem();

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
