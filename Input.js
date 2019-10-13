class Input
{
    static instance;

    constructor()
    {
        this.keys = [];
        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('keyup', this.keyUp, false);
        Input.instance = this;
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