System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AudioData, Sound;
    return {
        setters: [],
        execute: function () {
            AudioData = class AudioData {
                constructor(start, volume, loop) {
                    this._start = start;
                    this._volume = volume;
                    this._loop = loop;
                    this._ready = true;
                }
                get ready() {
                    return this._ready;
                }
                get start() {
                    return this._start;
                }
                get volume() {
                    return this._volume;
                }
                get loop() {
                    return this._loop;
                }
                set ready(value) {
                    this._ready = value;
                }
                set start(value) {
                    this._start = value;
                }
                set volume(value) {
                    this._volume = value;
                }
                set loop(value) {
                    this._loop = value;
                }
            };
            Sound = class Sound {
                constructor() {
                    this.initialize();
                }
                initialize() {
                    this._status = new Map();
                }
                reset() {
                    let sounds = document.getElementsByTagName("audio");
                    //clear all sounds
                    [].forEach.call(sounds, sound => {
                        this.clear(sound);
                    });
                }
                isPlaying(sound) {
                    if (!this._status.has(sound)) {
                        return false;
                    }
                    return !this._status.get(sound).ready;
                }
                setup(sound, start, volume, loop) {
                    if (!this._status.has(sound)) {
                        this._status.set(sound, new AudioData(start, volume, loop));
                        //clear on finish
                        sound.addEventListener("ended", () => {
                            this.clear(sound);
                        });
                    }
                }
                play(sound, start = 0, volume = 1, loop = false) {
                    this.setup(sound, start, volume, loop);
                    //when sound is ready to play
                    let data = this._status.get(sound);
                    if (data.ready) {
                        sound.currentTime = start;
                        sound.volume = volume;
                        sound.loop = loop;
                        sound.play();
                        data.ready = false;
                    }
                }
                clear(sound) {
                    if (!this._status.has(sound)) {
                        return;
                    }
                    let data = this._status.get(sound);
                    if (!data.ready) {
                        sound.currentTime = data.start;
                        sound.volume = data.volume;
                        sound.loop = data.loop;
                        sound.pause();
                        //indicate clear success
                        data.ready = true;
                    }
                }
            };
            exports_1("default", new Sound());
        }
    };
});
//# sourceMappingURL=sound.js.map