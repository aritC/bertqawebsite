import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";

import Answer from "./answer";
import axios from "axios";

import "../App.css";

class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      context: "",
      answer: "",
      isError: false,
      close: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.id]: target.value,
      answer: "",
    });
  }

  handleSubmit(event) {
    const question = this.state.question;
    const context = this.state.context;
    if (question === "" || context === "") {
      this.setState({
        isError: true,
        answer: ["Please enter both question and context before sending data"],
      });
      return;
    }
    axios
      .post(`http://127.0.0.1:5000/question`, { question, context })
      .then((res) => {
        this.setState({
          answer: res.data.message,
        });
      })
      .catch((err) => {
        this.setState({
          isError: true,
          answer: err.response
            ? err.response.data.message
            : ["Could not connect to server"],
        });
      });
  }

  render() {
    return (
      <Container fluid="md">
        <br />
        <Form>
          <Form.Group
            className="mb-3"
            controlId="context"
            onChange={this.handleInputChange}
          >
            <FloatingLabel label="Enter A Context :" controlId="context">
              <Form.Control
                as="textarea"
                placeholder="Enter A Context"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="question"
            onChange={this.handleInputChange}
          >
            <FloatingLabel label="Ask A Question :" controlId="question">
              <Form.Control placeholder="Ask a Question" />
            </FloatingLabel>
          </Form.Group>
          <Button
            variant="primary"
            size="mb"
            active
            onClick={this.handleSubmit}
          >
            Answer
          </Button>
        </Form>

        {this.state.answer !== "" ? (
          <>
            <br />
            <Answer
              answer={this.state.answer}
              isError={this.state.isError}
              style={{ paddingTop: "50" }}
            />
          </>
        ) : (
          ""
        )}
      </Container>
    );
  }
}
export default Body;
