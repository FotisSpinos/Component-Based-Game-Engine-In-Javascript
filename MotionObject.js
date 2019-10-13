class MotionObject extends Component
{
    constructor(dir, speed)
    {
        super();
        this.speed = speed;
        this.dir = dir;

        this.acceleration = false;
    }

    normalizeDir = function(dir)
    {
        this.dir = dir.noramalize();
    }

    behaviour = function()
    {
        this.gameObject.transform.pos = this.gameObject.transform.pos.addVec(this.dir.scaleVec(this.speed));
    }
}