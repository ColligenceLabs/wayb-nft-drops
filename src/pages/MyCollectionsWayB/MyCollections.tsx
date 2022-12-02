import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import product from '../../assets/img/product.png';
import share from '../../assets/img/share.png';
import arrow_blue from '../../assets/icon/arrow_blue.png';
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
          <div className="marketplace-collection-tittle">My Collectibles</div>
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
          <div className="marketplace-items collection-items">
            <Link to="/mycollectionWayB/details">
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
            <Link to="/mycollectionWayB/details">
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
            <Link to="/mycollectionWayB/details">
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
            <Link to="/mycollectionWayB/details">
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
            <Link to="/mycollectionWayB/details">
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
          <div className="marketplace-collection-tittle">Collect History</div>
          <hr />
          <table>
            <tr className="tr-header">
              <td>
                Date <img src={arrow_blue} />
              </td>
              <td>Type</td>
              <td>NFT</td>
              <td>Price</td>
              <td>Blockchain</td>
              <td>Confirmation</td>
              <td></td>
            </tr>
            <tr className="bg">
              <td>Sep 2, 2022</td>
              <td>Web purchase</td>
              <td>
                <div className="td-p">
                  <span>Be rewarded!</span>
                  <p>GENERATIVE MAGIC THE DOG</p>
                </div>
              </td>
              <td>$5.00</td>
              <td>Polygon</td>
              <td>48 48</td>
              <td>
                {' '}
                <img src={share} />
              </td>
            </tr>
            <tr className="bg">
              <td>Sep 2, 2022</td>
              <td>Web purchase</td>
              <td>
                <div className="td-p">
                  <span>Be rewarded!</span>
                  <p>GENERATIVE MAGIC THE DOG</p>
                </div>
              </td>
              <td>$5.00</td>
              <td>Polygon</td>
              <td>48 48</td>
              <td>
                <img src={share} />
              </td>
            </tr>
            <tr className="bg">
              <td>Sep 2, 2022</td>
              <td>Web purchase</td>
              <td>
                <div className="td-p">
                  <span>Be rewarded!</span>
                  <p>GENERATIVE MAGIC THE DOG</p>
                </div>
              </td>
              <td>$5.00</td>
              <td>Polygon</td>
              <td>48 48</td>
              <td>
                <img src={share} />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
}

export default MyCollections;
