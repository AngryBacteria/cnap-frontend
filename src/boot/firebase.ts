import { initializeApp } from 'firebase/app';
import { boot } from 'quasar/wrappers';
import { VueFire, VueFireAuth } from 'vuefire';

const firebaseConfig = {
  apiKey: 'AIzaSyCDwDM9EBhK2x_jcHhu9AIMPklvyF2JLnQ',
  authDomain: 'cnap-938d0.firebaseapp.com',
  projectId: 'cnap-938d0',
  storageBucket: 'cnap-938d0.appspot.com',
  messagingSenderId: '307216288865',
  appId: '1:307216288865:web:bf29d2ac4a7147508d6e20',
};
const firebaseApp = initializeApp(firebaseConfig);

export default boot(({ app }) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });
});
export { firebaseApp };
