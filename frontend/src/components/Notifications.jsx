import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from '../utils/firebase';

const Notification = () => {
  requestForToken();

  onMessageListener()
    .then((payload) => {
      alert(JSON.stringify(payload))
    })
    .catch((err) => console.log('failed: ', err));

  return (
     <Toaster/>
  )
}

export default Notification;