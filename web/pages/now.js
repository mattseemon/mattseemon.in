import Page from '../components/layouts/page'
import matter from 'gray-matter';
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { GetFormattedDate } from '../lib/utils';

export default class Now extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ req }) {
        let post = await require('../content/now.md')
        let document = matter(post.default);
        

        return{ ...document };
    }

    render() {
        let { title, subTitle, lastUpdated } = this.props.data;

        return (
            <Page title={ title } subTitle={ subTitle }>
                <div className="pageContent">
                    <ReactMarkdown source={ this.props.content } escapeHtml={ false }/>
                </div>
                <div className="pageAnnotation">
                    <p><em>Inspired by <a href="https://sivers.org/now" target="_blank">Derek Sivers’</a> <a href="http://nownownow.com/" target="_blank">now page</a>  project.</em> <br />
                    Last updated on <strong>{ GetFormattedDate(lastUpdated) }</strong></p>
                </div>
            </Page>
        );
    }
}