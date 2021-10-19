import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faBars,
  faHome,
  faIdCard,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import {
  faTwitter,
  faTelegram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

library.add(faBars, faHome, faIdCard, faTimes, faTwitter, faTelegram, faGithub)

export { FontAwesomeIcon }
