class LineShape extends Component
{
    constructor()
    {
        super();
    }

    behaviour()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.moveTo(objPos.x, objPos.pos.y);
        ctx.lineTo(objPos.x + objScale.x, objPos.y + objScale.scale.y);
        ctx.stroke();
    }
}

class SquareShape extends Component
{
    constructor()
    {
        super();
    }

    behaviour()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.fillRect(objPos.x, objPos.y, objScale.x, objScale.y);
    }

    print = function()
    {
        console.log('SquareShape component attached to: ' + this.gameObject.id);
    }
}

class CircleShape extends Component
{
    constructor(radious)
    {
        super();
        this.startAng = 0;
        this.endAng = 360;
        this.radious = radious;
    }

    behaviour()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.beginPath();
        ctx.arc(objPos.x, objPos.y, this.radious, this.startAng, this.endAng);
        ctx.stroke();
    }
}

class ImageRect extends Component
{    
    static addImageToDocument(imageURL, id)
    {
        var img = document.createElement("img");
        img.src = imageURL;
        img.id = 'imageid';
        
        var body = document.getElementById("body");
        body.appendChild(img);
    }

    constructor(img)
    {
        super();
        this.img = img;
    }

    behaviour()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.drawImage(this.img, 10, 10, 150, 180);
    }
}