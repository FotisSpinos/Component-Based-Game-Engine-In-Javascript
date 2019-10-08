class Transform extends Component
{
    constructor(pos, scale)
    {
        super();
        this.pos = pos;
        this.scale = scale;
    }

    print()
    {
        console.log('Transform component of: ' + this.gameObject.id + '\n' +
         'pos: ' + this.pos + '\n' + 
         'scale' + this.scale);
    }
}