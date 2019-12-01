class Input
{
    static instance;
    static axis = [];

    constructor()
    {
        this.keys = [];
        this.buttonDown = true;
        this.onMouseDownPos = new Vector2D(0,0);
        this.onMouseUpPos = new Vector2D(0,0);

        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('keyup', this.keyUp, false);
        document.addEventListener('mousedown', this.mouseDown, false);
        document.addEventListener('mouseup', this.mouseUp, false);
        Input.instance = this;
    }   

    resetCursorInputs()
    {
        Input.instance.onMouseUpPos.x = 0;
        Input.instance.onMouseUpPos.y = 0;

        Input.instance.buttonDown = false;

        Input.instance.onMouseDownPos.x = 0;
        Input.instance.onMouseDownPos.y = 0;

        Input.instance.buttonDown = true;
    }

    updateAxis()
    {
        for(var i = 0; i < Input.axis.length; i++)
        {
            Input.axis[i].update();
        }
    }
    
    getAxis(id)
    {
        for(var i = 0; i < Input.axis.length; i++)
        {
            if(id == Input.axis[i].id)
                return Input.axis[i];
        }
    }

    keyDown = function(event) 
    {
        Input.instance.keys[event.keyCode] = true;
    }

    keyUp = function(event) 
    {
        Input.instance.keys[event.keyCode] = false;
    }

    mouseDown = function()
    {
        Input.instance.onMouseDownPos.x = event.clientX;
        Input.instance.onMouseDownPos.y = event.clientY;

        Input.instance.buttonDown = true;
    }

    mouseUp = function()
    {
        Input.instance.onMouseUpPos.x = event.clientX;
        Input.instance.onMouseUpPos.y = event.clientY;

        Input.instance.buttonDown = false;
    }
}