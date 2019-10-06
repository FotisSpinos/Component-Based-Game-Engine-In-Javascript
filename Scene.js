//The Scene containing game objects updated and rendered during runtime
class Scene
{
    constructor(id, canvaces)
    {
        this.name = id;
        this.canvaces = canvaces;
    }

    clearCanvaces = function()
    {
        for(var i = 0; i < this.canvaces.length; i++)
        {
            this.canvaces[i].clearCanvas();
        }
    }

    update = function()
    {
        for(var i = 0; i < this.canvaces.length; i++)
        {
            this.canvaces[i].update();
        }
    }

    collisionCheck = function()
    {
        for(var i = 0; i < this.canvaces.length; i++)
        {
            this.canvaces[i].collisionCheck();
        }
    }

    print = function()
    {
        console.log('Scene Print: ' + this.id);
    }
}