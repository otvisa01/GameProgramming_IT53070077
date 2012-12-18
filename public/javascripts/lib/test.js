var canvas = document.getElementById("gameArea");

var bodyDef = new b2BodyDef;
var fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.5;
fixDef.restitution = 0.2;

var bodyDef = new b2BodyDef;

//create ground
bodyDef.type = b2Body.b2_staticBody;

// positions the center of the object (not upper left!)
bodyDef.position.x = canvas.width / 2 / SCALE;
bodyDef.position.y = (canvas.height / SCALE) - 1;

fixDef.shape = new b2PolygonShape;

// half width, half height.
fixDef.shape.SetAsBox((canvas.width / SCALE) / 2, 0.5 / 2);

var body = box2Dworld.CreateBody(bodyDef);
body.CreateFixture(fixDef);

bodyDef.type = b2Body.b2_dynamicBody;
fixDef.shape = new b2CircleShape(
   Math.random() + 0.1 //radius
);
bodyDef.position.x = 0.1
bodyDef.position.y = 3;
box2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);