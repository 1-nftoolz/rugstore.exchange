import '../styles/reset.css'

import Router from 'next/router'
import type { AppProps } from 'next/app'
import { css } from '@emotion/css'

import { NetworkIDs } from '@zoralabs/nft-hooks'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'

import { mediaConfigurationStyles } from '../styles/theme'
import GlobalStyles from '../styles/GlobalStyles'
import { Footer } from '../components/Footer'

import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function CreateAuctionHouseApp({
  Component,
  pageProps
}: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Web3ConfigProvider
        networkId={parseInt(process.env.NEXT_PUBLIC_NETWORK_ID as string, 10)}
        rpcUrl={process.env.NEXT_PUBLIC_RPC_URL as string || undefined}
        theme={{
          walletOption: css`
            color: #000 !important;
            position: relative;
            width: 100%;
            padding: 20px;
            margin-bottom: 20px;
            cursor: pointer;
            &:last-child {
              margin-bottom: 0;
            }
          `,
        }}
      >
        <MediaConfiguration
          networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
          style={mediaConfigurationStyles}
        >
          <Component {...pageProps} />
          <Footer />
        </MediaConfiguration>
      </Web3ConfigProvider>
    </>
  );
}
