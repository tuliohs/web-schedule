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

import FileBase from 'react-file-base64';

const initialItem = {
    title: '',
    description: '',
    status: 'single',
    progress: 0,
    subRows: undefined,
}

const AddItemDialog = props => {

    const [urImage, setUrImage] = useState()
    const [imageObj, setImageObj] = useState({})
    const [itemSc, setItemSc] = useState(initialItem)
    const { addItemHandler, title = 'Add Topic', subTitle = 'Add new topic to started memorize  ' } = props
    const [open, setOpen] = React.useState(false)

    const [switchState, setSwitchState] = React.useState({
        addMultiple: false,
    })
    function uploadImage(e, method) {
        console.log('imp', e.target.files[0])
        setUrImage({ multerImage: URL.createObjectURL(e.target.files[0]) });
    }
    function getBaseFile(files) {
        setUrImage({ baseImage: files.base64 });
        setImageObj({
            imageName: "base-image-" + Date.now(),
            imageData: files.base64.toString()
        })
    }
    const handleSwitchChange = name => event => {
        setSwitchState({ ...switchState, [name]: event.target.checked })
    }

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleAdd = event => {
        addItemHandler({ item: itemSc, image: imageObj })
        setItemSc(initialItem)
        setOpen(false)
    }

    const handleChange = name => ({ target: { value } }) => {
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
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{subTitle}</DialogContentText>
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
                    <div className=" mt-4 mb-4">
                        <div className="process__upload-btn">
                            <FileBase type="file" multiple={false} onDone={e => {
                                getBaseFile(e)
                                //uploadImage(e)
                            }} />
                        </div>
                        <img src={urImage?.baseImage} alt="" className="process__image" />
                    </div>

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

                    {/*<div>
                        <input type="file" className="process__upload-btn" onChange={(e) => uploadImage(e, "multer")} />
                        <img src={urImage} alt="upload-image" className="process__image" />
                    </div>*/}
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAdd} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

AddItemDialog.propTypes = {
    addItemHandler: PropTypes.func.isRequired,
    title: 'Add Topic',
    subTitle: ''
}

export default AddItemDialog
