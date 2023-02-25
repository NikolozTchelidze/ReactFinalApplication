import { Button, Drawer, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { clearCart, saveCart, useUserInfo } from "../../redux";

const StyledBox = styled(Box)(() => ({
  width: 300,
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  marginBottom: "20px",
}));

export const CartDrawer = ({
  isCartDrawerOpen,
  setIsCartDrawerOpen,
  cartItems,
}) => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const onSaveCart = (isClear) => dispatch(saveCart({userId: userInfo?._id, cartItems: isClear? [] : cartItems}));
  return (
    <Drawer
      open={isCartDrawerOpen}
      onClose={() => setIsCartDrawerOpen(false)}
      anchor="right"
    >
      {cartItems.map((item) => {
        const { product, quantity } = item;
        const { price, name, _id, image } = product;
        return (
          <StyledBox key={_id}>
            <img
              src={image}
              alt={`${name}`}
              width="50px"
              height="50px"
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
            <Box sx={{ paddingLeft: 2 }}>
              <Typography>{name}</Typography>
              <Typography>quantity:{quantity}</Typography>
              <Typography>total: ${price * quantity}</Typography>
            </Box>
          </StyledBox>
        );
      })}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            dispatch(clearCart());
            setIsCartDrawerOpen(false);
            onSaveCart(true);
          }}
        >
          Clear cart
        </Button>
        {userInfo && <Button onClick={() => onSaveCart(false)}>Save cart</Button>}
      </Box>
    </Drawer>
  );
};
