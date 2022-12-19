import React, { useEffect, useState } from 'react';
import arrow_btn_back from '../../assets/img/arrow_btn_back.png';
import productDemo from '../../assets/img/productDemo.png';
import go_opensea from '../../assets/icon/arrow_go_opensea.png';
import charm_menu_meatball from '../../assets/img/charm_menu_meatball.png';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemDetailById, getMysteryBoxInfo } from '../../services/services';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import { SUCCESS } from '../../config';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getRarityToString } from '../../utils/getRarityToString';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    right: 50,
    left: -50,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 6,
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  //   const icons: { [index: string]: React.ReactElement } = {
  //     1: <span>1</span>,
  //     2: <span>2</span>,
  //     3: <span>3</span>,
  //     4: <span>4</span>,
  //     5: <span>5</span>,
  //   };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {/* {icons[String(props.icon)]} */}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5'];
function Detail() {
  const navigate = useNavigate();
  const params = useParams();

  const [itemDetail, setItemDetail] = useState<MBoxItemTypes | null>(null);
  const [ipInfo, setIpInfo] = useState<MBoxTypes | null>(null);

  const fetchItemDetail = async () => {
    if (params.itemId) {
      const itemDetailRes = await getItemDetailById(params.itemId);
      if (itemDetailRes.data.status === SUCCESS) {
        setItemDetail(itemDetailRes.data.data);
        console.log(itemDetailRes.data.data);
      }
    }
  };

  const fetchIpInfo = async () => {
    if (params.ipId) {
      const ipInfoRes = await getMysteryBoxInfo(params.ipId);
      console.log(ipInfoRes);
      if (ipInfoRes.data.status === SUCCESS) {
        setIpInfo(ipInfoRes.data.data);
      }
    }
  };

  useEffect(() => {
    fetchItemDetail();
    fetchIpInfo();
  }, [params]);

  return (
    <main className="collectibles-item-details-container min-height-content">
      <div className="collectibles-details-wp">
        <div className="btn-back" onClick={() => navigate(-1)}>
          <img src={arrow_btn_back} />
          <span>Back</span>
        </div>
        <div className="product-details">
          <div className="wrapper-left">
            <img src={itemDetail?.itemImage} />
            <div className="go-to-opensea">
              <div>Go to Opensea</div>
              <div className="arrow-go-opensea">
                <img src={go_opensea} alt="arrow" />
              </div>
            </div>
          </div>
          <div className="wrapper-right">
            <div className="header-product">
              <div className="avatar">
                <img src={ipInfo?.featured?.company.image} />
                <div className="userName">
                  <p>Creator</p>
                  <b>{ipInfo?.featured?.company?.name.en}</b>
                </div>
              </div>
              <div className="icon-ellipsis">
                <img src={charm_menu_meatball} />
              </div>
            </div>
            <hr />
            <div className="info-product">
              <h2>GENERATIVE MAGIC THE DOG</h2>
              <div className="status">
                <button className="button">
                  {getRarityToString(itemDetail?.rarity)}
                </button>
                <span>Level: 1</span>
              </div>
              <div className="des">{itemDetail?.description}</div>
              <p className="level-status">Level Status</p>
              <div className="lv">
                <Stack sx={{ width: '100%' }} spacing={4}>
                  <Stepper
                    alternativeLabel
                    activeStep={2}
                    connector={<ColorlibConnector />}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                          <b>{label}</b>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Stack>
              </div>
              <div className="utility">
                <h4>Utility</h4>
                <hr />
                <div className="content">
                  <p>Utility 01</p>
                  <p>사용가능</p>
                </div>
                <div className="content">
                  <p>Utility 02</p>
                  <p>사용가능</p>
                </div>
                <div className="content">
                  <p>Utility 03</p>
                  <p>사용가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Detail;
