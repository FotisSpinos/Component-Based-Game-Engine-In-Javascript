class EndSceneInit extends Component
{
    constructor()
    {
        super();
        this.firstRun = true;
    }

    onSceneLoad()
    {
        let scoreValueTextGO;

        if(!this.firstRun)
        {
            scoreValueText = GameObject.find("scoreValueText");
        }

        if(scoreValueTextGO == null)
        {
            scoreValueTextGO = new GameObject('scoreValueText', new Vector2D(1300, 80), new Vector2D(200, 200));
            let scoreValueText = new EngineText("0");

            scoreValueTextGO.addComponent(scoreValueText);
            SceneManager.instance.runningScene.canvaces[0].addDrawObj(scoreValueTextGO);
        }
        
        scoreValueTextGO.getComponent(EngineText).text = GameMaster.getInstance().scoreValueTextComp.text;
        //* play background audio
        AudioManager.instance.playAudio("end scene background song");
    }

    onSceneExit()
    {
        AudioManager.instance.stopAudio("end scene background song");
    }
}