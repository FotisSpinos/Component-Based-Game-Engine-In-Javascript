class MainSceneInit extends Component
{
    constructor()
    {
        super();
        this.firstRun = true;
    }

    onSceneLoad()
    {
        let skeleton;
        let skeleton2;
        let player;
        let scoreTextGO;
        let scoreValueTextGO;

        //* 
        if(!this.firstRun)
        {
            skeleton = GameObject.find("skeleton");
            skeleton2 = GameObject.find("skeleton2");
            player =  GameObject.find("player")
            scoreTextGO = GameObject.find("scoreText");
            scoreValueTextGO = GameObject.find("scoreValueText");
        }

        //* spawn game objects
        if(skeleton == null)
        {
            skeleton = new GameObject('skeleton', new Vector2D(960, 633), new Vector2D(180, 180));
            skeleton.tag = "skeleton";
            let skeletonCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(120, 160)); 
            let ss = new SkeletonScript();
        
            skeleton.addComponent(ss);
            skeleton.addComponent(skeletonCollider);

            SceneManager.instance.runningScene.canvaces[0].addDrawObj(skeleton);
        }
        else
        {
            skeleton.transform.pos = new Vector2D(960, 633);
        }

        if(skeleton2 == null)
        {
            skeleton2 = new GameObject('skeleton2', new Vector2D(1300, 633), new Vector2D(180, 180));
            skeleton2.tag = "skeleton";
            let skeletonCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(120, 160)); 
            let ss = new SkeletonScript();
        
            skeleton2.addComponent(ss);
            skeleton2.addComponent(skeletonCollider);

            SceneManager.instance.runningScene.canvaces[0].addDrawObj(skeleton2);
        }
        else
        {
            skeleton2.transform.pos = new Vector2D(1300, 633);
        }

        if(player == null)
        {
            player = new GameObject('player', new Vector2D(30, 625), new Vector2D(200, 200));  
            let playerCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(140, 180)); 
            let ps = new PlayerScript();
        
            player.addComponent(ps);
            player.addComponent(playerCollider);

            SceneManager.instance.runningScene.canvaces[0].addDrawObj(player);
        }
        else
        {
            player.getComponent(PlayerScript).health = 3;
            player.transform.pos = new Vector2D(30, 625)
        }

        //* Destroy fireballs from previouse runs
        if(!this.firstRun)
        {
            let fireballs = GameObject.findObjsWithTag("fireball");
            for(let i = 0; i < fireballs.length; i++)
            {
                fireballs[i].canvas.removeDrawObj(fireballs[i]);
                console.log("destroy fireball");
            }
        }

        if(scoreTextGO == null)
        {
            scoreTextGO = new GameObject('scoreText', new Vector2D(1200, 70), new Vector2D(200, 200));
            let scoreText = new EngineText("Score: ");

            scoreTextGO.addComponent(scoreText);
            SceneManager.instance.runningScene.canvaces[0].addDrawObj(scoreTextGO);
        }

        if(scoreValueTextGO == null)
        {
            scoreValueTextGO = new GameObject('scoreValueText', new Vector2D(1300, 70), new Vector2D(200, 200));
            let scoreValueText = new EngineText("0");

            scoreValueTextGO.addComponent(scoreValueText);
            SceneManager.instance.runningScene.canvaces[0].addDrawObj(scoreValueTextGO);
        }
        else
        {
            scoreValueTextGO.getComponent(EngineText).text = "0";
        }

        //* Play bakcground theme
        AudioManager.instance.playAudio("main game background song");

        this.firstRun = false;
        
    }

    onSceneExit()
    {
        AudioManager.instance.stopAudio("main game background song");
    }
}