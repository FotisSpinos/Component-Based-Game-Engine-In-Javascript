class EngineImage extends Component
{
    constructor(url, id)
    {
        super();
        this.url = url;
        this.id = id;
        this.img;
    }

    start()
    {
        this.img = new Image(this.gameObject.transform.scale.x, this.gameObject.transform.scale.y);
        this.img.src = this.url;
        this.img.id = this.id;
    }

    update()
    {

    }

    
    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        //Testing
        ctx.drawImage(this.img, objPos.x, objPos.y, objScale.x, objScale.y);
    }

    update()
    {
        
    }
}