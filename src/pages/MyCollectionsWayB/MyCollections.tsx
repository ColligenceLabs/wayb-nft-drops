import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import product from '../../assets/img/product.png';
import './style.scss';
function MyCollections() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const [metaData, setMetaData] = useState({
    listData: [],
    page: 1,
    totalPage: 1,
  });
  const [age, setAge] = useState('');

  const handleChangeFilter = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <main className="collection-container min-height-content">
      <div className="box-collection">
        <div className="marketplace">
          <div className="marketplace-collection-tittle">Collection</div>
          <hr />
          <div className="info-top">
            <div className="total-item">40 items</div>
            <div className="filter-item">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={age}
                  onChange={handleChangeFilter}
                  displayEmpty
                  //   inputProps={{ 'aria-label': 'Without label' }}
                  className="filter"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="collection-items">
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="collection-img">
                    <img src={product} alt="" draggable={false} />
                  </div>
                  <div className="info-product">
                    <div className="padding-bottom">
                      <button>Ordinary</button>
                      <span>Level: 1</span>
                    </div>
                    <p>McLaren British #0001</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="collection-img">
                    <img src={product} alt="" draggable={false} />
                  </div>
                  <div className="info-product">
                    <div className="padding-bottom">
                      <button>Ordinary</button>
                      <span>Level: 1</span>
                    </div>
                    <p>McLaren British #0001</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="collection-img">
                    <img src={product} alt="" draggable={false} />
                  </div>
                  <div className="info-product">
                    <div className="padding-bottom">
                      <button>Ordinary</button>
                      <span>Level: 1</span>
                    </div>
                    <p>McLaren British #0001</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="collection-img">
                    <img src={product} alt="" draggable={false} />
                  </div>
                  <div className="info-product">
                    <div className="padding-bottom">
                      <button>Ordinary</button>
                      <span>Level: 1</span>
                    </div>
                    <p>McLaren British #0001</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="collection-img">
                    <img src={product} alt="" draggable={false} />
                  </div>
                  <div className="info-product">
                    <div className="padding-bottom">
                      <button>Ordinary</button>
                      <span>Level: 1</span>
                    </div>
                    <p>McLaren British #0001</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyCollections;
