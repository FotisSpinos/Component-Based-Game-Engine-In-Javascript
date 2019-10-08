var circleCollider2;
var circleCollider1;

var counter = 0;
var second;

function startScene()
{
    second = new GameObject('atempt2', new Vector2D(80, 40), new Vector2D(20, 20));
    var first = new GameObject('atempt', new Vector2D(50, 45), new Vector2D(20, 25));
    var objCollection = [first, second];

    second.addComponent(new SquareShape());
    first.addComponent(new SquareShape());

    var canvas = new Canvas('canvas id', new Vector2D(200, 200), objCollection);
    var canvasCollection = [canvas];

    var scene = new Scene('First scene', canvasCollection);

    second.removeComponent(SquareShape);
    second.addComponent(new SquareShape());
    second.getComponent(Transform).print();

    
    var cc = new CircleCollider(second.transform.pos, 20.0);
    second.addComponent(cc);

    var sceneManager = new SceneManager();
    sceneManager.addScene(scene);
    sceneManager.loadScene(scene.name);
}

function start() 
{
    startScene();
    gameLoop();
}

function gameLoop()
{
    counter++;
    second.transform.pos = second.transform.pos.addVec(new Vector2D(counter * 0.01, 0.0));

    var scene = SceneManager.runningScene;
    scene.clearCanvaces();
    scene.update();
    requestAnimationFrame(gameLoop);
}

start();