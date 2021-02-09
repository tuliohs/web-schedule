import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { defaultTheme, TTheme } from 'constants/themes/themeTypes'

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

export default function ControlledOpenSelect({ name, items, state, setState, refer, allItems = false }) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const disabled = items?.length === 0

  const theme = defaultTheme
  const tema = `bg-${theme.color}-${theme?.grau} text-${theme.fontColor} text-${theme.fontSize}`

  return (
    <div className={(disabled ? 'opacity-80' : '') + ` font-bold text-sm px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1
    ${tema /*bg-teal-500 text-white active:bg-teal-600 */}
    
    ease-linear transition-all duration-150`}>
      <FormControl disabled={disabled} className={classes.formControl}>
        <InputLabel
          style={{
            color: theme.color,
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
            color: theme.color,
            fontFamily: 'inherit',
          }}
        >
          {allItems ? <MenuItem value=""><em>None</em></MenuItem> : null}
          {items?.map(c => (
            <MenuItem
              key={c.id}
              ref={refer}
              value={c.id}
              style={{
                color: c.id === state ? theme.color : '',
                // backgroundColor: '#38b2ac',
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
