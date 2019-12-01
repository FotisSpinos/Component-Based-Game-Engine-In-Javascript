class FireballScript extends Component
{
    constructor(dir)
    {
        super();
        this.speed = 5.0;
        this.deleteBorder = 2000;
        this.dir = dir;
    }

    start()
    {
        //* Create and attach animation controller
        this.fireballAC = new AnimationController();
        this.gameObject.addComponent(this.fireballAC);

        if(this.dir == null)
        {
            console.log('dir is undefined, make sure that you pass in the direction parameter');
            return;
        }

        if(this.dir == direction.RIGHT)
            this.fireballAnim = new EngineImage('fireball animation sheet.png', 'fireball image animantion');
        else
            this.fireballAnim = new EngineImage('fireball animation sheet flipped.png', 'fireball image animantion flipped');

        //* Create and play animation according to direction
        this.fireballFord = new SpriteAnimation(this.fireballAnim, 
            new Vector2D(0, 0), new Vector2D(255.4, 255.4), new Vector2D(0, 109.4), 0.1, 0, [4]);
        this.fireballFord.name = 'fireballSprite';

        this.fireballAC.addSpriteAnimation(this.fireballFord);

        this.fireballAC.playAnimation('fireballSprite');

        AudioManager.instance.playAudio("fireBall sound");
    }

    update()
    {
        if(this.dir == direction.RIGHT)
            this.gameObject.transform.pos.x += this.speed;
        else
            this.gameObject.transform.pos.x -= this.speed;

        if(this.gameObject.transform.pos.x > this.deleteBorder || this.gameObject.transform.pos.x < -this.deleteBorder)
        {
            this.gameObject.canvas.removeDrawObj(this.gameObject);
            console.log("destroy fireball");
        }
    }

    render()
    {

    }

    onCollisionEnter(collision)
    {
        
    }
}