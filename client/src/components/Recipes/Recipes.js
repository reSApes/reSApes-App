import Recipe from "../Recipe/Recipe";
import "./Recipes.css";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useRef, useEffect, useContext } from "react";
import IngredientsContext from "../../IngredientsContext";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ReactComponent as Homeingredients } from "./Homeingredients.svg";

function Recipes() {
  const {
    ingredients,
    recipes,
    setAllergies,
    allergies,
    allergiesList,
    setIngredientsFilter,
    setVeganFilter,
    setVegetarianFilter,
  } = useContext(IngredientsContext);

  const [recipesDisplay, setRecipesDisplay] = useState([]);

  const [contentFilter, setContentFilter] = useState("popular");

  useEffect(() => {
    setRecipesDisplay(recipes.slice(0, 12));
  }, [recipes]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const inputRef = useRef(null);

  const veganLabel = { inputProps: { "aria-label": "Switch vegan" } };
  const vegetarianLabel = { inputProps: { "aria-label": "Switch vegetarian" } };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#116530",
      },
    },
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAllergies(typeof value === "string" ? value.split(",") : value);
  };

  const handleIngredientsChange = (values) => {
    setIngredientsFilter(values.map((value) => value.name));
  };

  const veganChange = (event) => {
    setVeganFilter(event.target.checked);
  };
  const vegetarianChange = (event) => {
    setVegetarianFilter(event.target.checked);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="recipes-wrapper">
          <div className="mainTitles-mainImage">
            <div className="text">
              <span className="change-color">
                <b>
                  We know the deal.
                  <br /> We feel your pain.{" "}
                </b>
              </span>
              <span className="workhorse">
                Here are our superstar workhorse recipes, designed and tasted to
                help you cook a great meal. <br /> Add the ingredients you have
                in your fridge and find the recipe that suits you best!
              </span>
            </div>
            <div className="mainImage">
              <Homeingredients />
            </div>
          </div>

          <div className="row-search-switch">
            <Stack spacing={3} sx={{ width: 700 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                onChange={(e, values) => handleIngredientsChange(values)}
                options={ingredients}
                getOptionLabel={(ingredient) => ingredient.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Ingredients"
                    placeholder="Which ingredients do you have?"
                    ref={inputRef}
                  />
                )}
              />
            </Stack>
            <div className="switches">
              <div className="switch1">
                Vegan <Switch {...veganLabel} onChange={veganChange} />
              </div>
              <div className="switch2">
                Vegetarian{" "}
                <Switch {...vegetarianLabel} onChange={vegetarianChange} />
              </div>

              <div>
                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Allergies
                  </InputLabel>
                  <Select
                    className="selectaler"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={allergies}
                    onChange={handleChange}
                    input={<OutlinedInput label="Allergies" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {allergiesList
                      .filter((allergie) => allergie !== "None")
                      .map((allergie) => (
                        <MenuItem key={allergie} value={allergie}>
                          <Checkbox
                            checked={allergies.indexOf(allergie) > -1}
                          />
                          <ListItemText
                            className="selectaler"
                            primary={allergie}
                          />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="pop-all">
            <div
              className={`${contentFilter === "popular" ? "active" : ""}`}
              onClick={() => {
                setContentFilter("popular");
                setRecipesDisplay(recipes.slice(0, 12));
              }}
            >
              {" "}
              <span className="pop-margin">Popular Recipes</span>
            </div>
            <div
              className={`${contentFilter === "all-rec" ? "active" : ""}`}
              onClick={() => {
                setContentFilter("all-rec");
                setRecipesDisplay(recipes);
              }}
            >
              All Recipes
            </div>
          </div>

          <div className="recipes-dsgn">
            {recipesDisplay.map(
              ({
                _id: id,
                title,
                description,
                rating,
                time,
                image,
                difficulty,
                instructions,
                ingredients,
                vegan,
                vegetarian,
                ingredientsQuantities,
                comments,
              }) => (
                <Recipe
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  image={image}
                  rating={rating}
                  time={time}
                  difficulty={difficulty}
                  instructions={instructions}
                  ingredients={ingredients}
                  vegan={vegan}
                  vegetarian={vegetarian}
                  ingredientsQuantities={ingredientsQuantities}
                  comments={comments}
                />
              )
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
export default Recipes;
