import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Handler } from '../handlers/handler';
import { App } from './app';
import { EventBus } from '../handlers/event';

export = function (handler:Handler) {
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