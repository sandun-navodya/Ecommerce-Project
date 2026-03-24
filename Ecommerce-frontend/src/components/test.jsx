import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
export default function Test() {

    const [emotion, setEmotion] = useState("😀")

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <FaGoogle />
        </div> );
}