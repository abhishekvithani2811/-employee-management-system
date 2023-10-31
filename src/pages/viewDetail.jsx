
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setSortingAction, viewDetail_Action } from '../redux/action/viewDetail_Action'
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,

};

function ViewDetail({ sortOrder,
    sortColumn,
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [search, setSearch] = useState('')

    const [filter, setFilter] = useState({
        selectfield: "",
        value: "",
    })
    const [open, setOpen] = useState(false);
    const [SingleUserData, setSingleUserData] = useState({})

    // ------------------------------------------------------------model--------------------------------------------

    const handleOpen = async (id) => {
        await axios.get("https://dummyjson.com/users/" + id)
            .then((res) => { setSingleUserData(res.data), setOpen(true) })
            .catch((err) => { console.log("error---", err) })

    };

    const handleClose = () => setOpen(false);
    const [singleItem, setSingleItem] = useState()
    const selector = useSelector((state) => state.viewDetail_Reducer.data.users)

    // ------------------------------------------------------------filter emp--------------------------------------------
    const FilterUser = async (e) => {
        e.preventDefault();
        await axios.get(`https://dummyjson.com/users/filter?key=${filter.selectfield}&value=${filter.value}`)
            .then((res) => {
                console.log("response-", res.data)
                dispatch(viewDetail_Action(res.data))
            })
            .catch((err) => {
                console.log("error", err)
            })
    }
    // ------------------------------------------------------------search emp--------------------------------------------
    const SearchEmp = async (e) => {
        e.preventDefault()
        await axios.get('http://dummyjson.com/users/search?q=' + search)
            .then((res) => {
                dispatch(viewDetail_Action(res.data))
            })
            .catch((err) => {
                console.log("error:-", err)
            })
    }
    //--------------------------------------- fetch user details---------------------------------------------
    const FetchDetail = async () => {

        await axios.get("https://dummyjson.com/users")
            .then((res) => {
                dispatch(viewDetail_Action(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        FetchDetail()
    }, [])


    const handleSort = (column) => {
        const newOrder = sortColumn === column && sortOrder === 'ascending' ? 'descending' : 'ascending';
        dispatch(setSortingAction(column, newOrder));
    };

    const sortedSelector = [...selector];

    if (sortColumn) {
        sortedSelector.sort((a, b) => {
            let comparison = 0;
            if (a[sortColumn] < b[sortColumn]) {
                comparison = -1;
            } else if (a[sortColumn] > b[sortColumn]) {
                comparison = 1;
            }
            return sortOrder === 'ascending' ? comparison : -comparison;
        });
    }

    return (
        <div className=''>
            <div className=" flex justify-center mt-5">
                <form className=" ">
                    <div className="md:flex md:items-center  ">
                        <div className="">
                            <label className="block text-gray-500 font-bold md:text-right pl-4 mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Search Your Emp :-
                            </label>
                        </div>
                        <div className="mr-3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none mr-3 focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" onChange={(e) => { setSearch(e.target.value) }} />
                        </div>
                        <div className="md:flex md:items-center">
                            <div className=""></div>
                            <div className="">
                                <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-28" onClick={(e) => { SearchEmp(e) }}>
                                    Find<SearchIcon className=' text-9xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* filter */}
            </div >
            <form className=" ">
                <div className="flex justify-center mt-3">
                    <label className="block text-gray-500 font-bold md:text-right pl-4 mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Filter Your Emp :-
                    </label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='selectfield' onChange={(e) => { setFilter({ ...filter, [e.target.name]: e.target.value }) }}>
                        <option defaultValue={"Choose a filter field"}>Choose a filter field</option>
                        <option value="gender">Gender</option>
                        <option value="bloodGroup">Blood Group</option>
                        <option value="university">University</option>
                    </select>
                    <div className="mr-3">
                        <input className="bg-gray-200 appearance-none border-2 ml-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none mr-3 focus:bg-white focus:border-purple-500" id="inline-full-name" name='value' type="text" onChange={(e) => { setFilter({ ...filter, [e.target.name]: e.target.value }) }} />
                    </div>
                    <div className="md:flex md:items-center">
                        <div className=""></div>
                        <div className="">
                            <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-28" onClick={(e) => { FilterUser(e) }}>
                                Filter<FilterListIcon className=' text-9xl' />
                            </button>
                            <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 ml-4 px-4 rounded w-28" onClick={(e) => { FetchDetail(e) }}>
                                reset<FilterListIcon className=' text-9xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className='flex  justify-center '>
                <div className="overflow-x-auto shadow-md sm:rounded-lg mt-20 w-8/12 ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3" onClick={() => handleSort('firstName')}>
                                    First name  {sortColumn === 'firstName' && (
                                        <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th scope="col" className="px-6 py-3" onClick={() => handleSort('lastName')}>
                                    last name {sortColumn === 'lastName' && (
                                        <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th scope="col" className="px-6 py-3" onClick={() => handleSort('company_name')}>
                                    company {sortColumn === 'company_name' && (
                                        <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th scope="col" className="px-6 py-3" onClick={() => handleSort('bloodGroup')}>
                                    blood group  {sortColumn === 'bloodGroup' && (
                                        <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th scope="col" className="px-6 py-3" onClick={() => handleSort('email')}>
                                    Email  {sortColumn === 'email' && (
                                        <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th scope="col" className="px-6 py-3" onClick={() => handleSort('phone')}>
                                    phone number {sortColumn === 'phone' && (
                                        <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedSelector.map((item, i) => {
                                    return (

                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.firstName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.lastName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.company.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.bloodGroup}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className=' text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-500 dark:hover:bg-purple-700 dark:focus:ring-purple-900' onClick={() => { handleOpen(item.id) }}>view</button>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>



                {/* <!-- Main modal --> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="rounded-lg border-indigo-950	border-double border-4 shadow-xl	 ">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            First Name:-<div className='font-serif bg-purple-200 my-1 p-1 pl-3'>{SingleUserData.firstName}</div>
                            Last Name:-<div className='font-serif bg-purple-200 my-1 p-1 pl-3'>{SingleUserData.lastName}</div>
                            {/* Company:-<div className='font-serif bg-purple-200 my-1 p-1 pl-3'>{SingleUserData.company.name}</div> */}
                            BloodGroup:-<div className='font-serif bg-purple-200 my-1 p-1 pl-3'>{SingleUserData.bloodGroup}</div>
                            Email:-<div className='font-serif bg-purple-200 my-1 p-1 pl-3'>{SingleUserData.email}</div>
                            Phone:-<div className=' bg-purple-200 my-1 p-1 pl-3'>{SingleUserData.phone}</div>
                        </Typography>
                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                    </Box>
                </Modal>

            </div>


        </div>
    )

}

const mapStateToProps = (state) => ({
    sortOrder: state.viewDetail_Reducer.sortOrder,
    sortColumn: state.viewDetail_Reducer.sortColumn,
    selector: state.viewDetail_Reducer.data.users,
});

export default connect(mapStateToProps)(ViewDetail);