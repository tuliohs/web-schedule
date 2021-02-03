

import React, { FunctionComponent, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Instance } from '@popperjs/core';


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
type TItemDropDown = {
  id: string,
  value: string
}

interface IDropDownDefault {
  name: string,
  items: Array<TItemDropDown>,
  state: string,
  setState: React.Dispatch<SetStateAction<string>>,
  refer: any,
  allItems: boolean,
  firsrOrDefault: boolean
}

const DefaultDropDown: FunctionComponent<IDropDownDefault> = ({ name,
  items, state, setState, refer,
  allItems = false, firsrOrDefault = false }) => {
  console.log(items, 'items')
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: any) => {
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

export default DefaultDropDown