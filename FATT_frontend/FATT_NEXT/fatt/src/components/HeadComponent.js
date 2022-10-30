import Head from 'next/head'

const HeadComponent = ({title}) =>  {
    return (
        <Head>
        <title>{title}</title>
        <link rel="icon" type="image/ico" href="../src/utils/img/LOGO.ico" />
        </Head>
        );

}; 


export default HeadComponent;

