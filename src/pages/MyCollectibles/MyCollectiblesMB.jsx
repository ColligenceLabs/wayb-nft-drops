import React, { useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import home_02 from '../../assets/img/home_02.jpeg';
import home_03 from '../../assets/img/home_03.jpeg';
import home_04 from '../../assets/img/home_04.jpeg';
import home_05_banner from '../../assets/img/home_05_banner.png';
import home_06_banner from '../../assets/img/home_06_banner.jpg';
import home_07_banner from '../../assets/img/home_07_banner.jpeg';
import home_08_avt from '../../assets/img/home_08_avt.png';
import home_09_avt from '../../assets/img/home_09_avt.jpg';
import home_10_avt from '../../assets/img/home_10_avt.jpg';
import home_11 from '../../assets/img/home_11.png';
import home_12 from '../../assets/img/home_12.png';
import home_13_avt from '../../assets/img/home_13_avt.jpg';
import home_14_avt from '../../assets/img/home_14_avt.jpg';
import verify from '../../assets/img/verify-icon.png'

const MyCollectiblesMB = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [appState, setChange] = useState({
        
        objects: [{
            id: 1,
            name: 'Newest'
        },
        {
            id: 2,
            name: 'Oldest'
        },
        {
            id: 3,
            name: 'Title: A-Z'
        },
        {
            id: 4,
            name: 'Title: Z-A'
        }],
        activeObject: null,
        activeElement : 0
    });

    const listItems = [
        {
            id: 1,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_10_avt,
        },
        {
            id: 2,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_09_avt,
        },
        {
            id: 3,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_08_avt,
        },
        {
            id: 4,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_09_avt,
        },
        {
            id: 5,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_10_avt,
        },
        {
            id: 6,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_10_avt,
        },
        {
            id: 7,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_10_avt,
        },
        {
            id: 8,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_10_avt,
        },
        {
            id: 9,
            name: 'Strawberry Shortcake Space Creampop',
            image: home_10_avt,
        },
    ]

    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    
    const ref = useRef();
    useEffect(() => {
        let handler = (event) => {
            if(!ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }); 


    function toggleActive(index) {
        setChange({ ...appState, activeObject: appState.objects[index] })
    }

    function handleSortClick(item, multipleSelect = false) {
        if(!selection.some(current => current.id === item.id)) {
            if(!multipleSelect) {
                setSelection([item]);
            } else if(multipleSelect) {
                setSelection([...selection, item]);
            } 
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval]);
        }
        
    }

    function isItemInSelection(item) {
        if(selection.find(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    return (
        <div className="my-wallet-container-mb">
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
                        return <div className={`${selectedIndex === index ? 'name-sort-selected' : 'not-selected'}`} key={index}>{item.name}</div>   
                    })}
                        
                    </span>
                    <div className="sort-dropdown-button" onClick={() => setOpen(open => !open)}>
                        <img src={verify} alt="" />
                        
                    </div>
                    {open && (
                        <ul className="sort-dropdown-box" >

                        {appState.objects.map((item, index) => {
                            
                            return <li key={index} className="name-sort-dropdown-box">
                                <button type="button" className="sort-button" onClick={() => {handleSortClick(item); toggleActive(index);
                            setSelectedIndex(index);}}>
                                    <span>{item.name }</span>
                                    <span>{isItemInSelection(item) && ''}</span>
                                </button>    
                            </li>
                        })}
                        </ul>
                    )}
                    
                        
                </div>
            </div>

            {/* item  */}
            <div className="page-grid">
            {listItems.map((item, index) => {
                        
                        
            return <a href="/" key={index}>
                <div className="item-product" >
                        
                    
                    <div className="item-product-detail">
                        <div className="card">
                            <img src={home_10_avt} alt="" />
                        </div>
                    </div>
                    
                    <div className="item-product-detail" style={{ padding: '0px' }}>
                        <div className="box-info">
                            <div className="box-product-name">
                                <div className="product-type">Sweet</div>
                                <div className="product-name">
                                {item.name}
                                </div>
                            </div>
                            <img src={verify} alt="" />
                                            
                        </div>
                    </div>
                    
                </div>
            </a>
            })}
            </div>
            </div>
        </div>
    );
}

export default MyCollectiblesMB;