import React from "react";
import { Link } from "react-router-dom";
import firebase from "../variables/config";
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
const storageRef = firebase.storage().ref();
class DestinationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destname: window.$tmp.destname,
      body: window.$tmp.body,
      image: window.$tmp.image,
      tile_image:window.$tmp.tile_image,
      address:window.$tmp.contact.address,
      phone:window.$tmp.contact.phone,
      website:window.$tmp.contact.website,
      time: "",
      date: "",
    };
  }
  componentDidMount() {
    this.setState({
      date: window.$tmp.datentime.slice(4, 15),
      time: window.$tmp.datentime.slice(16, 24),
    });
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
  async getFile(e) {
    var name = e.target.files[0].name + Date.now();
    await storageRef.child(name).put(e.target.files[0]);
    await storageRef
      .child(name)
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        console.log(this.state.image);
        this.notify("tc", "Image Uploaded", "success", "icon-check-2");
      });
    console.log(this.state.image);
  }
  async getFile1(e) {
    var name = e.target.files[0].name + Date.now();
    await storageRef.child(name).put(e.target.files[0]);
    await storageRef
      .child(name)
      .getDownloadURL()
      .then((url) => {
        this.setState({ tile_image: url });
        console.log(this.state.tile_image);
        this.notify("tc", "Tile Image Uploaded", "success", "icon-check-2");
      });
    console.log(this.state.tile_image);
  }
  async saveDestination(e) {
    var DestinationsRef = firebase
      .database()
      .ref()
      .child("destination/" + window.$tmp.index);
    DestinationsRef.update({
      destname: this.state.destname,
      body: this.state.body,
      contact:{"address":this.state.address,"phone":this.state.phone,"website":this.state.website},
      image: this.state.image,
      tile_image:this.state.tile_image,
      index: window.$tmp.index,
    });
    this.notify("tc", "Destination event saved.", "success", "icon-check-2");
  }
  render() {
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="destname">Destination Details</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            defaultValue={window.$tmp.destname}
                            placeholder="Name"
                            type="text"
                            onChange={(e) => {
                              this.setState({ destname: e.target.value });
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue={window.$tmp.contact.address}
                            placeholder="Date"
                            type="text"
                            className="bg-transparent text-light"
                            onChange={(e) => {
                              this.setState({ address: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Contact Number</label>
                          <Input
                            defaultValue={window.$tmp.contact.phone}
                            placeholder="Contact Number"
                            type="text"
                            className="bg-transparent text-light"
                            onChange={(e) => {
                              this.setState({ phone: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Website</label>
                          <Input
                            defaultValue={window.$tmp.contact.website}
                            placeholder="Website"
                            type="text"
                            className="bg-transparent text-light"
                            
                            onChange={(e) => {
                              this.setState({ website: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Date</label>
                          <Input
                            defaultValue={this.state.date}
                            placeholder="Date"
                            type="text"
                            disabled
                            className="bg-transparent text-light"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Time</label>
                          <Input
                            defaultValue={this.state.time}
                            placeholder="Time"
                            type="text"
                            disabled
                            className="bg-transparent text-light"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Author</label>
                          <Input
                            defaultValue={window.$tmp.author}
                            placeholder="Author"
                            type="text"
                            disabled
                            className="bg-transparent text-light"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Body</label>
                          <Input
                            cols="80"
                            defaultValue={this.state.body}
                            placeholder="Body"
                            rows="4"
                            type="textarea"
                            onChange={(e) => {
                              this.setState({ body: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1 text-center" md="6" xs="12">
                        <FormGroup className="border border-primary rounded p-4">
                          <img
                            className="w-100"
                            src={this.state.image}
                            alt=""
                          ></img>
                          <i className="tim-icons icon-upload text-primary text-weight-bold"></i>
                          &nbsp;
                          <Button className="text-dark btn-primary" size="sm">
                            Upload Hero Image
                          </Button>
                          <br />
                          <Input
                            type="file"
                            onChange={(e) => {
                              this.getFile(e);
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1 text-center" md="6" xs="12">
                        <FormGroup className="border border-primary rounded p-4">
                          <img
                            className="w-100"
                            src={this.state.tile_image}
                            alt=""
                          ></img>
                          <i className="tim-icons icon-upload text-primary text-weight-bold"></i>
                          &nbsp;
                          <Button className="text-dark btn-primary" size="sm">
                            Upload Tile Image
                          </Button>
                          <br />
                          <Input
                            type="file"
                            onChange={(e) => {
                              this.getFile1(e);
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={(e) => this.saveDestination(e)}
                  >
                    Save
                  </Button>
                  {"   "}
                  <Link to="/admin/destinations">
                    <Button
                      className="btn-fill"
                      color="warning"
                      onClick={() => {
                        firebase
                          .database()
                          .ref("destination/" + window.$tmp.index)
                          .remove();
                        window.$notification = [
                          true,
                          "Destination deleted.",
                          "danger",
                          "icon-trash-simple",
                        ];
                      }}
                    >
                      Delete
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default DestinationDetail;
