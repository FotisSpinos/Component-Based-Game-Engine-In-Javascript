class EndSceenTrigger extends Component
{
    constructor(nextSceneToLoad)
    {
        super();
        this.nextSceneToLoad = nextSceneToLoad;
    }

    start()
    {

    }

    update()
    {

    }

    onCollisionEnter(collision)
    {
        if(collision.gameObject.id == "player")
        {
            Engine.instance.sceneManager.loadScene("End Scene");
        }
    }
}