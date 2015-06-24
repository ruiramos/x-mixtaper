Polymer({
  is: 'x-mixtaper',

  created: function() {
    console.log("xmix created");
  },
  publish: {
    audioFilesUrl: {
      reflect: true
    },
    playing: {
      value: false
    }
  },

  /**
    Executes when everything is in its right place

    @method ready
  */
  ready: function(){
    var that = this;

    this.trackDuration = 0;
    this.trackElapsed = 0;

    this.$.audioElement.addEventListener('canplay', function(){
      var theAudio = this;

      that.trackDuration = this.duration * 1000;
      that.trackElapsed = this.currentTime;

      this.play();
      that.playing = true;
    });

    // whenever it's playing, we want the slider moving!
    this.$.audioElement.addEventListener('playing', function(){
      that.startSliderTimer();
    });

    this.$.audioElement.addEventListener('ended', function(){
      for(var i = 0; i < that.tape.songs.length; i++){
        if(that.tape.songs[i] === that.selectedSong){
          break;
        }
      }
        var next = (i === that.tape.songs.length - 1) ? 0 : i+1;
        that.playSong(that.tape.songs[next]);

    });

    this.$.slider.addEventListener('manual-change', function(evt, d){
      // user changed the slider, update the audio position
      console.log('setting audio ', that.$.audioElement, 'to', this.value / 1000);
      that.$.audioElement.currentTime = this.value / 1000;
    });
  },

  /**
    Triggered when the data comes back from the API.
    For now it simply starts playing the first song.

    @method tapeLoadedHandler
  */
  tapeLoadedHandler: function(){
    // starts playing the first song by default
    //this.playSong(this.tape.songs[0]);
  },

  stopButtonHandler: function(){
    if(!this.playing) return;
    this.playing = false;
    this.$.audioElement.pause();
    clearRequestInterval(this.sliderUpdateInterval);
  },

  playButtonHandler: function(){
    if(this.playing) return;

    if(!this.$.audioElement.attributes.src.value){
      this.playSong(this.tape.songs[0]);
    }

    this.playing = true;
    this.$.audioElement.play();

  },

  /**
    Handling playlist clicks

    @method playSongHandler
  */
  playListCLickHandler: function(e, song){
    if(song === this.selectedSong){
      // just restart the current song
      this.$.audioElement.currentTime = 0;
    } else {
      this.playSong(song);
    }
  },

  /**
    Starts playing the selected song.

    @method playSong
  */
  playSong: function(song){
    this.playing = false;

    if(this.selectedSong){
      this.selectedSong.active = false;
    }

    song.active = true;

    this.selectedSong = song;
  },

  startSliderTimer: function(){
    var that = this;

    if(this.sliderUpdateInterval)
      clearRequestInterval(this.sliderUpdateInterval);

    this.sliderUpdateInterval = requestInterval(function(){
      that.trackElapsed = that.$.audioElement.currentTime * 1000;
    }, 120);
  }

});
