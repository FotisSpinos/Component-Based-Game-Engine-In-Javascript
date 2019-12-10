class EngineText extends Component
{
    constructor(text)
    {
        super();

        this.text = text;

        this.font = '30px Comic Sans MS';
        this.textAlign = 'center';
        this.color = 'red';
    }

    render()
    {
        let canvasContext = this.gameObject.canvas.ctx;
        let pos = this.gameObject.transform.pos;

        canvasContext.font = this.font;
        canvasContext.fillStyle = this.color;
        
        canvasContext.fillText(this.text, pos.x, pos.y);
    }
}