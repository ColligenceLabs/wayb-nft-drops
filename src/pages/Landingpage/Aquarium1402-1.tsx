import React from 'react';
import aquarium_sounhong from '../../assets/img/aquarium_sounhong.png';
import aquarium_02 from '../../assets/img/aquarium_02.png';
// import wave_vector_01 from '../../assets/svg/wave_vector_01.svg';
import group_wave_vector from '../../assets/svg/group_wave_vector.svg';

const Aquarium1402One = () => {
  return (
    <div className="main-aquarium">
      <div className="background-image-aquarium"></div>
      <div className="aquarium1402-1 min-height-content-landingpage">
        <div className="aquarium1402-1-content">
          <div className="section-01">
            <div className="header-content">
              <div>Soun-Hong’s</div>
              <div>special NFT Collection</div>
            </div>
            <div className="bottom-content">
              <div className="box">
                <div className="wrapper-sounhong">
                  <div className="avt-sounhong">
                    <img src={aquarium_sounhong} alt="Avatar Soun-Hong" />
                  </div>
                  <div className="about-sounhong">
                    <div className="name-sounhong">Soun-Hong</div>
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
          </div>
          <div className="section-02">
            <div className="wrapper-header">
              <div className="title">
                Aquarium - 1402 is an oil painting on 91 canvases
              </div>
              <div className="content-header">
                Each canvas has its own unique story to tell. Collect 91
                canvases containing the artist's story with NFT. A portion of
                this NFT proceeds will be donated to animal rights organizations
              </div>
            </div>
            <div className="wrapper-bottom">
              <div className="image-aquarium">
                <img src={aquarium_02} alt="aquarium 1402" />
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
            <div className="vector-background-left"></div>
            <div className="vector-background-right"></div>
          </div>
          <div className="wrapper-wave-border">
            <img src={group_wave_vector} alt="Waves" />
            <div className="wave-straight"></div>
            <div className="wave-border-01">
              {/* <img src={wave_vector_01} alt="Wave" /> */}
            </div>
            <div className="wave-border-02"></div>
            <div className="wave-border-03"></div>
            <div className="wave-border-04"></div>
            <div className="wave-border-05"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aquarium1402One;
