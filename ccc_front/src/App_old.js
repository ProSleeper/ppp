import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function App() {
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUrl">
          <Form.Label>URL 입력</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <Form.Text className="text-muted">
            입력한 URL을 서버로 전송합니다.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          전송
        </Button>
      </Form>
    </div>
  );
}

export default App;