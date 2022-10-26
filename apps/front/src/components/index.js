import Button from './Button.vue'
import Modal from './Modal.vue'
import Slider from './Slider.vue'

export default (app) => {
  app.component('LnmUmbrelButton', Button)
  app.component('LnmUmbrelModal', Modal)
  app.component('LnmUmbrelSlider', Slider)
}
