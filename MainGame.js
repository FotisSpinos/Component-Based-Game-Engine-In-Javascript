var circleCollider2;
var circleCollider1;

function startScene()
{
    var second = new GameObject('atempt2', new Vector2D(50, 40), new Vector2D(20, 20));
    var first = new GameObject('atempt', new Vector2D(50, 45), new Vector2D(20, 25));
    var objCollection = [first, second];

    second.addComponent(new SquareShape());
    first.addComponent(new SquareShape());

    var canvas = new Canvas('canvas id', new Vector2D(200, 200), objCollection);
    var canvasCollection = [canvas];

    var scene = new Scene('First scene', canvasCollection);

    second.removeComponentOfType(SquareShape);
    first.removeComponentOfType(SquareShape);

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
    var scene = SceneManager.runningScene;
    scene.clearCanvaces();
    scene.update();
    requestAnimationFrame(gameLoop);
}

start();