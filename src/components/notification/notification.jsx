import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
const handleClick = () => {
    toast('Message!',{})
}
    return (
        <div>
            <button onClick={handleClick}>Show Notification</button>

        </div>
    );
};
export default Notification;