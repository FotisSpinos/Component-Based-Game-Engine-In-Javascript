class GameMaster
{
    static instance;

    constructor()
    {
        this.scoreValueTextComp;
        this.player;
    }

    update()
    {
        let scoreValueText = GameObject.find("scoreValueText");

        if(scoreValueText != null)
        {
            let engineTextcomp = scoreValueText.getComponent(EngineText);
            this.scoreValueTextComp = engineTextcomp;
        }
            
        
        if(this.player == null)
            this.player = GameObject.find("player");
    }

    static getInstance()
    {
        if(GameMaster.instance == null)
        {
            GameMaster.instance = new GameMaster();
        }
        return GameMaster.instance;
    }

    get score()
    {
        if(this.scoreValueTextComp == null)
            return '0';

        return this.scoreValueTextComp.text
    }

    static createEnemy(id, position, canvas)
    {
        let skeleton = new GameObject(id, position, new Vector2D(180, 180));
        skeleton.tag = "skeleton";
        let skeletonCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(120, 160)); 
        let ss = new SkeletonScript();
    
        skeleton.addComponent(ss);
        skeleton.addComponent(skeletonCollider);

        SceneManager.instance.runningScene.canvaces[0].addDrawObj(skeleton);
    }

    static createPlayer(id, position, canvas)
    {
        let player = new GameObject('player', position, new Vector2D(200, 200));  
        let playerCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(140, 180)); 
        let ps = new PlayerScript();
        player.addComponent(ps);
        player.addComponent(playerCollider);

        SceneManager.instance.runningScene.canvaces[0].addDrawObj(player);
    }
}