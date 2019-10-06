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

        this.gameObject.ctx.fillRect(objPos.x, objPos.y,  objScale.x, objScale.x);
    }
}

class CircleShape extends Component
{
    constructor()
    {
        super();
        this.startAng = 0;
        this.endAng = 360;
    }

    behaviour()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;

        ctx.beginPath();
        ctx.arc(objPos.x, objPos.y, objScale.x, this.startAng, this.endAng);
        ctx.stroke();
    }
}