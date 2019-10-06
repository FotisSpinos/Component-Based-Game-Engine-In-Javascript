class SceneManager
{
    static runningScene;
    static instance;

    constructor()
    {
        SceneManager.instance = this;
        this.scenes = [];
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
                SceneManager.runningScene = this.scenes[i];
                return;
            }
        }
    }
}