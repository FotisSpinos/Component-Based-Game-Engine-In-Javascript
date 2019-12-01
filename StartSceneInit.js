class StartSceneInit extends Component
{
    constructor()
    {
        super();
    }

    onSceneLoad()
    {
        AudioManager.instance.playAudio("background");
    }

    onSceneExit()
    {
        AudioManager.instance.stopAudio("background");
    }
}