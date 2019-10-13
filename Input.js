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
    
    getAxis(id)
    {
        for(var i = 0; i < axis.length; i++)
        {
            if(id == axis[i].id)
                return axis[i];
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