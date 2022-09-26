import React, { useState } from 'react';
import banner_collection from '../../assets/img/banner_collection.png';
import avatar from '../../assets/img/avatar.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const PuzzleCollection = () => {
  const [show, setShow] = useState(false);
  const [clickedImg, setClickedImg] = useState(null);
  const getPieces = () => {
    const result = [];
    for (let i = 0; i < 91; i++) {
      result.push(
        <img
          style={{ width: '100%', pointerEvents: 'all' }}
          src={`https://image.toast.com/aaaaave/nft/hong_whale/${String(
            i + 1
          ).padStart(3, '0')}.jpg`}
          alt="test"
          key={i + 1}
          onClick={(event: any) => {
            setClickedImg(event.target.src);
            setShow(true);
          }}
        />
      );
    }
    return result;
  };
  return (
    <main className="collection-container">
      <div
        className="collection-banner-image"
        style={{
          backgroundImage: `url("${banner_collection}")`,
        }}
      ></div>
      <div className="box-collection">
        <div className="collection-details-box">
          <div className="collection-info">
            <div className="collection-info-left">
              <img src={avatar} alt="" draggable={false} />
              <div className="name">
                <div className="fullname">Fear the Deer NFTs</div>
                <div className="username">@bucks</div>
              </div>
            </div>
            <div className="collection-info-right">
              <div className="collection-info-right-details">
                <div className="value">750</div>
                <div className="label">NFTs</div>
              </div>
              <div className="collection-info-right-details">
                <div className="value">723</div>
                <div className="label">Followers</div>
              </div>
            </div>
          </div>
          <div className="collection-info-content">
            <div>Hong soon myung large whale puzzle plz buy!</div>
          </div>
        </div>
        <div className="marketplace">
          <div className="marketplace-collection-tittle">Whale puzzle</div>
          <div style={{ maxWidth: '1000px', margin: '0px auto' }}>
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                  <div className="tools">
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                    <button onClick={() => resetTransform()}>x</button>
                  </div>
                  <TransformComponent>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        // display: 'table',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: '#fff',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(13, 1fr)',
                        gridTemplateRows: 'repeat(7, 1fr)',
                        columnGap: '1px',
                        rowGap: '1px',
                        padding: '1px',
                      }}
                    >
                      {getPieces()}
                    </div>
                    <div>Example text</div>
                  </TransformComponent>
                </React.Fragment>
              )}
            </TransformWrapper>
          </div>
        </div>
      </div>
      <ReactModal
        preventScroll={true}
        isOpen={show}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setShow(false)}
        className="Modal"
        ariaHideApp={false}
        overlayClassName="payments-wallets-overlay"
        shouldCloseOnOverlayClick
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-tittle">
                <div>
                  <div className="title">This is title..</div>

                  <div className="sub-title">subsubsubtitle</div>
                </div>
              </div>
              <button
                type="button"
                className="close-button button"
                onClick={() => setShow(false)}
              >
                <img src={close_icon} />
              </button>
            </div>
            <div className="modal-body">
              <img
                style={{ width: '-webkit-fill-available' }}
                src={clickedImg ? clickedImg : ''}
              />
            </div>
          </div>
        </div>
      </ReactModal>
    </main>
  );
};

export default PuzzleCollection;
