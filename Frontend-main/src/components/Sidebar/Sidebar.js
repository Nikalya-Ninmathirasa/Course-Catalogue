/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import {logoutUser} from '../../services/authService'
import { connect } from "react-redux";

import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";

import styl from "./Sidebar.module.css"

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import { HavePermisson } from "../hod/HavePermisson";

const useStyles = makeStyles(styles);

const StyledBadge = withStyles(() => ({
  badge: {
    right: 21.5,
    top: 42,
    borderRadius:'3px',
    padding: '0 2px',
    fontSize:'8px',
    fontWeight:'700',
    height:'12px',
    lineHeight:'12px',
    backgroundColor:'rgba(77, 182, 172, 1)',
    textTransform: 'capitalize'
  },
}))(Badge);

const StyledAvatar = withStyles(()=>({
  root:{
    border:"1.5px solid white",
    boxShadow:"0px 0px 0px 2px rgba(237, 237, 237, 1)"
  }
}))(Avatar);

const Sidebar = (props) => {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, routes, user } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var logOut = " ";
        var logoutItem = " ";
        var listItemClasses = " ";
        var logoutText = " ";

        if (prop.path === "/logout") {
          logOut = classes.logOut + " ";
          logoutItem = classes.logoutItem + " ";
          logoutText = classes.logoutText + " ";
          
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const activeFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <HavePermisson userRoles={prop.users} key={prop.path}>
          <NavLink
            to={prop.layout + prop.path}
            className={logOut + classes.item}
            activeClassName="active"
          >
            <ListItem button className={classes.itemLink + listItemClasses + logoutItem}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(styl.itemIcon, activeFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, activeFontClasses)}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, activeFontClasses, logoutText)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
          </HavePermisson>
        );
      })}
      <ListItem
          button
          onClick={async () => {
            await logoutUser();
          }}
          key="logout"
          style={{marginTop: '40px'}}
        >
          <ListItemIcon > <ExitToAppOutlinedIcon/> </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="#"
        className={classes.logoLink}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
      </a>
    </div>
  );

  var avatar =(
    <div className={styl.avatar}>
      <StyledBadge badgeContent={user.role} color="secondary">
        <StyledAvatar src={"https://res.cloudinary.com/analytiq/image/upload/v1621429267/rl7tr4hvmt04ys9obhq0.jpg"} />
      </StyledBadge>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          {avatar}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          {avatar}
          <div className={classes.sidebarWrapper}>{links}</div>
          
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  logo: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(Sidebar);
