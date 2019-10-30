let engine;

// TASKS FOR NEXT TIME
// Create new compoennt: animation controller
// remove component inheritane from sprite class
// animation controller: will store sprite animations
// -add Sprite animations
// -play sprite animation (and disable all the other sprite animations)
// -remove sprite animation

function loadEditor()
{
    var canvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), []);
    var canvas2 = new Canvas('Gameplay Canvas2', new Vector2D(window.innerWidth / 2, window.innerHeight), []);
    var canvasArray = [canvas, canvas2];
    
    var mainScene = new Scene('Main Scene', canvasArray);
    engine.sceneManager.addScene(mainScene);
    engine.sceneManager.loadScene(mainScene.name);
    
/************************************************************************************************************************/

    // Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), canvas.size);
    let backgroundImg = new EngineImage('BackgroundSprite.png', 'test');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(1968/3, 752/2), new Vector2D(0, 0), 0.1, 1, [1, 0]);
    backgroundSprite.name = 'backgroundSprite';

    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');

    backgroundGO.addComponent(backgroundAC);

/************************************************************************************************************************/

    // Create Character
    let player = new GameObject('player', new Vector2D(30, 625), new Vector2D(200, 200)); 
    let ps = new PlayerScript();
    player.addComponent(ps);

/************************************************************************************************************************/

    //Create Skeleton
    let skeleton = new GameObject('skeleton', new Vector2D(60, 625), new Vector2D(200, 200)); 
    let ss = new SkeletonScript();
    skeleton.addComponent(ss);

/************************************************************************************************************************/

    // Add GO's to canvas
    canvas.addDrawObj(backgroundGO);
    canvas.addDrawObj(skeleton);
    canvas.addDrawObj(player);

/************************************************************************************************************************/
    //Create Axis
    let playerMovement = new Axis('Horizontal', 68, 65, 0.3, 0.2);
}

engine = new Engine();
loadEditor();
engine.initDefaultFramerate();
requestAnimationFrame(Engine.instance.run);


//https://img.itch.zone/aW1nLzEzMTI4NDYuZ2lm/original/figmQY.gif
    /*


    let obj1 = new GameObject('sprite', new Vector2D(100, 100), new Vector2D(100, 110));
    let obj2 = new GameObject('sprite', new Vector2D(140, 100), new Vector2D(100, 110));

    let imgaeTest = new EngineImage('https://www.spriters-resource.com/download/41806/', 'name');

    //param 1 image source, start position, size, offset, delay timer, y border, x border.
    let spriteTest = new Sprite(imgaeTest, new Vector2D(2, 425), new Vector2D(93, 93), new Vector2D(102, 0), 1, 0, [5]);
    let engineImage = new EngineImage('https://img.itch.zone/aW1nLzEzMTI4NDYuZ2lm/original/figmQY.gif', 'test');
    //spriteTest = spriteTest.createReverseAnim();
    

    obj1.addComponent(spriteTest);
    obj2.addComponent(engineImage);
    //obj1.removeComponent(EngineImage);

    goArray = [obj2, obj1];

    var canvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), goArray);
    var canvasArray = [canvas];
    
    var mainScene = new Scene('Main Scene', canvasArray);

    engine.sceneManager.addScene(mainScene);
    engine.sceneManager.loadScene(mainScene.name);
    */

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

/*

    let deathSprite = new Sprite(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
    new Vector2D(0, 93), new Vector2D(93, 93), new Vector2D(102, 0), 0.1, 1, [10]);

    
            let attackSprite = new Sprite(new EngineImage('https://www.spriters-resource.com/download/41806/', 'name'), 
    new Vector2D(2, 425), new Vector2D(93, 93), new Vector2D(102, 0), 0.1, 1, [6]);

    
    let attackSprite = new Sprite(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
    new Vector2D(0, 636), new Vector2D(93, 93), new Vector2D(108, 0), 0.1, 1, [10]);

https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjTpoOW_77lAhW3AmMBHYQKDDwQjRx6BAgBEAQ&url=https%3A%2F%2Ftoppng.com%2Fphoto%2F196911%2Fskeleton-sprite-sheet&psig=AOvVaw2uX7B4Su1OtvDFk1YGjlkh&ust=1572353432010128
https://i7.pngguru.com/preview/338/571/673/heroes-of-might-and-magic-iii-playstation-sprite-super-nintendo-entertainment-system-skeleton.jpg 


https://media.giphy.com/media/jiNXp69XoO4tq/giphy.gif

*/