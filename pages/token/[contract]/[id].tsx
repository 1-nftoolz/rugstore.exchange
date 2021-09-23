import { NFTFullPage, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";

import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";
import { Header } from "../../../components/Header";
import styled from "@emotion/styled";

const styles = {
  theme: {
    lineSpacing: 24,
  },
};

type PieceProps = {
  name: string;
  description: string;
  image: string;
  initialData: any;
};

const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE;

const H1 = styled('h1')`
width: 100%;
padding: 3em 2em 0;
background: #aaa;
margin-bottom: -1em;
z-index: 2;
position: relative;
`

export default function Piece({
  name,
  description,
  image,
  initialData,
}: PieceProps) {
  const { query } = useRouter();

  return (
    <>
      <Head
        title={`${name} | ${APP_TITLE}`}
        description={description}
        ogImage={image}
      />
      <Header fixed />
      <main>
        <MediaConfiguration
          networkId={process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs}
          style={styles}
        >
          <H1>RUG #{initialData.nft.tokenData.tokenId}</H1>
          <div className="rug-view-wrap">
            <iframe
              className="rug-view"
              src={"https://sharp-allen-827c1c.netlify.app/?rug="+initialData.nft.tokenData.tokenId}
            />
          </div>
          <PageWrapper>
            <NFTFullPage
              useBetaIndexer={true}
              contract={query.contract as string}
              id={query.id as string}
              initialData={initialData}
            />
          </PageWrapper>
        </MediaConfiguration>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const data = await FetchStaticData.fetchZoraIndexerItem(fetchAgent, {
    tokenId: id,
    collectionAddress: contract,
  });

  const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(data);

  return {
    props: {
      id,
      name: `${tokenInfo.metadata?.name} #${tokenInfo.tokenId}` || null,
      description: tokenInfo.metadata?.description || null,
      image: tokenInfo.metadata?.image ? tokenInfo.metadata?.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : null,
      initialData: data,
    },
  };
};
