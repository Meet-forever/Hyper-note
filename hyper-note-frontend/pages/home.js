import React from 'react'
import Sidebar from './components/homeComponents/Sidebar'
import UserPage from './components/homeComponents/UserPage'
import udata from './api/userData.json'

export default function home() {
    const [isOpen, setOpen] = React.useState(true)
    const [isLoading, setLoading] = React.useState(false)
    const [selected, setSelected] = React.useState({})
    const [UD, setUD] = React.useState(udata)
    // const [UD, setUD] = React.useState({})
    // React.useEffect(()=>{
    //     setLoading(true)
    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(res => res.json() )
    //     .then(data => {
    //         setUD(data)
    //         setLoading(false)
    //     })
    //     .catch(e => console.log(e)).finally()
    // },[])
    

    return (
        isLoading?<div>Loading...</div>:
        <div className='flex'>
            <Sidebar isOpen={isOpen} UD={UD}  setSelected={setSelected} setOpen={setOpen} />
            <UserPage isOpen={isOpen} setOpen={setOpen} selected={selected} setSelected={setSelected} />
        </div>
    )
}
