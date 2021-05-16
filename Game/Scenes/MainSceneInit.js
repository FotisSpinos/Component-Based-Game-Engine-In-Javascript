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
        let skeleton3;

        let player;
        let scoreTextGO;
        let scoreValueTextGO;

        let healthBarBackground;
        let healthBarSlider;
        let healthText;

        //* 
        if(!this.firstRun)
        {
            skeleton = GameObject.find("skeleton");
            skeleton2 = GameObject.find("skeleton2");
            skeleton3 = GameObject.find("skeleton3");
            player =  GameObject.find("player")
            scoreTextGO = GameObject.find("scoreText");
            scoreValueTextGO = GameObject.find("scoreValueText");
        }

        //* spawn game objects
        if(skeleton == null)
        {
           GameMaster.createEnemy('skeleton', new Vector2D(1000, 633), SceneManager.instance.runningScene.canvaces[0]);
            
        }
        else
        {
            skeleton.transform.pos = new Vector2D(1000, 633);
            skeleton.getComponent(SkeletonScript).health = 2;
        }

        if(skeleton2 == null)
        {
           GameMaster.createEnemy('skeleton2', new Vector2D(1300, 633), SceneManager.instance.runningScene.canvaces[0]);
        }
        else
        {
            skeleton2.transform.pos = new Vector2D(1300, 633);
            skeleton2.getComponent(SkeletonScript).health = 2;
        }

        if(skeleton3 == null)
        {
            GameMaster.createEnemy('skeleton3', new Vector2D(1600, 633), SceneManager.instance.runningScene.canvaces[0]);
        }
        else
        {
            skeleton3.transform.pos = new Vector2D(1600, 633);
            skeleton3.getComponent(SkeletonScript).health = 2;
        }

        if(player == null)
        {
            GameMaster.createPlayer('player', new Vector2D(30, 625), SceneManager.instance.runningScene.canvaces[0]);
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
        
        //* Spawn UI elements
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

        //* Spawn Health Bar background
        if(healthBarBackground == null)
        {
            healthBarBackground = new GameObject('healthBarBackground', new Vector2D(200, 35), new Vector2D(150, 50));
            let backgroundSquare = new SquareShape('gray');  

            healthBarBackground.addComponent(backgroundSquare);
            SceneManager.instance.runningScene.canvaces[0].addDrawObj(healthBarBackground);
        }

        
        //* Spawn Health Bar slider
        if(healthBarSlider == null)
        {
            let backgroundCenter = new Vector2D(healthBarBackground.transform.pos.x + healthBarBackground.transform.scale.x / 2, 
            healthBarBackground.transform.pos.y + healthBarBackground.transform.scale.y / 2);

            healthBarSlider = new GameObject('healthBarSlider', new Vector2D(0, 0), new Vector2D(150 / 1.1, 50 / 1.2));
            let backgroundSquare = new SquareShape('red');  

            healthBarSlider.transform.pos = new Vector2D(backgroundCenter.x - (healthBarSlider.transform.scale.x / 2), 
            backgroundCenter.y - healthBarSlider.transform.scale.y / 2);

            healthBarSlider.addComponent(backgroundSquare);

            let healthSliderScript = new HealthSliderScript();
            healthBarSlider.addComponent(healthSliderScript);

            SceneManager.instance.runningScene.canvaces[0].addDrawObj(healthBarSlider);
        }
        else
        {
            healthBarSlider.transform.scale = new Vector2D(150 / 1.1, 50 / 1.2);
        }

        if(healthText == null)
        {
            healthText = new GameObject('Health Text', new Vector2D(90, 35 * 2), new Vector2D(200, 200));
            let scoreText = new EngineText("Health: ");

            healthText.addComponent(scoreText);
            SceneManager.instance.runningScene.canvaces[0].addDrawObj(healthText);
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