class SkeletonScript extends Component
{
    constructor()
    {
        super();

        this.skeletonImgAnim;

        // distance dx
        this.speed = 1; 

        // animation atributes
        this.skeletonWalk;
        this.skeletonAC;

        // define current state
        this.currentState = CharacterState.WALK;

        // attack rate
        this.attackDuration = 0.8;
        this.attackDurationStore = 0.8;

        this.attackRate = 3.0;
        this.attackRateStore = 3.0;

        this.attackDist = 10.0;

        this.health = 2;
    }

    start()
    {
        // define animations image
        this.skeletonImgAnim = new EngineImage('ghost sprite.png', 'character image animantions');
        this.skeletonImgAnimFlipped = new EngineImage('ghost sprite flipped.png', 'Skeleton spread sheet flipped.png');

        //* create walk animation
        this.walkSpriteFlipped = new SpriteAnimation(this.skeletonImgAnimFlipped, 
            new Vector2D(13.435, 1), new Vector2D(-45, -84), new Vector2D(-1.0, 0), 0.12, 0, [6]);   
        this.walkSpriteFlipped.name = 'walkSprite';

        //* Create attack animation
        this.attackSprite = new SpriteAnimation(this.skeletonImgAnimFlipped, 
            new Vector2D(13.52, 2.04), new Vector2D(-45, -80), new Vector2D(-1.0, 0), 0.15, 0, [2]);    
        this.attackSprite.name = 'attackSprite';

        this.attackSprite.animType = AnimationType.REVERSABLE;    

        //TODO create death animation

        this.skeletonAC = new AnimationController();
        this.skeletonAC.addSpriteAnimation(this.walkSpriteFlipped);
        this.skeletonAC.addSpriteAnimation(this.attackSprite);

        // add animation controller to this game object
        this.gameObject.addComponent(this.skeletonAC);

        this.skeletonAC.playAnimation('walkSprite');

        this.attackRate = 0;
    }

    update()
    {
        //* make sure that the player exists in the map
        if(this.player == null)
            this.player = GameObject.find('player');

        let playerDist = Math.abs(this.player.transform.pos.x - this.gameObject.transform.pos.x + this.player.transform.scale.x / 2);
        
        if(this.currentState == CharacterState.ATTACK)
        {
            this.skeletonAC.playAnimation('attackSprite');
            this.attackDuration -= Engine.instance.deltaTime;

            AudioManager.instance.playAudio("ghost attack");

            if(this.attackDuration <= 0)
            {
                let playerScirpt = this.player.getComponent(PlayerScript);
                playerScirpt.health--;
                if(playerScirpt.health == 0)
                {
                    this.gameObject.canvas.removeDrawObj(this.player);
                    Engine.instance.sceneManager.runningScene.clearCanvaces();
                    Engine.instance.sceneManager.loadScene('End Scene');
                }

                this.attackRate = 3.0;
                this.skeletonAC.playAnimation('walkSprite');
                this.attackDuration = 1.2;
                this.refreashAttackRate = true;
                this.currentState = CharacterData.WALK;
                return; 
            }
        }

        if(this.attackRate >= 0)
        {
            this.attackRate -= Engine.instance.deltaTime;
            this.refreashAttackRate = false;
        }

        if(this.currentState == CharacterState.ATTACK)
            return;

        if(Math.abs(this.player.transform.pos.x - this.gameObject.transform.pos.x + this.player.transform.scale.x - 80) > this.attackDist)
        {
            this.skeletonAC.playAnimation('walkSprite');
            this.currentState = CharacterState.WALK;
            this.gameObject.transform.pos.x -= this.speed;
        }

        else if(this.attackRate <= 0)
        {
            this.currentState = CharacterState.ATTACK;
        }
    }

    render()
    {
    }

    onCollisionEnter(collision)
    {
        //* Check if we have collided with a fireball
        if(collision.gameObject.id == 'fireball')
        {
            this.collision = collision;
            this.health--;

            //remove game object from canvas
            this.gameObject.canvas.removeDrawObj(collision.gameObject);

            // check if character is alive
            if(this.health == 0)
            {
                this.gameObject.canvas.removeDrawObj(this.gameObject);
            }
        }
    }
}