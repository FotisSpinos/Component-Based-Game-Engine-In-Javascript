class Engine
{
    static instance;

    constructor()
    {
        Engine.instance = this;
        this.running = true;

        this.inpt = new Input();
        this.sceneManager = new SceneManager();
        this.audioManager = new AudioManager();
        this.window = new Window();
        
        this.previousScene;

        this.timestep = 0;
        this.lastFrameTime = 0;
        this.maxFps = 0;
        this.deltaTime = 0;
    }

    initDefaultFramerate = function()
    {
        this.timestep = 1000 / 60;
        this.lastFrameTime = 0;
        this.maxFps = 10;
    }
    
    run = function(timestamp)
    {
        let engine = Engine.instance;
        var scene = SceneManager.instance.runningScene;
        if(scene != engine.previousScene && engine.previousScene != null)
        {
            scene.onLoad();
            engine.previousScene.onExit();
            engine.previousScene.clearCanvaces();
            
            //engine.inpt.resetCursorInputs()
            GameMaster.getInstance().update();
        }

        engine.deltaTime = (Date.now() - engine.lastFrameTime) / 1000;
        engine.lastFrameTime = Date.now();

        if(scene != null)
        {
            scene.clearCanvaces();
            engine.inpt.updateAxis();
            scene.update();
            scene.render();
            engine.inpt.resetCursorInputs();
        }
        
        engine.previousScene = scene;
        requestAnimationFrame(engine.run);
    }
}