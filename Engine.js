class Engine
{
    static instance;

    constructor()
    {
        Engine.instance = this;
        this.running = true;

        this.inpt = new Input();
        this.sceneManager = new SceneManager();
        
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
            engine.previousScene.clearCanvaces();

        engine.deltaTime = (Date.now() - engine.lastFrameTime) / 1000;
        engine.lastFrameTime = Date.now();

        if(scene != null)
        {
            scene.clearCanvaces();
            engine.inpt.updateAxis();
            scene.update();
            scene.render();
        }
        
        engine.previousScene = scene;
        requestAnimationFrame(engine.run);
    }
}
        /*
        if(timestamp < Engine.instance.lastFrameTime + (1000 / Engine.instance.maxFps))
            requestAnimationFrame(Engine.instance.run);

        Engine.instance.deltaTime += timestamp - Engine.instance.lastFrameTime;
        Engine.instance.lastFrameTime = timestamp;

        let scene = SceneManager.runningScene;

        
        console.log("deltaTime: " + Engine.instance.deltaTime);
        console.log("timestamp: " + timestamp); 
        console.log("lastFrameTime" + Engine.instance.lastFrameTime);

        while(Engine.instance.deltaTime >= Engine.instance.timestep)
        {
            Engine.instance.deltaTime -= Engine.instance.timestep;
            scene.update();
        }

        console.log("update completed");
        scene.clearCanvaces();
        scene.render();
        requestAnimationFrame(Engine.instance.run);
    }
    */