class InteractionChecker extends Component
{
    constructor()
    {
        super();
        this.interacted = false;
    }

    update()
    {
        let canvasOffset = this.gameObject.canvas.c.getBoundingClientRect();

        if(!Input.instance.buttonDown)
            return;

        if(Input.instance.onMouseDownPos.x > canvasOffset.x && 
            Input.instance.onMouseDownPos.y > canvasOffset.y &&
            Input.instance.onMouseDownPos.y < canvasOffset.x + canvasOffset.height &&
            Input.instance.onMouseDownPos.x < canvasOffset.y + canvasOffset.width)
        {
            Engine.instance.sceneManager.loadScene('Openning Scene');
        }
    }
}