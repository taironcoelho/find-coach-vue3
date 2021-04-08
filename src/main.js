import { createApp, defineAsyncComponent } from 'vue';
import store from './store';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
const app = createApp(App);

app.mount('#app');
