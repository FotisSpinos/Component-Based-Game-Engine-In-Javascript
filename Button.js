class Button extends Component
{
    constructor(engineImage, onClickFunction)
    {
        super();
        this.img = engineImage;
        this.onClickFunction = onClickFunction;
    }

    start()
    {
        if(this.gameObject.getComponent(EngineImage) == -1)
        {
            this.gameObject.addComponent(this.img);
        }
    }

    //* check if the button is clicked
    isClicked()
    {
        //return if the button is pressed
        if(Input.instance.buttonDown)
            return;        

        let canvasOffset = this.gameObject.canvas.c.getBoundingClientRect();


        let topLeft = new Vector2D(this.gameObject.transform.pos.x, 
            this.gameObject.transform.pos.y + this.gameObject.transform.scale.y);

        let topRight = new Vector2D(this.gameObject.transform.pos.x + this.gameObject.transform.scale.x, 
            this.gameObject.transform.pos.y + this.gameObject.transform.scale.y);

        let bottomLeft = new Vector2D(this.gameObject.transform.pos.x, 
            this.gameObject.transform.pos.y);

        let bottomRight = new Vector2D(this.gameObject.transform.pos.x + this.gameObject.transform.scale.x, 
            this.gameObject.transform.pos.y);
            
        if(Input.instance.onMouseUpPos.x - canvasOffset.left > bottomLeft.x &&
            Input.instance.onMouseUpPos.x - canvasOffset.left < bottomRight.x + canvasOffset.left && 
            Input.instance.onMouseUpPos.y - canvasOffset.top > bottomRight.y &&
            Input.instance.onMouseUpPos.y -  canvasOffset.top < topRight.y)
            this.onClickFunction();
    }

    //* functionality when the button is clicked
    onClick()
    {
        //* inherit class to provide functionality
        
    }

    update()
    {
        this.isClicked();
    }

    render()
    {
        
    }
}