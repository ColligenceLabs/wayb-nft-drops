import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.png';
import product from '../../assets/img/product.png';
import icon_search from '../../assets/img/icon_search.png';
import './collection-wayb.scss';
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
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import {
  getCollectionListWithFilter,
  getIpList,
  getMysteryBoxList,
} from '../../services/services';
import { SUCCESS } from '../../config';
import { getRarityToString } from '../../utils/getRarityToString';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { MBoxTypes } from '../../types/MBoxTypes';

type ExMBoxTypes = MBoxTypes & {
  checked: boolean;
};

export default function Collection() {
  const { account } = useActiveWeb3React();
  console.log(account);
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const { gilad, jason, antoine } = state;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [ownChecked, setOwnChecked] = useState(false);
  const [metaData, setMetaData] = useState({
    listData: [],
    page: 1,
    totalPage: 1,
  });
  const [limit, setLimit] = useState('10');
  const [allItems, setAllItems] = useState<MBoxItemTypes[] | null>(null);
  const [ipList, setIpList] = useState<ExMBoxTypes[] | null>(null);
  const [keyword, setKeyword] = useState('');
  const [selectedIp, setSelectedIp] = useState([]);

  const handleChangeSelectedIp = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    console.log(event.target.checked);
    console.log(id);
    if (ipList) {
      const newIpList = ipList?.map((ip: ExMBoxTypes) =>
        ip.id === id ? { ...ip, checked: event.target.checked } : ip
      );
      setIpList(newIpList);
    }
  };

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setKeyword(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChangeLimit = (event: SelectChangeEvent) => {
    setLimit(event.target.value);
  };

  const fetchAllItems = async (reqPage: number) => {
    const selectedIps = ipList
      ?.filter((ip) => {
        if (ip.checked) return { id: ip.id };
      })
      .map((ip) => ip.id);

    const allItemsRes = await getCollectionListWithFilter(
      keyword,
      selectedIps ? selectedIps.toString() : '',
      '',
      ownChecked,
      ownChecked && account ? account : '',
      reqPage,
      limit
    );

    if (allItemsRes.data.status === SUCCESS) {
      setAllItems(allItemsRes.data.data.list);
      setTotalPage(allItemsRes.data.data.headers.x_pages_count);
    }
    console.log(allItemsRes.data.data);
  };

  const fetchIpList = async () => {
    const ipListRes = await getIpList(1, 10);
    console.log(ipListRes.data.data);
    if (ipListRes.data.status === SUCCESS)
      setIpList(
        ipListRes.data.data.list.map((ip: ExMBoxTypes) => ({
          ...ip,
          checked: false,
        }))
      );
  };

  // useEffect(() => {
  //   console.log(ipList);
  // }, [ipList]);

  useEffect(() => {
    fetchAllItems(1);
  }, [limit, ownChecked, ipList, keyword]);

  useEffect(() => {
    fetchAllItems(page);
  }, [page]);

  useEffect(() => {
    fetchIpList();
  }, []);

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
                    value={ownChecked}
                    disabled={!account}
                    onChange={() => setOwnChecked((cur) => !cur)}
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
                  value={limit}
                  onChange={handleChangeLimit}
                  displayEmpty
                  //   inputProps={{ 'aria-label': 'Without label' }}
                  className="filter"
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="main-collection">
            <div className="collection-left">
              <div className="box-search">
                <input
                  value={keyword}
                  onChange={handleChangeKeyword}
                  placeholder="Search"
                />
                <img src={icon_search} />
              </div>
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
                      {ipList &&
                        ipList.map((ip) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="xx"
                                // checked={() => handleCheckIp(ip.id!)}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => handleChangeSelectedIp(event, ip.id!)}
                                name="gilad"
                                sx={{
                                  color: '#C4C4C4',
                                  '&.Mui-checked': {
                                    color: '#0095FF',
                                  },
                                }}
                              />
                            }
                            label={ip.title.en}
                          />
                        ))}
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
              <div className="collection-items">
                {allItems &&
                  allItems.map((item) => (
                    <Link to={`/detail/${item.id}`}>
                      <div className="item_product">
                        <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                          <div className="collection-img">
                            <img
                              src={item.itemImage}
                              alt=""
                              draggable={false}
                            />
                          </div>
                          <div className="info-product">
                            <div className="padding-bottom">
                              <button>
                                {getRarityToString(parseInt(item.rarity))}
                              </button>
                              <span>Level: 1</span>
                            </div>
                            <p>{item.name}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="pagination">
                {/* <Pagination count={1} shape="rounded" hidden /> */}
                <Pagination
                  className="custom-pagination"
                  boundaryCount={0}
                  count={totalPage}
                  siblingCount={2}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  page={page}
                  defaultPage={1}
                  // onChange={(item, page) => {
                  //   setMetaData({
                  //     ...metaData,
                  //     page,
                  //   });
                  // }}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
