import Page from '../components/layouts/page'
import React from 'react';

export default class Now extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Now",
            subTitle: "Here's what I'm upto!"
        }
    }

    render() {
        return (
            <Page title={ this.state.title } subTitle={ this.state.subTitle }>
                <div className="pageContent">
                    <p>Here's what is happening currently in my life.</p>
                    <ul>
                        <li>Moved to Goa from Bangalore in March, 2019. I was done with being sick most of the year <sup>(allergies)</sup> and dealing with the crazy traffic.</li>
                        <li>Mostly spending my time setting up my new place.</li>
                        <li>Waiting to get my kids, Pixie and Dust to join me here. Missing them terribly.</li>
                        <li>Enjoying the Monsoons properly for the first time in years.</li>
                        <li>And finally, drinking a lot of beer on the beach.</li>
                    </ul>
                    <div class="text-center">
                        <img src="../static/assets/images/pixie_dust/pixie_dust.jpg" className="img-fluid rounded-circle border border-secondary" width="512"/>
                    </div>
                </div>
                <div className="pageAnnotation">
                    <p><em>Inspired by <a href="https://sivers.org/now" target="_blank">Derek Sivers’</a> <a href="http://nownownow.com/" target="_blank">now page</a>  project.</em> <br />
                    Last updated on <strong>22 June 2019</strong></p>
                </div>
            </Page>
        );
    }
}