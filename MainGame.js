let engine;

// TASKS FOR NEXT TIME
// Create new compoennt: animation controller
// remove component inheritane from sprite class
// animation controller: will store sprite animations
// -add Sprite animations
// -play sprite animation (and disable all the other sprite animations)
// -remove sprite animation


function openningScene()
{
    let openningCanvas = new Canvas('Openning Canvas', new Vector2D(window.innerWidth, window.innerHeight), []);
    let canvasArray = [openningCanvas];

    var openningScene = new Scene('Openning Scene', canvasArray);
    engine.sceneManager.addScene(openningScene);
    
    //? do we need that
    Engine.instance.sceneManager.loadScene(openningScene.name);

/************************************************************************************************************************/
    // * Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), openningCanvas.size);
    let backgroundImg = new EngineImage('OpenningSceneBackground.png', 'test');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(18432 / 24, 512), new Vector2D(0, 0), 0.1, 0, [23]);
    backgroundSprite.name = 'backgroundSprite';


    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');


    backgroundGO.addComponent(backgroundAC);

  /************************************************************************************************************************/  

    //* Create Button 
    let playMainGameGO = new GameObject('skeleton', new Vector2D(110, 50), new Vector2D(210, 100));
    let playMainGameBtn = new Button(new EngineImage("Play_Button.png", 'play game button'), function() {
        Engine.instance.sceneManager.runningScene.clearCanvaces();
        Engine.instance.sceneManager.loadScene('Main Scene');
        AudioManager.instance.playAudio("ButtonClick.wav");
        AudioManager.instance.stopAudio("background");
    });
    
    playMainGameGO.addComponent(playMainGameBtn);

/************************************************************************************************************************/
    //* Create Instroctions title Text 
    let instructionsGO = new GameObject('instructions title GO', new Vector2D(100, 200), new Vector2D(100, 120));
    let instructionsText = new EngineText('Instructions');

    instructionsGO.addComponent(instructionsText);
    
/************************************************************************************************************************/
    //* Create arrow keys Text Instroctions  
    let instructionsArrowKeysGO = new GameObject('instruction arrow keys GO', new Vector2D(100, 245), new Vector2D(100, 165));
    let instructionsArrowKeysText = new EngineText('Press the arrow keys to move');

    instructionsArrowKeysGO.addComponent(instructionsArrowKeysText);

    /************************************************************************************************************************/
    //* Create attack Text Instroctions 
    let instructionsAttackGO = new GameObject('instruction attack key GO', new Vector2D(100, 290), new Vector2D(100, 210));
    let instructionsAttackText = new EngineText('Press E to attack');

    instructionsAttackGO.addComponent(instructionsAttackText);

/************************************************************************************************************************/
    //* add objs to canvas
    openningCanvas.addDrawObj(backgroundGO)
    openningCanvas.addDrawObj(instructionsGO);
    openningCanvas.addDrawObj(instructionsArrowKeysGO);
    openningCanvas.addDrawObj(instructionsAttackGO);
    openningCanvas.addDrawObj(playMainGameGO);
    //var audioElement = new Audio('Castlevania Symphony of the Night OST Metamorphosis I.mp3');
    //audioElement.play();
}

function mainGameScene()
{
    var mainGameCanvas = new Canvas('Gameplay Canvas', new Vector2D(window.innerWidth, window.innerHeight), []);
    var canvasArray = [mainGameCanvas];
    
    var mainScene = new Scene('Main Scene', canvasArray);
    engine.sceneManager.addScene(mainScene);
    //? engine.sceneManager.loadScene(mainScene.name);
    
/************************************************************************************************************************/

    //* Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), mainGameCanvas.size);
    let backgroundImg = new EngineImage('BackgroundSprite.png', 'test');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(1968/3, 752/2), new Vector2D(0, 0), 0.1, 1, [1, 0]);
    backgroundSprite.name = 'backgroundSprite';

    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');

    backgroundGO.addComponent(backgroundAC);

/************************************************************************************************************************/

    //* Create Character
    let player = new GameObject('player', new Vector2D(30, 625), new Vector2D(200, 200));  
    let playerCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(140, 180)); 
    let ps = new PlayerScript();

    player.addComponent(ps);
    player.addComponent(playerCollider);

/************************************************************************************************************************/

    //* Create Skeleton
    let skeleton = new GameObject('skeleton', new Vector2D(960, 653), new Vector2D(180, 180));
    let skeletonCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(120, 160)); 
    let ss = new SkeletonScript();

    skeleton.addComponent(ss);
    skeleton.addComponent(skeletonCollider);

/************************************************************************************************************************/

    //* Add GO's to canvas
    mainGameCanvas.addDrawObj(backgroundGO);
    mainGameCanvas.addDrawObj(player);
    mainGameCanvas.addDrawObj(skeleton);

/************************************************************************************************************************/
    //* Create Axis
    let playerMovement = new Axis('Horizontal', 68, 65, 0.3, 0.2);
}

function endScene()
{
    let endSceneCanvas = new Canvas('Ending Canvas', new Vector2D(window.innerWidth, window.innerHeight), []);
    let canvasArray = [endSceneCanvas];

    var endScene = new Scene('End Scene', canvasArray);
    engine.sceneManager.addScene(endScene);
    

    // * Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), endSceneCanvas.size);
    let backgroundImg = new EngineImage('OpenningSceneBackground.png', 'test');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(18432 / 24, 512), new Vector2D(0, 0), 0.1, 0, [23]);
    backgroundSprite.name = 'backgroundSprite';


    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');


    backgroundGO.addComponent(backgroundAC);

    endSceneCanvas.addDrawObj(backgroundGO);
}

engine = new Engine();

//! remove later
AudioManager.instance.addAudio("background", new Audio("Castlevania Symphony of the Night OST Metamorphosis I.mp3"));
AudioManager.instance.addAudio("fireBall sound", new Audio("fireballSpawn.wav"));
AudioManager.instance.addAudio("ButtonClick.wav", new Audio("ButtonClick.wav"));
AudioManager.instance.addAudio("ghost attack", new Audio("Ghost Attack Sound.wav"));
AudioManager.instance.playAudio("background");

mainGameScene();
openningScene();
endScene();
engine.initDefaultFramerate();
requestAnimationFrame(Engine.instance.run);


//* https://img.itch.zone/aW1nLzEzMTI4NDYuZ2lm/original/figmQY.gif
//* https://www.spriters-resource.com/resources/sheets/27/29409.png
//* https://myrealdomain.com/explore/fireball-gif-transparent.html
//* https://www.spriters-resource.com/pc_computer/heroes3/sheet/44972/
//* https://www.spriters-resource.com/pc_computer/heroesofmightandmagic2/sheet/29404/
//* https://www.emugifs.net/guilty-gear-xx-reload-arcade-game-animated-background-sprite-stages/
//* https://www.emugifs.net/wp-content/uploads/2018/12/Guilty-Gear-XX-Reload-Arcade-Video-Game-2002-Sammy-Backgrounds-Stages-Testament-Sprites.gif
//* http://static3.wikia.nocookie.net/__cb20121229200354/browserquest/images/9/9f/Play_Button.png
//* https://gfycat.com/vagueearnesthoverfly
//* https://freesound.org/people/Julien%20Matthey/sounds/105016/

//*https://ezgif.com/gif-to-apng/ezgif-6-d874d2743f14.gif

//* https://www.w3schools.com/graphics/canvas_text.asp
//* https://freesound.org/people/annabloom/sounds/219069/
//* https://www.youtube.com/watch?v=EjVoUFrdYFQ
//* https://freesound.org/people/STAudio/sounds/490515/

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