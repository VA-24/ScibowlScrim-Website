import React, { useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../App.css';


function ScibowlScrimHome(){

    // const firebaseConfig = {
    //     apiKey: "AIzaSyBv1GvVPkXrohFC0N7GeZqWXrOfx2O0q5M",
    //     authDomain: "scibowlscrim.firebaseapp.com",
    //     databaseURL: "https://scibowlscrim-default-rtdb.firebaseio.com",
    //     projectId: "scibowlscrim",
    //     storageBucket: "scibowlscrim.appspot.com",
    //     messagingSenderId: "835026328193",
    //     appId: "1:835026328193:web:ced3db488d497e50dfcb80",
    //     measurementId: "G-5X244TV1Y4"
    //   };

    //   const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);

    // useEffect(() => {
    //     const fetchRandomDoc = async () => {
    //         // make python script to get a list of all the documents in the collection then paste the list here and just access a random item in the list to save on number of reads
    //         const querySnapshot = await getDocs(collection(db, "ScibowlScrim"));
    //         const docs = querySnapshot.docs;
    //         const randomDoc = docs[Math.floor(Math.random() * docs.length)];
    //         console.log("Random Document: ", randomDoc.data());
            
    //         let category = randomDoc.category
    //         let parent_packet = randomDoc.parent_packet
    //         let tossup_type = randomDoc.tossup_type
    //         let tossup_question = randomDoc.tossup_question
    //         let tossup_answer = randomDoc.tossup_answer
    //         let bonuns_type = randomDoc.bonuns_type
    //         let bonus_question = randomDoc.bonus_question
    //         let bonus_anwer = randomDoc.bonus_answer

    //         console.log(category)
    //     }
    
    //     fetchRandomDoc();
    // }, []);
    
    return(
        
        <body class='bg-white min-h-screen m-0'>
        
        <div class='flex flex-row'>
        <section class='px-8 w-full' id='tossup-controls'>
            <div class='flex flex-wrap justify-center gap-8 py-8 w-3/4'>
                        
                        <a href='/hosted-projects'>
                        <button class='text-xs xl:text-lg flex items-center text-white bg-neutral-600 rounded-lg p-2'>
                            Back
                        </button>
                        </a>
                        
                        <button class='text-xs xl:text-lg flex items-center text-white bg-blue-500 rounded-lg p-2'>
                            Next
                        </button>
                               
                        <button class='text-xs xl:text-lg flex items-center text-white bg-blue-500 rounded-lg p-2'>
                            Skip
                        </button>         
                        
                        <button class='text-xs xl:text-lg flex items-center text-white bg-blue-500 rounded-lg p-2'>
                            Report
                        </button>
                        
                        <button class='text-xs xl:text-lg flex items-center text-white bg-blue-500 ml-auto rounded-lg p-2'>
                            Buzz
                        </button>
                        
            </div>

            <div style={{ height: '1px', width: '75%', background: 'gray' }}></div>

            <div class='flex flex row w-full'>
            
                <div class='w-3/4'>
                    <div class='py-5 font-bold' id='question-data'>Prometheus Rd 5 Packet 2; Physics, Multiple Choice</div>
                    <div class='mb-5' id='question-body'>The Poynting vector of an electromagnetic wave measures
                        W) the momentum of the wave
                        X) the magnitude of the electric field of the wave
                        Y) the magnitude of the magnetic field of the wave
                        Z) the energy flux of the wave
                    </div>
                    <form id='answer'>
                        <div class='input-group flex flex-row mx-auto mb-3'>
                            <input class='form-control border border-gray rounded-lg mr-2 p-1' id='answer-input' type='text' placeholder='Answer'></input>
                            <button class='btn btn-success flex items-center text-white bg-blue-500 rounded-lg p-1' id='answer-submit' type='submit'>Guess</button>
                        </div>
                    </form>

                    <div class='' id='question-history'></div>
                </div>

                <div class='justify-center ml-auto items-center w-1/4 px-10 py-5' id='user-stats'>
                    <div class='mx-auto mb-5 font-bold'>Session Stats</div>
                    <div class='mx-auto mb-5' id='tossups-seen'> Tossups seen: 0</div>
                    <div class='mx-auto mb-5' id='tossups-correct'> Tossups correct: 0</div>
                    <div class='mx-auto mb-5' id='tossups-incorrect'> Tossups incorrect: 0</div>
                    <div class='mx-auto mb-5' id='bonuses-seen'> Bonuses seen: 0</div>
                    <div class='mx-auto mb-5' id='bonuses-correct'> Bonuses correct: 0</div>
                    <div class='mx-auto mb-5' id='bonuses-incorrect'> Bonuses incorrect: 0</div>
                </div>

            </div>

        </section>

        </div>

        </body>
    )
}

export default ScibowlScrimHome;