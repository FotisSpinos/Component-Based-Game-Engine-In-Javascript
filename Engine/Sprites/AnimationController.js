class AnimationController extends Component
{
    constructor()
    {
        super();

        this.spriteAnimations = [];
        this.activeAnimation;
    }

    start()
    {
        for(var i = 0; i < this.spriteAnimations.length; i++)
        {
            this.spriteAnimations[i].initImg(this.gameObject.transform.scale);
        }
    }

    addSpriteAnimation(spriteAnimation)
    {
        this.spriteAnimations.push(spriteAnimation);

        if(this.gameObject != null)
            spriteAnimation.initImg(this.gameObject.transform.scale);
    }

    pauseAnimation(animName)
    {
        var index = -1;

        // Find component index
        for(var i = 0; i < this.spriteAnimations.length; i++)
        {
            if(animName == this.spriteAnimations[i].name)
                this.spriteAnimations[i].pause();
        }
    }

    removeSpriteAnimation(animName)
    {
        var index = -1;

        // Find component index
        for(var i = 0; i < this.spriteAnimations.length; i++)
        {
            if(animName == this.spriteAnimations[i].name)
                index = i;
        }

        // if the object is found, remove the component from the array
        if (index > -1)
        {
            this.spriteAnimations.splice(index, 1);
        }
    }

    playAnimation(animName)
    {
        if(this.activeAnimation != null && this.activeAnimation.isPlaying())
        {            
            if(animName == this.activeAnimation.name)
                return;
        }

        for(var i = 0; i < this.spriteAnimations.length; i++)
        {
            if(animName == this.spriteAnimations[i].name)
            {                
                this.activeAnimation = this.spriteAnimations[i];
                this.spriteAnimations[i].play();
            }
            else
                this.spriteAnimations[i].pause();
        }
    }

    render()
    {
        if(this.activeAnimation == null)
            return;

        this.activeAnimation.render(this.gameObject.transform.pos, 
                                    this.gameObject.transform.scale,
                                    this.gameObject.canvas.ctx);
    }

    update()
    {
        if(this.activeAnimation == null)
            return;

        this.activeAnimation.update();
    }
}