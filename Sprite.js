const AnimationType = {
    REVERSABLE: 'reversable',
    REPEATABLE: 'repeatable'
}

const AnimationState = {
    PAUSED: 'paused',
    PLAYING: 'playing' 
}

class SpriteAnimation
{
    constructor(engineImage, startIndex, spriteScale, blankSpace, updateTimer, ySteps, xSteps)
    {
        //define sprite position in the image
        this.spritePos = startIndex.multVec(spriteScale.addVec(blankSpace));
        this.spritePos = new Vector2D(Math.abs(this.spritePos.x), Math.abs(this.spritePos.y));
        
        // define sprite attributes
        this.engineImage = engineImage;
        this.spriteScale =  spriteScale;
        this.blankSpace = blankSpace;
        this.animState = AnimationState.PLAYING;
        this.posOffset;
        this.name = '';

        // define animation attributes
        this.ySteps = ySteps;
        this.xSteps = xSteps;

        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;

        this.updateTimer = updateTimer;
        this.playForwardAnim = true;
        this.animType = AnimationType.REPEATABLE;

        // store initial variable copies 
        this.spriteScaleStore = spriteScale;
        this.offsetStore = blankSpace;
        this.updateTimerStore = updateTimer;
        this.spritePosStore = Object.assign({}, this.spritePos); 

        //init sprite image
        this.spriteImg;
    }

    initImg(scale)
    {
        // Set image
        this.spriteImg = new Image(scale.x, scale.y);

        this.spriteImg.src = this.engineImage.imgSource;
        this.spriteImg.id = this.engineImage.id;
    }

    reset()
    {
        // reset sprite attributes

        this.spriteScale = this.spriteScaleStore; 
        this.blankSpace = this.offsetStore;
        this.spritePos = new Vector2D(this.spritePosStore.x, this.spritePosStore.y);

        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;

        this.playForwardAnim = true;
    }

    update()
    {        
        // Check if we should play the animation
        if(this.animState != AnimationState.PLAYING)
            return;
        
        // Check if we can update the sprite animation
        this.updateTimer -= Engine.instance.deltaTime;

        if(this.updateTimer > 0)
            return;

        // check if we can move horizontally
        if(this.xSteps[this.xStepsIndex] > this.currentStepsX)
        {
            this.spritePos.x += this.blankSpace.x + this.spriteScale.x;
            this.currentStepsX++;
        }
        else
        {
            // check if we can move vertically
            if(this.ySteps > this.currentStepsY)
            {
                // determine the next set of steps for the x axis
                this.currentStepsX = !this.playForwardAnim ? 0 : this.xSteps.length - this.xStepsIndex;

                //get next step index
                this.currentStepsY++;
                this.xStepsIndex++;

                //reset x pos
                this.spritePos.x = this.spritePosStore.x;

                // move sprite vertically
                this.spritePos.y += this.blankSpace.y + this.spriteScale.y;
            }
            else
            {
                // if the animation is reversable: change the traversal order for the next steps
                if(this.animType == AnimationType.REVERSABLE)
                    this.playForwardAnim = !this.playForwardAnim;

                // reverse the animation if it was played forward for the current steps
                if(!this.playForwardAnim)                
                    this.reverse();
                else
                    this.reset();   
            }
        }

        // reset timer for the next update
        this.updateTimer = this.updateTimerStore;
    }

    render(objPos, objScale, ctx)
    {   
        if(this.posOffset != null)
        {
            objPos = objPos.addVec(this.posOffset);
        }

        ctx.drawImage(this.spriteImg,
            this.spritePos.x, this.spritePos.y, 
            this.spriteScale.x, this.spriteScale.y,
            objPos.x, objPos.y, 
            objScale.x, objScale.y);
    }

    pause() { this.animState = AnimationState.PAUSED; }

    play() { this.animState = AnimationState.PLAYING; }

    isPlaying() {return this.animState == AnimationState.PLAYING; }

    destinationX(index)
    {
        return this.spritePosStore.x + (this.blankSpace.x + this.spriteScale.x) * (this.xSteps[index] + 1);
    }

    destinationY()
    {
        return this.spritePosStore.y + (this.blankSpace.y + this.spriteScale.y) * (this.ySteps + 1);
    }

    reverse()
    {
        // define destination position
        let destX = this.destinationX(this.xSteps.length - 1);
        let destY = this.destinationY();
        let destPos = new Vector2D(destX, destY);

        this.spritePos = destPos;

        // reverse direction of animation 
        this.blankSpace = new Vector2D(-this.blankSpace.x, -this.blankSpace.y);
        this.spriteScale = new Vector2D(-this.spriteScale.x, -this.spriteScale.y);

        // reset animation variables
        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;
    }
}