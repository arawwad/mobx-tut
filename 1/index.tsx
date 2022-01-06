import * as React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const item = observable.box(30);

const ItemDisplay = observer(() => <h1>Current Item Value = {item.get()}</h1>);

ReactDOM.render(<ItemDisplay />, document.getElementById('root'));

setTimeout(() => item.set(50), 2000);
