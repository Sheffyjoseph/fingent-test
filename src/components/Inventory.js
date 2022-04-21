import React from "react";
import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Table,
} from "react-bootstrap";

const Inventory = () => {
  const [row, setRow] = useState(0);
  const [delRow, setDelRow] = useState(0);
  const [button, setButton] = useState(0);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  // Add Data (JSX)
  const data = [];
  for (let i = 1; i <= row; i++) {
    data.push(
      <Form onSubmit={add}>
        <Col lg={6} style={{ marginLeft: "25%", marginBottom: "1%" }}>
          <InputGroup>
            <FormControl
              placeholder="Product Code"
              aria-label="Product Code"
              name="pcode"
              aria-describedby="basic-addon1"
            />
            <FormControl
              placeholder="Product Name"
              aria-label="Product Name"
              name="pname"
              aria-describedby="basic-addon1"
            />
            <FormControl
              placeholder="Quantity"
              aria-label="Quantity"
              name="pquantity"
              aria-describedby="basic-addon1"
            />
            <Button
              variant="secondary"
              type="submit"
              style={{ border: "1px solid black" }}
            >
              ADD{" "}
            </Button>
          </InputGroup>
        </Col>
      </Form>
    );
  }
  // Add Data (Function)
  function add(e) {
    e.preventDefault();
    let pCode = e.target.pcode.value;
    let pName = e.target.pname.value;
    let pQty = e.target.pquantity.value;
    const newProduct = { pCode, pName, pQty };
    if ((pCode !== "") & (pName !== "") & (pQty !== "")) {
      setProducts([...products, newProduct]);
    }
    for (let data of products) {
      if ((pCode !== "") & (pName !== "") & (pQty !== "")) {
        if (data.pCode === pCode) {
          let newqty = Number(data.pQty) + Number(pQty);
          setProducts([...products, (data.pQty = newqty)]);
        }
      }
    }
  }

  // Delete Data (JSX)
  const updatedData = [];
  for (let i = 1; i <= delRow; i++) {
    updatedData.push(
      <Form onSubmit={deleteProduct}>
        <Col lg={6} style={{ marginLeft: "25%", marginBottom: "1%" }}>
          <InputGroup>
            <FormControl
              placeholder="Product Code"
              aria-label="Product Code"
              name={"pCode"}
              aria-describedby="basic-addon1"
            />
            <FormControl
              placeholder="Quantity"
              aria-label="Quantity"
              name="pQty"
              aria-describedby="basic-addon1"
            />
            <Button
              variant="secondary"
              type="submit"
              style={{ border: "1px solid black" }}
            >
              Update{" "}
            </Button>
          </InputGroup>
        </Col>
      </Form>
    );
  }
  // Delete Data (Function)
  function deleteProduct(e) {
    e.preventDefault();
    let pCode = e.target.pCode.value;
    let pQty = e.target.pQty.value;
    let index = products.findIndex((data) => data.pCode === pCode);
    alert("Data Updated successfully");
    if (products[index].pQty < pQty) {
      pQty = products[index].pQty;
    }
    setProducts([...products, (products[index].pQty -= pQty)]);
  }

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-5">
              <Button variant="outline-light" onClick={() => setButton(1)}>
                Add Products
              </Button>{" "}
            </Nav>
            <Nav className="me-5">
              <Button variant="outline-light" onClick={() => setButton(2)}>
                Remove Products
              </Button>{" "}
            </Nav>
            <Nav className="me-5">
              <Button variant="outline-light" onClick={() => setButton(3)}>
                List Products
              </Button>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />

      {button === 1 ? (
        <Row>
          <Col lg={4} style={{ marginLeft: "5%", marginTop: "30px" }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter number of products"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setCount(e.target.value)}
              />
              <Button variant="secondary" onClick={() => setRow(count)}>
                ADD{" "}
              </Button>
            </InputGroup>
          </Col>
          {data}
        </Row>
      ) : null}
      {button === 2 ? (
        <Row>
          <Col lg={4} style={{ marginLeft: "5%", marginTop: "30px" }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="No of item to remove"
                aria-label="itemremove"
                aria-describedby="basic-addon1"
                onChange={(e) => setRow(e.target.value)}
              />
              <Button variant="secondary" onClick={() => setDelRow(row)}>
                Show Fields
              </Button>
            </InputGroup>
          </Col>
          {updatedData}
        </Row>
      ) : null}

      {button === 3 ? (
        <Col lg={6} style={{ marginLeft: "25%", marginTop: "50px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) =>
                item.pCode ? (
                  <tr>
                    <td>{item.pCode}</td>
                    <td>{item.pName}</td>
                    <td>{item.pQty}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </Table>
        </Col>
      ) : null}
    </div>
  );
};

export default Inventory;
