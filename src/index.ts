import { Handler, MarkSpecNames } from './handlers/handler';
import createReact from './react';

interface MarkSpec {

}

function start () {
    const consolePanel = document.querySelector('#console');
    if (!consolePanel) { return; }

    const handler = new Handler();

    const testReact = document.querySelector('#testReact');
    const testVue = document.querySelector('#testVue');
    const maxContentLength = document.querySelector('#maxContentLength');
    const minContentLength = document.querySelector('#minContentLength');
    const textCount = document.querySelector('#textCount');
    const status = document.querySelector('#status') as HTMLSpanElement;
    if (!testReact || !testVue || !maxContentLength || !minContentLength || !textCount || !status) {
        return;
    }

    handler.statusEl = status;

    maxContentLength.addEventListener('input', (ev) => setSpec(ev, 'maxContentLength'));
    minContentLength.addEventListener('input', (ev) => setSpec(ev, 'minContentLength'));
    textCount.addEventListener('input', (ev) => setSpec(ev, 'textCount'));

    testReact.addEventListener('click', () => {
        createReact(handler);
    });

    consolePanel.appendChild(testReact);
    consolePanel.appendChild(testVue);

    function setSpec (ev, name:MarkSpecNames) {
        handler.spec[name] = ~~(ev.target as any).value;
    }
}

start();


