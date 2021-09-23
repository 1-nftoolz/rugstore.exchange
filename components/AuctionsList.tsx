import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {tokens &&
        tokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          const listed = token && token.nft.auctionData && token.nft.auctionData.approved;
          return (
            <div className={`thumbnail-wrapper ${!listed ? "not-listed" : ""}`}>
              <NFTPreview
                initialData={token}
                key={tokenInfo.tokenId}
                id={tokenInfo.tokenId}
                contract={tokenInfo.tokenContract}
                onClick={(evt) =>
                  router.push(
                    listed ? `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}` : `/list`
                )
                }
                useBetaIndexer={true}
              />
            </div>
          );
        })}
    </div>
  );
};
