import { css } from '@emotion/react'
import { NavLink } from './NavLink'

export const Header = ({ fixed }: { fixed?: boolean }) => {
  return (
    <>
      <header css={css`
        height: var(--header-height);
        position: ${fixed ? 'absolute' : 'sticky'};
        top: 0;
        z-index: var(--header-z);
        border-bottom: var(--white);
      `}>
        <div>
          <NavLink passHref href="/">
              <a className="logo">
                <span>
                  {process.env.NEXT_PUBLIC_APP_TITLE}
                </span>
                <span>
                  Rugs
                </span>
              </a>
            </NavLink>
        </div>
        <div css={css`
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        `}>
          <NavLink passHref href="/list">
            <a>List your Rug</a>
          </NavLink>
        </div>
        <div>
          <NavLink passHref href="/about">
            <a className="help">?</a>
          </NavLink>
        </div>
      </header>
    </>
  )
}
