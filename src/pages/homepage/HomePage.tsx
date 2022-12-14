import React, { useEffect, useState, useMemo } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import background from '../../assets/img/home_01.png';
import background from '../../assets/img/home_bg_01.png';
// import backgroundMobile from '../../assets/img/home_01_mobile.png';
import backgroundMobile from '../../assets/img/home_bg_01_mb.png';
import textInbanner from '../../assets/img/textBanner.png';
import bannerService from '../../assets/img/bannerService.png';
import iPhone_12 from '../../assets/img/iPhone_12_Pro.png';
import globular from '../../assets/img/globular.png';
import line from '../../assets/img/line.png';
import phase from '../../assets/img/phase.png';
import ellipase from '../../assets/img/ellipase.png';
import partner_advisor from '../../assets/img/partner_advisor.png';
import bannerRoadMap from '../../assets/img/bannerRoadMap.png';
import line_mobile from '../../assets/img/line_mobile.png';
import bannerQA from '../../assets/img/bannerQA.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useScreenSize from 'components/common/useScreenSize';
import {
  getAirdropList,
  getCollectibleList,
  getCollectionList,
  getEventList,
  getFeaturedCollections,
} from '../../services/services';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import FeaturedCard from '../../components/card/FeaturedCard';
import ArrowCarouselCollections from 'components/common/ArrowCarouselCollections';
import CustomArrowCarousel from 'components/common/CustomArrowCarousel';
import { MBoxTypes } from '../../types/MBoxTypes';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getPrice } from '../../utils/getPrice';
import ArrowCarouselBannerMain from 'components/common/ArrowCarouselBannerMain';
import { getRarityToString } from '../../utils/getRarityToString';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import Skeleton from 'components/common/skeleton/Skeleton';
import { useMediaQuery } from 'react-responsive';
import './homepage-wayb.scss';
import { hotCollectiblesTestData } from './mockData';
type ExMBoxType = MBoxTypes & {
  remainingAmount: number | null;
};

