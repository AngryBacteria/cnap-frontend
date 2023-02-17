import { initializeApp } from 'firebase/app';
import {boot} from 'quasar/wrappers';
import { VueFire, VueFireAuth } from 'vuefire'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};
const firebaseApp = initializeApp(firebaseConfig);

export default boot(({ app }) => {
  app
    .use(VueFire, {
      firebaseApp,
      modules: [
        VueFireAuth(),
      ],
    })
});
export {firebaseApp}


