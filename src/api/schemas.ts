import * as Yup from "yup";

export const userSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean().required(""),
});

export const personSchema = Yup.object({
  height: Yup.string().required("Height is required"),
  mass: Yup.string().required("Mass is required"),
  skin_color: Yup.string().required("Skin color is required"),
  birth_year: Yup.string().required("Birth year is required"),
  gender: Yup.string().required("Gender is required"),
});

export const planetSchema = Yup.object({
  rotation_period: Yup.string().required("Rotation period is required"),
  orbital_period: Yup.string().required("Orbital period is required"),
  diameter: Yup.string().required("Diameter is required"),
  climate: Yup.string().required("Climate is required"),
  gravity: Yup.string().required("Gravity is required"),
  population: Yup.string().required("Population is required"),
});

export const starshipSchema = Yup.object({
  model: Yup.string().required("Model is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  cost_in_credits: Yup.string().required("Cost in credits is required"),
  length: Yup.string().required("Length is required"),
  max_atmosphering_speed: Yup.string().required(
    "Max atmosphering speed is required"
  ),
  crew: Yup.string().required("Crew is required"),
  starship_class: Yup.string().required("Starship class is required"),
});
