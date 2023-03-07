import { AppBar, Badge, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";
import { FaShoppingCart } from "react-icons/fa";
import { styled } from "@mui/system";
import { useCart } from "../../redux";
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";

const StyledAppBar = styled(AppBar)(() => ({
  background: "white",
  width: "calc(100% - 255px)",
  padding: "0 100px 0 30px",
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    width: "20px",
    height: "21px",
    color: "#fff",
    background: "#f33451",
    top: "2px",
    right: "-3px",
  },
}));
export const Header = () => {
  const cartItems = useCart();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const cartItemsQuantity = cartItems?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  return (
    <Box sx={{ marginTop: 10 }}>
      <StyledAppBar>
        <StyledToolbar>
          <Link  to="/">Home</Link>
          <SearchBar />
          <UserIcon />
          <Button onClick={() => setIsCartDrawerOpen(true)}>
            <StyledBadge badgeContent={cartItemsQuantity}>
              <FaShoppingCart size={35} />
            </StyledBadge>
          </Button>
          <CartDrawer
            cartItems={cartItems}
            isCartDrawerOpen={isCartDrawerOpen}
            setIsCartDrawerOpen={setIsCartDrawerOpen}
          />
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
};
