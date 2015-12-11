(function(window, $){

var Game = function () {
    this.init();
    this.start();
};

Game.prototype.init = function () {
    this.level = 1;
    this.speed = 800;
    this.moveTime = 5000;
    this.userSpeed;
    this.score = 0;

    this.canFire = false;
    this.userFailFire = false;

    this.timerId;
    ls.initField('score');

    var highScore = ls.getField('score');
    if (highScore[0]) {
        $('.highscore__info').html(highScore[0].highScore*100);
    }

    this.timePrepeareToFire = function() {
        var min = 1000,
            max = 3000;
        return Math.random() * (max - min) + min ;
    }
};

Game.prototype.start = function () {
    var __self = this;
    $('.menu__a').click(function(){
        $('.game__start').toggleClass('display-none');
        $('.game__man').toggleClass('display-block');
        setTimeout(function(){
            __self.moveMan();
        }, 2000);
    });

};

Game.prototype.moveMan = function() {
    var __self = this;
    console.log('move man!');

    $('.game__status').removeClass('display-block');

    $('.gunman_time').html(((__self.speed) / 1000).toFixed(2));
    setTimeout(function(){
        $('.game__man').toggleClass('going-man');
        $('.game__man').toggleClass('move-man');
    }, 500);



    setTimeout(function(){
        __self.prepeareToFire();
    }, __self.moveTime)
};

Game.prototype.prepeareToFire = function() {
    var __self = this;
    console.log('wait');

    $('.game__man').one("click", function() {
            __self.userFire();
        console.log('click!');

    });

    $('.game__man').toggleClass('going-man');
    $('.game__man').toggleClass('man-position-in-wait');

        setTimeout(function () {
            if (__self.userFailFire == false) {
                __self.startShooting();
            }

        }, __self.timePrepeareToFire());

};

Game.prototype.startShooting = function () {
    console.log('startShooting!');
    $('.game__status').toggleClass('display-block');
    $('.game__status').html("FIRE!");
    this.canFire = true;
    this.manFire();
    this.timer(new Date().getTime());

};

Game.prototype.timer = function (t) {
    var __self = this;
    var tNow;

    function run() {
        tNow = new Date().getTime();

        if ((__self.canFire == true) && (__self.userFailFire == false)) {
                var res = ((tNow - t) / 1000).toFixed(2);

                setTimeout(run, 1);
                __self.userSpeed = res;

                $('.user_time').html(res);
        }
    }
    run();

};

Game.prototype.manFire = function() {
    var __self = this;

        this.timerId = setTimeout(function () {
            console.log('man Fire!');
            __self.gameOver();

        }, __self.speed);

};

Game.prototype.userFire = function() {
    console.log('user fire!');
    var __self = this;
    if (__self.canFire == false) {
        __self.userFailFire = true;
        __self.gameOver();
    }

    else if (__self.canFire == true) {
        clearTimeout(__self.timerId);
        __self.nextLevel();
    }

};

Game.prototype.gameOver = function () {
    this.userFailFire = true;
    this.speed = 800;
    this.level = 1;
    var __self = this;
    $('.game__man').off("click");
    console.log('Game Over!');
    $('.game__status').html("YOU LOSS!");
    $('.game__over-paranja').toggleClass('display-block');

    setTimeout(function(){
        $('.game__status').removeClass('display-block');

        $('.game__start').toggleClass('display-none');
        $('.game__over-paranja').toggleClass('display-block');

        $('.game__man').removeClass('display-block');
        $('.game__man').removeClass('move-man');
        $('.game__man').removeClass('man-position-in-wait');

        $('.user_time').html('0.00');
        $('.gunman_time').html('0.00');
        $('.score__info').html('0000');
        __self.canFire = false;
        __self.userFailFire = false;
        __self.score = 0;

    }, 3000);
};

Game.prototype.nextLevel = function () {
    var __self = this;
    this.canFire = false;
    this.userFailFire = false;
    if (this.level !==7) {
        $('.game__status').html('You won!!');
        __self.highscore();

       setTimeout(function(){

           $('.game__man').off("click");
           $('.game__man').toggleClass('move-man');
           $('.game__man').toggleClass('man-position-in-wait');

           $('.user_time').html('0.00');
           __self.level++;
           console.log('Next Level ' + __self.level);
           __self.speed -= 100;
         __self.moveMan();
       }, 3000);
    }
    else {
        this.won();
    }
};

Game.prototype.highscore = function() {
    var __self = this;


    __self.score += (this.speed - this.userSpeed * 1000)/10;
    console.log(this.score);
    $('.score__info').html(this.score * 100);
    var obj = {
        highScore: __self.score
    };
    ls.addItem(obj, 'score');
    console.log(localStorage.score);

};

Game.prototype.won = function() {
    $('.game__status').html("YOU WON!");
    console.log("Won!");
    $('.score__info').html('0000');
    this.score = 0;

};

var game = new Game();

})(window, jQuery);

