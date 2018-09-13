import Vue from 'vue';
import App from './App.vue';
import { EventBus } from '../handlers/event';
import { Handler } from '../handlers/handler';
import { Consoler } from '../handlers/consoler';

const handler = new Handler();
const consoler = new Consoler(handler);
consoler.addButton('vue', testVue);

function testVue () {
    Vue.config.productionTip = false; 

    handler.addTimer('vue');
    handler.events['vue'] = new EventBus<undefined>();

    new Vue({
        render: (createElement) => createElement(App, {
            props: { handler },
        }),
        mounted: function () {

        },
    }).$mount('#test');
}