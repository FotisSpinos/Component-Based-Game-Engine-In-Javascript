class Window
{
    static instance;

    constructor()
    {
        if(Window.instance == null)
            Window.instance = this;
            window.addEventListener("resize", this.resizeCanvaces);
    }

    //getInstance

    resizeCanvaces()
    {
        let currentScene = SceneManager.instance.runningScene;
        let sceneIndex = 0;

        if(currentScene != null)
            sceneIndex = currentScene.index;
             

        var gameArea = document.querySelectorAll("body div.gameArea");  //resieved all game areas for each scene

        var widthToHeight = 16 / 9;

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            gameArea[sceneIndex].style.height = newHeight + 'px';
            gameArea[sceneIndex].style.width = newWidth + 'px';
          } else { // window height is too high relative to desired game height
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