import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <h3>Comprehension Question Answering App</h3>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Find the Code Repo &nbsp;
            <a href="https://github.com/aritC/bertqawebsite">here</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
