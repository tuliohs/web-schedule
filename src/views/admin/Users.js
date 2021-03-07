import React, { useContext, useEffect, useState } from "react";
import moment from 'moment'
// components
import { managerUserGetAll, managerUserChangeStatus } from "api/schedule.api";
import DefaultContext from "constants/data/DefaultContext";
import DefaultButton from "components/Buttons/DefaultButton";


function TableRow({ data, setMessage }) {
    const [showDetail, setShowDetail] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [userStatus, setUserStatus] = useState(false)


    const handlleDetail = () => {

        setShowContent(false)
        setShowDetail(!showDetail)
    }
    const handlleContent = () => {
        setShowDetail(false)
        setShowContent(!showContent)
    }
    const handleChangeStatusUser = (id) => {
        managerUserChangeStatus(id)
            .then(a => setUserStatus(a.data.active))
            .catch(e => setMessage(e.message))
    }
    useEffect(() => {
        setUserStatus(data.active)
    }, [data])
    return (<>
        <tr
            className="pt-4"
            style={{
                borderBottomWidth: 2,
                borderColor: 'black',

            }}>
            <td><img style={{ width: 50 }} alt="." src={data.imageData}
                onClick={() => {
                    //excluir depois
                    setShowDetail(false)
                    setShowContent(false)
                }}
            /></td>
            <td>{data.firstName + ' ' + data.lastname}</td>
            <td>{data.email}</td>
            <td>{moment(data.lastAcess).format('DD/MM/YYYY HH:mm')}</td>
            <td className="text-center">{data.Topic.length}</td>
            <td className="text-center">{data.Category.length}</td>
            <td className="text-center">{data.itemsLength}</td>
            <td className="text-center">{data.revisionsLength}</td>
            <td className="text-center">
                <DefaultButton onClick={() => handleChangeStatusUser(data._id)} label={!userStatus ? "Active" : "Desative"}
                    theme={{ color: !userStatus ? "yellow" : "red", grau: "500", fontColor: "white" }} />
            </td>
            <td>
                <DefaultButton onClick={handlleDetail} label="Detail" theme={{ color: "indigo", grau: "500", fontColor: "white" }} />
            </td>
            <td>
                <DefaultButton onClick={handlleContent} l label="Content" theme={{ color: "teal", grau: "500" }} />
            </td>
        </tr>
        <tr>
            <td colSpan="7">
                {
                    showDetail ?
                        <div className="flex flex-wrap flex-column">
                            {JSON.stringify(data).toString()}
                        </div>
                        : showContent ?
                            <div>
                                <div>
                                    {JSON.stringify(data.Topic).toString()}
                                </div>
                                <div>
                                    {JSON.stringify(data.Category).toString()}
                                </div>
                            </div>
                            : null
                }
            </td>
        </tr>
    </>)
}


export default function Users() {

    const [users, setUsers] = useState([])
    const { setMessage } = useContext(DefaultContext)

    useEffect(() => {
        const getUsers = async () => {
            managerUserGetAll()
                .then(a => setUsers(a.data.sort()))
                .catch(e => setMessage(e))
        }
        getUsers()
    }, [])

    return (
        <>
            <div className="relative">
                <div>
                    <span className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-blue-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                    >Total Usuários<span style={{ fontSize: 30, padding: 5, marginLeft: 8 }}
                    >{users.filter(a => a.active).length}</span></span>
                    <table className=" bg-white mt-6 p-4"
                        style={{ borderCollapse: 'initial' }}>
                        <thead>
                            <tr><th>Photo</th><th>Name</th><th>Email</th><th>Last Acess</th>
                                <th>Topics</th><th>Catgs</th>
                                <th>Items</th><th>Revs</th>
                                <th>°</th><th>°</th><th>°</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <TableRow data={u} setMessage={setMessage} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
