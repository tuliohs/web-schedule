

import React, { FunctionComponent, SetStateAction, useState, useEffect, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { defaultTheme, TTheme } from 'constants/themes/themeTypes';

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

export type TItemDropDown = {
  id: string,
  value: string
}
interface IDropDownDefault {
  name?: string,
  readonly items: Array<TItemDropDown>,
  setState: React.Dispatch<SetStateAction<string>>,
  refer?: any,
  allItems?: boolean,
  firsrOrDefault?: boolean,
  defaultElment?: string,
  theme?: TTheme,
}

const DefaultDropDown: FunctionComponent<IDropDownDefault> = ({ name,
  items, setState, refer, defaultElment = "", theme = defaultTheme,
  allItems = false, firsrOrDefault = false }) => {
  const classes = useStyles();
  //const dropDownRefer = createRef(null)
  const [element, setElement] = useState('');
  const [open, setOpen] = useState(false);

  //altera o id do estado passado pela interface
  const handleChangeParent = (id: string) => setState(id)

  //contrala o estado do dropdown de forma independente
  const handleChange = (event: any) => setElement(event.target.value)

  useEffect(() => {
    if (firsrOrDefault && !element && items?.length > 0) {
      setState(items[0].id)
      setElement(items[0].value)
    }
  }, [])
  useEffect(() => {
    if (defaultElment && !element && items?.length > 0)
      setElement(defaultElment)
  }, [defaultElment])

  const tema = `bg-${theme.color}-${theme?.grau} text-${theme.fontColor} text-${theme.fontSize}`
  return (
    <div className={(items?.length === 0 ? 'opacity-80' : '') + tema + " font-bold text-sm px-2 rounded shadow hover:shadow-md outline-none focus:outline-none  ease-linear duration-150"}>
      <FormControl disabled={items?.length === 0} className={classes.formControl} >
        <InputLabel
          style={{
            color: theme.fontColor,
            fontFamily: 'inherit',
          }}
          id="demo-controlled-open-select-label">{name}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={element}
          onChange={handleChange}
          style={{ color: theme.fontColor, fontFamily: 'inherit', }}
        >
          {allItems ? <MenuItem value=""><em>None</em></MenuItem> : null}
          {items?.map(c => (
            <MenuItem
              key={c.id}
              ref={refer}
              value={c.value}
              style={{
                color: c.id === element ? theme.fontColor : '', backgroundColor: '#38b2ac',
                fontFamily: 'inherit',
                margin: 0
              }}
              onClick={() => handleChangeParent(c.id)}
            > { c.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div >
  );
}

export default DefaultDropDown