import Head from 'next/head';

const HeadContent = (props) =>(
    <Head>
        <title>Matt Seemon - { props.title }</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" key="viewport" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="57x57" href="/static/assets/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/assets/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/assets/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/assets/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/assets/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/assets/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/assets/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/assets/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/assets/favicon/apple-icon-180x180.png" />
        <link rel="apple-touch-icon-precomposed" sizes="192x192" href="/static/assets/favicon/apple-icon-precomposed.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/assets/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/assets/favicon/favicon-16x16.png" />

        <link rel="manifest" href="/static/manifest.json" />
        <link rel="mask-icon" href="/static/assets/favicon/safari-pinned-tab.svg" color="#b91d47" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-config" content="/static/browserconfig.xml"></meta>
        <script src="https://kit.fontawesome.com/86f595f9c1.js"></script>
    </Head>
);

export default HeadContent;