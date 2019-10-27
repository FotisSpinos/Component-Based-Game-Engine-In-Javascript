class PlayerScript extends Component
{
    constructor()
    {
        super();
        this.playerMovement;

        this.deathSprite;
        this.walkSprite;
        this.attackSprite;
        this.playerAC;
    }

    start()
    {
        this.deathSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
        new Vector2D(0, 93), new Vector2D(93, 93), new Vector2D(102, 0), 0.1, 1, [10]);
        this.deathSprite.name = 'deathSprite';
        
        this.attackSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'name'), 
        new Vector2D(2, 425), new Vector2D(93, 93), new Vector2D(102, 0), 0.1, 1, [6]);
        this.attackSprite.name = 'attackSprite';
        
        this.walkSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
        new Vector2D(93 * 2, 636), new Vector2D(93, 93), new Vector2D(108, 0), 0.08, 1, [5]);
        this.walkSprite.name = 'walkSprite';
        
        this.playerAC = new AnimationController();
        this.playerAC.addSpriteAnimation(this.deathSprite);
        this.playerAC.addSpriteAnimation(this.attackSprite);
        this.playerAC.addSpriteAnimation(this.walkSprite);
        
        this.playerAC.playAnimation('walkSprite');


        this.gameObject.addComponent(this.playerAC);
    }

    update()
    {        
        this.playerMovement = Input.instance.getAxis('Horizontal').axisValue;
        this.gameObject.transform.pos.x += this.playerMovement;
    }

    render()
    {

    }
}

/*
this.walkSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
        new Vector2D(0, 636), new Vector2D(93, 93), new Vector2D(108, 0), 0.08, 1, [7]);
*/