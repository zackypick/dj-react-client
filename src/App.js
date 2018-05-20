import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            greeting: undefined,
        };

        this.handleChange = this.handleChange.bind(this);
        this.getGreeting = this.getGreeting.bind(this);
    }

    render() {
        const {greeting, name} = this.state;

        return (
            <div className="App">
                <form className="form-inline">
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className={'form-control'}
                            placeholder={'And you are...'}
                            onChange={this.handleChange}
                        />
                        <button
                            type={'button'}
                            disabled={!name || name.length === 0}
                            onClick={this.getGreeting}
                            className={'btn btn-primary'}>
                            Get greeted
                        </button>
                    </div>
                </form>
                {greeting && <header className={'banner-bg'}>
                    <div className={'banner'} dangerouslySetInnerHTML={{__html: greeting}}/>
                </header>}
            </div>
        );
    }

    getGreeting() {
        const {name} = this.state;
        fetch(`http://localhost:8090/greet/${name}`)
            .then((response) => response.text())
            .then((greeting) => {
                this.setState({greeting});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }
}

export default App;
