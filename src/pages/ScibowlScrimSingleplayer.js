import React, { useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import ScibowlScrimKeys from '../assets/ScibowlScrimKeys.json'
import '../App.css';


function ScibowlScrimSingleplayer(){

    const [questionData, setQuestionData] = useState('')
    const [tossupBody, setTossupBody] = useState('')

    const firebaseConfig = {
        apiKey: "AIzaSyBv1GvVPkXrohFC0N7GeZqWXrOfx2O0q5M",
        authDomain: "scibowlscrim.firebaseapp.com",
        databaseURL: "https://scibowlscrim-default-rtdb.firebaseio.com",
        projectId: "scibowlscrim",
        storageBucket: "scibowlscrim.appspot.com",
        messagingSenderId: "835026328193",
        appId: "1:835026328193:web:ced3db488d497e50dfcb80",
        measurementId: "G-5X244TV1Y4"
      };

      const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

    useEffect(() => {
        const fetchDoc = async () => {
            
            const docNames = ScibowlScrimKeys['ScibowlScrim']
            const randomDocName = docNames[Math.floor(Math.random() * docNames.length)];

            const docRef = doc(db, "ScibowlScrim", randomDocName);
            const docSnapshot = await getDoc(docRef);

            console.log(docSnapshot.data());
            
            let category = docSnapshot.get('category')
            let parent_packet = docSnapshot.get('parent_packet')
            let tossup_type = docSnapshot.get('tossup_type')
            let tossup_question = docSnapshot.get('tossup_question')
            let tossup_answer = docSnapshot.get('tossup_answer')
            let bonuns_type = docSnapshot.get('bonuns_type')
            let bonus_question = docSnapshot.get('bonus_question')
            let bonus_anwer = docSnapshot.get('bonus_answer')

            let question_data = parent_packet + '; ' + tossup_type + ', ' + category
            console.log(question_data)
            setQuestionData(question_data);

            setTossupBody(tossup_question);
        }
    
        fetchDoc();
    }, []);
    
    return(
        
        <body class='bg-white min-h-screen m-0'>
        <div class='relative flex flex-col items-center'>
        <main class='w-full flex flex-col lg:flex-row-reverse sticky top-0 px-6 pt-3 py-3 bg-blue-200 z-[0] mb-6'>
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



        <section class='px-8 w-full' id='tossup-controls'>
            <div class='flex flex-wrap justify-center gap-8 py-3 w-2/3'>
                        
                        
                        <button class='text-md xmd:text-lg flex items-center text-white bg-blue-500 rounded-lg p-1.5'>
                            Next
                        </button>
                               
                        <button class='text-md xmd:text-lg flex items-center text-white bg-blue-500 rounded-lg p-1.5'>
                            Skip
                        </button>         
                        
                        <button class='text-md xmd:text-lg flex items-center text-white bg-blue-500 rounded-lg p-1.5'>
                            Report
                        </button>
                        
                        <button class='text-md xmd:text-lg flex items-center text-white bg-blue-500 ml-auto rounded-lg p-1.5'>
                            Buzz
                        </button>
                        
            </div>

            <div style={{ height: '1px', width: '66.666%', background: 'gray' }}></div>

            <div class='flex flex row w-full'>
            
                <div class='w-2/3'>
                    
                    <div class='py-5 font-bold' id='question-data'>{questionData}</div>
                    <div class='mb-5' id='question-body'>{tossupBody}</div>
                    <form id='answer'>
                        <div class='input-group flex flex-row mx-auto mb-3'>
                            <input class='form-control border border-gray rounded-lg w-full mr-2 p-1' id='answer-input' type='text' placeholder='Answer'></input>
                            <button class='btn btn-success flex items-center text-white bg-blue-500 rounded-lg p-1' id='answer-submit' type='submit'>Guess</button>
                        </div>
                    </form>

                    <div class='' id='question-history'></div>
                </div>

                <div class='justify-center ml-auto items-center w-1/3 px-10 py-5' id='session-settings'>
                    <h1 class='mx-auto mb-3 font-bold'>Session Stats</h1>
                    <div class='mx-auto mb-3' id='tossups-seen'> Tossups seen: 0</div>
                    <div class='mx-auto mb-3' id='tossups-correct'> Tossups correct: 0</div>
                    <div class='mx-auto mb-3' id='tossups-incorrect'> Tossups incorrect: 0</div>
                    <div class='mx-auto mb-3' id='bonuses-seen'> Bonuses seen: 0</div>
                    <div class='mx-auto mb-3' id='bonuses-correct'> Bonuses correct: 0</div>
                    <div class='mx-auto mb-10' id='bonuses-incorrect'> Bonuses incorrect: 0</div>


                    <div class='border border-gray-300 rounded w-2/3 p-2 mb-10'>
                        <h1 class='mx-auto mb-3 font-bold'>Mode</h1>
        
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                            Tossups and Bonuses
                        </label>
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups" />
                            Tossups
                        </label>
                        <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="bonuses" />
                            Bonuses
                        </label>
                    </div>
        
                    <div class='border border-gray-300 rounded w-2/3 p-2 mb-10'>
                        <h1 class='mx-auto mb-3 font-bold'>Category</h1>

                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                            All
                        </label>
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                            Math
                        </label>
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups" />
                            Physics
                        </label>
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="bonuses" />
                            Chemistry
                        </label>
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                            Biology
                        </label>
                        <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="tossups" />
                            Earth and Space
                        </label>
                        <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        <input type="checkbox" class='mr-3' value="bonuses" />
                            Energy
                        </label>
                    </div>

                </div>

            </div>

        </section>

        </div>

        </body>
    )
}

export default ScibowlScrimSingleplayer;