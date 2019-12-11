class Window
{
    static instance;

    constructor()
    {
        if(Window.instance == null)
            Window.instance = this;
            window.addEventListener("resize", this.resizeCanvaces);
    }

    resizeCanvaces()
    {
        let currentScene = SceneManager.instance.runningScene;
        let sceneIndex = 0;

        if(currentScene != null)
            sceneIndex = currentScene.index;
             
        //Resieves the canvas container
        var gameArea = document.querySelectorAll("body div.CanvasContainer");  

        var widthToHeight = 16 / 9;

        //Assigns the actual window height
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        var newWidthToHeight = newWidth / newHeight;

        // reculculates the cantainer's dimentions
        if (newWidthToHeight > widthToHeight) 
        {
            newWidth = newHeight * widthToHeight;
            gameArea[sceneIndex].style.height = newHeight + 'px';
            gameArea[sceneIndex].style.width = newWidth + 'px';
        } 
        else 
        {
            newHeight = newWidth / widthToHeight;
            gameArea[sceneIndex].style.width = newWidth + 'px';
            gameArea[sceneIndex].style.height = newHeight + 'px';
        }

        gameArea[sceneIndex].style.marginTop = (-newHeight / 2) + 'px';
        gameArea[sceneIndex].style.marginLeft = (-newWidth / 2) + 'px';

        gameArea[sceneIndex].style.fontSize = (newWidth / 400) + 'em';
        
        if(SceneManager.instance.runningScene == null)
          return;
        
        let sceneCanvaces = SceneManager.instance.runningScene.canvaces;
    }
}