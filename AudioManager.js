class AudioManager
{
static instance;

    constructor()
    {
        if(AudioManager.instance == null)
            AudioManager.instance = this;
            
        this.enabled = false;

        this.engineAudios = [];

        document.body.addEventListener("click", function () 
        {            
            if(AudioManager.instance.enabled)
                return;

            AudioManager.instance.enabled = true;
            
            AudioManager.instance.playAudio(AudioManager.instance.engineAudios[0].audioName);
        })
    }

    addAudio(engineAudio)
    {
       if(AudioManager.instance.enabled)
            return;

        AudioManager.instance.engineAudios.push(engineAudio);

        if(engineAudio.looped)
        {
            engineAudio.audio.addEventListener('ended', function() 
            {
                engineAudio.currentTime = 0;
                engineAudio.audio.play();
            });
        }
    }

    playAudio(audioName)
    {
        if(!AudioManager.instance.enabled)
            return;

        for(let i = 0; i < AudioManager.instance.engineAudios.length; i++)
        {
            if(AudioManager.instance.engineAudios[i].audioName == audioName)
            {
                AudioManager.instance.engineAudios[i].audio.play();
                return;
            }
        }
    }

    stopAudio(audioName)
    {
        for(let i = 0; i < AudioManager.instance.engineAudios.length; i++)
        {
            if(AudioManager.instance.engineAudios[i].audioName == audioName)
            {
                AudioManager.instance.engineAudios[i].audio.pause();
                AudioManager.instance.engineAudios[i].audio.currentTime = 0;
            }
        }
    }
}