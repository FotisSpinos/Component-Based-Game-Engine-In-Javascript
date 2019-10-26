class Sprite extends Component
{
    constructor(engineImage, spritePos, spriteScale, offset, delay, ySteps, xSteps)
    {
        super();

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
    }

    start()
    {
        // Set image
        this.spriteImg = new Image(this.gameObject.transform.scale.x, this.gameObject.transform.scale.y);

        this.spriteImg.src = this.engineImage.url;
        this.spriteImg.id = this.engineImage.id;
    }

    update()
    {        
        if(!this.active)
            return;
        
        this.delay -= Engine.instance.deltaTime;

        if(this.delay > 0)
            return;

       
        if(this.xStepsIndex < this.xStepsIndex.length 
            || this.xStepsMax[this.xStepsIndex] > this.currentStepsX)
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

                this.currentStepsX = !this.reverse ? 0 : this.yStepsMax - this.xStepsIndex;

                //reset x pos
                this.spritePos.x = this.spritePosStore.x;

                // move down
                this.spritePos.y += this.offset.y;
            }
        }
        this.delay = this.delayStore;        
    }

    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        this.spritePos.print();

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

    reset()
    {
        this.spritePos = this.spritePosStore;
    }

    destinationX(index)
    {
        return this.spritePosStore.x + this.offset.x * this.xStepsMax[index];
    }

    destinationY()
    {
        return this.spritePosStore.y + this.offset.y * this.yStepsMax;
    }

    createReverseAnim()
    {
        let destX = this.destinationX(this.xStepsMax.length - 1);
        let destY = this.destinationY();
        let destPos = new Vector2D(destX, destY);

        return new Sprite(this.engineImage, destPos, this.spriteScale, new Vector2D(- this.offset.x, - this.offset.y), this.delay, this.yStepsMax, this.xStepsMax);
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