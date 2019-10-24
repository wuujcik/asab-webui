import React, { Component } from 'react'
import { Button, ButtonGroup, ButtonToolbar,Card, CardBody, CardHeader, CardFooter, CardGroup, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import OauthPopup from 'react-oauth-popup';
import queryString from 'query-string'


class AuthContainer extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");


      this.state = {
        buttons:[]
      };

      const TLdomain = "https://via.teskalabs.com/seacat-auth";
      const TLendpoint = "/authorization_endpoint/authentication_request"
      const TLparams = {
        response_type:"code",
        client_id: "???",
        scope: "openid profile",
        state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: "http://localhost:3000/auth/teskalabs",
      };
      this.TeskalabsURL = `${TLdomain}${TLendpoint}?${queryString.stringify(TLparams)}`

      // console.log("================================")
      // //console.log (queryString.stringify(t))
      // console.log(this.TeskalabsURL)
      // console.log("================================")


    }

    async onCode(key, code){
      const path = await this.AuthService.login(key, code)
      console.log ('***********************************')
      console.log (path)
      console.log ('*********************************** kapr')
      this.props.history.push(path);

    }


    componentDidMount() {
      const links = this.AuthService.getButtonsInfo();
      const buttons = Object.keys (links)
      .sort((a, b) => { return a.order - b.order})
      .map(
        (key)=> {
          return (
            <OauthPopup
              key = {links[key].order}
              url = {links[key].link}
              title = {key}
              onCode = {(code) => this.onCode(key, code)}
            >
              <Button className="tlbtn" size="lg" block>
                {key}
              </Button>
            </OauthPopup>
          )
        }
      )
      this.setState ({buttons})

    }

    render() {


      const buttons = this.state.buttons;

      return (
        <Container>
				  <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-6">
                  <CardHeader>
                  	<h4>Sign in with</h4>
                  </CardHeader>
                  <CardBody className="justify-content-center">
                    {/* <a href = {this.teskalabsAuthProvider}> */}
                    {/* <ButtonToolbar> */}
                    {/* <ButtonGroup> */}
                        {buttons}
                        {/* <OauthPopup
                          url = {this.TeskalabsURL}
                          title = "Login with Teskalabs"
                          onCode = {this.onTeskalabs.bind(this)}
                        >
                          <Button className="tlbtn" size="lg" block>
                            Teskalabs
                          </Button>
                        </OauthPopup>
                        <OauthPopup
                          url = {this.GitHubURL}
                          title = "Login with GitHub"
                          onCode = {this.onGitHub.bind(this)}
                        >
                          <br/>
                          <Button className="githubbtn" size="lg"  block>
                            GitHub
                          </Button>
                        </OauthPopup> */}
                      {/* </ButtonGroup> */}
                    {/* </ButtonToolbar> */}
                    {/* </a> */}
                  </CardBody>
                  <CardFooter>
                    Or you can
                    <Link to={`/auth/register`}> register</Link>

                  </CardFooter>
                </Card>
              </CardGroup>
            </Col>
          </Row>
			  </Container>
      );
    }

  }


  export default AuthContainer;
