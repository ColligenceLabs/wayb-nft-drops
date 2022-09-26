import React, { useEffect } from 'react';
import home_08_avt from '../../assets/img/home_08_avt.png';
import home_09_avt from '../../assets/img/home_09_avt.jpg';
import home_10_avt from '../../assets/img/home_10_avt.jpg';
import ic_dropdown_button_arrow from '../../assets/svg/dropdown_button_arrow.svg';
import ic_collectible_1 from '../../assets/svg/icon-collectible-1.svg';
import ic_collectible_2 from '../../assets/svg/icon-collectible-2.svg';
import ic_collectible_3 from '../../assets/svg/icon-collectible-3.svg';
import { useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';

const MyCollectibles = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [appState, setChange] = useState({
    objects: [
      {
        id: 1,
        name: 'Newest',
      },
      {
        id: 2,
        name: 'Oldest',
      },
      {
        id: 3,
        name: 'Title: A-Z',
      },
      {
        id: 4,
        name: 'Title: Z-A',
      },
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
  const [selection, setSelection] = useState([]);

  const ref = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  function toggleActive(index) {
    setChange({ ...appState, activeObject: appState.objects[index] });
  }

  function handleSortClick(item, multipleSelect = false) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multipleSelect) {
        setSelection([item]);
      } else if (multipleSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <main className="my-wallet-container">
      <div className="wallet-wp">
        {/* banner  */}
        <div className="banner">
          <div className="collectibles">
            <h1 className="banner-title">My Collectibles</h1>
          </div>
        </div>

        {/* list button sort  */}
        <div className="wallet-sort">
          <div className="count-label">9 items</div>

          <div className="sort-box" ref={ref}>
            <span className="sort-selected">
              {appState.objects.map((item, index) => {
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
              <img src={ic_dropdown_button_arrow} alt="" />
            </div>
            {open && (
              <ul className="sort-dropdown-box">
                {appState.objects.map((item, index) => {
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
          {listItems.map((item, index) => {
            return (
              <a href="/my-collectibles/details" key={index}>
                <div className="item-product">
                  <div className="item-product-detail">
                    <div className="card">
                      <img src={home_10_avt} alt="" />
                    </div>
                  </div>

                  <div
                    className="item-product-detail"
                    style={{ padding: '0px' }}
                  >
                    <div className="box-info">
                      <div className="box-product-name">
                        <div className="product-type">Sweet</div>
                        <div className="product-name">{item.name}</div>
                      </div>
                      <img src={item.icon} alt="" />
                    </div>
                  </div>

                  <div className="item-product-detail"></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MyCollectibles;
