class Engine
{
    static instance;

    constructor()
    {
        if(Engine.instance == null )
            Engine.instance = this;

        this.running = true;

        this.inpt = new Input();
        this.sceneManager = new SceneManager();
        this.audioManager = new AudioManager();
        this.window = new Window();
        
        this.previousScene;

        this.lastFrameTime = 0;
        this.deltaTime = 0;
    }

    getInstance()
    {
        if(Engine.instance == null)
            Engine.instance = new Engine();
        
        return Engine.instance;
    }
    
    //* The game loop
    run = function(timestamp)
    {
        let engine = Engine.instance;
        var scene = SceneManager.instance.runningScene;
        
        //* Culculate delta time
        engine.deltaTime = (Date.now() - engine.lastFrameTime) / 1000;
        engine.lastFrameTime = Date.now();

        if(scene != engine.previousScene && engine.previousScene != null)
        {
            scene.onLoad();
            engine.previousScene.onExit();
            engine.previousScene.clearCanvaces();
            GameMaster.getInstance().update();
        }

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