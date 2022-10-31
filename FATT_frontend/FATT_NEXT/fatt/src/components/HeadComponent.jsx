import Head from "next/head";

const HeadComponent = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>

      <link rel="icon" type="image/ico" href="../../public/favicon.ico" />
    </Head>
  );
};

export default HeadComponent;
