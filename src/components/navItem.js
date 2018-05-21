import React from 'react';
import style from './navItem.scss';

const navInlineStyle = { outline: 'none' }; // hide the ouline caused by tabIndex

export default function NavItem({
  pageName, displayName, tabIndex, movePage,
}) {
  return (
    <div
      onClick={() => {
        movePage(pageName);
      }}
      className={style.navItem}
      role="button"
      tabIndex={tabIndex || 0}
      onKeyDown={(e) => {
        console.log(e, e.keyCode);
        if (e.keyCode === 13) {
          movePage(pageName);
        }
      }}
      style={navInlineStyle}
    >
      {displayName}
    </div>
  );
}
