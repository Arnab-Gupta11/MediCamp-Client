import * as yup from "yup";

export const regiterValidation = yup.object({
  name: yup.string().min(2, "Name must be at least 3 characters long").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  role: yup.string().required("Role is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and may include special characters."
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match. Please make sure the confirmation matches the entered password.")
    .required("Confirmation Password is required"),

  image: yup
    .mixed()
    .required("Image is required")
    .test(
      "FILE_FORMAT",
      "Invalid file format. Please upload a JPG, JPEG, or PNG image.",
      (value) => !value || (value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
    )
    .test("FILE_SIZE", "Image size must be less than 2MB", (value) => !value || (value && value.size <= 1024 * 1024)),
});
