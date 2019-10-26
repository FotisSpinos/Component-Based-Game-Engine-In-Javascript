let engine;

function loadEditor()
{
    let obj1 = new GameObject('sprite', new Vector2D(0, 0), new Vector2D(100, 100));

    let imgaeTest = new EngineImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSphPSyBMHiZh2MEb5dMPDyt0ZOsLx3YlWAw7j_aw6pvDdG5OYJ', 'name');
    let spriteTest = new Sprite(imgaeTest, new Vector2D(0, 0), new Vector2D(80, 80), new Vector2D(10.2, 10.2), 1.2, 
    80, [70, 70, 70]);

    obj1.addComponent(spriteTest);
    //obj1.removeComponent(EngineImage);

    goArray = [obj1];

    var canvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), goArray);
    var canvasArray = [canvas];
    
    var mainScene = new Scene('Main Scene', canvasArray);

    engine.sceneManager.addScene(mainScene);
    engine.sceneManager.loadScene(mainScene.name);
}

engine = new Engine();
loadEditor();
engine.initDefaultFramerate();
requestAnimationFrame(Engine.instance.run);

function gameLoop(timestamp)
{
    var scene = SceneManager.runningScene;

    engine.deltaTime = (Date.now() - engine.lastFrameTime) / 1000;
    engine.lastFrameTime = Date.now();

    if(scene != null)
    {
        scene.clearCanvaces();
        scene.update();
        scene.render();
    }

    requestAnimationFrame(gameLoop);
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