class Input
{
    static instance;
    static axis = [];

    constructor()
    {
        this.keys = [];
        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('keyup', this.keyUp, false);
        Input.instance = this;
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
}