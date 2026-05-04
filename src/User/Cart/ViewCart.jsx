import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "axios";

export default function ViewCart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products/getItems")
            .then((response) => {
                const newArr = response.data.map((d) => ({
                    id: d._id,
                    productName: d.productName,
                    quantity: 1,
                    price: d.price,
                }));
                setData(newArr);
            });
    }, []);

    const updateQuantity = (id, delta) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item,
            ),
        );
    };

    const removeItem = (id) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div>
            {data.map((cart) => {
                const { id, productName, price, quantity } = cart;

                return (
                    <div key={id}>
                        <Grid justify="center" container>
                            <Grid item xs={4}>
                                <Card
                                    variant="outlined"
                                    style={{ margin: "1.5rem" }}
                                >
                                    <CardContent>
                                        <Grid container alignItems="center">
                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    {productName}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                >
                                                    $ {quantity * price}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            Quantity: {quantity}
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    updateQuantity(id, -1)
                                                }
                                                disabled={quantity <= 1}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    updateQuantity(id, 1)
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Typography>

                                        <Button
                                            color="secondary"
                                            onClick={() => removeItem(id)}
                                        >
                                            Remove from cart{" "}
                                            <RemoveShoppingCartIcon />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                );
            })}
        </div>
    );
}
