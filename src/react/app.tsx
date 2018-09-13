import * as React from 'react';
import { Handler } from '../handlers/handler';

interface Props {
    handler:Handler;
}

interface State {
}
export class App extends React.Component<Props, State> {
    public componentDidMount () {
        const { handler } = this.props;
        handler.startGenContents(() => this.forceUpdate());
    }

    public time = 0;
    public componentWillUpdate () {
        this.time = new Date().getTime();
    }

    public componentDidUpdate () {
        const useTime = new Date().getTime() - this.time;
        this.props.handler.timers.react.push(useTime);
    }

    public render () {
        console.log('react rendered');
        const { contents } = this.props.handler;
        return (<div> React Test
            { contents.map((content, i) => <p key={i}>
                { content }
            </p>, ) }
        </div>);
    }
}