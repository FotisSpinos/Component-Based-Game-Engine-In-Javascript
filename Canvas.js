class Canvas
{
    // Set size using a vector 2D. X = width Y = Height
    setSize = function(size)
    {
        this.c.width = size.x;
        this.c.height = size.y;
    }

    createCanvas(id, size)
    {
        this.c = document.createElement('canvas');
        this.c.id = id;

        this.setSize(size);

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(this.c);
    }

    constructor(id, size, drawObjs)
    { 
        this.canDraw = true;
        this.canUpdate = true;
        this.drawObjs = drawObjs;
        this.id = id;

        this.createCanvas(id, size);

        if(this.c == null)
        {
            console.log('Failed to find canvas with name' + canvasID);
            return;
        }

        this.ctx = this.c.getContext('2d'); 

        // Set the canvas
        for(var i = 0; i < drawObjs.length; i++)
        {
            drawObjs[i].setCanvas = this;
        }
    }

    addDrawObj = function(drawObj)
    {
        this.drawObjs.push(drawObj);
    }

    removeDrawObj = function(drawObj)
    {
        var elemIndex = this.drawObjs.indexOf(drawObj);
        if(elemIndex != -1)
        {
            this.drawObjs.splice(elemIndex, 1);
        }
    }

    print = function()
    {
        console.log('Canvas: ' + this.id  + '\n' +
        'Width: ' + this.c.width + '\n' +
        'Height: ' + this.c.height + '\n');
    }

    clearCanvas = function()
    {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }

    update = function()
    {
        this.clearCanvas();
        
        for(var i = 0; i < this.drawObjs.length; i++)
        {
            this.drawObjs[i].excecuteComponentBehaviour();
        }
    }
}