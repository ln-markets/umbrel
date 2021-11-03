import Button from './Button.vue'
import Modal from './Modal.vue'
import Slider from './Slider.vue'
import FontAwesomeIcon from './font-awesome.js'

export default (app) => {
  app.component('LnmUmbrelButton', Button)
  app.component('LnmUmbrelModal', Modal)
  app.component('LnmUmbrelSlider', Slider)
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
