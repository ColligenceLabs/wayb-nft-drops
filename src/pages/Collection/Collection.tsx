import React, { MutableRefObject, useRef, useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_share from '../../assets/img/icon_share.png';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import { useParams } from 'react-router-dom';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { getFeaturedById } from '../../services/services';
import CollectionList from './CollectionList';
import useCopyToClipBoard from 'hooks/useCopyToClipboard';
import CSnackbar from '../../components/common/CSnackbar';
import { useMediaQuery } from 'react-responsive';
import useOnClickOutsideDropdown from 'components/common/useOnClickOutside';

type LinkTypes = {
  type: string;
  url: string;
  useExternalUrl: boolean;
};

const Collection = () => {
  const params = useParams();
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });
  const { copyToClipBoard, copyResult, setCopyResult } = useCopyToClipBoard();
  const [featured, setFeatured] = useState<FeaturedTypes | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
    setCopyResult(false);
  };

  const getSnsButtons = () => {
    if (featured && featured.links) {
      const test = featured.links.map((link: LinkTypes) => {
        return (
          <div
            style={{
              cursor: 'pointer',
            }}
            className="info-item hide-max-540px"
            onClick={() => window.open(link.url)}
          >
            <div className="image-item">
              {link.type === 'SITE' && (
                <img src={website_icon} alt="Website Icon" />
              )}
              {link.type === 'DISCORD' && (
                <img src={icon_discord} alt="Website Icon" />
              )}
              {link.type === 'TWITTER' && (
                <img src={icon_twitter} alt="Website Icon" />
              )}
              {link.type === 'INSTAGRAM' && (
                <img src={icon_instagram} alt="Website Icon" />
              )}
            </div>
          </div>
        );
      });
      return test;
    } else {
      return null;
    }
  };
  const getSnsMobileButtons = () => {
    return (
      <ul className="dropdown-box">
        {featured &&
          featured.links.map((link: LinkTypes) => (
            <li className="list-dropdown-item">
              <button className="dropdown-item-nft  button">
                <a href={link.url} target="_blank" className="custom-link-sns">
                  <div className="image-sns">
                    {link.type === 'SITE' && (
                      <img src={website_icon} alt="Website Icon" />
                    )}
                    {link.type === 'DISCORD' && (
                      <img src={icon_discord} alt="Website Icon" />
                    )}
                    {link.type === 'TWITTER' && (
                      <img src={icon_twitter} alt="Website Icon" />
                    )}
                    {link.type === 'INSTAGRAM' && (
                      <img src={icon_instagram} alt="Website Icon" />
                    )}
                  </div>
                  {link.type === 'SITE' && 'Website'}
                  {link.type === 'DISCORD' && 'Discord'}
                  {link.type === 'TWITTER' && 'Twitter'}
                  {link.type === 'INSTAGRAM' && 'Instagram'}
                </a>
              </button>
            </li>
          ))}
      </ul>
    );
  };
  const refDropdown = useRef() as MutableRefObject<HTMLDivElement>;
  // useOnClickOutsideDropdown(refDropdown, () => setDropdownOpen(false));
  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await getFeaturedById(params.id!);
      if (res.status === 200) {
        setFeatured(res.data);
      }
    };

    fetchFeatured();
  }, []);

  useEffect(() => {
    setOpenSnackbar({
      open: copyResult,
      type: 'success',
      message: 'copied!',
    });
  }, [copyResult]);
  return (
    <main className="collection-container min-height-content">
      {featured ? (
        <>
          <div
            className="collection-banner-image"
            style={{
              backgroundImage: `url("${
                // isMobile ? featured.mobileBanner : featured.banner
                featured.banner
              }")`,
            }}
          ></div>
          <div className="box-collection">
            <div className="collection-details-box">
              <div className="collection-info">
                <div className="collection-info-left">
                  <img src={featured.image} alt="" draggable={false} />
                  <div className="name">
                    <div className="fullname">{featured.name.en}</div>
                    {/*<div className="username">{featured.company.name.en}</div>*/}
                  </div>
                </div>
                <div className="collection-info-right">
                  <div className="collection-info-left-details">
                    <>{getSnsButtons()}</>

                    {/*<div className="collection-info-right-details">*/}
                    {/*  <div className="value">100</div>*/}
                    {/*  <div className="label">NFTs</div>*/}
                    {/*</div>*/}
                    <div className="dropdown hide-min-540px" ref={refDropdown}>
                      <div
                        className="dropdown-button"
                        onClick={() =>
                          setDropdownOpen((dropdownOpen) => !dropdownOpen)
                        }
                      >
                        <img src={ic_dropdown} alt="dropdown" />
                      </div>
                      {dropdownOpen && getSnsMobileButtons()}
                    </div>
                  </div>
                  {featured.links && featured.links.length > 0 && (
                    <div className="line-icon" />
                  )}

                  <div className="collection-info-left-details">
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => copyToClipBoard(window.location.href)}
                      className="info-item"
                    >
                      <div className="image-item">
                        <img src={icon_share} alt="Twitter Icon" width="20px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collection-info-content">
                <div>{featured.description.en}</div>
              </div>
            </div>
            <CollectionList
              featuredId={featured.id}
              companyLogo={featured.company.image}
              companyName={featured.company.name.en}
            />
            {/*<div className="marketplace">*/}
            {/*  <div className="marketplace-collection-tittle">*/}
            {/*    Featured Collectibles*/}
            {/*  </div>*/}

            {/*  <div className="marketplace-items">*/}
            {/*    {list_products.map((item, index) => {*/}
            {/*      return (*/}
            {/*        <Link to={`/sale/${index}`} key={index}>*/}
            {/*          <div className="item_product">*/}
            {/*            <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">*/}
            {/*              <div className="total_item">Total Run: 50</div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">*/}
            {/*              <div>erc721</div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">*/}
            {/*              <div className="card-image alt="" />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">*/}
            {/*              <div className="owner_product">*/}
            {/*                <div className="owner_product_box">*/}
            {/*                  <div className="owner_product_avatar">*/}
            {/*                    <img src={avatar} alt="" />*/}
            {/*                  </div>*/}
            {/*                  <div className="">{item.owner_name}</div>*/}
            {/*                </div>*/}
            {/*                <Link to="/sale">*/}
            {/*                  <div className="status ">Buy Now</div>*/}
            {/*                </Link>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_NAME_KEY">*/}
            {/*              <div className="product_name ">{item.name}</div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_BID_KEY">*/}
            {/*              <div className="box-price">*/}
            {/*                <div className="price ">Price</div>*/}
            {/*                <div className="currency ">$50.00</div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_NAME_TIME">*/}
            {/*              <div>*/}
            {/*                <div className="remaining ">Remaining</div>*/}
            {/*                <div className="remaining-total ">0</div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </Link>*/}
            {/*      );*/}
            {/*    })}*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          <CSnackbar
            open={openSnackbar.open}
            type={openSnackbar.type}
            message={openSnackbar.message}
            handleClose={handleCloseSnackbar}
          />
        </>
      ) : null}
    </main>
  );
};

export default Collection;
