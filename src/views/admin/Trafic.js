import React, { useContext, useEffect, useState } from "react";
import moment from 'moment'
// components
import { inputStreamGetAll } from "api/schedule.api";
import DefaultContext from "constants/data/DefaultContext";
import DefaultButton from "components/Buttons/DefaultButton";




export default function Trafic() {

    const [trafic, setTrafic] = useState([])
    const { setMessage } = useContext(DefaultContext)

    useEffect(() => {
        const getTrafic = async () => {
            inputStreamGetAll()
                .then(a => setTrafic(a.data))
                .catch(e => setMessage(e))
        }
        getTrafic()
    }, [])

    return (
        <>
            <div className="relative">
                <div>
                    <span className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-blue-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                    >Acessos hoje<span style={{ fontSize: 30, padding: 5, marginLeft: 8 }}
                    >{trafic.filter(c => moment(c.date).calendar(null, {
                        sameDay: '[Today]'
                    }) === 'Today')?.length}</span></span>
                    <span className={`ml-3 text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                    >Essa Semana<span style={{ fontSize: 30, padding: 5, marginLeft: 8 }}
                    >{trafic.filter(c => moment(c.date).calendar(null, {
                        lastWeek: '[lastWeek]',
                    }) === 'lastWeek')?.length}</span></span>
                    <table className=" bg-white mt-6 p-4"
                        style={{ borderCollapse: 'initial' }}>
                        <thead>
                            <tr> <th>Date</th><th>Route</th><th>ip</th><th>user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trafic.map(data => (
                                <tr
                                    className="pt-4"
                                    style={{
                                        borderBottomWidth: 2,
                                        borderColor: 'black',
                                    }}>
                                    <td>{moment(data.date).format('DD/MM/YYYY HH:mm')}</td>
                                    <td>{data.route}</td>
                                    <td>{data.ip}</td>
                                    <td>{data.JoinUser?.length > 0 ? data.JoinUser[0].email : null}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
