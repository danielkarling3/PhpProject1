
AFRAME.registerComponent('markerhandler', {

    init: function() {
        const animatedMarker = document.querySelector("#animated-marker");

        // every click, we make our model grow in size
        animatedMarker.addEventListener('click', function(ev, target){
            if (animatedMarker.object3D.visible == true && ev.detail.cursorEl) {
                const entity = document.querySelector('#animated-model');
                const scale = entity.getAttribute('scale');
                Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                entity.setAttribute('scale', scale);
            }
        });
    }
    init: function () {
        this.playVideo = this.playVideo.bind(this);
        this.playVideoNextTick = this.playVideoNextTick.bind(this);
      },
      play: function () {
        window.addEventListener('vrdisplayactivate', this.playVideo);
        this.el.sceneEl.addEventListener('enter-vr', this.playVideoNextTick);
      },
      pause: function () {
        this.el.sceneEl.removeEventListener('enter-vr', this.playVideoNextTick);
        window.removeEventListener('vrdisplayactivate', this.playVideo);
      },
      playVideoNextTick: function () {
        setTimeout(this.playVideo);
      },
      playVideo: function () {
        var video = this.el.components.material.material.map.image;
        if (!video) { return; }
        video.play();
  }
});

