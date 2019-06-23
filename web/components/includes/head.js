import Head from "next/head";

const HeadContent = (props) =>(
    <div>
        <Head>
            <title>Matt Seemon - { props.title }</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" key="viewport" />
            <script src="https://kit.fontawesome.com/86f595f9c1.js"></script>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        </Head>
    </div>
);

export default HeadContent;