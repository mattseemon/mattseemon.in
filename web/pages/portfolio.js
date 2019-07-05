import Page from '../components/layouts/page'
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import PortfolioData from '../data/portfolio.json';

const styleAnnotationIcon = {
    color: "var(--accent)"
}

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.switchTab = this.switchTab.bind(this);
        this.state = {
            title: "Portfolio & Services",
            subTitle: "What I do and offer!",
            activeTab: '1',
            portfolio: PortfolioData.portfolio
        }
    }

    switchTab(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Page title={ this.state.title } subTitle={ this.state.subTitle }>
                <div className="pageContent">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={ classnames({ active:this.state.activeTab === '1'}) } onClick={() => { this.switchTab('1'); }}>Voice-Over Artist</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={ classnames({ active:this.state.activeTab === '2'}) } onClick={() => { this.switchTab('2'); }}>Karaoke Jockey</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={ classnames({ active:this.state.activeTab === '3'}) } onClick={() => { this.switchTab('3'); }}>Compère</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={ classnames({ active:this.state.activeTab === '4'}) } onClick={() => { this.switchTab('4'); }}>Novice Actor</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={ this.state.activeTab }>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <p>Matt’s rich, deep baritone is the perfect fit for television and radio promos, documentaries, powerful dramatic narrations, and corporate AV and audiobooks. His voice quality is crisp, clear and distinctive, making it  effective for subtle, intense reads, reporting and serious narrations. Additionally, his voice is very approachable, lending itself easily to a variety of characters.</p>
                                    <p>Services offered:</p>
                                    <ul>
                                        <li>Radio and Television Promos</li>
                                        <li>Documentaries</li>
                                        <li>Narrations</li>
                                        <li>Corporate AV</li>
                                        <li>IVR</li>
                                        <li>Audiobooks</li>
                                        <li>E-Learning</li>
                                    </ul>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <p>A regular, friendly face at Bangalore’s karaoke scene, Matt has combined his rich voice and presentation skills with his passion for music and singing by hosting karaoke nights at multiple venues in Bangalore.</p>
                                    <p>Apart from a huge collection of karaoke tracks spread across various genres in English, Matt also  has an assortment of Bollywood karaoke tracks on offer.</p>
                                    <p>A few venues where Matt has previously hosted karaoke events include:</p>
                                    <ul>
                                        <li>Xtreme Sports Bar, Bannerghatta Road</li>
                                        <li>Xtreme Sports Bar, Indiranagar</li>
                                        <li>White Elephant, 100ft Road, Indiranagar</li>
                                        <li>The Palazzo, National Games Village</li>
                                        <li>The United Sports Bar and Grill, Whitefield</li>
                                        <li>Hokey Cokey, Koramangala</li>
                                        <li>Harry’s Bar &amp; Cafe, Indiranagar</li>
                                        <li>Prost, Koramangala</li>
                                        <li>Hard Rock Cafe, M G Road</li>
                                        <li>Boozers, Indiranagar.</li>
                                        <li>1131, Indiranagar</li>
                                    </ul>
                                    <p>Services offered:</p>
                                    <ul>
                                        <li>Restaurants &amp; Bars</li>
                                        <li>Corporate Events</li>
                                        <li>Private Parties</li>
                                    </ul>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <p>Matt’s rich voice quality and presentation style brings in the perfect balance of fun, charm and seriousness to an event.</p>
                                    <p>Services offered:</p>
                                    <ul>
                                        <li>Celebrity Events/Concerts</li>
                                        <li>Corporate Day Out</li>
                                        <li>Game Shows</li>
                                        <li>Award Ceremonies</li>
                                        <li>Road Shows</li>
                                        <li>Conferences and Seminars</li>
                                    </ul>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                                <Col sm="12">
                                    <p>During his spare time, Matt likes honing his acting skills in local theatre and short films. He recently played the character of Lord Montague in a production of <b>William Shakespeare’s Romeo and Juliet</b> and acted in short film <b>Spiral of Silence</b>. which was nominated in numerous short film festivals around the world.</p>
                                    <h3 id="plays">Plays</h3>
                                    <div className="panel panel-default">
                                        <table className="table table-striped table-bordered">
                                            <thead className="thead-inverse">
                                                <tr>
                                                    <th>Year</th>
                                                    <th>Title</th>
                                                    <th>Role</th>
                                                    <th>Playwright</th>
                                                    <th>Production</th>
                                                    <th>Venue</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.portfolio.plays
                                                    .sort((a, b) => {
                                                        return b.year - a.year;
                                                    })
                                                    .map((play, index) => {
                                                    return <tr key={index}>
                                                        <td>{ play.year }</td>
                                                        <td>{ play.title } { play.playUrl ? <a href={ play.playUrl } target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i></a> : '' }</td>
                                                        <td>{ play.character }</td>
                                                        <td>{ play.playwright }</td>
                                                        <td>{ play.production } { play.productionUrl ? <a href={play.productionUrl} target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i></a> : '' }</td>
                                                        <td>{ play.venue } { play.venueUrl ? <a href={play.venueUrl} target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i></a> : '' }</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <h3 id="plays">Shot Films</h3>
                                    <div className="panel panel-default">
                                        <table className="table table-striped table-bordered">
                                            <thead className="thead-inverse">
                                                <tr>
                                                    <th>Year</th>
                                                    <th>Title</th>
                                                    <th>Role</th>
                                                    <th>Writer</th>
                                                    <th>Director</th>
                                                    <th>Production</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.portfolio.shortFilms
                                                    .sort((a, b) => {
                                                        return b.year - a.year;
                                                    })
                                                    .map((play, index) => {
                                                    return <tr key={index}>
                                                        <td>{ play.year }</td>
                                                        <td>{ play.title } { play.filmUrl ? <a href={ play.filmUrl } target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i></a> : '' }</td>
                                                        <td>{ play.character }</td>
                                                        <td>{ play.writer }</td>
                                                        <td>{ play.director }</td>
                                                        <td>{ play.production } { play.productionUrl ? <a href={play.productionUrl} target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i></a> : '' }</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                <div className="pageAnnotation">
                    <p><i className="fas fa-external-link-alt" style={ styleAnnotationIcon }></i> - <cite>Indicates link to external website. Clicking on it will open the link in a new tab/window.</cite></p>
                </div>
            </Page>
        );
    }
}