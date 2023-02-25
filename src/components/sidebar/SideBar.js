import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useCategories } from "../../redux";
import { SideBarHeader } from "./SideBarHeader";
import { Link } from "react-router-dom";

const StyledListItem = styled(ListItem)(() => ({
  padding: "5px 0 3px 15px",
  margin: "0px",
}));

export const SideBar = () => {
  const sideBarItems = useCategories();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "block" },
        "& .MuiDrawer-paper": { width: "255px", height: "95%" },
      }}
      open
    >
      <SideBarHeader />

      <List>
        {sideBarItems.map((item) => {
          const { _id, name } = item;
          return (
            <React.Fragment key={_id}>
              <Link to={`/products/categories/${name}?page=1&sort=name,asc`}>
                <Box sx={{ display: "flex" }}>
                  <StyledListItem>
                    <ListItemText secondary={name} />
                  </StyledListItem>
                </Box>
              </Link>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};
