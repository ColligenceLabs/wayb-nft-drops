import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.png';
import product from '../../assets/img/product.png';
import './style.scss';
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
export default function Collection() {
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
              <FormControlLabel
                control={
                  <Checkbox
                    // defaultChecked
                    sx={{
                      color: '#0095FF',
                      '&.Mui-checked': {
                        color: '#0095FF',
                      },
                    }}
                  />
                }
                label="My Collectibles"
              />
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
          <div className="main-collection">
            <div className="collection-left">
              <Box>
                <FormControl
                  sx={{ m: 3 }}
                  // component="fieldset"
                  variant="standard"
                  className="mobile-checkbox"
                >
                  <div className="left-mobile">
                    <FormLabel component="legend">Project</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="xx"
                            checked={gilad}
                            onChange={handleChange}
                            name="gilad"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Project 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={jason}
                            onChange={handleChange}
                            name="jason"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Project 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={antoine}
                            onChange={handleChange}
                            name="antoine"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Project 3"
                      />
                    </FormGroup>
                  </div>
                  <div className="right-mobile">
                    <FormLabel component="legend" className="padding-top">
                      Rarity
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gilad}
                            onChange={handleChange}
                            name="Ordinary"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Ordinary"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="xx"
                            checked={jason}
                            onChange={handleChange}
                            name="jason"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Extraordinary"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="xx"
                            checked={antoine}
                            onChange={handleChange}
                            name="antoine"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Rare"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="xx"
                            checked={antoine}
                            onChange={handleChange}
                            name="antoine"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Super Rare"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="xx"
                            checked={antoine}
                            onChange={handleChange}
                            name="antoine"
                            sx={{
                              color: '#C4C4C4',
                              '&.Mui-checked': {
                                color: '#0095FF',
                              },
                            }}
                          />
                        }
                        label="Legendary"
                      />
                    </FormGroup>
                  </div>
                </FormControl>
              </Box>
            </div>
            <div className="collection-right">
              <div className="marketplace-items collection-items">
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
              <div className="pagination">
                <Stack spacing={2}>
                  <Pagination count={1} shape="rounded" hidden />
                  <Pagination
                    count={10}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    page={metaData.page}
                    defaultPage={1}
                    onChange={(item, page) => {
                      setMetaData({
                        ...metaData,
                        page,
                      });
                    }}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
