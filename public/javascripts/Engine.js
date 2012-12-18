var Keyboard = {
    'up':false,
    'down':false,
    'left':false,
    'right':false
};
var Mouse = {
    x : 0,
    y : 0,
    0 : false,
    2 : false
}

var showFps = true;
var canvasId = 'gameArea';

var Engine = new function(){
    var canvas;
    var ctx;
    var stage;

    this.init = function() {
        canvas = document.getElementById(canvasId);
        ctx = canvas.getContext('2d');

        if( showFps ){
            stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.body.appendChild( stats.domElement );
        }

        stage = new createjs.Stage(canvas);
        stage.autoClear = false;
        createjs.Ticker.addListener(this);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);

        resizeGame();
        $(window).resize(resizeGame);
        configInput();
    }
    this.addSprite = function(sprite){
        stage.addChild(sprite.getDisplayObject());
    }

    function configInput(){
        _.each( _.keys(Keyboard) ,function(key){
            Mousetrap.bind(key, function(e){
                Keyboard[key] = true;
            },'keydown');
            Mousetrap.bind(key, function(e){
                Keyboard[key] = false;
            },'keyup');
        })
        stage.onMouseDown = function(mouseEvent) {
            Mouse[mouseEvent.nativeEvent.button] = true;

            this.onMouseMove = function(mouseEvent) {
                Mouse.x = mouseEvent.stageX;
                Mouse.y = mouseEvent.stageY;
            }
            this.onMouseUp = function(mouseEvent){
                Mouse[mouseEvent.nativeEvent.button] = false;
            }
        }
    }

    function resizeGame() {
        var widthToHeight = 16 / 9;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;
        
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            canvas.style.height = newHeight + 'px';
            canvas.style.width = newWidth + 'px';
        } else {
            newHeight = newWidth / widthToHeight;
            canvas.style.width = newWidth + 'px';
            canvas.style.height = newHeight + 'px';
        }
        
        canvas.style.marginTop = (-newHeight / 2) + 'px';
        canvas.style.marginLeft = (-newWidth / 2) + 'px';
    }
    this.getCanvas = function(){
        return canvas;
    }

    this.tick = function() {
        if(showFps) stats.begin();
        stage.clear();
        Box2dUpdate();
        stage.update();
        if(showFps) stats.end();
    }

}


function RADIANS_TO_DEGREES( radians ){
    return (radians * 180) / Math.PI;
}