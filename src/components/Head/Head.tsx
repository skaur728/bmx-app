import Head from 'next/head'

type Props = {
  title: string
}

// TODO add in SEO

const HeadComponent = ({ title }: Props) => (
  <Head>
    <title key="title">{title}</title>
  </Head>
)

export default HeadComponent
