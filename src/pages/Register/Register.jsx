import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { primaryBg } from "../../../theme";
import { useState } from "react";
import { GitHub, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { imageUpload } from "../../utils/uploadImage";
import { regiterValidation } from "../../schema/registerSchema";
import RingLoader from "react-spinners/RingLoader";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { facebookLogin, googleLogin, createUser, updateUserProfile } = useAuth();

  //<------------ Set visibility of password -------------->
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfirmPassword = () => setConfirmPassword((show) => !show);

  //<----------- Set initial value for form data ------------->
  const initialValues = {
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    image: null,
  };

  //<----------- Handle image ----------------->
  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
  };

  //<------------ Use formik to get data -------------->
  const { values, errors, handleBlur, handleChange, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: regiterValidation,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        //<------------ Upload Image ------------->
        const imageUrl = await imageUpload(values.image);

        //<------------ Create User ------------->
        const result = await createUser(values.email, values.password);
        await updateUserProfile(values.name, imageUrl);
        console.log("🚀 ~ onSubmit: ~ result:", result.user);

        const newUser = {
          name: values.name,
          email: values.email,
          role: values.role,
          image: imageUrl,
        };
      } catch (error) {
        console.log("🚀 ~ onSubmit: ~ error:", error);
      }

      setLoading(false);
    },
  });

  //<------------ Facebook Login -------------->
  const handleFacebookLogin = async () => {
    try {
      const result = await facebookLogin();
      console.log(result.user);
    } catch (error) {
      console.log("🚀 ~ handleFacebookLogin ~ error:", error);
    }
  };
  //<------------ Google Login -------------->
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      console.log(result.user);
    } catch (error) {
      console.log("🚀 ~ handleGoogleLogin ~ error:", error);
    }
  };

  return (
    <Container maxWidth="100%" sx={{ backgroundColor: primaryBg, minHeight: "100vh", pt: "20px" }}>
      <Box
        maxWidth="700px"
        boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        mx="auto"
        borderRadius="10px 10px"
        borderColor="secondary.main"
        sx={{ backgroundColor: "#FFFFFF" }}
        mb="20px"
      >
        <Box py="20px" borderRadius="10px 10px 100% 100%" sx={{ backgroundColor: "secondary.main" }}>
          <Typography variant="h1" align="center" color="white" fontSize="50px">
            SignUp
          </Typography>
        </Box>

        {/* <Grid container justifyContent="center" mt="10px">
          <Grid item>
            <Avatar src={profileImg ? profileImg : "/broken-image.jpg"} sx={{ width: 100, height: 100 }} />
          </Grid>
        </Grid> */}

        <Box maxWidth="80%" mx="auto" pb="20px">
          <form onSubmit={handleSubmit}>
            {/*----------- name and role container -----------*/}
            <Grid container spacing={{ xs: 0, md: 5 }} alignItems="center" justifyItems="center">
              <Grid item xs={12} md={6}>
                {/*--------------- Name field ----------------*/}
                <FormControl fullWidth sx={{ mt: "10px" }} variant="outlined">
                  <Typography fontWeight="500" color="#495057">
                    Name
                  </Typography>
                  <TextField
                    name="name"
                    type="text"
                    size="medium"
                    autoFocus
                    InputProps={{
                      style: { fontSize: "16px", fontWeight: "inherit", color: "#495057" },
                    }}
                    sx={{ mt: "5px", backgroundColor: primaryBg }}
                    placeholder="Your Name"
                    //get dat using formik
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/*------------ error message --------------*/}
                  {touched.name && errors.name ? (
                    <Typography variant="caption" color="red">
                      {errors.name}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {/*--------------- Role Field ----------------*/}
                <FormControl fullWidth size="medium" sx={{ mt: "10px" }}>
                  <Typography fontWeight="500" color="#495057" mb="5px">
                    Role
                  </Typography>
                  <Select
                    name="role"
                    InputProps={{
                      style: { fontSize: "8px", fontWeight: "inherit", color: "#495057" }, // Set font size and color
                    }}
                    sx={{ backgroundColor: primaryBg }}
                    //get dat using formik
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                  >
                    <MenuItem style={{ color: "red" }} divider disabled value="">
                      <em>Choose Your Role</em>
                    </MenuItem>
                    <MenuItem value={"participant"}>Participant</MenuItem>
                    <MenuItem value={"organizer"}>Organizer</MenuItem>
                    <MenuItem value={"doctor"}>Doctor</MenuItem>
                  </Select>
                  {/*------------ error message --------------*/}
                  {touched.role && errors.role ? (
                    <Typography variant="caption" color="red">
                      {errors.role}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
            </Grid>

            {/*---------- email and image container ----------*/}
            <Grid container spacing={{ xs: 0, md: 5 }} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                {/*--------------- Email field ----------------*/}
                <FormControl fullWidth sx={{ mt: "10px" }} variant="outlined">
                  <Typography fontWeight="500" color="#495057">
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    type="email"
                    size="medium"
                    InputProps={{
                      style: { fontSize: "16px", fontWeight: "inherit", color: "#495057" },
                    }}
                    sx={{ mt: "5px", backgroundColor: primaryBg }}
                    placeholder="Your Email"
                    //get dat using formik
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/*------------ error message --------------*/}
                  {touched.email && errors.email ? (
                    <Typography variant="caption" color="red">
                      {errors.email}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {/*--------------- Image field ----------------*/}
                <FormControl fullWidth sx={{ mt: "10px" }} variant="outlined">
                  <Typography fontWeight="500" color="#495057">
                    Image
                  </Typography>
                  <TextField
                    name="image"
                    type="file"
                    size="medium"
                    InputProps={{
                      style: { fontSize: "16px", fontWeight: "inherit", color: "#495057" },
                    }}
                    sx={{ mt: "5px", backgroundColor: primaryBg }}
                    //get dat using formik
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                  />
                  {/*------------ error message --------------*/}
                  {touched.image && errors.image ? (
                    <Typography variant="caption" color="red">
                      {errors.image}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
            </Grid>

            {/*---------- password and confirm password container ----------*/}
            <Grid container spacing={{ xs: 0, md: 5 }} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                {/*--------------- Password Field ----------------*/}
                <FormControl fullWidth sx={{ mt: "10px" }} variant="outlined">
                  <Typography fontWeight="500" color="#495057">
                    Password
                  </Typography>
                  <OutlinedInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{ mt: "5px", backgroundColor: primaryBg }}
                    placeholder="Password"
                    //get dat using formik
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/*------------ error message --------------*/}
                  {touched.password && errors.password ? (
                    <Typography variant="caption" color="red">
                      {errors.password}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {/*--------------- Confirm Password Field ----------------*/}
                <FormControl fullWidth sx={{ mt: "10px" }} variant="outlined">
                  <Typography fontWeight="500" color="#495057">
                    Confirm Password
                  </Typography>
                  <OutlinedInput
                    name="confirmPassword"
                    type={confirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickConfirmPassword} edge="end">
                          {confirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{ mt: "5px", backgroundColor: primaryBg }}
                    placeholder="Confirm Password"
                    //get dat using formik
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/*------------ error message --------------*/}
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Typography variant="caption" color="red">
                      {errors.confirmPassword}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
            </Grid>

            {/*--------------- Submit Button ----------------*/}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: "20px", ":hover": { backgroundColor: "#f74c4c" }, fontWeight: "bold", textTransform: "none" }}
            >
              {loading ? <RingLoader size={20} color="#000000" /> : "Signup"}
            </Button>
          </form>
        </Box>

        <Typography maxWidth="80%" mx="auto">
          Already have an Account? <Button sx={{ textTransform: "none" }}>Sign up</Button>
        </Typography>

        <Divider variant="middle">or</Divider>
        <Box pb="20px" pt="10px" borderRadius="0px 0px 10px 10px">
          <Grid container spacing={6} justifyContent="center">
            <Grid item sx={4}>
              <IconButton onClick={handleGoogleLogin}>
                <FcGoogle />
              </IconButton>
            </Grid>
            <Grid item sx={4}>
              <IconButton onClick={handleFacebookLogin} sx={{ color: "blue" }} aria-label="delete">
                <FaFacebook />
              </IconButton>
            </Grid>

            <Grid item sx={4}>
              <IconButton sx={{ color: "black" }} aria-label="delete">
                <GitHub />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
