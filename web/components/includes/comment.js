import React from 'react';
import { Media } from 'reactstrap';
import gravatar from 'gravatar';
import { GetFormattedDate } from '../../lib/utils';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styleInline = { display: 'inline' };
        let { id, name, email, website, message, date } = this.props.comment;

        return (
            <Media>
                <a href={ website } target="_blank"><Media object src={ gravatar.url(email, {protocol: 'https'}) } className="mr-3 rounded-circle" alt={ name } /></a>
                <Media body>
                    <span><h4 className="mt-0" style={ styleInline }>{ name }</h4> <small>on { GetFormattedDate(date) }</small></span>
                    <p className="mt-2">{ message }</p>
                    { this.props.reply && 
                        <p><a id={ id } href="#" onClick={ this.props.onClick }>reply to { name }</a></p>
                    }
                    { this.props.children }
                </Media>
            </Media>
        )
    }
}