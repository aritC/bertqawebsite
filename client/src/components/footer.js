import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class Footer extends React.Component {
  render() {
    return (
      <Navbar
        bg="light"
        variant="light"
        fixed="bottom"
        collapseOnSelect
        expand="md"
      >
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text> Created By Arit Chanda</Navbar.Text> &nbsp;&nbsp;
            <Navbar.Text>
              <a href="https://github.com/aritC/">GitHub</a>
            </Navbar.Text>
            &nbsp;&nbsp;
            <Navbar.Text>
              <a href="https://www.linkedin.com/in/aritc/">LinkedIn</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
