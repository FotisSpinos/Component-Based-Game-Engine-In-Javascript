class GameObject
{
    constructor(name, pos, scale)
    {
        //Define Components
        this.components = [];

        this.transform = new Transform(pos, scale);
        this.addComponent(this.transform);

        this.id = name;
        this.tag = '';

        this.collider;

        this.start();
        this.ctx;
    }

    set setContext(ctx)
    {
        this.ctx = ctx;
    }

    addComponent = function(addedComponent)
    {
        this.components.push(addedComponent);
        addedComponent.gameObject = this;
    }

    start = function() 
    {
        // should contain any initial functionality for the Game Object
    }

    onCollisionEnter = function(collisionObj)
    {
        //console.log('Collision happened in gameObject with obj: ' + collisionObj.id);
    }

    excecuteComponentBehaviour = function()
    {
        if(this.components.legnth == 0)
            return;

        for(var i = 0; i < this.components.length; i++)
        {
            this.components[i].behaviour();
        }
    }

    print = function()
    {
        //console.log('GameObject: ' + this.id + "\n" + 
        //'Position: ' + this.pos.x + ' , ' + this.pos.y);
    }

    static find(id)
    {
        var canvaces = SceneManager.runningScene.canvaces;
        
        for(var c = 0; c < canvaces.length; c++)
        {
            for(var i = 0; i < canvaces[c].drawObjs.length; i++)
            {
                if(id == canvaces[c].drawObjs[i].id)
                    return canvaces[c].drawObjs[i];
            }
        }
    }
}

    /*
    // Draw Game Object
    draw = function(ctx)
    {
        //PrimitiveShapes.drawRect(ctx, this.pos, new Vector2D(50, 50));
        //PrimitiveShapes.drawCircle(ctx, this.pos, 30, 0, 2.0 * Math.PI);
        //PrimitiveShapes.drawRect(ctx, this.pos, new Vector2D(50, 50));
    }

    // Update Game Object
    update = function()
    {
        //Do nothing
    }
     */