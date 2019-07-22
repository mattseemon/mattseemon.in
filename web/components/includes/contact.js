import React from 'react';
import { Button, Form, FormGroup, InputGroup, InputGroupAddon, Input, Alert } from 'reactstrap';
import axios from 'axios';

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

export default class ContactComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: {
                color: '',
                message: '',
                show: false
            },
            loading: false,
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
        
        axios.post('api/contact', { contact })
            .then((response) => {
                this.setAlert('success');
            })
            .catch((error) => {
                console.log(error);
                this.setAlert('failed');
            })
    }

    onReset = () => {
        this.setState({
            contact: Object.create(defaultContact)
        });
    }

    render() {
        return (
            <div>
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
                    <Button color="primary" outline type="submit" className="ml-2" >{ this.state.loading ? ( <i className="fa fa-spinner fa-spin" /> ) : ( <i className="fas fa-envelope"/> ) } Send Message</Button>
                </Form>
                <Alert color={ this.state.alert.color } isOpen={ this.state.alert.show } className="rounded-0 mt-2 mb-4">{ this.state.alert.message }</Alert>
            </div>
        )
    }
}