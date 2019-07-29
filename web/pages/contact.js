import Page from '../components/layouts/page'
import React from 'react';
import { Row, Col, Card, ListGroup, ListGroupItem } from 'reactstrap';
import ProfileData from '../data/profile.json';
import ContactForm from '../components/includes/contact';

const styleIcon = { color: 'var(--accent)' };

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = { title: 'Contact', subTitle: 'Don\'t be a stranger!', profile: ProfileData.profile };
    }

    static async getInitialProps({ query }) {
        return { }
    }

    render() {
        let { title, subTitle, profile } = this.state;

        return (
            <Page title={ title } subTitle={ subTitle }>
                <div className="pageContent">
                    <p>Thank you for your interest. If you have any questions about the services provided or just feel like getting in touch, you can fill up the form below and hit "Send message" or <strong style={ styleIcon }>go old school</strong>.</p>
                    <Row className="mt-5">
                        <Col lg="6" className="mb-2">
                            <ContactForm key="contactForm" />
                        </Col>
                        <Col lg="6" className="mb-0">
                            <Card className="mb-2 border-0">
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <Row className="pt-4 pb-4">
                                            <Col xs="1">
                                                <i className="fas fa-envelope" style={ styleIcon }></i>
                                            </Col>
                                            <Col xs="11">
                                                <a href={ "mailto:" + profile.contact.email } rel="noopener">{ profile.contact.email }</a>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row className="pt-4 pb-4">
                                            <Col xs="1">
                                                <i className="fas fa-phone-alt" style={ styleIcon }></i>
                                            </Col>
                                            <Col xs="11">
                                                { profile.contact.mobile }
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
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