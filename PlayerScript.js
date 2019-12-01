// define states
const CharacterState = {
    WALK: 'walk',
    ATTACK: 'attack'
} 


const direction = {
    RIGHT: 'right',
    LEFT: 'left'
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
        this.lastWalkAnim

        // define current state
        this.currentState = CharacterState.WALK;

        // attack duration
        this.attackDuration = 1.3;
        this.attackDurationStore = 1.3;

        // attack rate
        this.attackRate = 0;
        this.attackRateStore = 1.0;

        //fireball spawn index img
        this.fireballSpawnIndexImg - 3;;

        this.health = 3;
        this.score = 0;

        //GameMaster.getInstance().player = this.gameObject;
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
    }

    createFireBall()
    {
        this.fireballCreated = true;

        let spawnPos = new Vector2D(this.gameObject.transform.pos.x, this.gameObject.transform.pos.y);
        spawnPos.y += 70;

        //* define fireball direction
        let fbDir;
        
        if(this.lastWalkAnim == 'walkForwardSprite')
        {
            spawnPos.x += 100;
            fbDir = direction.RIGHT;
        }
        else
        {
            spawnPos.x -= 100;
            fbDir = direction.LEFT;
        }

        let fireball = new GameObject('fireball', spawnPos, new Vector2D(100, 100));
        let fireballCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(100, 80)); 
        let fireBallScript = new FireballScript(fbDir);

        fireball.tag = "fireball";

        fireball.addComponent(fireballCollider);
        fireball.addComponent(fireBallScript);

        this.gameObject.canvas.addDrawObj(fireball);
    }

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

        if(this.currentState == CharacterState.ATTACK && 
            this.playerAC.activeAnimation.currentStepsX == 5 && 
            !this.fireballCreated)
                this.createFireBall();

        // *The player can attack if the E key is pressed when the player does not attack or waiting for the attack timer
        if(Input.instance.keys[69] && this.attackRate < 0 && this.currentState != CharacterState.ATTACK)
        {            
            // * decleare that fireball has not been created for this attack
            this.fireballCreated = false;

            // * reset attack rate and update state
            this.attackRate = this.attackRateStore;
            this.currentState = CharacterState.ATTACK;

            //* recond last walk animation
            this.lastWalkAnim = this.playerAC.activeAnimation.name; 

            // * play correct attack animation
            if(this.playerAC.activeAnimation.name == 'walkForwardSprite')
                this.playerAC.playAnimation('attackForwardSprite');
            else
                this.playerAC.playAnimation('attackBakcwardsSprite');
            return;
        }
     
        //* Move plauer
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
        if(collision.gameObject.tag == 'skeleton')
            this.collision = collision;
    }
}

/*
https://www.deviantart.com/ninetails2000/art/Ninetails-SHIFT-Sprite-Sheet-166444005

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