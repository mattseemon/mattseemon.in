import React from 'react';
import ProfileData from '../../data/profile.json';
import { Container, ModalFooter, Button, Row, Col } from 'reactstrap';
import HtmlParser from 'react-html-parser';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';

const styleHeart = {
    color: "red"
}

const styleCredits = {
    lineHeight: "40px"
}

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile : ProfileData.profile,
            showCredits: false
        }

        this.toggleCredits = this.toggleCredits.bind(this);
    }

    toggleCredits() {
        this.setState(previousState => ({
            showCredits: !previousState.showCredits
        }));
    }

    render() {
        return (
            <footer>
                <Container>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="copy">
                                <p>{ HtmlParser(this.state.profile.copyright) }</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="social">
                                { this.state.profile.socials.map((social) => {
                                    return <a key={ social.id } href={ social.url } className="btn btn-outline-primary" title={ social.title } target="_blank"><i className={ social.icon }></i></a>
                                })}
                                <a className="credit btn btn-outline-primary" title="Update user content" href="/static/admin/index.html" target="_blank" ><i className="fas fa-user-cog"></i></a>
                                <a className="credit btn btn-outline-primary" title="View credits for this site" onClick={ this.toggleCredits }><i className="fas fa-heart"></i></a>
                                <Modal isOpen={ this.state.showCredits } toggle={ this.toggleCredits } centered>
                                    <ModalHeader toggle={ this.toggleCredits }>Give credit where credit's due!</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <p>Logo design by <a href="https://raaghavshankar.wixsite.com/portfolio" target="_blank">Raaghav Zeontose Bloo Shankar</a>.</p>
                                            <p>User interface inspired by <a href="https://github.com/calintat/minimal" target="_blank">Minimal</a> by <a href="https://github.com/calintat/" target="_blank">Calin Tataru</a>.</p>
                                            <p>Powered by <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://reactjs.org/" target="_blank">React</a> &amp; <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>.</p>
                                            <p>Get the source code for this site from <a href="https://github.com/mattseemon/mattseemon.in" target="_blank">Github</a>.</p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div className="container pr-0 pl-0">
                                            <div className="row">
                                                <div className="col-8" style={ styleCredits }><p className="mb-0">Made with <i className="fas fa-heart" style={ styleHeart }></i> in Goa, India.</p></div>
                                                <div className="col-4 text-right"><Button outline color="primary" onClick={ this.toggleCredits }>Close</Button></div>
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>
        )
    }
}