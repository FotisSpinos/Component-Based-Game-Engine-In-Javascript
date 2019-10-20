//The Scene containing game objects updated and rendered during runtime
class Scene
{
    constructor(id, canvaces)
    {
        this.name = id;
        this.canvaces = canvaces;
    }

    removeCanvas = function(id)
    {
        for(var i = 0; i < this.canvaces.length; i++)
        {
            if(this.canvaces[i].id = id)
            {
                this.canvaces.splice(i, 1);
                return;
            }
        }
    }

    addCanvas = function(canvasObj)
    {
        this.canvaces.push(canvasObj);
    }

    getCanvas = function(id)
    {
        for(var i = 0; i < this.canvaces.length; i++)
        {
            if(this.canvaces[i].id = id)
            {
                return this.canvaces[i];
            }
        }
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

    render = function()
    {
        for(var i = 0; i < this.canvaces.length; i++)
        {
            this.canvaces[i].render();
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