class MotionCharacter extends Component
{
    constructor(dir, speed)
    {
        super();
        this.speed = speed == 0 ? 1 : speed;
        this.dir = new Vector2D(1, 0);
    }

    behaviour = function()
    {
        this.speed = 1;
        console.log(this.gameObject.transform.pos);
        console.log(this.dir.scaleVec(this.speed));

        this.gameObject.transform.pos = this.gameObject.transform.pos.addVec(this.dir.scaleVec(this.speed));
    }
}