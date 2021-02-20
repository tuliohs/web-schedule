import React, { FunctionComponent } from "react";

import ItemDialog from '../ItemDialog'
import DeleteIcon from '@material-ui/icons/Delete';
import { TItemDropDown } from 'components/Dropdowns/DefaultDropDown'

export type TElement = {
    _id: string,
    title: string,
    description: string,
    detail: {
        state: string
    },
    topic: TElement
}
interface ICardCateg {
    editHandler: Function,
    category: TElement,
    removeHandler: Function,
    itemsAssociated: Array<TItemDropDown>
}

const CardCategory: FunctionComponent<ICardCateg> = ({ editHandler, category, removeHandler, itemsAssociated }) => {
    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">

                    <h6 className="text-xl font-semibold">{category?.title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{category?.description}</p>
                    <p className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">{category?.detail?.state}</p>

                    <div className="items-center flex flex-col">
                        <div className="mt-2 ml-4 flex flex-row justify-center" style={{ width: '10%', justifyContent: 'space-around' }}>
                            <i className="m-2 mt-2 mb-4 ">  < DeleteIcon onClick={() => removeHandler(category?._id, category.title)} /></i>
                            <i className="m-2 mt-2 mb-4 "> <ItemDialog type="edit"
                                receivedItems={category}
                                itemsAssociated={itemsAssociated}
                                showAssociated={true} title="Edit Category"
                                addItemHandler={editHandler}
                                fieldAssociated="topic"
                                subFieldAssociated="_id"
                                defaultElment={category.topic._id}
                            /> </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCategory