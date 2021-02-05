import React from "react";
import { Redirect } from "react-router-dom";
import firebase from "../variables/config";
import NotificationAlert from "react-notification-alert";
import { v1 as uuidv1 } from 'uuid';

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
class AddBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      links: "",
      image: "",
      tile_image:"",
      redirect: false,
    };
  }
  notify = (place, body, type, icon) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{body}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons " + icon,
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
    window.$notifications.push([body, "", icon]);
  };
  async addBlog(e) {
    try {
      var uniqueId = uuidv1();
    var BlogRef = firebase
      .database()
      .ref()
      .child("blog/" + uniqueId);
    BlogRef.set({
      title: this.state.title,
      body: this.state.body,
      links: this.state.links,
      author:this.state.author,
      image: this.state.image,
      tile_image:this.state.tile_image,
      index: uniqueId,
      datentime : String(new Date()),
    });
    window.$notification = [true, "Blog added.", "success", "icon-check-2"];
    this.setState({ redirect: true });
  }
  catch (error) {
    this.notify("tc", "Form can't be blank", "danger", "icon-simple-remove");
    window.$notification = [true, "Form can't be blank", "danger", "icon-simple-remove"];
    console.log(error);
    }
  }  
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
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/admin/blogs" />;
    }
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
                  <h5 className="title">Add Blog</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            defaultValue={this.state.title}
                            placeholder="Title"
                            type="text"
                            onChange={(e) => {
                              this.setState({ title: e.target.value });
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Author</label>
                          <Input
                            defaultValue={this.state.author}
                            placeholder="Author"
                            type="text"
                            onChange={(e) => {
                              this.setState({ author: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Link</label>
                          <Input
                            defaultValue={this.state.links}
                            placeholder="Link"
                            type="text"
                            onChange={(e) => {
                              this.setState({ links: e.target.value });
                            }}
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
                          <img className='w-100' src={this.state.image} alt=""></img>
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
                          <img className='w-100' src={this.state.tile_image} alt=""></img>
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
                    color="success"
                    type="submit"
                    onClick={(e) => this.addBlog(e)}
                  >
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AddBlog;
