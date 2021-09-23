import { Global, css } from '@emotion/react'
import { media, buttonStyle } from './mixins'
import { returnBreakpoint } from './breakpoints'

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          /* COLORS */
          --black: #000;
          --white: #fff;
          --bg-color: #f6f8fa;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid rgba(40,40,40,1);


          /* FONTS */
          --font-a: Helvetica, Arial, sans-serif;
          --font-b: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace !important;

          
          /* SPACING */
          --base-unit: 10px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: calc(var(--base-unit) * 1.5);
          --text-02: calc(var(--base-unit) * 2);
          --text-03: calc(var(--base-unit) * 1.2);
          --text-04: calc(var(--base-unit) * 4);
          --text-05: calc(var(--base-unit) * 5);

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc(var(--base-unit) * 10);
          --footer-height: calc(var(--base-unit) * 10);
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint('desktop')};
          --content-width-xl: ${returnBreakpoint('xl')};
        }

        /* MEDIA QUERY MIXIN */
        ${media.laptop`
          :root {
            --base-unit: 10px;
            --text-05: calc(var(--base-unit) * 6);
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 11px;
            --text-05: calc(var(--base-unit) * 7);
          }
        `}

        /* DEFAULTS */
        /* LAYOUT */
        body {
          background: var(--black);
          color: var(--white);
        }
        body * {
          font-family: var(--font-a)!important;
        }

        main {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
        }

        header,
        footer {
          font-size: var(--text-02);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--space-md);
          a {
            text-decoration: none;
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        /* TYPOGRPAHY */
        h1,h2,h3,h4,h5,h6 {
          font-weight: 500;
        }
        h1 {
          font-size: var(--text-05);
          line-height: 1;
          text-align: center;
          word-break: break-word;
          padding: var(--space-md) 0 var(--space-lg);
        }
        h2 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        h3 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        a {
          color: inherit;
          font-weight: 400;
        }
        p,ol,ul {
          font-size: var(--text-02);
          padding-bottom: var(--space-sm);
          line-height: 1.35;
          font-weight: 400;
        }
        .error {
          color: red;
        }

        /* CUSTOM */
        .zora-fullProofLink.zora-fullProofLink.zora-fullProofLink,
        .zora-button.zora-button.zora-button,
        .button.button.button {
          ${buttonStyle};
          display: block;
          margin: 0 auto;
        }

        .zora-infoContainer {
          min-width: 58rem; 
        }

        .zora-fullPageHistoryItemMeta.zora-fullPageHistoryItemMeta > *:first-child,
        .zora-fullPageHistoryItemMeta.zora-fullPageHistoryItemMeta > *:first-child {
          margin-right: 8px;
        }

        @media (max-width: 58rem) {
          .zora-infoContainer {
            min-width: 0;
            width: 100%;
          }
          .zora-fullPageHistoryItem.zora-fullPageHistoryItem * {
            text-align: left;
          }
        }

        /* ZORA SPECIFIC -- CLEAN UP
           - WALLET MODAL
        */
        .zora-wallet-modalContent {
          h3 {
            font-size: var(--text-03)!important;
            padding: 0 0 15px;
          }
          .zora--auction-house-modalSuccessMessage {
            font-size: var(--text-02)!important;
          }
          img {
            object-fit: contain;
          }
          p {
            font-size: var(--text-02)!important;
            padding: 0 0 10px;
            &:last-of-type {
              padding-bottom: 30px!important;
            }
          }
          .zora--auction-house-ethAmountLabel {
            padding-bottom: 15px;
            font-size: var(--text-02);
          }
          input {
            margin-bottom: 15px;
          }
          button.zora--auction-house-actionButton {
            ${buttonStyle};
            margin-bottom: 15px;
          }
        }
        /* QUICK 'N' DIRTY OVERRIDES
        */
        header a {
          min-width: 80px;
          text-align: center;
        }

        h2 {
          text-transform: uppercase;
        }

        .zora-fullPageDataGrid.zora-fullPageDataGrid {
          margin-top: 60px;
          padding-top: 30px;
        }

        .zora-fullPageDataGrid.zora-fullPageDataGrid:before {
          content: '';
          border-top: 1px solid rgba(40,40,40,1);
          position: absolute;
          left: 0;
          width: 200vw;
          margin-left: -100vw;
          margin-top: -30px;
        }


        .zora-fullCreatorOwnerSection.zora-fullCreatorOwnerSection.zora-fullCreatorOwnerSection {
          border: 1px solid rgba(40,40,40,1);
          padding: 20px 0 0;
        }

        .zora-fullOwnerAddress.zora-fullOwnerAddress.zora-fullOwnerAddress {
          border: 1px solid rgba(40,40,40,1);
          padding: 20px;
          margin-top: 10px;
        }

        .zora--auction-house-modalInner.zora--auction-house-modalInner.zora--auction-house-modalInner {
          background: #000;
          color: #fff;
          padding: 30px;
        }
        .zora-cardAuctionPricing.zora-cardAuctionPricing.zora-cardAuctionPricing {
          color: #000;
          background-color: #0ff;
          border-top: 0;
          margin-left: -30px;
          margin-right: -30px;
          border-top: 1px solid rgba(40,40,40,1);
          padding: 20px 40px;
        }
        .zora-cardItemInfo.zora-cardItemInfo.zora-cardItemInfo {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(40,40,40,1);
        }
        .list-component-wrapper.list-component-wrapper {
          padding-top: 16px;
          padding-bottom: 16px;
        }

        .not-listed {
          opacity: 0.5;
        }

        .zora-infoContainer ol {
          border-bottom: 1px solid rgba(40,40,40,1);
        }
        .zora-infoContainer ol li {
          border-top: 1px solid rgba(40,40,40,1);
          margin-top: 10px;
          padding-top: 20px;
        }

        .zora-fullPlaceOfferButton.zora-fullPlaceOfferButton.zora-fullPlaceOfferButton .zora-button {
          background-color: #0ff;
          font-size: 1.2em;
          padding: 20px 60px;
        }

        .not-listed .zora-cardAuctionPricing.zora-cardAuctionPricing.zora-cardAuctionPricing {
          background: transparent;
          color: #fff;
        }

        .zora-textSubdued.zora-textSubdued.zora-textSubdued,
        .zora-cardItemInfo * {
          font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace !important;
          font-size: 0.9rem;
        }
        .zora-cardItemInfo > div > span {
          display: block;
        }
        .zoraCardPad {
          padding: 16px 16px 0;
          width: 100%;
        }
        .zora-cardOuter.zora-cardOuter.zora-cardOuter {
          background: var(--black);
          border: 1px solid rgba(40,40,40,1);
          border-radius: 3px;
          box-shadow: 0 0 30px rgba(70,70,70,1);
          margin: 32px;
          padding: 20px 20px 0;
          position: relative;
          width: 360px;
        }
        .zora-cardLink.zora-cardLink.zora-cardLink {
          cursor: pointer;
          top: 0;
          left: 0;
        }
        .zora-fullInfoProofAuthenticityContainer.zora-fullInfoProofAuthenticityContainer {
          grid-template-columns: 1fr 1fr;
        }
        .rug-view-wrap {
          position: relative;
        }
        .rug-view-wrap:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .rug-view {
          width: 100%;
          height: 70vh;
        }
        .zora-fullPage .zora-fullMediaWrapper.zora-fullMediaWrapper {
          display: none;
        }
      `}
    />
  )
}
