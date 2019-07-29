import Page from '../components/layouts/page';
import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown/with-html';
import { GetFormattedDate } from '../lib/utils';
import emoji from 'emoji-dictionary';

import Comments from '../components/includes/comments'


export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ query }) {
        let post = await require(`../content/${query.slug}.md`);
        let document = matter(post.default);

        return { ...document, slug: query.slug } ;
    }

    render() {
        const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name));
        let { title, excerpt, date, allowComments } = this.props.data;

        return (<Page title={ title } subTitle={ excerpt } date={ GetFormattedDate(date) }>
            <div className="pageContent">
                <div className="row">
                    <div className="col">
                        <ReactMarkdown source={ this.props.content } escapeHtml={ false } renderers={{ text: emojiSupport }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Comments slug={ this.props.slug } enabled={ allowComments } />
                    </div>
                </div>
            </div>
        </Page>);
    }
}
