import Head from '../components/head'
import { Header } from "../components/Header";
import readMe from '../README.md'

import Markdown from '../components/Markdown'
import { PageWrapper } from '../styles/components'

export default function About() {
  return (
    <>
      <Head title={'About'} />
      <Header />
      <PageWrapper>
        <Markdown markdown={readMe}/>
      </PageWrapper> 
    </>
  )
}
