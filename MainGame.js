//*     PRIMARY
//TODO introduce health bar
//TODO fix bug with button
//TODO fix bug with undefined score

let engine;

function playerInteractionScene()
{
    let interactionCheckerGO = new GameObject('interactionChecker', new Vector2D(0, 0),  new Vector2D(0, 0));
    let interactionChecker = new InteractionChecker();

    interactionCheckerGO.addComponent(interactionChecker);

    let interactionCanvas = new Canvas('Interaction Canvas', new Vector2D(1578, 969), []);
    let canvasArray = [interactionCanvas];

    let interactionScene = new Scene('interaction Scene', canvasArray);
    engine.sceneManager.addScene(interactionScene);

    interactionCanvas.addDrawObj(interactionCheckerGO);

    Engine.instance.sceneManager.loadScene(interactionScene.name);

    //* Create Background
    let backgroundGO = new GameObject('interactionChecker', new Vector2D(0, 0),  new Vector2D(1578, 969));
    let background = new EngineImage("InteractionBackgroundImage.png", 'background');

    backgroundGO.addComponent(background);
    

    //* Create score text
    let scoreGO = new GameObject('Click Screen Text', new Vector2D(1578 / 2 - 300, 969 - 300), new Vector2D(200, 200));
    let scoreText = new EngineText("Click Screen To Play The Game");
    scoreText.font = "40px Comic Sans MS";

    scoreGO.addComponent(scoreText);


    interactionCanvas.addDrawObj(backgroundGO);
    interactionCanvas.addDrawObj(scoreGO);
}

function openningScene()
{
    let openningCanvas = new Canvas('Openning Canvas', new Vector2D(1578, 969), []);
    let canvasArray = [openningCanvas];

    var openningScene = new Scene('Openning Scene', canvasArray);
    engine.sceneManager.addScene(openningScene);

/************************************************************************************************************************/
    // * start scene init
    let sti = new StartSceneInit();
    let stiGO = new GameObject('iniy', new Vector2D(0, 0),  new Vector2D(0, 0)); 

    stiGO.addComponent(sti);

/************************************************************************************************************************/
    // * Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), 
    openningCanvas.size);

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
        AudioManager.instance.playAudio("ButtonClick.wav");
        Engine.instance.sceneManager.loadScene("Main Scene");
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
    openningCanvas.addDrawObj(stiGO);
}

function mainGameScene()
{
    var mainGameCanvas = new Canvas('Gameplay Canvas', new Vector2D(1578, 969), []);
    var canvasArray = [mainGameCanvas];
    
    var mainScene = new Scene('Main Scene', canvasArray);
    engine.sceneManager.addScene(mainScene);

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
    //* Create Load Next Scene Trigger
    let nextSceneTriggerGO = new GameObject('end scene trigger', new Vector2D(1500, 633), new Vector2D(180, 180));
    let nextSceneTriggerCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(130, 160));
    let endSceenTrigger = new EndSceenTrigger('End Scene');

    nextSceneTriggerGO.addComponent(nextSceneTriggerCollider);
    nextSceneTriggerGO.addComponent(endSceenTrigger);

/************************************************************************************************************************/

    // * create scene initialization 
    let sceenInit = new MainSceneInit();
    let sceneInitGo = new GameObject('init', new Vector2D(0, 0), mainGameCanvas.size);
    sceneInitGo.addComponent(sceenInit);

/************************************************************************************************************************/

    //* Add GO's to canvas
    mainGameCanvas.addDrawObj(backgroundGO);
    mainGameCanvas.addDrawObj(nextSceneTriggerGO)
    mainGameCanvas.addDrawObj(sceneInitGo);

/************************************************************************************************************************/
    //* Create Axis
    let playerMovement = new Axis('Horizontal', 68, 65, 0.3, 0.2);
}

