class Axis
{
    constructor(id, positiveKeyID, negativeKeyID, rate)
    {
        this.id = id;
        this.rate = rate;

        this.positiveKeyID = positiveKeyID;
        this.negativeKeyID = negativeKeyID;

        this.increaseFactor = 0;
        this.decreaseFactor = 0;
    }

    get axisValue()
    {
        return this.increaseFactor - this.decreaseFactor;
    }

    culculateFactor = function(factor, key)
    {
        if(Input.instance.keys[key] == true)
            factor += this.rate; 
        else if(factor - this.rate >= 0)
            factor -= this.rate;
        else 
            factor = 0;

        if(factor > 1)
            return 1;

        return factor;
    }

    update = function()
    {
        this.increaseFactor = this.culculateFactor(this.increaseFactor, this.positiveKeyID);
        this.decreaseFactor = this.culculateFactor(this.decreaseFactor, this.negativeKeyID);

        console.log(this.axisValue);
    }
}

// make value parameter from -1 to 1 
    // make parameter to represent the increase factor (from 0 to 1)
    // make parameter to represent the decrease factor (from 0 to -1)
    // This will help us culculate the axis value by doing (increase factor - decrease factor)
    // make value to represent key to increase the value param
    // make value to represent key to dincrease the value param
    // make rate value to increase or decrease class

    // correct increasing is pressed the value increases from 0 to 1 dinamically
    // correct decreasing is pressed the value increases from 0 to 1 dinamically