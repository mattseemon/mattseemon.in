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
        const post = await require('../content/now.md')
        const document = matter(post.default);
        
        return{ ...document };
    }

    render() {
        return (
            <Page title={ this.props.data.title } subTitle={ this.props.data.subTitle }>
                <div className="pageContent">
                    <ReactMarkdown source={ this.props.content } escapeHtml={ false }/>
                </div>
                <div className="pageAnnotation">
                    <p><em>Inspired by <a href="https://sivers.org/now" target="_blank">Derek Sivers’</a> <a href="http://nownownow.com/" target="_blank">now page</a>  project.</em> <br />
                    Last updated on <strong>{ GetFormattedDate(this.props.data.lastUpdated) }</strong></p>
                </div>
            </Page>
        );
    }
}