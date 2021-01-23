import React from "react";
import firebase from "../variables/config";
import NotificationAlert from "react-notification-alert";
import ReactLoading from "react-loading";
import logo from '../assets/img/favicon.png';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMessage: null,
    redirect: false,
  };

  notify = (place) => {
    var type = "danger";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{this.state.errorMessage}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-simple-remove",
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  handleLogin = async () => {
    this.setState({ isLoading: true });
    let { email, password } = this.state;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        var user = firebase.auth().currentUser;
        if (user) {
          this.setState({ redirect: true });
        } else {
          this.setState({ redirect: false, isLoading: false });
        }
      })
      .catch((error) =>{
        this.setState({ errorMessage: error.message, isLoading: false });
        this.notify("tc");
      });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/admin/index" />;
    }
    return (
      <>
      <div className="react-notification-alert-container">
        <NotificationAlert ref="notificationAlert" />
      </div>
        <Col lg="5" md="7" className="m-auto" style={{paddingTop:"170px"}}>
          <Card>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <img src={logo} style={{width:'4rem'}} alt="chikkamagaluru.org"/>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85 text-primary" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      type="email"
                      placeholder="Email Address"
                      autoCompleteType="email"
                      placeholderTextColor="#000"
                      autoCapitalize="none"
                      onChange={(email) =>
                        this.setState({ email: email.target.value })
                      }
                      // value={this.state.email}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle text-primary" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      type="password"
                      placeholder="Password"
                      autoCompleteType="password"
                      placeholderTextColor="#000"
                      autoCapitalize="none"
                      secureTextEntry
                      onChange={(password) =>
                        this.setState({ password: password.target.value })
                      }
                      // value={this.state.password}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <ReactLoading
                    className={
                      this.state.isLoading ? "mx-auto my-4  d-auto" : "d-none"
                    }
                    type="spin"
                    color="#e14eca"
                    height={35}
                    width={35}
                  />
                  <Button
                    onClick={() => {
                      this.handleLogin();
                    }}
                    className={
                      !this.state.isLoading ? "my-3 d-auto" : "my-3 d-none"
                    }
                    color={this.state.isLoading ? "success" : "primary"}
                    type="button"
                  >
                  {this.state.isLoading ? "Signing in" : "Sign in"}
                </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Login;
