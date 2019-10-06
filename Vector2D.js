class Vector2D
{
    // Print vector
    print()
    {
        console.log('x: ' + this.x + ' y: ' + this.y);
    }

    magnitude()
    {
        var sumSquareOfLengths = this.x * this.x + this.y * this.y;
        if(sumSquareOfLengths == 0)
            return 0;
        else 
            return Math.sqrt(sumSquareOfLengths);
    }


    getUnitVector()
    {
        return 0;
    }

    static get zero()
    {
        return (new Vector2D(0, 0));
    }

    // Add two vectors
    addVec(vec)
    {
        var output = Vector2D.zero;
        output.x += vec.x + this.x;
        output.y += vec.y + this.y;

        return output;
    }

    minVec(vec)
    {        
        var output = Vector2D.zero;
        output.x =  this.x - vec.x;
        output.y = this.y - vec.y;

        return output;
    }

    // multiply two vectors
    multVec(vec)
    {
        var output = Vector2D.zero;
        output.x += vec.x * this.x;
        output.y += vec.y * this.y;
        
        return output;
    }

    // multiply x and y component of the vector with a number
    scaleVec(scale)
    {
        var output = Vector2D.zero;
        output.x *= scale;
        output.y *= scale;
        
        return output;
    }

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}