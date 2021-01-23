import React from "react";
import { Redirect } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
import firebase from "../../variables/config";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
} from "reactstrap";

window.$tmp = {};
window.$notifications = [];
class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
    };
  }
  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (!user) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-dark",
      });
    } else {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent",
      });
    } else {
      this.setState({
        color: "bg-dark",
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch,
    });
  };
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect push to="/auth/login" />;
    }
    let notificationItems = window.$notifications
      .slice(0)
      .reverse()
      .map((notification) => {
        return (
          <NavLink tag="li">
            <DropdownItem className="nav-item text-white">
              <i className={"tim-icons " + notification[2]}></i>&nbsp;
              {notification[0]}
            </DropdownItem>
          </NavLink>
        );
      });
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened,
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <InputGroup className="search-bar">
                  <Button
                    color="link"
                    data-target="#searchModal"
                    data-toggle="modal"
                    id="search-button"
                    onClick={this.toggleModalSearch}
                  >
                    <i className="tim-icons icon-zoom-split" />
                    <span className="d-lg-none d-md-block">Search</span>
                  </Button>
                </InputGroup>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-bell-55 mt-md-1" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-navbar bg-dark text-white"
                    right
                    tag="ul"
                  >
                    <NavLink
                      tag="li"
                      className={
                        window.$notifications.length === 0 ? "d-auto" : "d-none"
                      }
                    >
                      <DropdownItem className="nav-item text-white">
                        No notification found
                      </DropdownItem>
                    </NavLink>
                    {notificationItems}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt="..." src={require("assets/img/default-avatar.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    {/* <p className="d-lg-none">Akhil Chaudhary</p> */}
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-navbar bg-dark text-white"
                    right
                    tag="ul"
                  >
                    <Link to="/admin/user-profile">
                      <NavLink tag="li">
                        <DropdownItem className="nav-item text-white">
                          Profile
                        </DropdownItem>
                      </NavLink>
                    </Link>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem
                        className="nav-item text-white"
                        onClick={() => {
                          firebase.auth().signOut();
                          this.setState({ isLoggedIn: true });
                        }}
                      >
                        Log out
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default AdminNavbar;
