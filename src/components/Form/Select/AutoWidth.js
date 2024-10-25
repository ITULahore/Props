import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AutoWidth({ items, label,onChange }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <div>
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
            
              value={value}
              onChange={handleChange}
              autoWidth
              label={label}
            >
              {items?.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
      </Card>
    </>
  );
}
