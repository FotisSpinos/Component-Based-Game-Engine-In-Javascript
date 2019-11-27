class SceneManager
{
    //static runningScene;
    static instance;
    static sceneNumber = 0;

    constructor()
    {
        if(SceneManager.instance == null)
            SceneManager.instance = this;

        this.scenes = [];
        this.runningScene;
    }

    static getInstance()
    {
        if(SceneManager.instance == null)
            SceneManager.instance = new SceneManager();
        return SceneManager.instance;
    }

    addScene(scene)
    {
        this.scenes.push(scene);

        if(SceneManager.sceneNumber == null)
        SceneManager.sceneNumber = 0;

        this.sceneCounter = SceneManager.sceneNumber;
        SceneManager.sceneNumber++;
    }

    loadScene(sceneID)
    {
        for(var i = 0; i < this.scenes.length; i++)
        {
            var currentID = this.scenes[i].name;
            if(currentID == sceneID)
            {
                this.runningScene = this.scenes[i];
                Window.instance.resizeCanvaces();
                return;
            }
        }
    }
}