import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import { newCategory } from 'api/mySchedule'


const initialItem = {
    title: '',
    description: '',
    status: 'single',
    progress: 0,
    subRows: undefined,
}

const AddItemDialog = (addItemHandler, currentTopic, setCurrentTopic) => {
    const [itemSc, setItemSc] = useState(initialItem)
    const [open, setOpen] = React.useState(false)

    const [switchState, setSwitchState] = React.useState({
        addMultiple: false,
    })

    const handleSwitchChange = name => event => {
        setSwitchState({ ...switchState, [name]: event.target.checked })
    }

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleAdd = event => {
        //addItemHandler(itemSc)
        setItemSc(initialItem)
        setOpen(false)
    }

    const handleChange = name => ({ target: { value } }) => {
        setItemSc({ ...itemSc, [name]: value })
    }


    const addcatHandler = async () => {
        await newCategory({ title: itemSc.title, description: itemSc.description, topicId: currentTopic?._id })
            .then(() => {
                //const getDados = async () => await obterScheduleItems().then(c => {
                //    //setTabdata({})
                //    setData(c.data)
                //}).catch(e => console.log("err", e))
                //getDados()
            })
    }

    return (
        <div>
            <Tooltip title="Add">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add item to Schedule.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={itemSc.title}
                        onChange={handleChange('title')}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={itemSc.description}
                        onChange={handleChange('description')}
                    />
                    {/*<TextField
                        margin="dense"
                        label="Status"
                        type="text"
                        fullWidth
                        value={itemSc.status}
                        onChange={handleChange('status')}
                    />
                    <TextField
                        margin="dense"
                        label="Profile Progress"
                        type="number"
                        fullWidth
                        value={itemSc.progress}
                        onChange={handleChange('progress')}
                    />*/}
                </DialogContent>
                <DialogActions>
                    <Tooltip title="Add multiple">
                        <Switch
                            checked={switchState.addMultiple}
                            onChange={handleSwitchChange('addMultiple')}
                            value="addMultiple"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Tooltip>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => addcatHandler({})} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

AddItemDialog.propTypes = {
    addItemHandler: PropTypes.func.isRequired,
}

export default AddItemDialog
