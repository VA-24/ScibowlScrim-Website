import React, { useState, useEffect} from 'react';
import '../App.css';

function ScibowlScrimMultiplayer(){
    return(
        
        <body class='bg-white min-h-screen m-0'>
            <div class='relative flex flex-col items-center'>
            <main class='w-full flex flex-col lg:flex-row-reverse sticky top-0 px-6 pt-3 py-3 bg-blue-200 z-[2] mb-6'>
            <nav class='w-full flex flex-row items-center justify-center gap-20 tracking-tight'>
                <a href='/'>
                <button class='text-xl xl:text-lg flex items-center text-black hover:text-white ease-linear transition'>
                    Home
                </button>
                </a>

                <a href='/singleplayer'>
                <button class='text-xl xl:text-lg flex items-center text-black hover:text-white ease-linear transition'>
                    Singleplayer
                </button>
                </a>

                <a href='/multiplayer'>
                <button class='text-xl xl:text-lg flex items-center text-black hover:text-gray-400 ease-linear transition'>
                    Multiplayer
                </button>
                </a>
                </nav>
            </main>

            <section class='relative flex flex-col justify-center items-center w-full'>

                <h3 class='text-xl xl:text-2xl font-medium text-black mb-8'>
                    Join a Room:
                </h3>

                <form id='room-entry'>
                    <div class='input-group flex flex-row mx-auto mb-3 w-full'>
                    <input class='form-control border border-gray rounded-lg mr-2 p-1' id='room-name' type='text' placeholder='Room name'></input>
                    <button class='btn btn-success flex items-center text-white bg-blue-500 rounded-lg p-1' type='submit'>Enter</button>
                    </div>
                </form>



            </section>
                
            </div>
        
        </body>
    )
}

export default ScibowlScrimMultiplayer;