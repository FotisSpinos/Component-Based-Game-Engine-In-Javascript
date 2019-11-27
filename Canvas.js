class Canvas
{
    // Set size using a vector 2D. X = width Y = Height
    setSize = function(size)
    {
        this.c.width = size.x;
        this.c.height = size.y;
        this.size = size;
    }

    createCanvas(id, size)
    {
        this.c = document.createElement('canvas');
        this.c.id = id;

        this.setSize(size);

        this.c.className = "gameCanvas";
        this.c.style.width = "100%";
        this.c.style.height = "100%";

        //Create game area
        let gameArea = document.createElement("div");
        gameArea.className = "gameArea";
        gameArea.style.position = "absolute";
        gameArea.style.top = "50%";
        gameArea.style.left = "50%";

        document.getElementById("body").appendChild(gameArea);
        gameArea.appendChild(this.c);
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

/*
        var gameArea = document.querySelectorAll("body div.gameArea");  //body div.gameArea

        var widthToHeight = 16 / 9;

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            gameArea[SceneManager.sceneNumber].style.height = newHeight + 'px';
            gameArea[SceneManager.sceneNumber].style.width = newWidth + 'px';
          } else { // window height is too high relative to desired game height
            newHeight = newWidth / widthToHeight;
            gameArea[SceneManager.sceneNumber].style.width = newWidth + 'px';
            gameArea[SceneManager.sceneNumber].style.height = newHeight + 'px';
          }

          gameArea[SceneManager.sceneNumber].style.marginTop = (-newHeight / 2) + 'px';
          gameArea[SceneManager.sceneNumber].style.marginLeft = (-newWidth / 2) + 'px';

          gameArea[SceneManager.sceneNumber].style.fontSize = (newWidth / 400) + 'em';

          this.c.width = newWidth;
          this.c.height = newHeight;
          */
          
    }

    addDrawObj = function(drawObj)
    {
        this.drawObjs.push(drawObj);
        drawObj.setCanvas = this;
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
        for(var i = 0; i < this.drawObjs.length; i++)
        {
            this.drawObjs[i].updateComponents();
        }
    }

    render = function()
    {
        this.clearCanvas();

        for(var i = 0; i < this.drawObjs.length; i++)
        {
            this.drawObjs[i].renderComponents();
        }
    }
}