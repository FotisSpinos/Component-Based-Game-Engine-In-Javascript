class Collider extends Component
{
    constructor(center)
    {
        super();
        this.center = center;
        this.active = true;
    }

    update()
    {
        
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
    static squareToCircle(rect1, circle)
    {
        // Not Yet Implemented
    }

    static check = function(collider1, collider2)
    {
        var type1 = defineCollisionType(collider1);
        var type2 = defineCollisionType(collider2);
        
        if(type1 == CircleCollider && type2 == CircleCollider)
        {
            return Collision.circleToCircle(collider1, collider2);
        }
        
         
    }

    static defineCollisionType(collisionObj)
    {
        switch(collider1.constructor())
        {
            case CircleCollider:
                return CircleCollider;
            case SquareCollider:
                return SquareCollider;
        }
    }
}

class CircleCollider extends Collider
{
    constructor(pos, radious)
    {
        super(pos);
        this.radious = radious;
    }

    update()
    {
        var canvas = this.gameObject.canvas;

        for(var i = 0; i < canvas.drawObjs.length; i++)
        {
            if(canvas.drawObjs[i] == this.gameObject)
                continue;

            var circleCollider = canvas.drawObjs[i].getComponent(CircleCollider);
            if(circleCollider != null)
                Collision.circleToCircle(this, circleCollider);
            var squareCollider = canvas.drawObjs[i].getComponent(SquareCollider);
        }
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

    update()
    {
        
    }
}