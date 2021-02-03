import React, { createRef, useEffect, useState } from 'react'

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
import IconDropdown from './Item/IconDropdown'
import DefaultDropDown from '../mySchedule/Schedule/DefaultDropDown'

//import FileBase from 'react-file-base64';
import { getBase64 } from 'utils/getBase64'
import EditIcon from '@material-ui/icons/Edit';

const initialItem = {
    title: '', description: '',
    status: 'single', progress: 0, subRows: undefined,
    iconName: ''
}

const ItemDialog = ({ btnLabel = "", addItemHandler, receivedItems = {}, type = "add", title,
    switchState, setSwitchState, labelSwitch,
    itemsAssociated,
    buttonItem,
    showIcon = false, transparent = false }) => {

    const [imageObj, setImageObj] = useState({})
    const [itemSc, setItemSc] = useState(receivedItems)
    const [open, setOpen] = React.useState(false)
    //const [switchState, setSwitchState] = React.useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleAdd = () => {
        if (type !== "edit") setItemSc(initialItem)
        addItemHandler({ item: itemSc, image: imageObj })
        setOpen(false)
    }
    const handleChange = name => ({ target: { value } }) => setItemSc({ ...itemSc, [name]: value })
    const changeImage = ({ field, value }) => setImageObj({ ...imageObj, [field]: value })

    useEffect(() => {
        if (!receivedItems?.imageData) return
        setImageObj({
            imageName: "base-image-" + Date.now(),
            imageData: receivedItems.imageData
        })
    }, [receivedItems.imageData])


    const color = 'teal-'
    const grau = 500
    console.log(itemsAssociated, 'itemsAssociated')
    return (
        <div>
            {type === "edit" ? <EditIcon onClick={handleClickOpen} /> :
                <Tooltip title="Add">
                    <button
                        ref={buttonItem}
                        className={transparent ? null : `text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-${color + grau} active:bg-${color + (grau + 100)} ease-linear transition-all duration-150`}
                        type="button"
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        onClick={handleClickOpen}
                    ><i className="fas px-6"><AddIcon /></i>
                        {btnLabel}</button>
                </Tooltip>}
            <Dialog open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    <div className="flex flex-row">
                        <div className="w-1">
                            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                        </div>
                        {
                            showIcon && <IconDropdown
                                itemSc={itemSc}
                                setItemSc={setItemSc} />
                        }
                        <DefaultDropDown items={itemsAssociated} />

                    </div>
                    {/*<DialogContentText>{subTitle}</DialogContentText>*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={itemSc.title || ''}
                        onChange={handleChange('title')}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={itemSc.description || ''}
                        onChange={handleChange('description')}
                    />
                    <div className=" mt-4 mb-4">
                        <div className="process__upload-btn">
                            <input type="file" id="file-input" onChange={e => getBase64({ event: e, changeImage: changeImage })} />
                        </div>
                        <img src={imageObj?.imageData} alt="" className="process__image" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <DialogContentText>Default Item</DialogContentText>
                    <Tooltip title="Default Item">
                        <Switch
                            checked={switchState}
                            onChange={() => setSwitchState(!switchState)}
                            value="addMultiple" inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Tooltip>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAdd} color="primary">{type === 'edit' ? "Edit" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
export default ItemDialog
