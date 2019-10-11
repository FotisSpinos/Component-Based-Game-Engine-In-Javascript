class MotionCharacter extends Component
{
    constructor(dir, speed)
    {
        super();
        this.speed = speed;
        this.dir = dir;
    }

    behaviour = function()
    {
        this.gameObject.transform.pos = this.gameObject.transform.pos.addVec(this.dir.scaleVec(this.speed));
    }
}