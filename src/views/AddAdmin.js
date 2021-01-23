import React from "react";
import firebase from "../variables/config";
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  CardTitle,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  componentDidMount() {}
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
  
  async resetMailAdmin(e) {
    await firebase.auth().createUserWithEmailAndPassword(this.state.email, "quizHaiYaar@123");
    await firebase.auth().sendPasswordResetEmail(this.state.email);
    this.notify("tc", this.state.email+" added as admin", "success", "icon-check-2");
    this.setState({email:""});
  }
  render() {
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col className="mx-auto mt-5" md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-simple-add text-primary" />{" "}
                    Add Admin
                  </CardTitle>
                </CardHeader>
                <CardBody>
                    <Col md="12">
                      <FormGroup>
                        <label>Email Address</label>
                        <Input
                          placeholder="example@company.com"
                          value={this.state.email}
                          type="email"
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Col>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    type="button"
                    onClick={(e) => this.resetMailAdmin(e)}
                  >
                    + Create admin
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

export default AddAdmin;
