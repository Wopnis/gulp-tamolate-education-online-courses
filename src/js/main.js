import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({ btns: '.next', page: '.page' });
  slider.render();

  const player = new VideoPlayer('.showup .play', '.overlay');
  player.init();

  new Difference('.officerold', '.officernew', '.officer__card-item').init();
  new Form('.form').init();
});
