import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

export const RugArchive = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();

  return (
    <div css={{
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      padding: 'var(--space-md)',
      gap: 'var(--space-md)'
    }}>
      {tokens &&
        tokens.map((token) => {
          const attributes = token.nft.tokenData.metadata.json.attributes
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          const listed =
            token && token.nft.auctionData && token.nft.auctionData.approved;
          return (
            <div className={`thumbnail-wrapper ${!listed ? "not-listed" : ""}`} css={{
              width: '100%',
              overflow: 'hidden',
              textAlign: 'center',
            }}>
              <figure>
                <img css={{
                  display: 'block',
                  width: '100%'
                }} src={token.nft.tokenData.metadata.json.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')} />
                <figcaption css={{
                  marginTop: '0.5rem',
                  fontSize: 12
                }}>
                  <div css={{
                    fontSize: 18,
                    marginBottom: 4
                  }}>{token.nft.tokenData.tokenId}</div>
                  <div>
                  {attributes.map(({value, trait_type}, index) => <span key={trait_type}>
                    <span title={trait_type}>{value}</span>{index !== attributes.length - 1 ? ', ' : null}
                  </span>)}
                  </div>
                  {/* <div>Owned by {token.nft.tokenData.owner}</div> */}
                </figcaption>
              </figure>
              {/* <NFTPreview
                initialData={token}
                key={tokenInfo.tokenId}
                id={tokenInfo.tokenId}
                contract={tokenInfo.tokenContract}
                onClick={(evt) =>
                  router.push(
                    `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`
                  )
                }
                useBetaIndexer={true}
              /> */}
            </div>
          );
        })}
    </div>
  );
};
