// define states
const CharacterState = {
    WALK: 'walk',
    ATTACK: 'attack'
} 

//note: animation controller makes sure that one animation is played at a time

class PlayerScript extends Component
{
    constructor()
    {
        super();

        // distance dx
        this.playerMovement; 

        // animation atributes
        this.charImageAnim;
        this.deathSprite;
        this.walkForwardSprite;
        this.attackSprite;
        this.playerAC;

        // define current state
        this.currentState = CharacterState.WALK;

        // attack rate
        this.attackDuration = 0;
        this.attackDurationStore = 1.2;

        this.attackRate = 0;
        this.attackRateStore = 3.0;
    }

    start()
    {
        // define animations image
        this.charImageAnim = new EngineImage('PC Computer - Heroes of Might and Magic 2 - Mage.png', 'character image animantions');
        this.charImageAnimFlipped = new EngineImage('PC Computer - Heroes of Might and Magic 2 - Mage - flipped.png', 'character image animantions');

        // create sprite animations
        this.deathSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(0, 1), new Vector2D(102, 106), new Vector2D(-0, -9), 0.1, 0, [9]);
        this.deathSprite.name = 'deathSprite';
        
        this.attackSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(0, 4), new Vector2D(102, 106), new Vector2D(0, 0), 0.1, 0, [5]);
        this.attackSprite.name = 'attackSprite';

        this.attackSprite.animType = AnimationType.REVERSABLE;        

        this.walkForwardSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(2, 6), new Vector2D(102, 106), new Vector2D(6, 0), 0.08, 0, [5]);
        this.walkForwardSprite.name = 'walkForwardSprite';

        this.walkBackwardsSprite = new SpriteAnimation(this.charImageAnimFlipped, 
            new Vector2D(9.4, 7), new Vector2D(-102, -106), new Vector2D(-6, 0), 0.08, 0, [5]);
        this.walkBackwardsSprite.name = 'walkBackwardsSprite';

        
        // add animations to animation controller    
        this.playerAC = new AnimationController();
        this.playerAC.addSpriteAnimation(this.deathSprite);
        this.playerAC.addSpriteAnimation(this.attackSprite);
        this.playerAC.addSpriteAnimation(this.walkForwardSprite);
        this.playerAC.addSpriteAnimation(this.walkBackwardsSprite);

        // add animation controller to this game object
        this.gameObject.addComponent(this.playerAC);

        // set default sprite
        this.playerAC.playAnimation('attackSprite');
    }

    update()
    {     
//        this.playerAC.playAnimation('walkBackwardsSprite');
        //For debugging   
            //console.log(this.currentState);

        if(this.currentState != CharacterState.ATTACK)
        {
            this.playerMovement = Input.instance.getAxis('Horizontal').axisValue;
            this.gameObject.transform.pos.x += this.playerMovement;

            this.attackRate -= Engine.instance.deltaTime;
        }
        else
        {
            this.attackRate = this.attackRateStore;
            this.playerMovement = 0;
            this.attackDuration -= Engine.instance.deltaTime;
        }
        
        if(this.attackDuration <= 0)
        {
            this.currentState = CharacterState.WALK;
            this.playerAC.playAnimation('walkForwardSprite');

            this.attackDuration = this.attackDurationStore;
        }

        // The player can attack if the E key is pressed when the player does not attack or waiting for the attack timer
        if(Input.instance.keys[69] && this.attackRate < 0 && this.currentState != CharacterState.ATTACK)
        {
            this.currentState = CharacterState.ATTACK;
            this.playerAC.playAnimation('attackSprite');
        }

        else if(this.playerMovement > 0)
        {
            this.playerAC.playAnimation('walkForwardSprite');
        }
        else if(this.playerMovement < 1 && this.playerMovement >= 0)
        {
            this.playerAC.pauseAnimation('walkForwardSprite');
        }
        else if(this.playerMovement < 0)
        {
            console.log('this runs')
            this.playerAC.playAnimation('walkBackwardsSprite');
        }
    }

    render()
    {
        console.log(this.walkBackwardsSprite.spritePos);
    }
}

/*
this.walkSprite = new SpriteAnimation(new EngineImage('https://www.spriters-resource.com/download/41806/', 'death animation'), 
        new Vector2D(0, 636), new Vector2D(93, 93), new Vector2D(108, 0), 0.08, 1, [7]);
*/