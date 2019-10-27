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
        new Vector2D(0, 1), new Vector2D(102, 106), new Vector2D(-0, -9), 0.1, 0, [9]);
        this.deathSprite.name = 'deathSprite';
        
        this.attackSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'name'), 
        new Vector2D(0, 4), new Vector2D(102, 106), new Vector2D(0, 0), 0.1, 0, [5]);
        this.attackSprite.name = 'attackSprite';
        
        this.walkSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
        new Vector2D(2, 6), new Vector2D(102, 106), new Vector2D(6, 0), 0.08, 0, [5]);
        this.walkSprite.name = 'walkSprite';
        
        this.playerAC = new AnimationController();
        this.playerAC.addSpriteAnimation(this.deathSprite);
        this.playerAC.addSpriteAnimation(this.attackSprite);
        this.playerAC.addSpriteAnimation(this.walkSprite);

        this.gameObject.addComponent(this.playerAC);

        this.playerAC.playAnimation('walkSprite');
    }

    update()
    {        
        this.playerMovement = Input.instance.getAxis('Horizontal').axisValue;
        this.gameObject.transform.pos.x += this.playerMovement;

        if(this.playerMovement > 0)
            this.playerAC.playAnimation('walkSprite');
        else if(this.playerMovement < 1)
        {
            this.walkSprite.reset();
            this.playerAC.pauseAnimation('walkSprite');
        }
        
    }

    render()
    {

    }
}

/*
this.walkSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
        new Vector2D(0, 636), new Vector2D(93, 93), new Vector2D(108, 0), 0.08, 1, [7]);
*/