const Homepage = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });

  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [slideData, setSlideData] = useState<FeaturedTypes[]>([]);
  const [featuredCollections, setFeaturedCollections] = useState<
    FeaturedTypes[]
  >([]);
  const [collectionList, setCollectionList] = useState<ExMBoxType[]>([]);
  const [collectibleList, setCollectibleList] = useState<ExMBoxType[]>([]);
  const [airdropList, setAirdropList] = useState<ExMBoxType[]>([]);
  const navigateToUrl = (item: FeaturedTypes) => {
    if (item.eventUrl) {
      window.open(item.eventUrl, item.newWindow ? '_blank' : '_self');
    } else {
      window.open(`/creator/${item.id}`, item.newWindow ? '_blank' : '_self');
    }
  };

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const params = useQuery();
  const uid = params.get('uid');

  const storeTalkenData = (uid: string) => {
    const storeSet = { uid: uid };
    const _storeSet = JSON.stringify(storeSet);
    localStorage.setItem('talken.data', _storeSet);
  };

  useEffect(() => {
    if (uid) {
      storeTalkenData(uid);
    }
    navigate('/');
  }, []);

  useEffect(() => {
    const fetchSlideData = async () => {
      const res = await getEventList();
      if (res.data.status === 1) {
        setSlideData(res.data.data.list);
      }
    };

    const fetchFeaturedCollections = async () => {
      const res = await getFeaturedCollections(10);
      if (res.data.status === 1) {
        setFeaturedCollections(res.data.data.list);
      }
    };

    const fetchCollectionList = async () => {
      const res = await getCollectionList(true);
      if (res.data.data.list) {
        const newList = await Promise.all(
          res.data.data.list.map(async (item: MBoxTypes) => {
            // const remainFrChain = await getItemRemainsNoSigner(
            //   item.boxContractAddress,
            //   account,
            //   chainId
            // );
            const remaining = item.totalAmount! - item.soldAmount!;
            const milliseconds =
              new Date().getTime() - Date.parse(item.releaseDatetime);
            return {
              ...item,
              remainingAmount: remaining,
              onsale: milliseconds >= 0 ? true : false,
            };
          })
        );
        setCollectionList(newList);
      }
    };

    const fetchCollectibleList = async () => {
      const res = await getCollectibleList();
      if (res.data.data) {
        const newList = await Promise.all(
          res.data.data.map(async (item: any) => {
            const id =
              Math.floor(Math.random() * item.mysteryboxItems[0].issueAmount) +
              1;
            const milliseconds =
              new Date().getTime() - Date.parse(item.releaseDatetime);
            return {
              ...item,
              itemId: id,
              onsale: milliseconds >= 0 ? true : false,
            };
          })
        );
        setCollectibleList(newList);
      }
    };

    const fetchAirdropList = async () => {
      const res = await getAirdropList();
      if (res.data.data.list) {
        const newList = await Promise.all(
          res.data.data.list.map(async (item: MBoxTypes) => {
            const remaining = item.totalAmount! - item.soldAmount!;
            const milliseconds =
              new Date().getTime() - Date.parse(item.releaseDatetime);
            return {
              ...item,
              remainingAmount: remaining,
              onsale: milliseconds >= 0 ? true : false,
            };
          })
        );
        setAirdropList(newList);
      }
    };

    fetchSlideData();
    fetchFeaturedCollections();
    fetchCollectibleList();
    fetchCollectionList();
    fetchAirdropList();
  }, [library]);

  const carouselOption = {
    additionalTransfrom: 0,
    arrows: false,
    autoPlay: false,
    autoPlaySpeed: 5000,
    draggable: true,
    focusOnSelect: false,
    keyBoardControl: true,
    minimumTouchDrag: 80,
    pauseOnHover: true,
    renderArrowsWhenDisabled: false,
    renderButtonGroupOutside: true,
    renderDotsOutside: true,
    rewind: false,
    rewindWithAnimation: false,
    rtl: false,
    shouldResetAutoplay: true,
    showDots: true,
    // slidesToSlide: 1,
    swipeable: true,
    infinite: true,
  };

  return (
    <div className="home-page min-height-content">
      {/* section 01 */}
      <div className="section-01">
        <div className="background-section-01">
          <img src={background} alt="" />
        </div>
        <div className="background-section-01-mobile">
          <img src={backgroundMobile} alt="" />
        </div>
        <div className="content-header">
          <div className="text-head">
            <img src={textInbanner} alt="img" />
          </div>
        </div>
        <div>
          <div className="carousel-main-page">
            <Carousel
              {...carouselOption}
              customButtonGroup={<ArrowCarouselBannerMain />}
              renderButtonGroupOutside={false}
              centerMode={screenSize > 1023}
              dotListClass="custom-dot"
              containerClass="container-with-dots home-carousel banner-main-carousel"
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 40,
                },
              }}
            >
              {slideData.length
                ? slideData.map((item: FeaturedTypes, index) => {
                    return (
                      <div
                        className="slide-item"
                        key={index}
                        onClick={() => navigateToUrl(item)}
                      >
                        <div>
                          <img
                            src={
                              isMobile && item.eventMobileBanner
                                ? item.eventMobileBanner
                                : item.eventBanner!
                            }
                            alt=""
                            draggable={false}
                          />
                        </div>
                      </div>
                    );
                  })
                : [1, 2, 3].map((item) => (
                    <div className="slide-item" key={item}>
                      <div>
                        <Skeleton
                          style={{
                            width: '100%',
                            aspectRatio: '24/7',
                            height: 'unset',
                          }}
                        />
                      </div>
                    </div>
                  ))}
            </Carousel>
          </div>
        </div>
        {/* <div className="wrapper-section01">

        </div> */}
        {/* <img
          src={globular}
          className="globularBottom shake-vertical globular-left-section1"
        />
        <img
          src={globular}
          className="globularTop shake-vertical globular-right-section1"
        /> */}
      </div>
      {/* section service */}
      <div className="section-service">
        {/* <img src={bannerService} className="img-service" /> */}
        <div className="info-service">
          <div className="img-iphone">
            <img src={iPhone_12} />
          </div>
          <div className="info-text">
            <div className="title-info-text">Service</div>
            <p>웨이비 서비스에 가입하세요</p>
            <p>NFT 홀더 전용 혜택 ~~~~~~~~~~~~~</p>
            <button className="btn-go button">Go</button>
          </div>
        </div>
        <img src={globular} className="globularBottom shake-vertical" />
        <img src={globular} className="globularTop shake-vertical" />
      </div>
      {/* end section service*/}
      {/* section collections */}
      <div className="section-collections">
        <div className="title-head-collections">
          <div className="title-collections">Collections</div>
          <div className="title-see-all">See all</div>
        </div>
        <div className="collections-card">
          {hotCollectiblesTestData
            .filter((item, index) => index < 5)
            .map((item, index) => {
              return (
                <Link to="/" key={index}>
                  <div className="item_product">
                    <div className="item_product_detail_top">
                      <div className="total_item">Total Run: 35000</div>
                      <div
                        style={{ textTransform: 'capitalize' }}
                        className="chain"
                      >
                        erc721
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                      <div className="card-image">
                        <img src={item.image} alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="info-product_item">
                      <div className="owner_product">
                        <div className="owner_product_avatar">
                          <img src={item.imageAvt} alt="" />
                          <div className="name">McLaren Racing</div>
                        </div>
                        <div className="status">Buy Now</div>
                      </div>
                      <div className="title">{item.details}</div>
                    </div>
                    <div className="remaining-price">
                      <div className="w-50 border-right">
                        <div className="remaining">Price</div>
                        <div className="remaining-total">$29.99</div>
                      </div>
                      <div className="w-50">
                        <div className="remaining">Remaining</div>
                        <div className="remaining-total">100</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <img
          src={globular}
          className="globular-section-collections shake-vertical "
        />
      </div>
      {/* section RoadMap */}
      <div className="section-roadMap none-mobile">
        {/* <div className="bannerRoadMap">
          <img src={bannerRoadMap} className="bannerRoadMap" />
        </div> */}
        <div className="info-roadMap">
          <div className="title-roadmap">Road Map</div>
          <div className="line-roadMap">
            <div className="step">
              <p>
                <img src={phase} /> Phase 1
              </p>
              <p>
                {' '}
                <img src={phase} />
                Phase 2
              </p>
              <p>Phase 3</p>
              <p>Phase 4</p>
            </div>
            <img src={line} className="line-img" />
            <div className="info-step">
              <ul className="color-primary">
                <li>
                  {' '}
                  Establish The Degens community on <br />
                  Twitter and Discord
                </li>
                <li> Work on the Genesis Collection</li>
                <li>Launch Website</li>
                <li>Fair Launch of Genesis Collection </li>
                <li>
                  Listing of Genesis Collection on <br /> Secondary Marketplaces
                </li>
              </ul>
              <ul>
                <li className="color-primary">
                  {' '}
                  Establish The Degens community on <br />
                  Twitter and Discord
                </li>
                <li className="color-primary">
                  {' '}
                  Work on the Genesis Collection
                </li>
                <li className="color-primary">Launch Website</li>
                <li>Fair Launch of Genesis Collection </li>
                <li>
                  Listing of Genesis Collection on <br /> Secondary Marketplaces
                </li>
              </ul>
              <ul>
                <li>
                  {' '}
                  Establish The Degens community on <br />
                  Twitter and Discord
                </li>
                <li> Work on the Genesis Collection</li>
                <li>Launch Website</li>
                <li>Fair Launch of Genesis Collection </li>
                <li>
                  Listing of Genesis Collection on <br /> Secondary Marketplaces
                </li>
              </ul>
              {/* <ul>
                <li>
                  {' '}
                  Establish The Degens community on <br />
                  Twitter and Discord
                </li>
                <li> Work on the Genesis Collection</li>
                <li>Launch Website</li>
                <li>Fair Launch of Genesis Collection </li>
                <li>
                  Listing of Genesis Collection on <br /> Secondary Marketplaces
                </li>
              </ul> */}
              <div className="empty-step">
                To be announced.. (We have enough to work on for now eh!?)
              </div>
            </div>
          </div>
          <div className="partner-advisor">
            <div className="title-partner-advisor">Partner & Advisor</div>
            <div className="img-partner-advisor">
              <img src={partner_advisor} />
            </div>
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <div className="section-roadMap-mobile none-pc">
        {/* <div className="img-center">
          <img src={line_mobile} />
        </div> */}
        <div className="wrapper-roadmap-head">
          <div className="title-roadmap">Road Map</div>
          <div className="Phase-left phase">
            <div className="d-flex">
              <img src={ellipase} width={25} height={25} /> <p>Phase 1</p>
            </div>
            <ul className="color-primary">
              <li>
                {' '}
                Establish The Degens community pauseOnHover Twitter and Discord
              </li>
              <li> Work on the Genesis Collection</li>
              <li>Launch Website</li>
              <li>Fair Launch of Genesis Collection </li>
              <li>Listing of Genesis Collection on Secondary Marketplaces</li>
            </ul>
          </div>
          <div className="Phase-right phase">
            <div className="flex-end">
              <img src={ellipase} width={25} height={25} /> <p>Phase 2</p>
            </div>
            <ul className="color-primary">
              <li>
                {' '}
                Establish The Degens community pauseOnHover Twitter and Discord
              </li>
              <li> Work on the Genesis Collection</li>
              <li>Launch Website</li>
              <li>Fair Launch of Genesis Collection </li>
              <li>Listing of Genesis Collection on Secondary Marketplaces</li>
            </ul>
          </div>
          <div className="Phase-left phase">
            <div className="d-flex">
              <img src={ellipase} width={25} height={25} /> <p>Phase 3</p>
            </div>
            <ul className="color-primary">
              <li>
                {' '}
                Establish The Degens community pauseOnHover Twitter and Discord
              </li>
              <li> Work on the Genesis Collection</li>
              <li>Launch Website</li>
              <li>Fair Launch of Genesis Collection </li>
              <li>Listing of Genesis Collection on Secondary Marketplaces</li>
            </ul>
          </div>
          <div className="Phase-right phase">
            <div className="flex-end">
              <img src={ellipase} width={25} height={25} /> <p>Phase 4</p>
            </div>
            {/* <ul className="color-primary">
              <li>
                {' '}
                Establish The Degens community pauseOnHover Twitter and Discord
              </li>
              <li> Work on the Genesis Collection</li>
              <li>Launch Website</li>
              <li>Fair Launch of Genesis Collection </li>
              <li>Listing of Genesis Collection on Secondary Marketplaces</li>
            </ul> */}
            <div className="empty-step">
              To be announced.. (We have enough to work on for now eh!?)
            </div>
          </div>
        </div>
        <div className="partner-advisor">
          <div className="title-partner-advisor">Partner & Advisor</div>
          <div className="img-partner-advisor">
            <img src={partner_advisor} />
          </div>
        </div>
      </div>
      {/* end section RoadMMap */}
      {/* section Q & A */}
      {/* <hr /> */}
      <div className="section-qa">
        {/* <img src={bannerQA} className="none-mobile" /> */}
        <div className="list-qa">
          <div className="title">FAQs</div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Ut euismod fermentum netus platea letius?
              </Accordion.Header>
              <Accordion.Body>
                Ullamcorper ridiculus inceptos metus imperdiet nibh nam in fusce
                tortor bibendum vel. Tellus netus mollis ultricies lorem
                eleifend amet ipsum convallis proin. Nam leo vel nibh per augue
                ut interdum maximus gravida efficitur.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Ut euismod fermentum netus platea letius?
              </Accordion.Header>
              <Accordion.Body>
                Ullamcorper ridiculus inceptos metus imperdiet nibh nam in fusce
                tortor bibendum vel. Tellus netus mollis ultricies lorem
                eleifend amet ipsum convallis proin. Nam leo vel nibh per augue
                ut interdum maximus gravida efficitur.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Ut euismod fermentum netus platea letius?
              </Accordion.Header>
              <Accordion.Body>
                Ullamcorper ridiculus inceptos metus imperdiet nibh nam in fusce
                tortor bibendum vel. Tellus netus mollis ultricies lorem
                eleifend amet ipsum convallis proin. Nam leo vel nibh per augue
                ut interdum maximus gravida efficitur.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Ut euismod fermentum netus platea letius?
              </Accordion.Header>
              <Accordion.Body>
                Ullamcorper ridiculus inceptos metus imperdiet nibh nam in fusce
                tortor bibendum vel. Tellus netus mollis ultricies lorem
                eleifend amet ipsum convallis proin. Nam leo vel nibh per augue
                ut interdum maximus gravida efficitur.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                Ut euismod fermentum netus platea letius?
              </Accordion.Header>
              <Accordion.Body>
                Ullamcorper ridiculus inceptos metus imperdiet nibh nam in fusce
                tortor bibendum vel. Tellus netus mollis ultricies lorem
                eleifend amet ipsum convallis proin. Nam leo vel nibh per augue
                ut interdum maximus gravida efficitur.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      {/* end section Q&A */}
    </div>
  );
};

export default Homepage;
