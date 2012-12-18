var asset;
var Graphics = createjs.Graphics;
var Shape = createjs.Shape;
var socket = io.connect('http://localhost');

function init(){
	console.log("Loading resource");
	manifest =	[
					{src:"./resource/SpriteSheet/player.png", id:"spritePlayer"}
				];
	preload = new createjs.PreloadJS();
    preload.onComplete = GameStart;
    preload.loadManifest(manifest);
    //preload.onFileLoad = handleFileLoad;
    //preload.onProgress = handleProgress;
}

function GameStart(event){
	asset = {};
    _.each(event.target._loadedItemsById,function(data){ asset[data.id] = data.result; })
    console.log('Load Resource Complete',asset);

    Engine.init();

    socket.on('connect', function () {

        socket.emit('GetWall',function(data){
            console.log('Receive wall',data)
            _.each(data,function(wall){
                Engine.addSprite(new Wall(wall.x,wall.y,wall.shape))
            })
            Engine.addSprite(new Player(10,10,50,50))
        })

    });

    socket.on('disconnect',function(){
        document.location.reload(true)
    });

}

var Player = function(x,y,width,height){

    //Physic Body
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set( (x+(width/2))/SCALE , (y+(height/2))/SCALE );
    var body = box2Dworld.CreateBody(bodyDef);
    body.SetSleepingAllowed(false);
    body.SetFixedRotation(true);
    body.SetUserData('Player');

    var fixBody = new b2FixtureDef;
    fixBody.density = 1;
    fixBody.shape = new b2CircleShape(0.5);
    body.CreateFixture(fixBody);

    var s = new Shape();

    this.getDisplayObject = function(){
        return s;
    }
    var i = 1;
    s.onTick = function(){
        
        if( Keyboard['up'] )
            body.SetLinearVelocity(new b2Vec2(0,-3))
        else if( Keyboard['down'] )
            body.SetLinearVelocity(new b2Vec2(0,3))
        else if( Keyboard['left'] )
            body.SetLinearVelocity(new b2Vec2(-3,0))
        else if( Keyboard['right'] )
            body.SetLinearVelocity(new b2Vec2(3,0))
        else
            body.SetLinearVelocity(new b2Vec2(0,0))

        var A = body.GetWorldCenter();
        var Ax = A.x*SCALE;
        var Ay = A.y*SCALE;

        var ca = Mouse.x - Ax;
        var db = Mouse.y - Ay;

        var theta = Math.atan2(-(db),ca);
        if (theta < 0)
            theta += 2 * Math.PI;

        var angle = theta*180 / Math.PI;
        body.SetAngle(-theta);
        
    }

}

var Wall = function(x,y,shape){

    var vertices = new Array();

    for(i=0;i<shape.length;i++){
        vertices[i] = new b2Vec2(shape[i].x/SCALE,shape[i].y/SCALE)
    }
    //Physic Body
    //bodyDef.type = b2Body.b2_staticBody;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.Set( x/SCALE , y/SCALE );
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsArray(vertices, shape.length);
    var box2D = box2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
    var body = box2D.GetBody();
    body.SetUserData('Wall');

    var s = new Shape();
    this.getDisplayObject = function(){
        return s;
    }


}