class Sprite extends Component
{
    constructor(engineImage, spritePos, spriteScale, offset, delay, yBorder, xBorders)
    {
        super();

        //set sprite attributes
        this.spritePos = spritePos;
        this.spriteScale = spriteScale;

        this.offset = offset;
        this.delay = delay;

        // store initial sprite attributes
        this.delayStore = delay;
        this.spritePosStore = Object.assign({}, this.spritePos); //this.spritePos;

        // Activate animation
        this.active = true;

        // Set engine sprite
        this.engineImage = engineImage;

        //init sprite image
        this.spriteImg;


        this.yBorder = yBorder;

        this.xBorders = xBorders;
        this.xBordersIndex = 0;
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
                else
                    this.active = false;

                this.spritePos.x = this.spritePosStore.x;
                this.spritePos.y += this.offset.y;
            }
            this.delay = this.delayStore;
        }

        this.delay -= Engine.instance.deltaTime;
    }

    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

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
}