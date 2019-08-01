import React, { createRef } from 'react';
import { Row, Alert, Form, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import axios from 'axios';
import Comment from './comment';

const styleIcon = { color: 'var(--accent)' }
const defaultComment = { name: '', email: '', website: '', message: '', replyingTo: '' };

const refCommentForm = createRef();

export default class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enabled: props.enabled,
            slug: props.slug,
            reply: false,
            comment: Object.create(defaultComment),
            alert: { color: '', message: '', show: false }
        };
    }

    componentDidMount() {
        axios
            .get(`/api/comments/get?slug=${ this.props.slug }`)
            .then((response) => {
                this.setState({ ...response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onReply = (e) => {
        e.preventDefault();

        let comment = Object.create(defaultComment);
        comment.replyingTo = e.target.id;

        this.setState({ reply: true, comment: comment });
        
        refCommentForm.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
    }

    onCancelReply = (e) => {
        e.preventDefault();

        this.setState({ reply: false, comment: Object.create(defaultComment) });
    }

    onChange = (e) => {
        let comment = this.state.comment;
        comment[e.target.name] = e.target.value;
        
        this.setState({ comment: comment });
    }

    setAlert = (state) => {
        switch(state) {
            case 'success':
                this.setState({
                    reply: false, 
                    comment: Object.create(defaultComment),
                    alert : { color: 'success', message: 'Thank you for your comments. They will be visible shortly on this page.', show: true }
                }, () => { 
                    window.setTimeout(() => {
                        this.setState({ 
                            alert : { color: '', message: '', show: false }
                        });
                    }, 5000);
                });
                break;
            case 'failed':
                this.setState({
                    alert : { color: 'danger', message: 'It looks like there was an error submitting your comments. Please try again later.', show: true }
                });
                break;
            default:
                this.setState({
                    alert : { color: '', message: '', show: false }
                });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        let slug = this.state.slug, comment = this.state.comment;

        axios
            .post('/api/comments/post', { slug, comment })
            .then((response) => {    
                this.setAlert('success');
                axios.get(`/api/comments/get?slug=${ slug }`)
                    .then((response) => {
                        this.setState({ ...response.data });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setAlert('failed');
            });
    }

    render() {
        const styleReplyVisible = this.state.reply ? {} : { display: 'none'};
        let { alert, count, comments, enabled } = this.state;
        
        return (
            <div id='comments'>
                { comments &&
                    <div>
                        { (count > 0) && 
                            <div>
                                <h2 className="mt-5">{ count } Comments</h2>
                                <Row className="mt-5">
                                    { comments.map((comment, index) => {
                                        return (
                                            <Comment key={ index } comment={ comment } onClick={ this.onReply } reply={ enabled && true }>
                                                { comment.replies &&
                                                    <div id={ "replies-" + comment.id }>
                                                        { comment.replies.map((reply, index) => {
                                                            return (
                                                                <Comment key={ index } comment={ reply } reply={ false } />
                                                            );
                                                        })}
                                                    </div>
                                                }
                                            </Comment>
                                        );
                                    })}
                                </Row>
                            </div>
                        }
                        { enabled ? (
                            <div>
                                <div className="pageDivider mt-5" />
                                <h2 className="mt-5" ref={ refCommentForm }>Join the conversation <span style={ styleReplyVisible }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={ this.onCancelReply }>cancel reply</a></span></h2>
                                <Form onSubmit={ this.onSubmit }>
                                    <Row form>
                                        <InputGroup className="col-lg-4 mt-2">
                                            <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-user" style={ styleIcon }></i></div></InputGroupAddon>
                                            <Input id="name" name="name" type="text" className="border-left-0 rounded-0" placeholder="Your name *" minLength="2" required value={ this.state.comment.name } onChange={ this.onChange } />
                                        </InputGroup>
                                        <InputGroup className="col-lg-4 mt-2">
                                            <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-at" style={ styleIcon }></i></div></InputGroupAddon>
                                            <Input id="email" name="email" type="text" className="form-control border-left-0 rounded-0" placeholder="Your email *" required value={ this.state.comment.email } onChange={ this.onChange } />
                                        </InputGroup>
                                        <InputGroup className="col-lg-4 mt-2">
                                            <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-globe" style={ styleIcon }></i></div></InputGroupAddon>
                                            <Input id="website" name="website" type="text" className="form-control border-left-0 rounded-0" placeholder="Your website (optional)" value={ this.state.comment.website } onChange={ this.onChange } />
                                        </InputGroup>
                                    </Row>
                                    <Row form>
                                        <InputGroup className="col-xs-4 mt-2">
                                            <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-edit" style={ styleIcon }></i></div></InputGroupAddon>
                                            <Input id="message" name="message" type="textarea" className="form-control border-left-0 rounded-0" rows="8" placeholder="Your comments *" value={ this.state.comment.message } onChange={ this.onChange } />
                                        </InputGroup>
                                    </Row>
                                    <div>
                                        <input type="hidden" name="replyingTo" value={ this.state.comment.replyingTo } />
                                    </div>
                                    <Row form>
                                        <InputGroup className="input-group col mt-2">
                                            <Button color="primary" outline type="submit">Submit</Button>
                                        </InputGroup>
                                    </Row>
                                </Form>
                                <Alert color={ alert.color } isOpen={ alert.show } className="rounded-0 mt-2 mb-4">{ alert.message }</Alert>
                            </div>
                        ) : (
                            <div>
                                { (count > 0) && (
                                    <div>
                                        <div className="pageDivider mt-5" />
                                        <h2 className="mt-3">Comments are closed</h2>
                                        <p>If you have a question concerning the content of this page, please feel free to <a href="/contact">contact me</a>.</p>        
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
}