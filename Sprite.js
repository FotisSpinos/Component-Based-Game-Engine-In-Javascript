const AnimationType = {
    REVERSABLE: 'reversable',
    REPEATABLE: 'repeatable'
}

class SpriteAnimation
{
    constructor(engineImage, startIndex, spriteScale, offset, delay, ySteps, xSteps)
    {
        //set sprite attributes
        this.spritePos = startIndex.multVec(spriteScale.addVec(offset));
        this.spritePos = new Vector2D(Math.abs(this.spritePos.x), Math.abs(this.spritePos.y));


        this.spriteScale =  spriteScale; 

        this.offset = offset;
        this.delay = delay;

        // store initial sprite attributes
        this.delayStore = delay;
        this.spritePosStore = Object.assign({}, this.spritePos); 

        // Activate animation
        this.active = true;

        // Set engine sprite
        this.engineImage = engineImage;

        //init sprite image
        this.spriteImg;


        this.yStepsMax = ySteps;
        this.xStepsMax = xSteps;

        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;

        this.reversedAnim = this.offset.x > 0 ? false : true;
        this.playForwardAnim = true;

        //init name
        this.name = '';

        this.animType = AnimationType.REPEATABLE;
    }

    initImg(scale)
    {
        // Set image
        this.spriteImg = new Image(scale.x, scale.y);

        this.spriteImg.src = this.engineImage.url;
        this.spriteImg.id = this.engineImage.id;
    }

    reset()
    {
        this.spritePos = new Vector2D(this.spritePosStore.x, this.spritePosStore.y);
        this.delay = this.delayStore;

        if(this.animType == AnimationType.REVERSABLE)
        {
            this.spriteScale = new Vector2D(Math.abs(this.spriteScale.x), Math.abs(this.spriteScale.y));        
            this.offset = new Vector2D(Math.abs(this.offset.x), Math.abs(this.offset.y));
        }

        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;

        this.reversedAnim = this.offset.x > 0 ? false : true;
    }

    update()
    {        
        if(!this.active)
            return;
        
        this.delay -= Engine.instance.deltaTime;

        if(this.delay > 0)
            return;

        if(this.xStepsMax[this.xStepsIndex] > this.currentStepsX)
        {
            this.spritePos.x += this.offset.x + this.spriteScale.x;
            this.currentStepsX++;
        }
        else
        {
            if(this.animType == AnimationType.REVERSABLE)
                this.playForwardAnim = !this.playForwardAnim;

            if(this.yStepsMax > this.currentStepsY)
            {
                this.currentStepsY++;
                this.xStepsIndex++;

                //this.currentStepsX = !this.reverse ? 0 : this.yStepsMax - this.xStepsIndex;
                this.currentStepsX = !this.reversedAnim ? 0 : this.xStepsMax.length - this.xStepsIndex;

                //reset x pos
                this.spritePos.x = this.spritePosStore.x;

                // move down
                this.spritePos.y += this.offset.y + this.spriteScale.y;
            }
            else if(!this.playForwardAnim)
            {                
                this.reverse();
            }
            else
            {
                this.reset();
            }
        }

        this.delay = this.delayStore;        
    }

    render(objPos, objScale, ctx)
    {
        ctx.drawImage(this.spriteImg, this.spritePos.x, this.spritePos.y, this.spriteScale.x, this.spriteScale.y,
             objPos.x, objPos.y, objScale.x, objScale.y);
    }

    pause()
    {
        this.active = false;
    }

    continue()
    {
        this.active = true;
    }

    destinationX(index)
    {
        this.spriteScale.x = Math.abs(this.spriteScale.x);
        this.spriteScale.y = Math.abs(this.spriteScale.y);
        
        this.offset.x  = Math.abs(this.offset.x);
        this.offset.y  = Math.abs(this.offset.y);

        return this.spritePosStore.x + (this.offset.x + this.spriteScale.x) * (this.xStepsMax[this.xStepsMax.length - 1] + 1);
    }

    destinationY()
    {
        return this.spritePosStore.y + (this.offset.y + this.spriteScale.y) * (this.yStepsMax + 1);
    }

    reverse()
    {
        let destX = this.destinationX(this.xStepsMax.length - 1);
        let destY = this.destinationY();
        let destPos = new Vector2D(destX, destY);

        this.spritePos = destPos;

        this.offset = new Vector2D(-this.offset.x, -this.offset.y);
        this.spriteScale = new Vector2D(-this.spriteScale.x, -this.spriteScale.y);
        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;
    }

    createReverseAnim()
    {
        let destX = this.destinationX(this.xStepsMax.length - 1);
        let destY = this.destinationY();
        let destPos = new Vector2D(destX, destY);

        return new Sprite(this.engineImage, 
                            destPos, 
                            new Vector2D(- this.spriteScale.x, - this.spriteScale.y), 
                            new Vector2D(- this.offset.x, - this.offset.y), 
                            this.delayStore, 
                            this.yStepsMax, 
                            this.xStepsMax);
    }
}