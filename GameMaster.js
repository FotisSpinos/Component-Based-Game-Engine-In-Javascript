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
        this.scoreValueTextComp = GameObject.find("scoreValueText").getComponent(EngineText);
        this.player = GameObject.find("player");

        console.log(this.player);
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

    }
}