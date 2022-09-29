import {
  TextField,
  Grid,
  Container,
  Select,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import { NextPage } from 'next'
import MuiPhoneNumber from 'material-ui-phone-number'
import React from 'react'
//npm install --save material-ui-dropzone
interface Props {}

const BMApplicationFormPage: NextPage<Props> = ({}) => (
  <Container>
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <h1> Please fill out the required information</h1>
      <form>
        <Grid container direction="column" pt={1}>
          <Grid item>
            <TextField
              label="First Name"
              variant="filled"
              style={{ width: 300 }}
              required
            />
          </Grid>
          <Grid item pt={1}>
            <TextField
              label="Last Name"
              variant="filled"
              style={{ width: 300 }}
              required
            />
          </Grid>
          <Grid item pt={1}>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              style={{ width: 300 }}
              required
            />
          </Grid>
          <Grid item pt={1}>
            <TextField
              label="Password"
              variant="filled"
              type="password"
              style={{ width: 300 }}
              required
            />
          </Grid>
          <Grid item pt={1}>
            <TextField
              label="Phone Number"
              variant="filled"
              type="Phone Number"
              style={{ width: 300 }}
              required
            />
          </Grid>
          <Grid item pt={1}>
            <TextField
              label="School"
              variant="filled"
              style={{ width: 300 }}
              required
            />
          </Grid>
          <Grid item pt={1}>
            <TextField
              label="Major"
              variant="filled"
              style={{ width: 300 }}
              required
            />
          </Grid>
        </Grid>
        <Grid container pt={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Graduation Year
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Graduation Year"
              required
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
              <MenuItem value={2026}>2026</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container pt={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
              <MenuItem value={3}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container pt={1}></Grid>
      </form>
    </Box>
  </Container>
)

export default BMApplicationFormPage
