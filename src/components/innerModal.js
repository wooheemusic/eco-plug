import React, { Component } from 'react';
import classname from 'classnames/bind';
import style from './innerModal.scss';

const cx = classname.bind(style);

class InnerModal extends Component {
  // Esc 키가 클릭되면 onHide 를 실행한다
  // handleKeyUp = (e) => {
  //   const { onHide } = this.props;
  //   if (e.keyCode === 27) {
  //     this.props.onHide();
  //   }
  // };

  // // 컴포넌트가 업데이트되었을때, 키 이벤트를 등록시키거나 삭제한다.
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.visible) {
  //     document.body.addEventListener('keyup', this.handleKeyUp);
  //   } else {
  //     document.body.removeEventListener('keyup', this.handleKeyUp);
  //   }
  // }

  render() {
    console.log('InnerModal render props', this.props);
    const {
      className, children, onHide, id,
    } = this.props;

    return (
      <div className={className}>
        {
          <div className={cx('modal')}>
            <div className={cx('body')}>
              <div className={cx('header')}>
                <div className={cx('title')}>Detail ({id})</div>
                <div>
                  <button tabIndex="0" onClick={() => onHide()}>
                    x
                    {/* <i className="fa fa-times" aria-hidden="true" /> */}
                  </button>
                </div>
              </div>
              {children}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default InnerModal;
