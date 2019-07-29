import React from 'react';
import HeadContent from '../includes/head';
import { Container } from 'reactstrap';
import Header from '../includes/header';
import Footer from '../includes/footer';
import '../../static/assets/css/main.css';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { title, subTitle, date } = this.props;

        return (
            <div>
                <HeadContent title={ title } />
                <Header />
                <main>
                    <Container>
                        <div className="pageHeading">
                            <h1>{ title }</h1>
                            <h2>{ subTitle }</h2>
                            <p>{ date }</p>
                            <div className="pageDivider" />
                        </div>
                        { this.props.children }
                    </Container>
                </main>
                <Footer />
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
            </div>
        );
    }
}