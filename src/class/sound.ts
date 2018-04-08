import { IAudioData, IAudioPlayer } from "src/interfaces";

class AudioData implements IAudioData {

    private _ready: boolean; //sound ready to play
    private _start: number;  //default start time
    private _volume: number; //default volume
    private _loop: boolean;  //repeat sound on end

    constructor(start: number, volume: number, loop: boolean) {

        this._start = start;
        this._volume = volume;
        this._loop = loop;
        this._ready = true;
    }

    get ready(): boolean {

        return this._ready;
    }

    get start(): number {

        return this._start;
    }

    get volume(): number {

        return this._volume;
    }

    get loop(): boolean {

        return this._loop;
    }

    set ready(value: boolean) {

        this._ready = value;
    }

    set start(value: number) {

        this._start = value;
    }

    set volume(value: number) {

        this._volume = value;
    }

    set loop(value: boolean) {

        this._loop = value;
    }
}

class Sound implements IAudioPlayer {

    private _status: Map<HTMLAudioElement, IAudioData>;

    constructor() {

        this.initialize();
    }

    public initialize(): void {

        this._status = new Map<HTMLAudioElement, IAudioData>();
    }

    public reset(): void {

        let sounds = document.getElementsByTagName("audio");
        //clear all sounds
        [].forEach.call(sounds, sound => {

            this.clear(sound);
        });
    }

    private setup(

        sound: HTMLAudioElement,
        start: number,
        volume: number,
        loop: boolean

    ): void {

        if(!this._status.has(sound)) {

            this._status.set(sound, new AudioData(start, volume, loop));
            //clear on finish
            sound.addEventListener("ended", () => {

                this.clear(sound);
            });
        }
    }

    private clear(sound: HTMLAudioElement): void {

        if(!this._status.has(sound)) {

            return;
        }

        let data = this._status.get(sound);

        if(!data.ready) {

            sound.currentTime = data.start;
            sound.volume = data.volume;
            sound.loop = data.loop;
            sound.pause();
            //indicate clear success
            data.ready = true;
        }
    }

    public play(

        sound: HTMLAudioElement,
        start: number = 0,
        volume: number = 1,
        loop: boolean = false

    ): void {

        this.setup(sound, start, volume, loop);
        //when sound is ready to play
        let data = this._status.get(sound);

        if(data.ready) {

            sound.currentTime = start;
            sound.volume = volume;
            sound.loop = loop;
            sound.play();
            data.ready = false;
        }
    }
}

export default new Sound();