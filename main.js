var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

var main_state = {

    preload: function() { 
        this.game.stage.backgroundColor = '#072a54';
        this.game.load.image('cover', 'assets/cover.png');
        this.game.load.image('bird', 'assets/jong-superman-final.png');
        this.game.load.image('star-cross', 'assets/star-cross.png');
        this.game.load.image('star-dot', 'assets/star-dot.png');  
        this.game.load.image('star-clover', 'assets/star-clover.png');
        this.game.load.image('star-circle', 'assets/star-circle.png');
        this.game.load.image('pipe', 'assets/shit.png');      
        this.game.load.audio('jump', 'assets/puke.wav');

    },

    create: function() { 
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 

        this.star_cross = game.add.group();
        this.star_cross.createMultiple(20, 'star-cross');

        this.star_clovers = game.add.group();
        this.star_clovers.createMultiple(20, 'star-clover');

        this.star_dots = game.add.group();
        this.star_dots.createMultiple(20, 'star-dot');

        this.star_circles = game.add.group();
        this.star_circles.createMultiple(20, 'star-circle');


        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');  
        // this.makeShit();

        
        
        this.bird = this.game.add.sprite(70, 245, 'bird');
        this.cover = this.game.add.sprite(0, 10, 'cover');
        // this.bird.body.gravity.y = 1000; 
        
        this.initial_click = false;
        this.count = 0;
        this.score = 0;


        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style);
        this.bird.anchor.setTo(-0.2,0.5);

        //add the sound
        this.jump_sound = this.game.add.audio('jump');  

        this.makeStars();
    },

    update: function() {

        
        if (this.bird.inWorld == false)
            this.restart_game(); 

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
        // if (this.bird.angle < 20)  
        //     this.bird.angle += 1;
        
        if (this.initial_click == true){
            this.bird.body.gravity.y = 1000;
            this.cover.body.gravity.y = 2000;
            if(this.count == 0){
                var loopTimer = 500;
                this.makeShit(loopTimer);
                this.count++;
            }
            
        }


        
    },

    makeShit: function(loopTimer) {
        // if(this.count == 0 && this.initial_click == true)        
        this.timer = this.game.time.events.loop(loopTimer, this.add_one_pipe, this);
    },

    makeStars: function() {
        this.star_crossTimer = this.game.time.events.loop(1500, this.add_star_cross, this);
        this.star_dotTimer = this.game.time.events.loop(1200, this.add_star_dot, this);
        this.star_cloverTimer = this.game.time.events.loop(1700, this.add_star_clover, this);
        this.star_circleTimer = this.game.time.events.loop(1300, this.add_star_circle, this);
    },

    jump: function() {

        if (this.bird.alive == false)  
            return; 

        this.initial_click = true;
        this.bird.body.velocity.y = -350;
        // this.game.add.tween(this.bird).to({angle: -20}, 100).start();  
        this.jump_sound.play(); 
    },

    hit_pipe: function() {  
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);
        this.game.time.events.remove(this.star_crossTimer);
        this.game.time.events.remove(this.star_dotTimer);
        this.game.time.events.remove(this.star_cloverTimer);
        this.game.time.events.remove(this.star_circleTimer);


        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.star_cross.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.star_dots.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.star_clovers.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.star_circles.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);





    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },

    add_star_cross: function() {
        // var x = Math.floor(Math.random()*30)+1;
        var x = 400;
        var y = Math.floor(Math.random() * (400 - 0 + 1)) + 50;
        var starCross = this.star_cross.getFirstDead();
        starCross.reset(x, y);
        starCross.body.velocity.x = -300; 
        starCross.outOfBoundsKill = true;
    },

    add_star_dot: function() {
        // var x = Math.floor(Math.random()*30)+1;
        var x = 400;
        var y = Math.floor(Math.random() * (400 - 0 + 1)) + 50;
        var starDot = this.star_dots.getFirstDead();
        starDot.reset(x, y);
        starDot.body.velocity.x = -500; 
        starDot.outOfBoundsKill = true;
    },

    add_star_clover: function() {
        // var x = Math.floor(Math.random()*30)+1;
        var x = 400;
        var y = Math.floor(Math.random() * (400 - 0 + 1)) + 50;
        var starClover = this.star_clovers.getFirstDead();
        starClover.reset(x, y);
        starClover.body.velocity.x = -250; 
        starClover.outOfBoundsKill = true;
    },

    add_star_circle: function() {
        // var x = Math.floor(Math.random()*30)+1;
        var x = 400;
        var y = Math.floor(Math.random() * (400 - 0 + 1)) + 50;
        var starCircle = this.star_circles.getFirstDead();
        starCircle.reset(x, y);
        starCircle.body.velocity.x = -200; 
        starCircle.outOfBoundsKill = true;
    },

    add_one_pipe: function() {
        var x = 400;
        var y = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
        this.score += 1;
        this.label_score.content = this.score;  
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        this.add_clouds();
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.add_one_pipe(400, i*60+10);   
        
        this.score += 1;
        

        this.label_score.content = this.score;  
    },
};

game.state.add('main', main_state);  
game.state.start('main'); 