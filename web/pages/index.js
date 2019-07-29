import Home from '../components/layouts/home'
import React from 'react';
import Typed from 'react-typed';
import ProfileData from '../data/profile.json';

const styleTitle = { textTransform: 'uppercase' };
const styleTitleEmphasis = { color: 'var(--accent)' };

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = { profile: ProfileData.profile }
    }

    render() {
        let { firstName, lastName, labels, summary } = this.state.profile;

        return (
            <Home>
                <div className="intro">
                    <h1 style={styleTitle}>{ firstName } <span style={styleTitleEmphasis}>{ lastName }</span></h1>
                    <h2>
                        <Typed strings={ labels } typeSpeed={100} loop/>
                    </h2>
                </div>
                <div className="bio_summary">
                    <p>{ summary }</p>
                    <p><a href="/now" className="btn btn-outline-primary">and /now</a></p>
                </div>
            </Home>
        );
    }
}