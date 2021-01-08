import React, { useEffect, useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import FileBase from 'react-file-base64';
import EditIcon from '@material-ui/icons/Edit';

const initialItem = { title: '', description: '', status: 'single', progress: 0, subRows: undefined, }

const AddItemDialog = ({ btnLabel, addItemHandler, receivedItems = {}, type, title, subTitle }) => {

    const [urImage, setUrImage] = useState()
    const [imageObj, setImageObj] = useState({})
    const [itemSc, setItemSc] = useState(receivedItems)
    const [open, setOpen] = React.useState(false)

    const [switchState, setSwitchState] = React.useState({
        addMultiple: false,
    })
    function getBaseFile(files) {
        setUrImage({ baseImage: files.base64 });
        setImageObj({
            imageName: "base-image-" + Date.now(),
            imageData: files.base64.toString()
        })
    }
    const handleSwitchChange = name => event => setSwitchState({ ...switchState, [name]: event.target.checked })

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleAdd = event => {
        if (type !== "edit") setItemSc(initialItem)
        addItemHandler({ item: itemSc, image: imageObj })
        setOpen(false)
    }

    const handleChange = name => ({ target: { value } }) => setItemSc({ ...itemSc, [name]: value })

    useEffect(() => {
        if (!receivedItems?.imageData) return
        setImageObj({
            imageName: "base-image-" + Date.now(),
            imageData: receivedItems.imageData
        })
    }, [])


    const color = 'teal-'
    const grau = 500
    return (
        <div>
            {type === "edit" ? <EditIcon onClick={handleClickOpen} /> :
                <Tooltip title="Add">
                    <button
                        className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-${color + grau} active:bg-${color + (grau + 100)} ease-linear transition-all duration-150`}
                        type="button"
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        onClick={handleClickOpen}
                    ><i className="fas px-6"><AddIcon /></i>
                        {btnLabel}</button>
                </Tooltip>}
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
                        <img src={urImage?.baseImage ?? itemSc?.imageData} alt="" className="process__image" />
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

                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAdd} color="primary">{type === 'edit' ? "Edit" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
export default AddItemDialog
