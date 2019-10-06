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

    addComponent = function(addedComp)
    {
        this.components.push(addedComp);
        addedComp.gameObject = this;
    }

    removeComponentOfType = function(removeType)
    {
        var index = -1;

        for(var i = 0; i < this.components.length; i++)
        {
            var type1 = this.components[i].constructor;
            var type2 = removeType;
            if(type1 == type2)
                index = i;
        }

        if (index > -1)
            this.components.slice(index, 1);
    }

    getComponentOfType = function(type)
    {
        for(var i = 0; i < this.components.length; i++)
        {
            var type1 = this.components[i].constructor;
            var type2 = type;
            if(type1 == type2)
                return this.components[i];
        }
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