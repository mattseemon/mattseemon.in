import Page from '../components/layouts/page'
import React from 'react';
import { Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, Input, Button, Alert, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';
import ProfileData from '../data/profile.json';
import fetch from 'isomorphic-unfetch';

const styleIcon = {
    color: 'var(--accent)',
}

const styleNoResize = {
    resize: 'none'
}

const defaultContact = {
    Name: '',
    Email: '',
    Message: '',
    Source: '',
    Received: ''
}

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Contact',
            subTitle: 'Don\'t be a stranger!',
            profile: ProfileData.profile,
            alert: {
                color: '',
                message: '',
                show: false
            },
            contact: Object.create(defaultContact)
        }
    }

    onChange = (e) => {
        const contact = this.state.contact;
        contact[e.target.name] = e.target.value;
        this.setState({
            contact: contact
        });
    }

    setAlert = (state) => {
        switch(state) {
            case 'success':
                this.setState({
                    contact: Object.create(defaultContact),
                    alert : {
                        color: 'success',
                        message: 'Thank you for writing. I will be in touch with you shortly.',
                        show: true
                    }
                });
                break;
            case 'failed':
                this.setState({
                    alert : {
                        color: 'danger',
                        message: 'It looks like there was an error submitting the form. Please try again later.',
                        show: true
                    }
                });
                break;
            default:
                this.setState({
                    alert : {
                        color: '',
                        message: '',
                        show: false
                    }
                });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const contact = this.state.contact;
        contact.Received = Date.now();

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact })
        }).then((res) => {
            if(res.status === 200) {
                this.setAlert('success');
            } else {
                this.setAlert('failed');
            }
        }, (error) => {
            this.setAlert('failed');
        });
    }

    onReset = () => {
        this.setState({
            contact: Object.create(defaultContact)
        });
    }

    render() {
        return (
            <Page title={ this.state.title } subTitle={ this.state.subTitle }>
                <div className="pageContent">
                    <p>Thank you for your interest. If you have any questions about the services provided or just feel like getting in touch, you can fill up the form below and hit "Send message" or <strong style={ styleIcon }>go old school</strong>.</p>
                    <Row className="mt-5">
                        <Col lg="6" className="mb-2">
                            <Form onSubmit={ this.onSubmit }>
                                <FormGroup className="pb-0 mb-0">
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-user" style={ styleIcon }></i></div></InputGroupAddon>
                                        <Input id="Name" name="Name" placeholder="Your name*" className="border-left-0 rounded-0" minLength="2" required value={ this.state.contact.Name } onChange={ this.onChange } />
                                    </InputGroup>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-at" style={ styleIcon }></i></div></InputGroupAddon>
                                        <Input id="Email" name="Email" type="email" placeholder="Your email* (will remain private)" className="border-left-0 rounded-0"  required value={ this.state.contact.Email } onChange={ this.onChange } />
                                    </InputGroup>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon addonType="prepend"><span className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-edit" style={ styleIcon }></i></span></InputGroupAddon>
                                        <Input id="Message" name="Message" type="textarea" placeholder="Your message*" rows="10" className="border-left-0 rounded-0" required style={ styleNoResize } value={ this.state.contact.Message } onChange={ this.onChange } />
                                    </InputGroup>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-edit" style={ styleIcon }></i></div></InputGroupAddon>
                                        <Input id="Source" name="Source" placeholder="How did you hear about my website?" className="border-left-0 rounded-0" value={ this.state.contact.Source } onChange={ this.onChange } />
                                    </InputGroup>
                                </FormGroup>
                                <Button color="primary" outline type="reset" onClick={ this.onReset }>Reset</Button>
                                <Button color="primary" outline type="submit" className="ml-2"><i className="fas fa-envelope"></i> Send Message</Button>
                            </Form>
                            <Alert color={ this.state.alert.color } isOpen={ this.state.alert.show } className="rounded-0 mt-2 mb-4">{ this.state.alert.message }</Alert>
                        </Col>
                        <Col lg="6" className="mb-0">
                            <Card className="mb-2 border-0">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="row pt-4 pb-4">
                                            <div className="col-1">
                                                <i className="fas fa-envelope" style={ styleIcon }></i>
                                            </div>
                                            <div className="col-11">
                                                <a href={ "mailto:" + this.state.profile.contact.email } rel="noopener">{ this.state.profile.contact.email }</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row pt-4 pb-4">
                                            <div className="col-1">
                                                <i className="fas fa-phone-alt" style={ styleIcon }></i>
                                            </div>
                                            <div className="col-11">
                                                { this.state.profile.contact.mobile }
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="pageAnnotation">
                    <ul>
                        <li><em>Any information submitted by you via this form will be kept confidential and will be used only for the sole purpose of contacting you for the query posted and will not be used for any marketing purpose.</em></li>
                        <li><em>Clicking on the "Send Message" button, you agree to the <a href="/terms">Terms and Conditions of Service</a> and <a href="/privacy">Privacy Policy</a></em></li>
                    </ul>
                </div>
            </Page>
        );
    }
}