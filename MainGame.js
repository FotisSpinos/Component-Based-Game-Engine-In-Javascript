let inpt = new Input();
let axis = new Axis('test1', 68, 65, 0.2);

let framerate = 10;
let lastFrameTime = 0;

function loadEditor()
{
    let obj1 = new GameObject('box1', new Vector2D(20.0, 20.0), new Vector2D(50.0, 50.0));
    obj1.addComponent(new SquareShape(0));
    obj1.addComponent(new SquareCollider(new Vector2D(0, 0), new Vector2D(50.0, 50.0)));

    let obj2 = new GameObject('box2', new Vector2D(69.0, 20.0), new Vector2D(50.0, 50.0));
    obj2.addComponent(new SquareShape(0));
    obj2.addComponent(new SquareCollider(new Vector2D(0, 0), new Vector2D(50.0, 50.0)));

    goArray = [obj1, obj2];

    var canvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), goArray);
    var canvasArray = [canvas];
    
    var mainScene = new Scene('Main Scene', canvasArray);
    var sceneManager = new SceneManager();
    sceneManager.addScene(mainScene);
    sceneManager.loadScene(mainScene.name);
}

function start() 
{
    loadEditor();
    gameLoop();
}

function gameLoop(timestamp)
{
    var scene = SceneManager.runningScene;

    if(scene != null)
    {
        scene.clearCanvaces();
        scene.update();
        scene.render();
        
        lastFrameTime = timestamp;
    }

    requestAnimationFrame(gameLoop);
}

window.onload =() =>
{
    start();
}

/*
    // Define Player Game Object
    var playerPos = new Vector2D(0, 0);
    var playerSize = new Vector2D(180 , 15);

    playerPos.y = window.innerHeight - playerSize.y - 20;
    playerPos.x = window.innerWidth / 2 - playerSize.x / 2;

    var playerGameObject = new GameObject('Player', playerPos, playerSize);

    // Add Components to player GO
    playerGameObject.addComponent(new SquareShape());

    var ballPos = new Vector2D(playerGameObject.transform.pos.x + playerGameObject.transform.scale.x / 2, 
        playerGameObject.transform.pos.y - 20);
        
    var ballGO = new GameObject('ball', ballPos, new Vector2D(20, 20));
    ballGO.addComponent(new CircleShape());

    var img = new GameObject('image attempt', new Vector2D(20, 20), new Vector2D(20, 20))
    var image = new Image("http://www.google.com/intl/en_com/images/logo_plain.png", 'Google')
    img.addComponent(image);

    var firstMotion = new MotionObject(new Vector2D(0, 0), 6.0);
    firstMotion.normalizeDir(new Vector2D(1, 0));
    img.addComponent(firstMotion);
    console.log(firstMotion.dir);

    // Define Objects to draw in the scene
    var mainCanvasObjs = [playerGameObject, ballGO, img];

    //Create Canvaces
    var mainCanvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), mainCanvasObjs);
    var canvasCollection = [mainCanvas];

    // Create and load Scene
    var mainScene = new Scene('Main Scene', canvasCollection);
    var sceneManager = new SceneManager();
    sceneManager.addScene(mainScene);
    sceneManager.loadScene(mainScene.name);
*/