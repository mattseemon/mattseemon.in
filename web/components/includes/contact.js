import React from 'react';
import { Button, Form, FormGroup, InputGroup, InputGroupAddon, Input, Alert } from 'reactstrap';
import axios from 'axios';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3'

const styleIcon = { color: 'var(--accent)' };
const styleNoResize = { resize: 'none' };
const defaultContact = { name: '', email: '', message: '', source: '' };

export default class ContactComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: { color: '', message: '', show: false },
            loading: false,
            contact: Object.create(defaultContact),
            submitEnabled: false
        };
    }

    onChange = (e) => {
        const contact = this.state.contact;
        contact[e.target.name] = e.target.value;

        this.setState({ contact: contact });
    }

    setAlert = (state) => {
        switch(state) {
            case 'success':
                this.setState({
                    contact: Object.create(defaultContact),
                    alert : { color: 'success', message: 'Thank you for writing. I will be in touch with you shortly.', show: true }
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
                    alert : { color: 'danger', message: 'It looks like there was an error submitting the form. Please try again later.', show: true }
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

        const contact = this.state.contact;
        
        axios.post('/api/contact', { contact })
            .then((response) => {
                this.setAlert('success');
            })
            .catch((error) => {
                console.log(error);
                this.setAlert('failed');
            });
    }

    onReset = () => {
        this.setState({ contact: Object.create(defaultContact) });
    }

    onVerify = (token) => {
        if(token) {
            this.setState({ submitEnabled: true });
        }
    }

    render() {
        return (
            <div>
                <GoogleReCaptchaProvider
                 reCaptchaKey="6LfxNq0UAAAAAMdOrMZIwEozxkdigcXA2RA5yynr" >
                    <Form onSubmit={ this.onSubmit }>
                        <FormGroup className="pb-0 mb-0">
                            <InputGroup className="mb-2">
                                <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-user" style={ styleIcon }></i></div></InputGroupAddon>
                                <Input id="name" name="name" placeholder="Your name*" className="border-left-0 rounded-0" minLength="2" required value={ this.state.contact.name } onChange={ this.onChange } />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-at" style={ styleIcon }></i></div></InputGroupAddon>
                                <Input id="email" name="email" type="email" placeholder="Your email* (will remain private)" className="border-left-0 rounded-0"  required value={ this.state.contact.email } onChange={ this.onChange } />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroupAddon addonType="prepend"><span className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-edit" style={ styleIcon }></i></span></InputGroupAddon>
                                <Input id="message" name="message" type="textarea" placeholder="Your message*" rows="10" className="border-left-0 rounded-0" required style={ styleNoResize } value={ this.state.contact.message } onChange={ this.onChange } />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroupAddon addonType="prepend"><div className="input-group-text bg-transparent border-right-0 rounded-0"><i className="fas fa-edit" style={ styleIcon }></i></div></InputGroupAddon>
                                <Input id="source" name="source" placeholder="How did you hear about my website?" className="border-left-0 rounded-0" value={ this.state.contact.source } onChange={ this.onChange } />
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" outline type="reset" onClick={ this.onReset }>Reset</Button>
                        <Button color="primary" outline type="submit" className="ml-2" disabled={ !this.state.submitEnabled } >{ this.state.loading ? ( <i className="fa fa-spinner fa-spin" /> ) : ( <i className="fas fa-envelope"/> ) } Send Message</Button>
                    </Form>
                    <Alert color={ this.state.alert.color } isOpen={ this.state.alert.show } className="rounded-0 mt-2 mb-4">{ this.state.alert.message }</Alert>
                    <GoogleReCaptcha onVerify={ this.onVerify } />
                </GoogleReCaptchaProvider>
            </div>
        )
    }
}