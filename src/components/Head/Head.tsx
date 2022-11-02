import Head from 'next/head'

type Props = {
  title: string
}

// TODO add in OG tags

const HeadComponent = ({ title }: Props) => (
  <Head>
    <title key="title">{title}</title>
    <meta name="title" content="BoilerMake X" />
    <meta
      name="description"
      content="BoilerMake is an annual, 36-hour hackathon at Purdue that brings over 500 hackers from across the country under one roof for one incredible weekend."
    />
    <meta name="keywords" content="hackathon, Purdue" />
    <meta name="robots" content="index, follow" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="English" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.boilermake.com/" />
    <meta property="og:title" content="BoilerMake X" />
    <meta
      property="og:description"
      content="BoilerMake is an annual, 36-hour hackathon at Purdue that brings over 500 hackers from across the country under one roof for one incredible weekend."
    />
    <meta property="og:image" content="%PUBLIC_URL%/images/card.png" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.boilermake.com/" />
    <meta property="twitter:title" content="BoilerMake X" />
    <meta
      property="twitter:description"
      content="BoilerMake is an annual, 36-hour hackathon at Purdue that brings over 500 hackers from across the country under one roof for one incredible weekend."
    />
    <meta property="twitter:image" content="%PUBLIC_URL%/images/card.png" />
  </Head>
)

export default HeadComponent
