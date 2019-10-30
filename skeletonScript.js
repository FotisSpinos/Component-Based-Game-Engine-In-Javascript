class SkeletonScript extends Component
{
    constructor()
    {
        super();

        this.skeletonImgAnim;

        // distance dx
        this.speed; 

        // animation atributes
        this.skeletonWalk;
        this.skeletonAC;

        // define current state
        this.currentState = CharacterState.WALK;

        // attack rate
        this.attackDuration = 0;
        this.attackDurationStore = 1.2;
    }

    start()
    {
        // define animations image
        this.skeletonImgAnim = new EngineImage('heroes-of-might-and-magic skeleton mirror.jpg', 'character image animantions');

        // create sprite animations
        this.walkSprite = new SpriteAnimation(this.skeletonImgAnim, 
            new Vector2D(1, 0), new Vector2D(102, 106), new Vector2D(-0, -9), 0.1, 0, [9]);
        this.walkSprite.name = 'walkSprite';


        this.skeletonAC = new AnimationController();
        this.skeletonAC.addSpriteAnimation(this.walkSprite);

        // add animation controller to this game object
        this.gameObject.addComponent(this.skeletonAC);

        //this.skeletonAC.playAnimation('walkSprite');
    }

    update()
    {

    }

    render()
    {

    }

}