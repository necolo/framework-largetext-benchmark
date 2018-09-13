import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Handler } from '../handlers/handler';
import { App } from './app';
import { EventBus } from '../handlers/event';
import { Consoler } from '../handlers/consoler';

const handler = new Handler();
const consoler = new Consoler(handler);
consoler.addButton('react', testReact);

function testReact () {
    const root = document.createElement('div');
    const testBoard = document.querySelector('#test');
    if (!testBoard) { return; }

    testBoard.appendChild(root);

    handler.addTimer('react');
    handler.events['react'] = new EventBus<undefined>();

    ReactDOM.render(
        <App handler={handler} />,
        root,
    )
}