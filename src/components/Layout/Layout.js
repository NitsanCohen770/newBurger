import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
  state = {
    showSideDrawer: false,
    backdrop: false,
  };
  openSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar clicked={this.openSideDrawerHandler} />
        <div>
          <SideDrawer
            show={this.state.showSideDrawer}
            closed={this.openSideDrawerHandler}
          />
        </div>
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}
export default Layout;
