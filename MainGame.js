
function loadEditor()
{
    // Define Player Game Object
    var playerPos = new Vector2D(0, 0);
    var playerSize = new Vector2D(180 , 1);

    playerPos.y = window.innerHeight - playerSize.y - 20;
    playerPos.x = window.innerWidth / 2 - playerSize.x / 2;

    var playerGameObject = new GameObject('Player', playerPos, playerSize);

    // Add Components to player GO
    playerGameObject.addComponent(new SquareShape());


    var ballPos = new Vector2D(playerGameObject.transform.pos.x + playerGameObject.transform.scale.x / 2, 
        playerGameObject.transform.pos.y - 20);
        
    var ballGO = new GameObject('ball', ballPos, new Vector2D(20, 20));
    ballGO.addComponent(new CircleShape());


    // Define Objects to draw in the scene
    var mainCanvasObjs = [playerGameObject, ballGO];

    //Create Canvaces
    var mainCanvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), mainCanvasObjs);
    var canvasCollection = [mainCanvas];

    // Create and load Scene
    var mainScene = new Scene('Main Scene', canvasCollection);
    var sceneManager = new SceneManager();
    sceneManager.addScene(mainScene);
    sceneManager.loadScene(mainScene.name);

}

function start() 
{
    loadEditor();
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

//-------------TEST SCENE-------------------
/*
second = new GameObject('atempt2', new Vector2D(80, 40), new Vector2D(20, 20));
    var first = new GameObject('atempt', new Vector2D(50, 45), new Vector2D(20, 25));
    var objCollection = [first, second];

    second.addComponent(new SquareShape());
    first.addComponent(new SquareShape());

    var canvas = new Canvas('canvasid', new Vector2D(200, 200), objCollection);
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
*/