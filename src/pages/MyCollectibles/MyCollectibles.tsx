import React, { MutableRefObject, useEffect, useState, useRef } from 'react';
import home_08_avt from '../../assets/img/home_08_avt.png';
import home_09_avt from '../../assets/img/home_09_avt.jpg';
import home_10_avt from '../../assets/img/home_10_avt.jpg';
import klaytnIcon from '../../assets/icon/klaytn.png';
import ic_collectible_1 from '../../assets/svg/icon-collectible-1.svg';
import ic_collectible_2 from '../../assets/svg/icon-collectible-2.svg';
import ic_collectible_3 from '../../assets/svg/icon-collectible-3.svg';
import avatar from '../../assets/img/avatar.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getMyMBoxList } from '../../services/services';
import { MBoxTypes } from '../../types/MBoxTypes';
import MBoxCard from '../../components/card/MBoxCard';
import { Link } from 'react-router-dom';

type ExMBoxTypes = MBoxTypes & {
  companyimage: string;
  companyname: { ko: string; en: string };
};
const MyCollectibles = () => {
  const { account } = useActiveWeb3React();
  const [myMBoxList, setMyMBoxList] = useState<ExMBoxTypes[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [appState, setChange] = useState<any>({
    objects: [
      {
        id: 1,
        name: 'Newest',
      },
      {
        id: 2,
        name: 'Oldest',
      },
      // {
      //   id: 3,
      //   name: 'Title: A-Z',
      // },
      // {
      //   id: 4,
      //   name: 'Title: Z-A',
      // },
    ],
    activeObject: null,
    activeElement: 0,
  });

  const listItems = [
    {
      id: 1,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_10_avt,
      icon: ic_collectible_1,
    },
    {
      id: 2,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_09_avt,
      icon: ic_collectible_2,
    },
    {
      id: 3,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_08_avt,
      icon: ic_collectible_2,
    },
    {
      id: 4,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_09_avt,
      icon: ic_collectible_1,
    },
    {
      id: 5,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_10_avt,
      icon: ic_collectible_3,
    },
    {
      id: 6,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_10_avt,
      icon: ic_collectible_3,
    },
    {
      id: 7,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_10_avt,
      icon: ic_collectible_2,
    },
    {
      id: 8,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_10_avt,
      icon: ic_collectible_1,
    },
    {
      id: 9,
      name: 'Strawberry Shortcake Space Creampop',
      image: home_10_avt,
      icon: ic_collectible_2,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<any>([]);

  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handler = (event: any) => {
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  function toggleActive(index: number) {
    setChange({ ...appState, activeObject: appState.objects[index] });
  }

  function handleSortClick(item: any, multipleSelect = false) {
    if (!selection.some((current: any) => current.id === item.id)) {
      if (!multipleSelect) {
        setSelection([item]);
      } else if (multipleSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current: any) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item: any) {
    if (selection.find((current: any) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const fetchMyMBoxList = async () => {
      const talkenData = localStorage.getItem('talken.data');
      let _talkenData;
      let talkenUid = null;
      if (talkenData) {
        _talkenData = JSON.parse(talkenData);
        talkenUid = _talkenData.uid;
      }
      if (account) {
        const sort = selectedIndex !== 0 ? 'ASC' : 'DESC';
        const res = await getMyMBoxList(account, talkenUid, sort);
        if (res.data.status === 1) {
          setMyMBoxList(res.data.data);
        }
      }
    };

    fetchMyMBoxList();
  }, [account, selectedIndex]);

  return (
    <main className="my-wallet-container min-height-content">
      <div className="wallet-wp">
        {/* banner  */}
        <div className="banner">
          <div className="collectibles">
            <div className="banner-title">My Collectibles</div>
          </div>
        </div>

        {/* list button sort  */}
        <div className="wallet-sort">
          <div className="count-label">{`${myMBoxList.length} items`}</div>

          <div className="sort-box" ref={ref}>
            <span className="sort-selected">
              {appState.objects.map((item: any, index: number) => {
                return (
                  <div
                    className={`${
                      selectedIndex === index
                        ? 'name-sort-selected'
                        : 'not-selected'
                    }`}
                    key={index}
                  >
                    {item.name}
                  </div>
                );
              })}
            </span>
            <div
              className="sort-dropdown-button"
              onClick={() => setOpen((open) => !open)}
            >
              {/* <img src={ic_dropdown_button_arrow} alt="" /> */}
              <svg
                className="sc-196ec885-12 eKhfKP"
                xmlns="http://www.w3.org/2000/svg"
                width="18.092"
                height="11.168"
                viewBox="0 0 18.092 11.168"
              >
                <path
                  id="Path_46142"
                  data-name="Path 46142"
                  d="M-10858.465-7358l6.925,6.926,6.925-6.926"
                  transform="translate(10860.586 7360.121)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
            </div>
            {open && (
              <ul className="sort-dropdown-box">
                {appState.objects.map((item: any, index: number) => {
                  return (
                    <li key={index} className="name-sort-dropdown-box">
                      <button
                        type="button"
                        className="sort-button"
                        onClick={() => {
                          handleSortClick(item);
                          toggleActive(index);
                          setSelectedIndex(index);
                        }}
                      >
                        <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                        <span>{isItemInSelection(item) && ''}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* item  */}
        <div className="page-grid">
          {/* {myMBoxList.map((item) => (
            <myMBoxList key={item.id} item={item} />
          ))} */}
          {myMBoxList.map((item, index) => {
            return (
              <Link to="/my-collectibles/details" key={index} state={{ item }}>
                <div className="item-product">
                  <div className="item-product-detail">
                    <div className="card-image">
                      <img src={item.packageImage} alt="" />
                    </div>
                  </div>

                  <div
                    className="item-product-detail"
                    style={{ padding: '0px' }}
                  >
                    <div className="box-info">
                      <div className="box-product-name">
                        <div className="wrapper-product-type">
                          <div className="avatar">
                            <img src={item.companyimage} alt="Avatar" />
                          </div>
                          <div className="product-type">
                            {item.companyname.en}
                          </div>
                        </div>
                        <div className="product-name">{item.title.en}</div>
                      </div>
                      <img src={klaytnIcon} alt="" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MyCollectibles;
