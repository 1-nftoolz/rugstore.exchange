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
  const liveAuctions = tokens.filter(({ nft }: { nft: any }) => nft.auctionData)
  const theRest = tokens.filter((t:any) => !liveAuctions.includes(t))

  console.log(liveAuctions)

  const archive = tokens

  return (
    <IndexWrapper>
      <Head />
      <Header />
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <h2>Live now</h2>
      <AuctionsList tokens={liveAuctions} />
      {false && 
        <>
          <h2>Ended</h2>
          <AuctionsList tokens={liveAuctions} />
        </>
      }
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
`;
