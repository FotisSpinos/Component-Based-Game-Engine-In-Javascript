class HealthSliderScript extends Component
{
    constructor()
    {
        super();

        this.player = GameObject.find("player").getComponent(PlayerScript);
    }

    onSceneLoad()
    {
        this.maxHealth = this.player.health;
        this.currentHealth = this.player.health;
    }

    update()
    {

        if(this.currentHealth != this.player.health)
        {            
            this.gameObject.transform.scale = new Vector2D(this.gameObject.transform.scale.x * this.player.health / this.maxHealth, 
                this.gameObject.transform.scale.y);

            this.currentHealth = this.player.health;
        }
    }
}