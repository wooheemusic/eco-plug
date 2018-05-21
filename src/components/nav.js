import React, { PureComponent } from 'react';
import imgSrc from './skt_ci.png';
import style from './nav.scss';
import NavItem from './navItem';

export default class Nav extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
    console.log(imgSrc);
  }

  render() {
    return (
      <div className={style.nav}>
        <div
          // src={imgSrc}
          className={style.logo}
          alt="sk_logo"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'ceter',
          }}
        />
        <NavItem
          pageName="byRegion"
          displayName="By Region"
          movePage={this.props.movePage}
        />
        <NavItem
          pageName="byTime"
          displayName="By Time"
          movePage={this.props.movePage}
        />
        <div className={style.userInfo}>wooheemusic@osci.com</div>
      </div>
    );
  }
}
