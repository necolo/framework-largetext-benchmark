import { Component, Vue, Prop } from 'vue-property-decorator';
import { Handler } from '../handlers/handler';

@Component
export default class App extends Vue {
    @Prop() public handler!:Handler; 

    public mounted() {
        this.handler.startGenContents(() => this.$forceUpdate());
    }

    public time = 0;
    public beforeUpdate () {
        this.time = new Date().getTime();
    }

    public updated () {
        const useTime = new Date().getTime();    
        this.handler.timers.vue.push(useTime);
    }
}