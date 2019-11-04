// define states
const CharacterState = {
    WALK: 'walk',
    ATTACK: 'attack'
} 

//! animation controller makes sure that one animation is played at a time
//! player get out of the canvas

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

        // attack duration
        this.attackDuration = 1.2;
        this.attackDurationStore = 1.2;

        // attack rate
        this.attackRate = 0;
        this.attackRateStore = 3.0;
    }

    start()
    {
        // define animations image
        this.charImageAnim = new EngineImage('PC Computer - Heroes of Might and Magic 2 - Mage.png', 'character image animantions');
        this.charImageAnimFlipped = new EngineImage('PC Computer - Heroes of Might and Magic 2 - Mage - flipped.png', 'character image animantions flipped');

        // create sprite animations
        this.deathSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(0, 1), new Vector2D(102, 106), new Vector2D(-0, -9), 0.1, 0, [9]);
        this.deathSprite.name = 'deathSprite';    


        this.walkForwardSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(2, 6), new Vector2D(102, 106), new Vector2D(6, 0), 0.08, 0, [5]);
        this.walkForwardSprite.name = 'walkForwardSprite';


        this.walkBackwardsSprite = new SpriteAnimation(this.charImageAnimFlipped, 
            new Vector2D(9.3, 7), new Vector2D(-102, -106), new Vector2D(-6, 0), 0.08, 0, [5]);
        this.walkBackwardsSprite.name = 'walkBackwardsSprite';


        this.attackSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(0, 4), new Vector2D(102, 106), new Vector2D(0, 0), 0.1, 0, [5]);
        this.attackSprite.name = 'attackForwardSprite';

        this.attackSprite.animType = AnimationType.REVERSABLE;    


        this.attackSpriteBackwards = new SpriteAnimation(this.charImageAnimFlipped, 
            new Vector2D(9.6, 5), new Vector2D(-102, -106), new Vector2D(0, 0), 0.1, 0, [5]);
        this.attackSpriteBackwards.name = 'attackBakcwardsSprite';

        this.attackSpriteBackwards.posOffset = new Vector2D(-47.0, 0.0);

        this.attackSpriteBackwards.animType = AnimationType.REVERSABLE;     


        
        // add animations to animation controller    
        this.playerAC = new AnimationController();
        this.playerAC.addSpriteAnimation(this.deathSprite);
        this.playerAC.addSpriteAnimation(this.attackSprite);
        this.playerAC.addSpriteAnimation(this.walkForwardSprite);
        this.playerAC.addSpriteAnimation(this.walkBackwardsSprite);
        this.playerAC.addSpriteAnimation(this.attackSpriteBackwards);

        // add animation controller to this game object
        this.gameObject.addComponent(this.playerAC);

        // set default sprite
        this.playerAC.playAnimation('walkForwardSprite');
        this.playerAC.pauseAnimation('walkForwardSprite');

        //let squareShape = new SquareShape('yellow', new Vector2D(140, 180));
        //this.gameObject.addComponent(squareShape, new Vector2D(1, 1));
    }

    //TODO clean up update
    //TODO create functions to check if we are within the window
    //TODO create function to check if the player doesnt move towards the collision object
    //TODO add more commnets on update

    update()
    {
        //* make sure that the player exists in the map
        if(this.skeleton == null)
            this.skeleton = GameObject.find('skeleton');

            

        if(this.currentState != CharacterState.ATTACK)
        {
            this.playerMovement = Input.instance.getAxis('Horizontal').axisValue;

            if(this.collision == null)
            {
                if(this.playerMovement + this.gameObject.transform.pos.x > 10)
                    this.gameObject.transform.pos.x += this.playerMovement;
            }
            else
            {
                if(this.playerMovement + this.gameObject.transform.pos.x > 10 &&
                    Math.abs(this.playerMovement + this.collision.collisionDir.x) >= Math.abs(this.collision.collisionDir.x))
                    this.gameObject.transform.pos.x += this.playerMovement;
            }

            this.attackRate -= Engine.instance.deltaTime;
        }
        else
        {
            this.playerMovement = 0;
            this.attackDuration -= Engine.instance.deltaTime;

            
            if(this.attackDuration <= 0)
            {
                this.playerAC.playAnimation('walkForwardSprite');            
                this.currentState = CharacterState.WALK;
                this.attackDuration = this.attackDurationStore;
                this.attackSprite.reset();
            }
        }

        // *The player can attack if the E key is pressed when the player does not attack or waiting for the attack timer
        if(Input.instance.keys[69] && this.attackRate < 0 && this.currentState != CharacterState.ATTACK)
        {            
            this.attackRate = this.attackRateStore;
            this.currentState = CharacterState.ATTACK;
            if(this.playerAC.activeAnimation.name == 'walkForwardSprite')
                this.playerAC.playAnimation('attackForwardSprite');
            else
                this.playerAC.playAnimation('attackBakcwardsSprite');
            return;
        }
     
        if(Math.abs(this.playerMovement) < 0.2)
        {
            this.playerAC.pauseAnimation('walkBackwardsSprite');
            this.playerAC.pauseAnimation('walkForwardSprite');
        }    
        else if(this.playerMovement > 0)
        {
            this.playerAC.playAnimation('walkForwardSprite');
        }
        else if(this.playerMovement < 0)
        {
            this.playerAC.playAnimation('walkBackwardsSprite');
        }  

        //* Clear current collision
        this.collision = null;
    }

    render(){}

    onCollisionEnter(collision)
    {
        //* Check if we have collided with the skeleton
        if(collision.gameObject.id == 'skeleton')
            this.collision = collision;
    }
}

/*
// create sprite animations
        this.deathSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(0, 1), new Vector2D(102, 106), new Vector2D(-0, -9), 0.1, 0, [9]);
        this.deathSprite.name = 'deathSprite';    
        

        this.walkForwardSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(2, 6), new Vector2D(102, 106), new Vector2D(6, 0), 0.08, 0, [5]);
        this.walkForwardSprite.name = 'walkForwardSprite';


        this.walkBackwardsSprite = new SpriteAnimation(this.charImageAnimFlipped, 
            new Vector2D(9.3, 7), new Vector2D(-102, -106), new Vector2D(-6, 0), 0.08, 0, [5]);
        this.walkBackwardsSprite.name = 'walkBackwardsSprite';


        this.attackSprite = new SpriteAnimation(this.charImageAnim, 
            new Vector2D(0, 4), new Vector2D(102, 106), new Vector2D(0, 0), 0.1, 0, [5]);
        this.attackSprite.name = 'attackForwardSprite';

        this.attackSprite.animType = AnimationType.REVERSABLE;    


        this.attackSpriteBackwards = new SpriteAnimation(this.charImageAnimFlipped, 
            new Vector2D(9.6, 5), new Vector2D(-102, -106), new Vector2D(0, 0), 0.1, 0, [5]);
        this.attackSpriteBackwards.name = 'attackBakcwardsSprite';

        this.attackSpriteBackwards.animType = AnimationType.REVERSABLE;   


*/