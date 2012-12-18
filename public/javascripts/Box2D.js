var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var debug = true;
var SCALE = 30; // 30 pixels to 1 meter
var box2Dworld;

box2Dworld = new b2World(
		      new b2Vec2(0, 0)    // gravity vector
		   ,  true                 // allow sleeping bodies
		);

if(debug){
	//setup debug draw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("gameArea").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	box2Dworld.SetDebugDraw(debugDraw);
}

function Box2dUpdate() {   
	box2Dworld.Step(
	     1 / 60   //frame-rate
	  ,  10       //velocity iterations
	  ,  10       //position iterations
	);
	box2Dworld.DrawDebugData();
	box2Dworld.ClearForces();
}; // update()

var bodyDef = new b2BodyDef;
var fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.5;
fixDef.restitution = 0.2;

var bodyDef = new b2BodyDef;