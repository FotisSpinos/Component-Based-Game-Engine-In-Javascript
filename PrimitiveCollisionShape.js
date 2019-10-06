class Collider
{
    constructor(center)
    {
        this.center = center;
        this.active = true;
    }
}

class Collision
{
    // Checks if a collision occurs between two circles has happened
    static circleToCircle(circle1, circle2)
    {
        var dist = circle2.center.minVec(circle1.center);

        if(dist.magnitude() <= circle1.radious + circle2.radious)
        {
            return true;
        }
        return false;
    }

    // Checks if a collision occurs between two squares has happened
    static rectToRect(rect1, rect2)
    {
        if(rect1.pos.x < rect2.pos.x + rect1.size.x &&
            rect1.pos.x + rect1.size.x > rect2.size.x &&
            rect1.pos.y < rect2.pos.y + rect1.size.y &&
            rect1.pos.y + rect1.size.y > rect2.size.y)
            return true;
        return false;
    }

    // Checks if a collision happens between a square and a circle
    static squareToCircle(square, circle)
    {
        
    }
}

class CircleCollider extends Collider
{
    constructor(pos, radious)
    {
        super(pos);
        this.radious = radious;
    }
}

class SquareCollider extends Collider
{
    constructor(pos, size)
    {
        super(pos)
        this.pos = pos;
        this.size = size;
    }
}