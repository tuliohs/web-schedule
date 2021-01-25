

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: 0,
    //margin: theme.spacing(1),
    minWidth: 80,
  },
}));

export default function DefaultDropDown({ name, items, state, setState, refer, allItems = false, firsrOrDefault = false }) {

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const disabled = items?.length === 0

  React.useEffect(() => {
    if (firsrOrDefault && !state && items?.length > 0)
      setState(items[0].id)
  }, [])

  return (
    <div className={(disabled ? 'opacity-80' : '') + " text-white font-bold text-sm px-6 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1  ease-linear duration-150"}>
      <FormControl disabled={disabled} className={classes.formControl} >
        <InputLabel
          style={{
            color: 'white',
            fontFamily: 'inherit',
          }}
          id="demo-controlled-open-select-label">{name}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          style={{
            color: 'white',
            fontFamily: 'inherit',
          }}
        >
          {allItems ? <MenuItem value=""><em>None</em></MenuItem> : null}
          {items?.map(c => (
            <MenuItem
              key={c.id}
              ref={refer}
              value={c.value}
              style={{
                color: c.id === state ? 'white' : '', backgroundColor: '#38b2ac',
                padding: 10,
                fontFamily: 'inherit',
                margin: 0
              }}
              onClick={() => setState(c.id)}
            > { c.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div >
  );
}
