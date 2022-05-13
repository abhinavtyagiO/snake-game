import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SelectDifficultySchema } from "./validation";

const SelectDifficulty = () => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SelectDifficultySchema.validate(value, { abortEarly: false })
      .then(() => {
        setError(false);
        console.log("do something");
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <form>
      <div className="select-difficulty-form">
        <FormControl help>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Select Difficulty:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="easy" control={<Radio />} label="Easy" />
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel value="hard" control={<Radio />} label="Hard" />
          </RadioGroup>
          {error && (
            <FormHelperText error={error}>
              Please choose a difficulty-level.
            </FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Start Game
        </Button>
      </div>
    </form>
  );
};

export default SelectDifficulty;
