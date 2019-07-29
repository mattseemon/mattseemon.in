import Page from '../components/layouts/page'
import React from 'react';
import matter from 'gray-matter';
import Link from 'next/link';

import { GetFormattedDate } from '../lib/utils';

export default class Writing extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ query }) {
        let page = query.page ? parseInt(query.page) : 1;

        let allPosts = (ctx => {
            let keys = ctx.keys(),  values = keys.map(ctx);

            let data = keys.map((key, index) => {
                let slug =  'articles/' + key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
                let value = values[index], document = matter(value.default);

                return { document, slug }
            });

            data.sort((a, b) => (new Date(b.document.data.date) - new Date(a.document.data.date)));

            return data;
        })(require.context('../content/articles', true, /\.md$/));

        // Pagination
        let totalPosts = allPosts.length, totalPages = Math.ceil(totalPosts / 5);

        let startIndex = (page * 5) - 5;
        var posts = allPosts.splice(startIndex, 5);

        return { posts, page, totalPages };
    }

    getClassNames(props) {
        if(props.disabled) { return "page-item disabled" }
        if(props.active) { return "page-item active" }
        return "page-item";
    }

    renderPagination(totalPages, currentPage) {
        let pageLinks = [];
        pageLinks.push(
            <li className={ this.getClassNames({ disabled:currentPage === 1 }) } key='first'>
                <Link href={{ pathname: `/writing/${ currentPage-1 }` }}>
                    <a className="page-link rounded-0">Previous</a>
                </Link>
            </li>);

        let start = 1, end = totalPages;

        if(totalPages > 5) {
            start = (currentPage - 2 > 0) ? currentPage - 2 : 1;
            end = (start + 4 < totalPages) ? start + 4 : totalPages;
            if((end - start) < 5)
                start = end - 4;
        }

        for(var i = start; i <= end; i++) {
            pageLinks.push(
                <li className={this.getClassNames({ active:i === currentPage }) } key={ i }>
                    <Link href={{ pathname: `/writing/${ i }` }}>
                        <a className="page-link rounded-0">{ i }</a>
                    </Link>
                </li>);
        }

        pageLinks.push(
            <li className={ this.getClassNames({ disabled:currentPage === totalPages }) } key="last">
                <Link href={{ pathname: `/writing/${ currentPage+1 }` }}>
                    <a className="page-link rounded-0">Next</a>
                </Link>
            </li>);

        return pageLinks;
    }

    render() {
        let { posts, page, totalPages } = this.props;

        return (
            <Page title="Writing" subTitle="Short stories & other stuff!" >
                <div className="pageContent">
                    { (posts && posts.length > 0 ) ? (
                        <div>
                            {this.props.posts.map((post, index) => (
                                <div key={index}>
                                    <h2>{ post.document.data.title }</h2>
                                    <p>{ GetFormattedDate(post.document.data.date) }</p>
                                    <p>{ post.document.data.excerpt }</p>
                                    <p><Link href={{ pathname: `/writing/${post.slug}`}} ><a>read more...</a></Link></p>
                                </div>
                            ))}
                            { this.props.totalPages > 1 &&  
                                <nav aria-label="..." className="mt-5">
                                    <ul className="pagination">
                                        { this.renderPagination(this.props.totalPages, this.props.page) }
                                    </ul>
                                </nav>
                            }
                        </div>
                    ) : (
                        <div>
                            <h4>No articles published yet.</h4>
                        </div>
                    )}
                </div>
            </Page>
        );
    }
}