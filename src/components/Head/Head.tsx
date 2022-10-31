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
  </Head>
)

export default HeadComponent
