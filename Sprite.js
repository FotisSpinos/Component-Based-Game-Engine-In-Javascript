class SpriteAnimation
{
    constructor(engineImage, spritePos, spriteScale, offset, delay, ySteps, xSteps)
    {
        //set sprite attributes
        this.spritePos = spritePos;
        this.spriteScale = spriteScale;

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

        this.reverse = this.offset.x > 0 ? false : true;
        this.repeatSprite = true;

        //init name
        this.name = '';
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

        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;
        
        this.reverse = this.offset.x > 0 ? false : true;
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
            this.spritePos.x += this.offset.x;
            this.currentStepsX++;
        }
        else
        {
            if(this.yStepsMax > this.currentStepsY)
            {
                this.currentStepsY++;
                this.xStepsIndex++;

                //this.currentStepsX = !this.reverse ? 0 : this.yStepsMax - this.xStepsIndex;
                this.currentStepsX = !this.reverse ? 0 : this.xStepsMax.length - this.xStepsIndex;

                //reset x pos
                this.spritePos.x = this.spritePosStore.x;

                // move down
                this.spritePos.y += this.offset.y;
            }
            else if(this.repeatSprite)
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
        return this.spritePosStore.x + this.offset.x * this.xStepsMax[index];
    }

    destinationY()
    {
        return this.spritePosStore.y + this.offset.y * this.yStepsMax;
    }

    reverseAnim()
    {
        let destX = this.destinationX(this.xStepsMax.length - 1);
        let destY = this.destinationY();
        let destPos = new Vector2D(destX, destY);

        this.spritePosStore = destPos;
        this.spritePos = destPos;

        this.xStepsIndex = 0;
        this.currentStepsX = 0;
        this.currentStepsY = 0;



        this.offset = new Vector2D(-this.offset.x, - this.offset.y);
        this.delayStore = this.offset;
        this.reverse = true;
    }

    createReverseAnim()
    {
        let destX = this.destinationX(this.xStepsMax.length - 1);
        let destY = this.destinationY();
        let destPos = new Vector2D(destX, destY);

        return new Sprite(this.engineImage, destPos, this.spriteScale, new Vector2D(- this.offset.x, - this.offset.y), this.delayStore, this.yStepsMax, this.xStepsMax);
    }
}


        /*
        if(!this.active)
            return;

        if(this.delay < 0)
        {            
            if(this.xBorders[this.xBordersIndex] > this.spritePos.x)
            {
                this.spritePos.x += this.offset.x;
            } 
            else if(this.yBorder > this.spritePos.y)
            {
                if(this.xBorders.length > this.xBordersIndex + 1)
                {
                    this.xBordersIndex++;
                }

                this.spritePos.x = this.spritePosStore.x;
                this.spritePos.y += this.offset.y;
            }
            this.delay = this.delayStore;
        }

        this.delay -= Engine.instance.deltaTime;
        */