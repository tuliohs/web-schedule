import React, { FunctionComponent, SetStateAction, useCallback, useEffect, useState } from 'react'
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
import DefaultDropDown from '../../components/Dropdowns/DefaultDropDown'
import DefaultButton from '../../components/Buttons/DefaultButton'
import { listLevels } from 'views/mySchedule/Schedule/CardSchedule'

import { TItemDropDown } from 'components/Dropdowns/DefaultDropDown'
//import FileBase from 'react-file-base64';
import { getBase64, TImageObj } from 'utils/getBase64'
import EditIcon from '@material-ui/icons/Edit';

const initialItem = {
    title: '', description: '',
    status: 'single',
    subRows: undefined,
    iconName: '',
    level: ""
}

interface TDialog {
    btnLabel?: string,
    addItemHandler: Function,
    receivedItems: any,    // {    //    imageData: string,    //    title:string    //},
    type: "add" | "edit",
    title?: string,
    switchState?: boolean,
    setSwitchState?: React.Dispatch<SetStateAction<boolean>>,
    labelSwitch?: string,
    buttonItem?: string,
    showIcon?: boolean,
    transparent?: boolean,
    itemsAssociated: Array<TItemDropDown>,
    showAssociated?: boolean,
    fieldAssociated?: string,
    subFieldAssociated?: string,
    defaultElment?: string,
    showAuxDropDown?: boolean
    //setAssociated?: React.Dispatch<SetStateAction<string>>,
    //AssociatedElement?: string
}

const ItemDialog: FunctionComponent<TDialog> = ({ btnLabel = "",
    addItemHandler, receivedItems = {}, type = "add", title,
    switchState = false, setSwitchState, labelSwitch = "",
    itemsAssociated, fieldAssociated = "", subFieldAssociated = "",
    buttonItem, defaultElment, showAuxDropDown = false,
    showIcon = false, transparent = false, showAssociated = false }) => {

    const [imageObj, setImageObj] = useState<TImageObj>({ imageData: "", imageName: "" })
    const [itemSc, setItemSc] = useState(receivedItems)
    const [open, setOpen] = React.useState(false)
    const [itemDropDown, setItemDropDown] = React.useState<string>("")
    const [levelDropDown, setLevelDropDown] = React.useState<string>("")
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleAdd = async () => {
        //if (showAssociated && itemDropDown) //se houver item da assoação selecionada
        //     handleSubFieldChange(fieldAssociated, subFieldAssociated)
        if (type !== "edit") setItemSc(initialItem)
        addItemHandler({ item: itemSc, image: imageObj })
        setOpen(false)
    }
    const handleChange = (name: string) => (target: { target: any }) => setItemSc({ ...itemSc, [name]: target.target.value })
    //const handleSubFieldChange = (field: any, subField: any, value: any) => setItemSc({ ...itemSc, [field]: { [subField]: value } })
    const handleSubFieldChange = useCallback((field: string, subField?: any, value?: string) => {
        if (subField) setItemSc({ ...itemSc, [field]: { [subField]: value } })
        else setItemSc({ ...itemSc, [field]: value })
    }, [])
    //const changeImage = (field: string, value: string) => setImageObj({ ...imageObj, [field]: value })
    const changeImage = (values: TImageObj) => setImageObj(values)

    const changeSwitc = () => setSwitchState && setSwitchState(!switchState)

    useEffect(() => {
        if (!receivedItems?.imageData) return
        setImageObj({
            imageName: "base-image-" + Date.now(),
            imageData: receivedItems.imageData
        })
    }, [receivedItems.imageData, receivedItems])

    useEffect(() => {
        handleSubFieldChange(fieldAssociated, subFieldAssociated, itemDropDown)
        //handleSubFieldChange("level", null, levelDropDown)
        setItemSc({ ...itemSc, ["level"]: levelDropDown })
    }, [fieldAssociated, handleSubFieldChange, subFieldAssociated, itemDropDown, levelDropDown])

    return (
        <div>
            {type === "edit" ? <EditIcon onClick={handleClickOpen} /> :
                //<Tooltip title="Add">
                //<button
                //    ref={buttonItem}
                //    className={transparent ? "" : `text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-${color + grau} active:bg-${color + (grau + 100)} ease-linear transition-all duration-150`}
                //    type="button"
                //    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                //    onClick={handleClickOpen}
                //><i className="fas px-6"><AddIcon /></i>

                //    {btnLabel}</button>
                <DefaultButton onClick={handleClickOpen} label={btnLabel}
                    refBt={buttonItem} transparent={transparent}
                    children={<i className="fas px-1 pr-4"><AddIcon /></i>}
                />
                //</Tooltip>*/}
            }
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
                                setItemSc={setItemSc}
                            />
                        }
                        {showAssociated && <DefaultDropDown
                            items={itemsAssociated}
                            name="Topic"
                            setState={setItemDropDown}
                            defaultElment={defaultElment}
                        />}

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
                    {showAuxDropDown &&
                        <DefaultDropDown
                            items={listLevels}
                            firsrOrDefault={true}
                            //state={level}
                            setState={setLevelDropDown}
                            theme={{ color: "gray", grau: "100", fontColor: "black" }}
                        />
                    }


                    <div className=" mt-4 mb-4">
                        <div className="process__upload-btn">
                            <input type="file" id="file-input" onChange={e => getBase64(e, changeImage)} />
                        </div>
                        <img src={imageObj?.imageData} alt="" className="process__image" />
                    </div>
                </DialogContent>
                <DialogActions>
                    {labelSwitch && <><DialogContentText>{labelSwitch}</DialogContentText>
                        <Tooltip title={labelSwitch}>
                            <Switch
                                checked={switchState}
                                onChange={changeSwitc}
                                value="addMultiple"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Tooltip></>}
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAdd} color="primary">{type === 'edit' ? "Edit" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
export default ItemDialog
