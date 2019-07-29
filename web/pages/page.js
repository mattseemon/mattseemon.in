import Page from '../components/layouts/page'
import matter from 'gray-matter';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { GetFormattedDate } from '../lib/utils';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ query }) {
        let post = await require(`../content/${query.id}.md`)
        let document = matter(post.default);
        
        return{ ...document };
    }

    render() {
        let { title, lastUpdated, credit } = this.props.data;

        return (
            <Page title={ title } >
                <div className="pageContent">
                    <ReactMarkdown source={ this.props.content } />
                </div>
                <div className="pageAnnotation">
                <p>Last updated on <strong>{ GetFormattedDate(lastUpdated) }</strong><br/>
                    <em>{ credit }</em></p>
                </div>
            </Page>
        );
    }
}