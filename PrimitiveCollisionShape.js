class Collision
{
    // Checks if a collision occurs between two circles has happened
    static circleToCircle(circle1, circle2)
    {
        var dist = circle2.pos.minVec(circle1.pos);

        if(dist.magnitude() <= circle1.radious + circle2.radious)
        {
            return true;
        }
        return false;
    }

    // Checks if a collision occurs between two squares has happened
    static rectToRect(rect1, rect2)
    {
        if(rect1.pos.x < rect2.pos.x + rect2.size.x &&
            rect1.pos.x + rect1.size.x > rect2.pos.x &&
            rect1.pos.y < rect2.pos.y + rect2.size.y &&
            rect1.pos.y + rect1.size.y > rect2.pos.y)
            return true;
        return false;
    }

    static circleToRect(circle, rect)
    {
        let rectCentre = new Vector2D(rect.pos.x + rect.size.x / 2, rect.pos.y + rect.size.y / 2);
        let dist = rectCentre.pos.minVec(circle).magnitude;

        

        return false;
    }

    // Checks if a collision happens between a square and a circle
    static squareToCircle(rect1, circle)
    {
        // Not Yet Implemented
    }
    
    static defineCollisionType(collisionObj)
    {
        switch(collisionObj.constructor)
        {
            case CircleCollider:
                return CircleCollider;
            case SquareCollider:
                return SquareCollider;
        }
    }

    static checkCollision = function(collider1, collider2)
    {
        var type1 = Collision.defineCollisionType(collider1);
        var type2 = Collision.defineCollisionType(collider2);
        
        if(type1 == CircleCollider && type2 == CircleCollider)
        {
            return Collision.circleToCircle(collider1, collider2);
        }
        else if(type1 == SquareCollider && type2 == SquareCollider)
        {
            return Collision.rectToRect(collider1, collider2);
        }
        else
        {
            console.log('Collisions between ' + type1 + ' and type '
             + type2 + 'are not supported');
             return false;
        }
    }

    // Checks if a collision occurs between the parameter game object and every other object on the same canvas
    static checkCanvasCollisions = function(colliderObj)
    {
        var canvas = colliderObj.gameObject.canvas;

        for(var i = 0; i < canvas.drawObjs.length; i++)
        {
            if(canvas.drawObjs[i] == colliderObj.gameObject)
                continue;

            let collider = canvas.drawObjs[i].getComponent(Collider);
            if(collider == -1)
                continue;

            if(Collision.checkCollision(colliderObj, collider))
            {
                colliderObj.gameObject.onCollisionEnter(collider.gameObject);
            }
        }    
    }
}

class Collider extends Component
{
    constructor(offset)
    {
        super();
        this.offset = offset == null ? new Vector2D.zero : offset;
        this.active = true;
    }

    updatePos()
    {
        this.pos = this.gameObject.transform.pos.addVec(this.offset);
    }

    start()
    {

    }

    render()
    {

    }

    update()
    {

    }
}



class CircleCollider extends Collider
{
    constructor(offset, radious)
    {
        super(offset);
        this.radious = radious;
        this.pos = Vector2D.zero;
    }

    start()
    {
        this.pos = this.gameObject.transform.pos.addVec(this.offset);
    }

    update()
    {
        //update position
        this.pos = this.gameObject.transform.pos.addVec(this.offset);
        Collision.checkCanvasCollisions(this);  
    }
}

class SquareCollider extends Collider
{
    constructor(offset, size)
    {
        super(offset)
        this.size = size;
        this.pos = Vector2D.zero;
    }

    start()
    {
        this.updatePos();
    }

    update()
    {
        this.updatePos();

        Collision.checkCanvasCollisions(this);
    }
}