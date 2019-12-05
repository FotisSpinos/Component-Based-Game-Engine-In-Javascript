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
        //! temporary for presentation
        if(Input.instance.keys[70])
        {
            this.onClickFunction();
            return;
        }

        //return if the button is pressed
        if(!Input.instance.buttonDown)
            return;        

        let canvasOffset = this.gameObject.canvas.c.getBoundingClientRect();


        let topLeft = new Vector2D(this.gameObject.transform.pos.x , 
            (this.gameObject.transform.pos.y + this.gameObject.transform.scale.y));

        let topRight = new Vector2D((this.gameObject.transform.pos.x + this.gameObject.transform.scale.x), 
            (this.gameObject.transform.pos.y + this.gameObject.transform.scale.y));

        let bottomLeft = new Vector2D((this.gameObject.transform.pos.x), 
            (this.gameObject.transform.pos.y));

        let bottomRight = new Vector2D((this.gameObject.transform.pos.x + this.gameObject.transform.scale.x) / (this.gameObject.canvas.c.getBoundingClientRect().width / 1679), 
            this.gameObject.transform.pos.y);

        if(Input.instance.onMouseDownPos.x - canvasOffset.x > bottomLeft.x &&
            Input.instance.onMouseDownPos.x - canvasOffset.x < bottomRight.x && 
            Input.instance.onMouseDownPos.y - canvasOffset.y > bottomRight.y &&
            Input.instance.onMouseDownPos.y - canvasOffset.y < topRight.y)
            this.onClickFunction();

        
    }

    //* functionality when the button is clicked
    onClick()
    {
        
        
    }

    update()
    {
        this.isClicked();
    }

    render()
    {
        
    }
}

/*
        if(Input.instance.buttonDown)
            return;        

        let canvasOffset = this.gameObject.canvas.c.getBoundingClientRect();


        let topLeft = new Vector2D(this.gameObject.transform.pos.x * (this.gameObject.canvas.c.getBoundingClientRect().width / 1679), 
            (this.gameObject.transform.pos.y + this.gameObject.transform.scale.y) * (this.gameObject.canvas.c.getBoundingClientRect().height / 456.7));

        let topRight = new Vector2D((this.gameObject.transform.pos.x + this.gameObject.transform.scale.x) * (this.gameObject.canvas.c.getBoundingClientRect().width / 1679), 
            (this.gameObject.transform.pos.y + this.gameObject.transform.scale.y) * (this.gameObject.canvas.c.getBoundingClientRect().height / 456.7));

        let bottomLeft = new Vector2D((this.gameObject.transform.pos.x) * (this.gameObject.canvas.c.getBoundingClientRect().width / 1679), 
            (this.gameObject.transform.pos.y) * (this.gameObject.canvas.c.getBoundingClientRect().height / 456.7));

        let bottomRight = new Vector2D((this.gameObject.transform.pos.x + this.gameObject.transform.scale.x) * (this.gameObject.canvas.c.getBoundingClientRect().width / 1679), 
            this.gameObject.transform.pos.y * (this.gameObject.canvas.c.getBoundingClientRect().height / 456.7));
            

            //let mousePos = new Vector2D((Input.instance.onMouseUpPos.x - canvasOffset.left) * (this.gameObject.canvas.c.getBoundingClientRect().width / 1679), 
            //    (Input.instance.onMouseUpPos.y - canvasOffset.top) * (this.gameObject.canvas.c.getBoundingClientRect().height / 456.7));

                //mousePos.print();

                console.log(this.gameObject.canvas.c.getBoundingClientRect().width);
                console.log(this.gameObject.canvas.c.getBoundingClientRect().height);

        if(Input.instance.onMouseUpPos.x - canvasOffset.left > bottomLeft.x &&
            Input.instance.onMouseUpPos.x - canvasOffset.left < bottomRight.x && 
            Input.instance.onMouseUpPos.y - canvasOffset.top > bottomRight.y &&
            Input.instance.onMouseUpPos.y -  canvasOffset.top < topRight.y)
            this.onClickFunction();

*/