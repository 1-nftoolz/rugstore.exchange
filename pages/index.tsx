import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { Header } from "../components/Header";
import { GetStaticProps } from "next";
import { AuctionsList } from "../components/AuctionsList";
import sortBy from 'lodash/sortBy'

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";

export default function Home({ tokens }: { tokens: any }) {
  const liveAuctions = tokens.filter(({ nft }: { nft: any }) =>
    nft.auctionData && !nft.auctionData.finalizedAtTimestamp
  ).sort((a:any, b:any) =>
    parseInt(a.nft.auctionData.reservePrice) > parseInt(b.nft.auctionData.reservePrice) ? 1 : -1)

  const endedAuctions = tokens.filter(({ nft }: { nft: any }) =>
    nft.auctionData && nft.auctionData.finalizedAtTimestamp)

  const theRest = tokens.filter((t:any) =>
    !liveAuctions.includes(t) && !endedAuctions.includes(t))

  const floor = Math.min.apply(Math, liveAuctions.map((a:any) =>
    a.nft.auctionData.reservePrice))
  const ceiling = Math.max.apply(Math, liveAuctions.map((a:any) =>
    a.nft.auctionData.reservePrice))

  //const archive = tokens

  return (
    <IndexWrapper>
      <Head />
      <Header />
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <div className="head-data">
        <div>
          <h2>{parseFloat((floor / (10 ** 18)).toFixed(4))} ETH</h2>
          <p className="zora-textSubdued">Floor</p>
        </div>
        <div>
          <h2>{parseFloat((ceiling / (10 ** 18)).toFixed(4))} ETH</h2>
          <p className="zora-textSubdued">Ceiling</p>
        </div>
      </div>
      <h2>Live now</h2>
      <AuctionsList tokens={liveAuctions} />
      <h2>Ended</h2>
      <AuctionsList tokens={endedAuctions} />
      <h2>Rug archive</h2>
      <AuctionsList tokens={theRest} />
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
    collectionAddress: process.env
      .NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
  overflow-x: hidden;
`;
