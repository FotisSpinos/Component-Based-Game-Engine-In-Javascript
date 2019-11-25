class SceneManager
{
    //static runningScene;
    static instance;

    constructor()
    {
        SceneManager.instance = this;
        this.scenes = [];
        this.runningScene;
    }

    addScene(scene)
    {
        this.scenes.push(scene);
    }

    loadScene(sceneID)
    {
        for(var i = 0; i < this.scenes.length; i++)
        {
            var currentID = this.scenes[i].name;
            if(currentID == sceneID)
            {
                this.runningScene = this.scenes[i];
                return;
            }
        }
    }
}