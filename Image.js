class Image extends Component
{
    constructor(url, id)
    {
        super();
        this.url = url;
        this.id = id;
        this.img;

        this.DefineImageElement();
    }

    DefineImageElement()
    {
        this.img = document.createElement("img");
        this.img.src = this.url;
        this.img.id = this.id;
    }

    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.drawImage(this.img, objPos.x, objPos.y, objScale.x, objScale.y);
    }

    update()
    {
        
    }
}