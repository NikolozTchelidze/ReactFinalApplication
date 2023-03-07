import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./components/header";
import {RoutesComponent} from "./Routes";
import {fetchHomePageProducts, useUserInfo} from "./redux";
import { fetchCart } from "./redux/slices/cartSlice";
import { Box } from "@mui/material";
import { SideBar } from "./components/sidebar";
import { styled } from "@mui/system";

const StyledContentContainer = styled(Box)(() => ({
  padding:"0 0 0 8px",
  width:"calc(100% - 255px)",
  marginLeft:"255px",
  marginTop: "100px",
  minHeight:"100vh",
}))


const App = () => {
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  useEffect(() => {
    dispatch(fetchHomePageProducts());
  },[]);

  useEffect(() => {
    if(userInfo){
      dispatch(fetchCart(userInfo._id))
    }
  },[userInfo]);
  return (
    <Box>
      <SideBar />
      <Header/>
      <StyledContentContainer>{RoutesComponent()}</StyledContentContainer>
    </Box>
  )
};

export default App;
