import React, { PureComponent } from 'react';
import imgSrc from '../images/skt_ci.png';
import style from './nav.scss';
import { segment, Link } from '../hoc/router';

// console.log('dsvsvsvsdv', style);
const BottomBar = segment(function (props) {
  return <div className={style.bottomBar} />;
});

export default class Nav extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log('Nav render props', this.props);
    const { currentPath, basePath } = this.props;
    return (
      <nav className={style.nav}>
        <Link
          className={`${style.logo} ${style.navItem}`}
          path="/"
          {...this.props}
        >
          <div
            // src={imgSrc}
            // className={style.logo}
            alt="sk_logo"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </Link>
        <Link {...this.props} className={style.navItem} path="/byRegion">
          By Region
          <BottomBar
            currentPath={currentPath}
            basePath={basePath}
            path="/byRegion"
          />
        </Link>
        <Link {...this.props} className={style.navItem} path="/byTime">
          By Time
          <BottomBar
            currentPath={currentPath}
            basePath={basePath}
            path="/byTime"
          />
        </Link>
        <div className={style.rest}>
          <div className={style.userInfo}>
            <div className={style.description}>
              <div className={style.role}>Eco Plug administrator</div>
              <div className={style.email}>wooheemusic@osci.kr</div>
            </div>
            <div className={style.dropDownButton} role="button" tabIndex={0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              <div className={style.dropDown}>
                <div>
                  (...oooops)
                  <div className={style.divider} />
                  sorry... <br />not implemented
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
