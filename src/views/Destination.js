import React from "react";
import firebase from "../variables/config";
import { Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import ReactLoading from "react-loading";
// import DestinationItem from "./MessagesItem.js";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
window.$DestinationNumber = 0;
window.$tmp={};
window.$notification=[];
class Destination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Destination: [],
      isEmpty: true,
      isLoading: true,
    };
  }
  async componentDidMount() {
    let Destination = [];
    if (window.$notification[0]) {
      this.notify(
        "tc",
        window.$notification[1],
        window.$notification[2],
        window.$notification[3]
      );
      window.$notification = false;
    }
    await fetch("https://chikkamagaluru-1fa59-default-rtdb.firebaseio.com/destination.json")
      .then((res) => res.json())
      .then((data) => {
        for(let eachData in data) Destination.push(data[eachData]);
      });
    console.log(Destination);
    if (Destination === null) {
      this.setState({ isEmpty: true, isLoading: false });
    } else if (Destination.length > 0) {
      window.$DestinationNumber = Destination.length;
      this.setState({ Destination: Destination, isEmpty: false, isLoading: false });
    }
    // console.log(Destination);
  }
  notify = (place, message, type, icon) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons " + icon,
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
    window.$notifications.push([message, "", icon]);
  };
  render() {
    let listItems = this.state.Destination.map((user) => {
      return (
        <Col md="3" className="mb-4">
          <Card
            className="mb-0"
            onClick={() => {
              window.$tmp = user;
            }}
          >
            <Link to="/admin/destination-detail">
              <CardHeader>
                <CardTitle tag="h4">
                  {user.destname}{" "}
                  <Link to="/admin/destinations">
                    <i
                      onClick={() => {
                        firebase
                          .database()
                          .ref("destination/" + user.index)
                          .remove();
                        this.notify(
                          "tc",
                          "Event deleted.",
                          "danger",
                          "icon-trash-simple"
                        );
                      }}
                      className="tim-icons icon-simple-remove font-weight-bold text-warning float-right"
                    ></i>
                  </Link>
                </CardTitle>
                <p className="category mt-3">{user.author}</p>
              </CardHeader>
            </Link>
            <CardFooter className="text-right">
            </CardFooter>
          </Card>
        </Col>
      );
    });
    return (
      <>
        <div
          className={this.state.isLoading ? "content d-auto" : "content d-none"}
        >
          <ReactLoading
            className="mx-auto mt-5"
            type="spin"
            color="#e14eca"
            height={100}
            width={50}
          />
        </div>
        <div
          className="content"
          style={{ visibility: this.state.isLoading ? "hidden" : "visible" }}
        >
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <Row>
                    <Col>
                      <CardTitle tag="h2">Destinations</CardTitle>
                    </Col>
                    <Col className="text-right">
                      <Button
                        onClick={() => {
                          this.componentDidMount();
                        }}
                      >
                        <i className="tim-icons icon-refresh-01"></i>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6
                    className="text-uppercase text-muted ls-1 mb-1 py-3 text-center"
                    style={{ display: this.state.isEmpty ? "auto" : "none" }}
                  >
                    No Destinations found
                  </h6>
                  <Row>
                    {listItems}
                    <Col md="3" className="d-flex align-items-center mb-4">
                      <Link to="/admin/add-Destination">
                        <Button className="btn-primary mx-auto">
                          <h5
                            tag="h3"
                            className="m-auto text-dark text-weight-bold"
                          >
                            + Add Destination
                          </h5>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Destination;
