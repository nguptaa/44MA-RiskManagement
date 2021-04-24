import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
}));

export default function Core() {
  const [entry, setEntry] = useState("");
  const [stoploss, setStoploss] = useState("");
  const [risk, setRisk] = useState("");

  const dif = entry - stoploss;
  const diff = dif > 0 ? dif : "Entry should be greater than Stoploss";
  const quantity =
    diff > 0 && risk === ""
      ? "Enter Risk Amount"
      : diff > 0 && risk > 0
      ? Math.round(risk / diff)
      : 0;
  const rupeeTarget = diff > 0 ? diff * 2 : 0;
  const target = diff > 0 ? parseInt(entry) + parseInt(rupeeTarget) : 0;

  function resetInput() {
    setEntry("");
    setStoploss("");
    setRisk("");
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TimelineIcon />
        </Avatar>
        <Typography variant="h4">Swing Trading Risk Management</Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="entry"
                variant="outlined"
                // required
                fullWidth
                id="entry"
                type="number"
                label="Entry"
                color="success"
                value={entry}
                onChange={(event) => setEntry(event.target.value)}
                // autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                id="stopLoss"
                label="Stop Loss"
                type="number"
                name="stopLoss"
                value={stoploss}
                onChange={(event) => setStoploss(event.target.value)}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Difference of Entry and Stop Loss:
              </Typography>
              <Typography color="secondary" variant="subtitle2">
                {diff}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                id="risk"
                label="How much Risk?"
                type="number"
                name="risk"
                color="secondary"
                value={risk}
                onChange={(event) => setRisk(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Quantity to buy:</Typography>
              <Typography color="primary" variant="subtitle2">
                {quantity}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Rupee Target:</Typography>
              <Typography color="primary" variant="subtitle2">
                {rupeeTarget}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Target:</Typography>
              <Typography className={classes.success} variant="subtitle2">
                {target}
              </Typography>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={resetInput}
          >
            Reset
          </Button>
        </div>
      </div>
    </Container>
  );
}
