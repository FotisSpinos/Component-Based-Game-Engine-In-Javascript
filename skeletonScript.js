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
        this.attackDuration = 0;
        this.attackDurationStore = 1.2;

        this.attackDist = 10.0;
    }

    start()
    {
        // define animations image
        this.skeletonImgAnim = new EngineImage('heroes-of-might-and-magic skeleton mirror.jpg', 'character image animantions');
        this.skeletonImgAnimFlipped = new EngineImage('Skeleton spread sheet flipped.png', 'Skeleton spread sheet flipped.png');

        // create sprite animations
        this.walkSprite = new SpriteAnimation(this.skeletonImgAnimFlipped, 
            new Vector2D(8.68, 2), new Vector2D(-48, -70), new Vector2D(-1, -7), 0.12, 0, [6]);
        this.walkSprite.name = 'walkSprite';


        this.skeletonAC = new AnimationController();
        this.skeletonAC.addSpriteAnimation(this.walkSprite);

        // add animation controller to this game object
        this.gameObject.addComponent(this.skeletonAC);

        this.skeletonAC.playAnimation('walkSprite');

        //let squareShape = new SquareShape('yellow', new Vector2D(120, 160));
        //this.gameObject.addComponent(squareShape, new Vector2D(1, 1));
    }

    update()
    {
        //* make sure that the player exists in the map
        if(this.player == null)
            this.player = GameObject.find('player');
        
        let playerDist = Math.abs(this.player.transform.pos.x - this.gameObject.transform.pos.x + this.player.transform.scale.x / 2) 
        
        if(Math.abs(this.player.transform.pos.x - this.gameObject.transform.pos.x + this.player.transform.scale.x - 80) > this.attackDist)
            //this.gameObject.transform.pos.x -= this.speed;
            this.gameObject.transform.pos.x -= this.speed;
    }

    render()
    {
    }

}