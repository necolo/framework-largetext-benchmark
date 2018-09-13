import { Handler, MarkSpecNames } from './handler';

export class Consoler {
    public statusEl!:HTMLSpanElement;
    public el:HTMLDivElement|null = null;

    constructor (handler:Handler) {
        const consolePanel = document.querySelector('#console') as HTMLDivElement;
        if (!consolePanel) { return; }

        this.el = consolePanel;

        const maxContentLength = document.querySelector('#maxContentLength');
        const minContentLength = document.querySelector('#minContentLength');
        const textCount = document.querySelector('#textCount');
        const status = document.querySelector('#status') as HTMLSpanElement;
        if (!maxContentLength || !minContentLength || !textCount || !status) {
            return;
        }

        handler.statusEl = status;
        maxContentLength.addEventListener('input', (ev) => setSpec(ev, 'maxContentLength'));
        minContentLength.addEventListener('input', (ev) => setSpec(ev, 'minContentLength'));
        textCount.addEventListener('input', (ev) => setSpec(ev, 'textCount'));
        
        function setSpec (ev, name:MarkSpecNames) {
            handler.spec[name] = ~~(ev.target as any).value;
        }
    }

    public addButton (name:string, action:() => void) {
        if (!this.el) { return; }
        const btn = document.createElement('button');
        btn.innerText = 'test ' + name; 
        btn.addEventListener('click', () => action());
        this.el.appendChild(btn);
    }
}

