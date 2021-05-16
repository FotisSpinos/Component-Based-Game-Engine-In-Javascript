class EngineImage extends Component
{
    constructor(imgSource, id)
    {
        super();
        this.imgSource = imgSource;
        this.id = id;
        this.img;
    }

    start()
    {
        this.img = new Image(this.gameObject.transform.scale.x, this.gameObject.transform.scale.y);
        this.img.src = this.imgSource;
        this.img.id = this.id;
    }
    
    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.drawImage(this.img, objPos.x, objPos.y, objScale.x, objScale.y);
    }
}