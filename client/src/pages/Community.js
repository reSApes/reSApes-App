import "./Community.css";
import { ReactComponent as Upload } from "./Upload.svg";
import React, { useState } from "react";
import { useContext } from "react";
import IngredientsContext from "../IngredientsContext";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UserContext from "../UserContext";

function Community() {
  const { ingredients, units } = useContext(IngredientsContext);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [description, setDecription] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [instruction, setInstruction] = useState(null);
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [ingredient, setIngredient] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedQty, setSelectedQty] = useState(0);
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);
  console.log(user);
  const handelDifficultyChange = (event) => {
    console.log(event.target.value);
    setDifficulty(event.target.value);
  };

  const veganLabel = { inputProps: { "aria-label": "Switch vegan" } };
  const vegetarianLabel = { inputProps: { "aria-label": "Switch vegetarian" } };

  const veganChange = (event, value) => {
    console.log(event.target.checked);
    setVegan(value);
  };
  const vegetarianChange = (event, value) => {
    setVegetarian(value);
  };

  const handleInputChange = (name, value, index) => {
    const list = [...ingredient];
    list[index][name] = value;
    setIngredient(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...ingredient];
    list.splice(index, 1);
    setIngredient(list);
  };

  const handleAddClick = () => {
    setIngredient([
      ...ingredient,
      {
        Quantity: selectedQty,
        Unit: selectedUnit,
        Ingredient: selectedIngredient,
      },
    ]);
    setSelectedQty(0);
  };

  const handleRemoveInstru = (index) => {
    const list = [...instructions];
    list.splice(index, 1);
    setInstructions(list);
  };

  const handleAddInstru = () => {
    setInstructions([...instructions, instruction]);
    setInstruction(null);
    setInstruction("");
  };

  const handleChangeInstru = (index, value) => {
    const list = [...instructions];
    list.splice(index, 1, value);
    setInstructions(list);
  };

  const handleSubmitRecipe = async (e) => {
    e.preventDefault();
    const addRecipe = {
      title,
      time,
      difficulty,
      description,
      instructions,
      image,
      ingredientsQuantities: JSON.stringify(ingredient),
      vegan,
      vegetarian,
    };

    const data = new FormData();
    for (const prop in addRecipe) {
      if (Array.isArray(addRecipe[prop])) {
        addRecipe[prop].forEach((propValue) => {
          data.append(prop, propValue);
        });
      } else {
        data.append(prop, addRecipe[prop]);
      }
    }

    await fetch("/api/recipes", {
      method: "POST",
      body: data,
      headers: {
        id: user?._id,
      },
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#116530",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <form className="community-page" onSubmit={handleSubmitRecipe}>
          <div className="maintitle">
            <div className="firsttitle">Share Your Favorite Recipe With Us</div>
            <div className="sectitle">Add New Recipe</div>
          </div>
          <div className="container-name-des">
            <div className="container-img">
              <div className="container-items">
                {!image ? (
                  <span className="container-title">
                    {" "}
                    Upload a stimulating image
                  </span>
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    style={{ width: "100%" }}
                  />
                )}
                <div className="upload-img">
                  <Upload />
                  <input
                    enctype="multipart/form-data"
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="switch-veg">
                <div>
                  Vegan <Switch {...veganLabel} onChange={veganChange} />
                </div>
                <div>
                  Vegetarian{" "}
                  <Switch {...vegetarianLabel} onChange={vegetarianChange} />
                </div>
              </div>
            </div>
            <div className="name-des">
              <div className="add-time">
                <TextField
                  sx={{ width: 150 }}
                  id="standard-basic"
                  label="Cook time 🕓"
                  variant="outlined"
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Min"
                  type="number"
                />
              </div>
              <div className="add-name">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      m: 1,
                      width: "415px",
                      borderRadius: "10px",
                      border: "2px 1f6e3c solid",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    id="outlined-basic"
                    label="Recipe Name"
                    variant="outlined"
                  />
                </Box>
              </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "415px",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="add-desc">
                  <TextField
                    onChange={(e) => setDecription(e.target.value)}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={8}
                  />
                </div>
              </Box>

              <div className="add-difficulty">
                <Box sx={{ width: "415px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Difficulty
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={difficulty}
                      label="Difficulty"
                      onChange={handelDifficultyChange}
                    >
                      <MenuItem value={"Beginner"}>Beginner</MenuItem>
                      <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                      <MenuItem value={"Advanced"}>Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>

          <div className="add-inputList">
            <div className="list-title">List your ingredients</div>
            <div className="Qua-uni-ingre">
              <div className="add-quantity">
                <TextField
                  sx={{ width: 130 }}
                  id="standard-basic"
                  label="Quantity"
                  variant="standard"
                  placeholder="Add Quantity"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  name="Quantity"
                  value={selectedQty}
                  onChange={(e) => {
                    setSelectedQty(e.target.value);
                  }}
                />
              </div>
              <div className="add-unit">
                <Stack spacing={3} sx={{ width: 130 }}>
                  <Autocomplete
                    onChange={(e, value) => {
                      setSelectedUnit(value);
                    }}
                    autoWidth
                    id="tags-standard"
                    options={units}
                    getOptionLabel={(unit) => unit.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Unit"
                        placeholder="Choose Unit"
                      />
                    )}
                  />
                </Stack>
              </div>
              <div className="add-ingredient">
                <Stack spacing={3} sx={{ width: 130 }}>
                  <Autocomplete
                    onChange={(e, value) => {
                      setSelectedIngredient(value);
                    }}
                    id="tags-standard"
                    options={ingredients}
                    getOptionLabel={(ingredient) => ingredient.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Add Ingredient"
                        placeholder="Choose Ingredient"
                      />
                    )}
                  />
                </Stack>
              </div>
              <div className="btn-box">
                <div className="add-icon-style">
                  <Fab
                    className="add-button"
                    onClick={handleAddClick}
                    color="primary"
                    aria-label="add"
                    size="small"
                  >
                    {" "}
                    <AddIcon />{" "}
                  </Fab>
                </div>
              </div>
            </div>
            {ingredient.map((x, i) => {
              return (
                <div className="Qua-uni-ingre">
                  <div className="add-quantity">
                    <TextField
                      sx={{ width: 130 }}
                      id="standard-basic"
                      label="Quantity"
                      variant="standard"
                      onChange={(e) =>
                        handleInputChange("Quantity", e.target.value, i)
                      }
                      value={x.Quantity}
                      placeholder="Add Quantity"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      name="Quantity"
                    />
                  </div>
                  <div className="add-unit">
                    <Stack spacing={3} sx={{ width: 130 }}>
                      <Autocomplete
                        autoWidth
                        defaultValue={x.Unit}
                        id="tags-standard"
                        onChange={(e, value) =>
                          handleInputChange("Unit", value.name, i)
                        }
                        options={units}
                        getOptionLabel={(unit) => unit.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Unit"
                            placeholder="Choose Unit"
                          />
                        )}
                      />
                    </Stack>
                  </div>
                  <div className="add-ingredient">
                    <Stack spacing={3} sx={{ width: 130 }}>
                      <Autocomplete
                        defaultValue={x.Ingredient}
                        id="tags-standard"
                        onChange={(e, value) =>
                          handleInputChange("Ingredients", value.name, i)
                        }
                        options={ingredients}
                        getOptionLabel={(ingredient) => ingredient.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Add Ingredient"
                            placeholder="Choose Ingredient"
                          />
                        )}
                      />
                    </Stack>
                  </div>
                  <div className="btn-box">
                    {ingredient.length !== 0 && (
                      <Button
                        sx={{ color: "#ffca40" }}
                        onClick={() => handleRemoveClick(i)}
                        startIcon={<DeleteIcon />}
                      ></Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sub-cont">
            <Box
              className="inst-container"
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "1060px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <div className="instructions-title">Add your instructions</div>
                <div className="instru-list">
                  <TextField
                    style={{ width: 900 }}
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    id="outlined-multiline-static"
                    label=" Add Instruction"
                    multiline
                    rows={1}
                  />
                  <div className="btn-box">
                    <Fab
                      sx={{ ml: 2 }}
                      onClick={handleAddInstru}
                      color="primary"
                      aria-label="add"
                      size="small"
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
                {instructions.map((x, i) => {
                  return (
                    <div className="instru-list">
                      {i + 1}.
                      <TextField
                        style={{ width: 900 }}
                        value={x}
                        onChange={(e) => handleChangeInstru(i, e.target.value)}
                        id="outlined-multiline-static"
                        label="Instruction"
                        multiline
                        rows={1}
                        InputLabelProps={{ shrink: true }}
                      />
                      <div className="btn-box">
                        <Button
                          sx={{ color: "#ffca40" }}
                          onClick={() => handleRemoveInstru(i)}
                          startIcon={<DeleteIcon />}
                        ></Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Box>
            <div className="button-submit">
              <button className="sub-butt" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </ThemeProvider>
    </>
  );
}
export default Community;
