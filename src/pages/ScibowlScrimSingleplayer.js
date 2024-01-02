import React, { useState, useEffect, useRef} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import ScibowlScrimKeys from '../assets/ScibowlScrimKeys.json'
import '../App.css';


function ScibowlScrimSingleplayer(){

    const isReading = useRef(false);

    const [questionData, setQuestionData] = useState('');
    const [tossupBody, setTossupBody] = useState('');
    const [tossupAnswer, setTossupAnswer] = useState('');
    const [parentPacket, setParentPacket] = useState('');
    const [category, setCategory] = useState('');
    const [tossupType, setTossupType] = useState('');

    const [tossupsSeen, setTossupsSeen] = useState(0);
    const [tossupsCorrect, setTossupsCorrect] = useState('');
    const [tossupsIncorrect, setTossupsIncorrect] = useState('');
    const [bonusesSeen, setBonusesSeen] = useState('');
    const [bonusesCorrect, setBonusesCorrect] = useState('');
    const [bonusesIncorrect, setBonusesIncorrect] = useState('');
    const [score, setScore] = useState('');

    const [history, setHistory] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);

    const handleHistoryItemClick = (index) => {
        const originalIndex = history.length - 2 - index; // Calculate the original index
        setHistory((prevHistory) =>
          prevHistory.map((item, i) => {
            if (i === originalIndex) {
              return { ...item, isExpanded: !item.isExpanded };
            }
            return item;
          })
        );
      };

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
                
                isReading.current = true;
                const docNames = ScibowlScrimKeys['ScibowlScrim']
                const randomDocName = docNames[Math.floor(Math.random() * docNames.length)];
        
                const docRef = doc(db, "ScibowlScrim", randomDocName);
                const docSnapshot = await getDoc(docRef);
                
                let category = docSnapshot.get('category');
                let parent_packet = docSnapshot.get('parent_packet');
                let tossup_type = docSnapshot.get('tossup_type');
                let tossup_question = docSnapshot.get('tossup_question');
                const tossup_words = tossup_question.split(' '); // split into array for processing
                let tossup_answer = docSnapshot.get('tossup_answer');
                let bonus_type = docSnapshot.get('bonus_type');
                let bonus_question = docSnapshot.get('bonus_question');
                let bonus_anwer = docSnapshot.get('bonus_answer');
        
                let question_data = parent_packet + ' / ' + tossup_type + ' / ' + category;
                setQuestionData(question_data);
                setTossupBody('');
                setTossupAnswer(tossup_answer);
                setCategory(category);
                setParentPacket(parent_packet);
                setTossupType(tossup_type);
            
                for (let i = 0; i < tossup_words.length; i++) {
                    setTimeout(() => {
                        setTossupBody((prevTossupBody) => prevTossupBody + ' ' + tossup_words[i]);
                        if (i === (tossup_words.length - 1)) {
                            isReading.current = false;
                            console.log(isReading.current);
                        }
                    }, i * 250);
                }
                

                setTossupsSeen(tossupsSeen => tossupsSeen + 1);

                setHistory((prevHistory) => [
                    ...prevHistory,
                    {
                      parent_packet,
                      category,
                      tossup_type,
                      tossup_question,
                      tossup_answer,
                      isExpanded: false,
                    },
                  ]);
            };
        
            fetchDoc();
        
            function handleKeyDown(event) {
                const answerInput = document.getElementById('answer-input');

                if ((event.key === "n" || event.key === "s") && document.activeElement !== answerInput && isReading.current === false) {
                    fetchDoc();
                }
            }

            window.addEventListener("keydown", handleKeyDown);
        
            return () => {
            window.removeEventListener("keydown", handleKeyDown);
            };
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
            <div class='flex flex-wrap justify-center gap-2 py-3 w-2/3'>
                        
                        <button class='text-md xmd:text-lg flex items-center text-white bg-blue-500 rounded-lg p-1.5'>
                            Next
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

                    <div style={{ height: '0.2px', width: '100%', background: 'gray', marginBottom: '10px' }}></div>

                    <ul className='' id='question-history'>
                        {history.slice(0, -1).reverse().map((item, index) => (
                        <div key={index} className='bg-gray-100 p-2 mb-2 rounded border border-gray-300 rounded' onClick={() => handleHistoryItemClick(index)}>
                            <div className='font-bold'>
                                {item.parent_packet} / {item.category} / {item.tossup_type}
                            </div>
                            {item.isExpanded && (
                                <div className='mt-2'>
                                <p class='font-medium mb-2'>{item.tossup_question}</p>
                                <p class='font-medium'>Answer: {item.tossup_answer}</p>
                                </div>
                            )}
                        </div>
                        ))}
                    </ul>
                </div>

                <div class='justify-center ml-auto items-center w-1/3 px-12 py-5' id='session-settings'>
                    <h1 class='mx-auto mb-3 ml-2 font-bold'>Session Stats</h1>
                    <div class='mx-auto mb-3 ml-2' id='tossups-seen'>Tossups seen: {tossupsSeen}</div>
                    <div class='mx-auto mb-3 ml-2' id='tossups-correct'> Tossups correct: 0</div>
                    <div class='mx-auto mb-3 ml-2' id='tossups-incorrect'> Tossups incorrect: 0</div>
                    <div class='mx-auto mb-3 ml-2' id='bonuses-seen'> Bonuses seen: 0</div>
                    <div class='mx-auto mb-3 ml-2' id='bonuses-correct'> Bonuses correct: 0</div>
                    <div class='mx-auto mb-3 ml-2' id='bonuses-incorrect'> Bonuses incorrect: 0</div>
                    <div class='mx-auto mb-7 ml-2' id='bonuses-incorrect'> Score: 0</div>
                     
                    <div class='relative group'>
                        <h1 class='mx-auto font-bold border border-white rounded p-2 group-hover:text-blue-500 cursor-pointer'>
                            Mode
                        </h1>

                        <div className='absolute hidden bg-white border border-gray-300 rounded px-4 space-y-2 group-hover:block z-50'>
                            <label className='block text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <input type='checkbox' className='mr-3' value='tossups and bonuses'/>
                            Tossups and Bonuses
                            </label>

                            <label className='block text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <input type='checkbox' className='mr-3' value='tossups' />
                            Tossups
                            </label>
                            
                            <label className='block text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <input type='checkbox' className='mr-3' value='bonuses' />
                            Bonuses
                            </label>
                        </div>
                    </div>
        
                    <div class='relative group'>
                        <h1 class='mx-auto font-bold border border-white rounded p-2 group-hover:text-blue-500 cursor-pointer'>
                            Categories
                        </h1>


                        <div className='absolute hidden bg-white border border-gray-300 rounded px-4 space-y-2 group-hover:block z-50'>
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

                    <div class='relative group'>
                        <h1 class='mx-auto font-bold border border-white rounded p-2 group-hover:text-blue-500 cursor-pointer'>
                            Packets
                        </h1>


                        <div className='absolute hidden bg-white border border-gray-300 rounded px-4 space-y-2 group-hover:block z-50'>
                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                                All
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                                ScibowlDB (easy)
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                                MIT
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="tossups" />
                                ESBOT
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="bonuses" />
                                Prometheus
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="tossups and bonuses" />
                                LOST
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="tossups" />
                                Lexington
                            </label>
                            
                            <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="bonuses" />
                                NSBA
                            </label>

                            <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="bonuses" />
                                SBST
                            </label>
                            </div>
                    </div>
                    

                </div>

            </div>

        </section>

        </div>

        </body>
    )
}

export default ScibowlScrimSingleplayer;