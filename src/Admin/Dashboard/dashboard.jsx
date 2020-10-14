import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Accordion, AccordionDetails, AccordionSummary, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Grid} from "@material-ui/core"
import {ExpandMore} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  headertable: {
    backgroundColor: "#e6f0ff",
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const data = [
    {
      id: "panel1",
      name: "Sameer Kavthekar",
      address: "Sylvan Heights, Aundh, Pune",
      product: [
        { name: "Tomatoes", quantity: "2", cost: "8" },
        { name: "Shorts for Men", quantity: "1", cost: "20" },
      ],
    },
    {
      id: "panel2",
      name: "Shreya Vaidya",
      address: "Mont Vert Dieu, Pashan, Pune",
      product: [{ name: "Notebooks (Pack of 6)", quantity: "2", cost: "40" }],
    },
    {
      id: "panel3",
      name: "Shubham Mujumdar",
      address: "C-3, Pink City, Wakad, Pune",
      product: [
        { name: "Potatoes", quantity: "3", cost: "15" },
        { name: "Ramen", quantity: "5", cost: "10" },
      ],
    },
  ];

  return (
    <div className={classes.root}>
      {data.map((accordion) => {
        const { id, name, address, product } = accordion;

        return (
          <Grid container justify="center">
            <Grid item xs={8}>
              <Accordion
                expanded={expanded === id}
                key={id}
                onChange={handleChange(id)}
                style={{ margin: "0.5rem" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Grid container justify="space-between">
                  <Typography className={classes.heading}>{name}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {address}
                  </Typography>
                  </Grid>
                  
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Grid container justify="center">
                      <Grid item>
                        <TableContainer
                          component={Paper}
                          style={{ marginLeft: "13rem" }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow className={classes.headertable}>
                                <TableCell>Product</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Cost</TableCell>
                              </TableRow>
                            </TableHead>
                            {product.map((product) => (
                              <TableBody>
                                <TableRow>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell>{product.quantity}</TableCell>
                                  <TableCell>{product.cost}</TableCell>
                                </TableRow>
                              </TableBody>
                            ))}
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
