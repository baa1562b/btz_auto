import { createApp, VueElement } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'




import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBQQ5axDAutwcDz7sAomsElo3-Nz9WNmnQ",
  authDomain: "btz-auto.firebaseapp.com",
  projectId: "btz-auto",
  storageBucket: "btz-auto.appspot.com",
  messagingSenderId: "797121804974",
  appId: "1:797121804974:web:23a09498f8d84eef92cb3f"
};


const app = initializeApp(firebaseConfig);

createApp(App).use(store).use(router).use(messagePlugin).mount('#app')

