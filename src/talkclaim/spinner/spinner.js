import React from 'react';
import style from './spinner.css';

export default class Spinner extends React.Component {
  render() {
    // const { height } = this.props;
    // const divHeight = height ? { 'margin' : parseInt(height) + 'px auto' } : {}
    return (
      <div
        style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '15px',
          margin: '-50px 0 0 -43px',
          padding: '25px 0 25px 25px',
          position: 'fixed',
          left: '50%',
          top: '50%',
          width: '60px',
        }}
      >
        <div className="ispinner ispinner-large">
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
        </div>
      </div>

      // <div style={{'minHeight': '1000px'}}>
      // </div>

      // <div className={style.skFadingCircle} style={divHeight}>
      //   <div className={[style.skCircle1, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle2, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle3, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle4, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle5, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle6, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle7, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle8, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle9, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle10, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle11, style.skCircle].join(' ')} />
      //   <div className={[style.skCircle12, style.skCircle].join(' ')} />
      // </div>
    );
  }
}
