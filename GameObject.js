class GameObject
{
    constructor(name, pos, scale)
    {
        //Define Components
        this.components = [];

        // Add transform component
        this.transform = new Transform(pos, scale);
        this.addComponent(this.transform);

        // Add name and tag
        this.id = name;
        this.tag = '';

        // Add Collider
        this.collider;

        // Set a reference to the canvas the game object belongs to
        this.canvas;
    }

    set setCanvas(canvasObj)
    {
        this.canvas = canvasObj;
    }

    // Add / Attach component to this game object
    addComponent = function(addedComp)
    {
        this.components.push(addedComp);
        addedComp.gameObject = this;    // Set a rederence of the gameObject to the component we added

        //Call start function
        addedComp.start();
    }

    // Remove / de - attach component from this game object
    removeComponent = function(type)
    {
        // Don't allow the Transform to be deleted
        if(type.constructor == Transform)
            return -1;

        var index = -1;

        // Find component index
        for(var i = 0; i < this.components.length; i++)
        {
            if(type == this.components[i].constructor)
                index = i;
        }

        // if the object is found, remove the component from the array
        if (index > -1)
        {
            this.components.splice(index, 1);
        }
    }

    // Returns the component matching the type parameter 
    // or -1 if it could not be found
    getComponent = function(type)
    {
        for(var i = 0; i < this.components.length; i++)
        {
            let currentProto = this.components[i].__proto__;

            while(currentProto != null &&
                 currentProto.constructor != Component) 
            {
                if(type == currentProto.constructor)
                    return this.components[i];
                currentProto = currentProto.__proto__;
            }
        }
        return -1;
    }

    // Is excecuted when the Game Object is created, Can be overriten to provide extra functionality
    start = function() 
    {
        // should contain any initial functionality for the Game Object
    }

    onCollisionEnter = function(collisionObj)
    {
        console.log(this);
        console.log(collisionObj);
        console.log('Collision happened in gameObject with obj: ' + collisionObj.id);
    }

    // Excecuted every component behaviour
    updateComponents = function()
    {
        if(this.components.legnth == 0)
            return;

        for(var i = 0; i < this.components.length; i++)
        {
            this.components[i].update();
        }
    }

    // Excecuted every component behaviour
    renderComponents = function()
    {
        if(this.components.legnth == 0)
            return;

        for(var i = 0; i < this.components.length; i++)
        {
            this.components[i].render();
        }
    }    

    // Finds a game object in the scene from it's id
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