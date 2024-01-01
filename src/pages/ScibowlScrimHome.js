import React, { useState, useEffect} from 'react';
import '../App.css';

function ScibowlScrimHome(){
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

            <section class='relative flex flex-col justify-center items-center w-2/3'>

                <h3 class='text-xl xl:text-2xl font-medium text-black mb-8'>
                    Welcome to ScibowlScrim!
                </h3>

                <p class='text-base md:text-md text-black mb-5'>
                    This is a project of mine that lets you play science bowl tossups in real time (heavily inspired by <a href='https://qbreader.org' class='text-blue-400'>qbreader</a>).
                    You can either play <a href='/singleplayer' class='text-blue-400'>singleplayer</a>, which you can use to practice by yourself, or <a href='/multiplayer' class='text-blue-400'>multiplayer</a>, which you can use to scrimmage against other schools/see where your
                    team needs to improve.
                </p>

                <p class='text-base md:text-md text-black mb-5'>
                    You can view the source code <a href='https://github.com/VA-24/ScibowlScrim-Website' class='text-blue-300'>here</a>. The backend was built with Python/Firebase and the frontend
                    was built with React and TailwindCSS. I welcome any pull requests or suggestions (to run a local version of the site, clone from the repository and follow the standard procedures for
                    installing firebase/tailwindcss).
                </p>
            </section>
                
            </div>
        
        </body>
    )
}

export default ScibowlScrimHome;