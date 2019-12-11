class PlayButton extends Button
{
    constructor(engineImage)
    {
        super(engineImage);
    }

    onClick()
    {
        Engine.instance.sceneManager.loadScene(openningScene.name);
    }

    update()
    {
        Engine.instance.sceneManager.loadScene(openningScene.name);
    }
}