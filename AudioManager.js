class AudioManager
{
static instance;

    constructor()
    {
        this.enabled = false;
        this.audios = [];
        this.audioNames = [];

        document.body.addEventListener("click", function () 
        {            
            if(AudioManager.instance.enabled)
                return;

            AudioManager.instance.enabled = true;
            
            if(AudioManager.instance.audioNames == null)
                return;
            //for(let i = 0; i < AudioManager.instance.audios.length; i++)
            //{
                AudioManager.instance.playAudio(AudioManager.instance.audioNames[0]);
            //}
        })

        AudioManager.instance = this;
    }

    addAudio(audioName, audio)
    {
       if(AudioManager.instance.enabled)
        return;

        AudioManager.instance.audios.push(audio);
        AudioManager.instance.audioNames.push(audioName);
    }

    playAudio(audioName)
    {
        if(!AudioManager.instance.enabled)
            return;

        for(let i = 0; i < AudioManager.instance.audios.length; i++)
        {
            if(AudioManager.instance.audioNames[i] == audioName)
            {
                AudioManager.instance.audios[i].play();
                return;
            }
        }
    }

    stopAudio(audioName)
    {
        for(let i = 0; i < AudioManager.instance.audios.length; i++)
        {
            if(AudioManager.instance.audioNames[i] == audioName)
            {
                AudioManager.instance.audios[i].pause();
                AudioManager.instance.audios[i].currentTime = 0;
            }
        }
    }
}