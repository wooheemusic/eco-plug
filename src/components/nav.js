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
    console.log('Nav props', this.props);
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
        <div className={style.userInfo}>wooheemusic@osci.com</div>
      </nav>
    );
  }
}
