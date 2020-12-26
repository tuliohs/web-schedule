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

import axios from 'axios'


const initialItem = {
    title: '',
    description: '',
    status: 'single',
    progress: 0,
    subRows: undefined,
}

const AddItemDialog = props => {

    const [urImage, setUrImage] = useState()
    // base api url being used
    const API_URL = "http://localhost:9890";
    function uploadImage(e, method) {
        let imageObj = {};

        let imageFormObj = new FormData();

        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", e.target.files[0]);

        console.log(imageFormObj)
        // stores a readable instance of 
        // the image being uploaded using multer
        setUrImage({ multerImage: URL.createObjectURL(e.target.files[0]) });

        axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Image has been successfully uploaded using multer");
                    this.setDefaultImage("multer");
                }
            })
            .catch((err) => {
                alert("Error while uploading image using multer");
                this.setDefaultImage("multer");
            });
    }

    // function to capture base64 format of an image
    function getBaseFile(files) {
        // create a local readable base64 instance of an image
        this.setState({
            baseImage: files.base64
        });

        let imageObj = {
            imageName: "base-image-" + Date.now(),
            imageData: files.base64.toString()
        };

        axios.post(`${API_URL}/image/uploadbase`, imageObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Image has been successfully uploaded using base64 format");
                    this.setDefaultImage("base");
                }
            })
            .catch((err) => {
                alert("Error while uploading image using base64 format")
                this.setDefaultImage("base");
            });
    }











    const [itemSc, setItemSc] = useState(initialItem)

    const { addItemHandler } = props
    const [open, setOpen] = React.useState(false)

    const [switchState, setSwitchState] = React.useState({
        addMultiple: false,
    })

    const handleSwitchChange = name => event => {
        setSwitchState({ ...switchState, [name]: event.target.checked })
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAdd = event => {
        addItemHandler(itemSc)
        setItemSc(initialItem)
        setOpen(false)
    }

    const handleChange = name => ({ target: { value } }) => {
        console.log(value)
        setItemSc({ ...itemSc, [name]: value })
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
                <DialogTitle id="form-dialog-title">Add Cat</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add item to Schedule.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={itemSc.firstName}
                        onChange={handleChange('title')}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={itemSc.lastName}
                        onChange={handleChange('description')}
                    />
                    <TextField
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
                    />

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
                    <Button onClick={uploadImage} color="primary">
                        Image
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAdd} color="primary">
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
