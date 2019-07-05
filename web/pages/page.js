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
        console.log(query);

        const post = await require(`../content/${query.id}.md`)
        const document = matter(post.default);
        
        return{ ...document };
    }

    render() {
        return (
            <Page title={ this.props.data.title } >
                <div className="pageContent">
                    <ReactMarkdown source={ this.props.content } />
                </div>
                <div className="pageAnnotation">
                <p>Last updated on <strong>{ GetFormattedDate(this.props.data.lastUpdated) }</strong><br/>
                    <em>{ this.props.data.credit }</em></p>
                </div>
            </Page>
        );
    }
}