function endScene()
{
    let endSceneCanvas = new Canvas('Ending Canvas', new Vector2D(1578, 969), []);
    let canvasArray = [endSceneCanvas];

    var endScene = new Scene('End Scene', canvasArray);
    engine.sceneManager.addScene(endScene);

/************************************************************************************************************************/
    // * create scene initialization 
    let sceenInit = new EndSceneInit();
    let sceneInitGo = new GameObject('init', new Vector2D(0, 0), new Vector2D(0, 0));
    sceneInitGo.addComponent(sceenInit);

    // * Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), endSceneCanvas.size);
    let backgroundImg = new EngineImage('End Scene Background (2).png', 'test');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(13500  / 27, 475), new Vector2D(0, 0), 0.1, 0, [26]);
    backgroundSprite.name = 'backgroundSprite';

    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');

    //* Create score text
    let scoreGO = new GameObject('scoreText', new Vector2D(1200, 80), new Vector2D(200, 200));
    let scoreText = new EngineText("Score: ");

    scoreGO.addComponent(scoreText);

    //* play background audio
    AudioManager.instance.playAudio("end scene background song");


    // *Create play game button
    let playMainGameGO = new GameObject('main game button game object', new Vector2D(110, 50), new Vector2D(210, 100));
    let playMainGameBtn = new Button(new EngineImage("Play_Button.png", 'play game button'), function() {
        AudioManager.instance.playAudio("ButtonClick.wav");
        Engine.instance.sceneManager.loadScene("Openning Scene");
    });
        

    //Engine.instance.sceneManager.loadScene(endScene.name);

    backgroundGO.addComponent(backgroundAC);
    playMainGameGO.addComponent(playMainGameBtn);

    endSceneCanvas.addDrawObj(backgroundGO);
    endSceneCanvas.addDrawObj(playMainGameGO);
    endSceneCanvas.addDrawObj(scoreGO);

    endSceneCanvas.addDrawObj(sceneInitGo);
}


engine = new Engine();

//* Add sounds
AudioManager.instance.addAudio(new EngineAudio("background", "Castlevania Symphony of the Night OST Metamorphosis I.mp3", true));
AudioManager.instance.addAudio(new EngineAudio("fireBall sound", "fireballSpawn.wav", false));
AudioManager.instance.addAudio(new EngineAudio("ButtonClick.wav", "ButtonClick.wav", false));
AudioManager.instance.addAudio(new EngineAudio("ghost attack", "Ghost Attack Sound.wav", false));
AudioManager.instance.addAudio(new EngineAudio("main game background song", "Necropolis - Heroes of Might and Magic IV (4) OST.mp3", true));
AudioManager.instance.addAudio(new EngineAudio("end scene background song", "Castlevania SOTN Lost Painting.mp3", true));


let win = new Window();

Engine.instance.sceneManager.loadScene('Openning Scene');

playerInteractionScene();
openningScene();
mainGameScene();
endScene();
engine.initDefaultFramerate();
requestAnimationFrame(Engine.instance.run);

//TODO culc mouse position once the window changes
//TODO hardcode the background size to your window size so that the window can adjust to different resolitions 


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
//* https://giphy.com/gifs/animated-pixel-art-pixels-Qz5OFEwPwRprq
//* https://ezgif.com/gif-to-apng/ezgif-6-d874d2743f14.gif
//* https://brullov-studios.itch.io/2d-platformer-asset-pack-castle-of-despair
//* https://i.imgur.com/y5aghDE.gif

//* https://www.w3schools.com/graphics/canvas_text.asp
//* https://freesound.org/people/annabloom/sounds/219069/
//* https://www.youtube.com/watch?v=EjVoUFrdYFQ
//* https://freesound.org/people/STAudio/sounds/490515/
//* https://www.youtube.com/watch?v=Mt2paelUYwo
//* https://www.youtube.com/watch?v=YhIf_zV6yK0
//* https://66.media.tumblr.com/f3ed75dbaa538fa583ad99dde36b1408/tumblr_n4w85syp811s559q7o8_500.gifv

//* https://www.youtube.com/watch?v=IYwS6481oQk
//* https://itch.io/t/246178/wip-2d-platformer-asset-pack-medieval-castle
    /*


https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjTpoOW_77lAhW3AmMBHYQKDDwQjRx6BAgBEAQ&url=https%3A%2F%2Ftoppng.com%2Fphoto%2F196911%2Fskeleton-sprite-sheet&psig=AOvVaw2uX7B4Su1OtvDFk1YGjlkh&ust=1572353432010128
https://i7.pngguru.com/preview/338/571/673/heroes-of-might-and-magic-iii-playstation-sprite-super-nintendo-entertainment-system-skeleton.jpg 


https://media.giphy.com/media/jiNXp69XoO4tq/giphy.gif

*/