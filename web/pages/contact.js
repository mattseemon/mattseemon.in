import Page from '../components/layouts/page'
import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import ProfileData from '../data/profile.json';
import ContactForm from '../components/includes/contact';

//import { loadReCaptcha, ReCaptcha  } from 'react-recaptcha-v3'

import { GoogleReCaptchaProvider, withGoogleReCaptcha } from 'react-google-recaptcha-v3'

const styleIcon = {
    color: 'var(--accent)',
}

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Contact',
            subTitle: 'Don\'t be a stranger!',
            profile: ProfileData.profile,
        }
    }

    render() {
        return (
            <Page title={ this.state.title } subTitle={ this.state.subTitle }>
                <div className="pageContent">
                    <p>Thank you for your interest. If you have any questions about the services provided or just feel like getting in touch, you can fill up the form below and hit "Send message" or <strong style={ styleIcon }>go old school</strong>.</p>
                    <Row className="mt-5">
                        <Col lg="6" className="mb-2">
                            <GoogleReCaptchaProvider reCaptchKey="6LfxNq0UAAAAAMdOrMZIwEozxkdigcXA2RA5yynr">
                                <ContactForm key="contactForm" />
                            </GoogleReCaptchaProvider>
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