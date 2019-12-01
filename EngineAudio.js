class EngineAudio
{
    constructor(audioName, audioSrc, looped)
    {
        this.audio = new Audio(audioSrc);
        this.audioName = audioName;
        this.looped = looped;
    }
}