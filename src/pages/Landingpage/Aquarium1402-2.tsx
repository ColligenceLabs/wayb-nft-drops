import React from 'react';
import aquarium02_background from '../../assets/img/aquarium02_background.png';
import aquarium_sounhong from '../../assets/img/aquarium_sounhong.png';
import aquarium_02 from '../../assets/img/aquarium_02.png';
import aquarium02_02 from '../../assets/img/aquarium02_02.png';
import aquarium02_03 from '../../assets/img/aquarium02_03.png';
import aquarium02_04 from '../../assets/img/aquarium02_04.png';
import aquarium02_05 from '../../assets/img/aquarium02_05.png';

const Aquarium1402Two = () => {
  return (
    <div className="main-aquarium-02 min-height-content-landingpage">
      <div className="wrapper-background">
        <div className="background-01"></div>
        <div className="background-image">
          {/* <img src={aquarium02_background} alt="aquarium background" /> */}
        </div>
        <div className="aquarium1402-2">
          <div className="section-01">
            <div className="wrapper-left">
              <div className="header-content">
                <div>Soun-Hong’s</div>
                <div>special NFT Collection</div>
              </div>
              <div className="bottom-content">
                <div className="box">
                  <div className="wrapper-sounhong">
                    <div className="about-sounhong">
                      <div className="avt-sounhong">
                        <img src={aquarium_sounhong} alt="Avatar Soun-Hong" />
                      </div>
                      <div className="name-sounhong">Soun-Hong</div>
                    </div>
                    <div className="about-sidescape">
                      ‘Sidescape’ is one of Hong’s artworks that extracts
                      controversial images from the media dealing with social
                      issues. His artwork exhibition was displayed in the
                      National Museum of Modern and Contemporary Art, Korea,
                      Seoul Museum of Art, Gyeonggi Museum of Art, Ho-Am Museum
                      of Art, Ecole National Superieure des Beaux-Arts, Paris,
                      France, and the Supreme Court, Seoul, Korea.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper-right">
              <div className="full-image">
                <img src={aquarium_02} alt="aquarium image" />
                <div className="image-top">
                  <img src={aquarium02_02} alt="aquarium" />
                </div>
                <div className="image-right">
                  <img src={aquarium02_03} alt="aquarium" />
                </div>
                <div className="image-bottom">
                  <img src={aquarium02_04} alt="aquarium" />
                </div>
              </div>

              <div className="background-wrapper-right01"></div>
              <div className="background-wrapper-right02"></div>
              <div className="background-wrapper-right03"></div>
            </div>
          </div>
          <div className="section-02">
            <div className="wrapper-header">
              <div className="title">
                <strong>Aquarium - 1402</strong> is an oil painting on{' '}
                <strong>91 canvases</strong>
              </div>
              <div className="content-header">
                Each canvas has its own unique story to tell. Collect 91
                canvases containing the artist's story with NFT. A portion of
                this NFT proceeds will be donated to animal rights organizations
              </div>
            </div>
            <div className="wrapper-bottom">
              <div className="image-aquarium">
                <img src={aquarium02_05} alt="aquarium 1402" />
              </div>
              <div className="wrapper-infor-nft">
                <div className="title">What you need to know is:</div>
                <ul>
                  <li>
                    {' '}
                    Each NFT costs $11 and can be purchased with cryptocurrency
                    or mobile payments!
                  </li>
                  <li>
                    A total of 10 collections consisting of a total of 91 NFTs
                    are sold.
                  </li>
                  <li>
                    You cannot specify a specific NFT at the time of purchase,
                    you will receive each NFT randomly after purchase.
                  </li>
                  <li>
                    When each collection is sold out, the complete NFT of this
                    work and the membership NFT of Korea's Total Museum of
                    Contemporary Art will be airdropped to the purchaser of each
                    collection.
                  </li>
                  <li>This NFT is issued based on the Klaytn blockchain.</li>
                  <li>
                    Be quick, NFTs are sold on a first-come, first-served basis.
                  </li>
                </ul>
                <button className="btn-buy-now button">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aquarium1402Two;
