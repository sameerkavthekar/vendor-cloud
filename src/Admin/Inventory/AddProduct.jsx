import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  CardContent,
  Button,
  Card
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Add, Cancel } from "@material-ui/icons";
import Header from "../Header";
import axios from "axios";

class AddProduct extends React.Component {
  state = {
    productName: "",
    productCategory: "Grocery",
    productPrice: 0,
    productQuantity: 0,
  };

  handleClick = (e) => {
    const {
      productName,
      productCategory,
      productPrice,
      productQuantity,
    } = this.state;
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/api/products/addItems/${this.props.userId}`,
        { productName, productQuantity, productCategory, productPrice }
      )
      .then((res) => {
        console.log(res);
        this.props.handleAddClick();
        window.location.reload();
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Header />
        <Grid justify="center" container>
          <Card variant="outlined" style={{ margin: "2rem", width: "35rem" }}>
            <CardContent>
              <form>
                <Typography
                  style={{ fontSize: "1rem" }}
                  variant="overline"
                  display="block"
                >
                  Add Product
                </Typography>
                <hr />
                <br />
                <TextField
                  name="productName"
                  variant="outlined"
                  required
                  fullWidth
                  id="productName"
                  label="Product Name"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Select
                  name="productCategory"
                  variant="outlined"
                  required
                  fullWidth
                  id="productCategory"
                  label="Product Category"
                  onChange={this.handleChange}
                  value={this.state.productCategory}
                >
                  <MenuItem value={"Grocery"}>Grocery</MenuItem>
                  <MenuItem value={"Stationary and Novelties"}>
                    Stationary and Novelties
                  </MenuItem>
                  <MenuItem value={"Pharmacy"}>Pharmacy</MenuItem>
                  <MenuItem value={"Clothing and Accessories"}>
                    Clothing and Accessories
                  </MenuItem>
                  <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                </Select>
                <br />
                <br />
                <TextField
                  name="productPrice"
                  variant="outlined"
                  required
                  fullWidth
                  id="productPrice"
                  label="Product Price"
                  type="number"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  name="productQuantity"
                  variant="outlined"
                  required
                  fullWidth
                  id="productQuantity"
                  label="Product Quantity"
                  type="number"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Grid justify="center" spacing={3} container>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="large"
                      style={{ color: blue[500] }}
                      startIcon={<Add />}
                      onClick={this.handleClick}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="large"
                      startIcon={<Cancel />}
                      onClick={this.props.handleAddClick}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default AddProduct;
