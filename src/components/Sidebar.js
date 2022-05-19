
import React, { useEffect, useState } from 'react'
import { getUser } from '../api/requests';
import { setUser } from '../utils'
import User from './User'
import Guest from './Guest'

// MUI


const Sidebar = () => {
    const [isUser, setCurrentUser] = useState(false);
    useEffect(() => {
        const user = setUser();
        if (user){
            getUser()
            .then((res) =>{
                if (res){
                    setCurrentUser(res);
                }
            })
            .catch((err) => {
                setUser(false);
            })
        }
    }, [])
    // useEffect(() => {
    //     getProfilePicture({url: isUser.steam64})
    //     .then((res) =>{
    //         if (res){
    //             console.log(res ,"profile url no error")
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err, "profile url error")
    //     })

    // }, [isUser])
    return (
        <div style={{marginTop: '340px'}}>
        {isUser? <User user={isUser}/> : <Guest/>}
        </div>
    )
};
export default Sidebar