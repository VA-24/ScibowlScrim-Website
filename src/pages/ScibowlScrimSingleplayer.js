import React, { useState, useEffect, useRef} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, doc, getDoc } from 'firebase/firestore';
import ScibowlScrimKeys from '../assets/ScibowlScrimKeys.json'
import '../App.css';


function ScibowlScrimSingleplayer(){

    const isReading = useRef(false);
    const [buzzed, setBuzzed] = useState(false);
    
    const [checkboxCategory, setCheckboxCategory] = useState('');
    const [checkboxParentPacket, setCheckboxParentPacket] = useState('');

    const [questionData, setQuestionData] = useState('');
    const [tossupBody, setTossupBody] = useState('');
    const [tossupAnswer, setTossupAnswer] = useState('');
    const [parentPacket, setParentPacket] = useState('');
    const [category, setCategory] = useState('');
    const [tossupType, setTossupType] = useState('');

    const [tossupsSeen, setTossupsSeen] = useState(0);
    const [tossupsCorrect, setTossupsCorrect] = useState(0);
    const [tossupsIncorrect, setTossupsIncorrect] = useState(0);
    const [bonusesSeen, setBonusesSeen] = useState('');
    const [bonusesCorrect, setBonusesCorrect] = useState('');
    const [bonusesIncorrect, setBonusesIncorrect] = useState('');
    const [score, setScore] = useState('');

    const [history, setHistory] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);

    useEffect(() => {
        console.log("Selected Category:", checkboxCategory);
    }, [checkboxCategory]);

    const handleHistoryItemClick = (index) => {
        const originalIndex = history.length - 2 - index;
        setHistory((prevHistory) =>
          prevHistory.map((item, i) => {
            if (i === originalIndex) {
              return { ...item, isExpanded: !item.isExpanded };
            }
            return item;
          })
        );
      };

      const handleNextQuestion = () => {
          const event = new KeyboardEvent('keydown', {
            key: 'n',
          });
          window.dispatchEvent(event);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const answerInput = document.getElementById('answer-input');
        if (tossupAnswer.toLowerCase().includes(answerInput.value.toLowerCase())) {
          console.log('correct');
          setBuzzed(false);
          answerInput.value = "";
          setTossupsCorrect(tossupsCorrect => tossupsCorrect + 1);
          setScore(score => score + 4);
          handleNextQuestion();
        } else {
          console.log('wrong');
          setBuzzed(false);
          answerInput.value = "";
          isReading.current = true;
          setTossupsIncorrect(tossupsIncorrect => tossupsIncorrect + 1);
        }
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
                console.log(tossup_answer);
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
                        if (isReading.current !== false) {
                            setTossupBody((prevTossupBody) => prevTossupBody + ' ' + tossup_words[i]);
                            if (i === (tossup_words.length - 1)) {
                                isReading.current = false;
                            }
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

                if ((event.key === " ") && document.activeElement !== answerInput && !buzzed) {
                    isReading.current = false;
                    setBuzzed(true);
                    console.log('buzz')
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
                        
                        <button class='text-md xmd:text-lg flex items-center text-white bg-blue-500 rounded-lg p-1.5' onClick={handleNextQuestion}>
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

                    {buzzed &&
                    <form id='answer' onSubmit={handleSubmit}>
                        <div class='input-group flex flex-row mx-auto mb-3'>
                        <input class='form-control border border-gray rounded-lg w-full mr-2 p-1' id='answer-input' type='text' placeholder='Answer'></input>
                        <button class='btn btn-success flex items-center text-white bg-blue-500 rounded-lg p-1' id='answer-submit' type='submit'>Guess</button>
                        </div>
                    </form>
                    }

                    <div style={{ height: '0.2px', width: '100%', background: 'gray', marginBottom: '10px' }}></div>

                    <ul className='' id='question-history'>
                        {history.slice(0, -1).reverse().map((item, index) => (
                        <div key={index} className='bg-gray-100 p-2 mb-2 rounded border border-gray-300 rounded' onClick={() => handleHistoryItemClick(index)}>
                            <div className='font-bold'>
                                {item.parent_packet} / {item.category} / {item.tossup_type}
                            </div>
                            {item.isExpanded && (
                                <div className='mt-2'>
                                <p class='font-small mb-2'>{item.tossup_question}</p>
                                <p class='font-small'>Answer: {item.tossup_answer}</p>
                                </div>
                            )}
                        </div>
                        ))}
                    </ul>
                </div>

                <div class='justify-center ml-auto items-center w-1/3 px-12 py-5' id='session-settings'>
                    <h1 class='mx-auto mb-3 ml-2 font-bold'>Session Stats</h1>
                    <div class='mx-auto mb-3 ml-2' id='tossups-seen'>Tossups seen: {tossupsSeen}</div>
                    <div class='mx-auto mb-3 ml-2' id='tossups-correct'> Tossups correct: {tossupsCorrect}</div>
                    <div class='mx-auto mb-3 ml-2' id='tossups-incorrect'> Tossups incorrect: {tossupsIncorrect}</div>
                    <div class='mx-auto mb-3 ml-2' id='bonuses-seen'> Bonuses seen: 0</div>
                    <div class='mx-auto mb-3 ml-2' id='bonuses-correct'> Bonuses correct: 0</div>
                    <div class='mx-auto mb-3 ml-2' id='bonuses-incorrect'> Bonuses incorrect: 0</div>
                    <div class='mx-auto mb-7 ml-2' id='bonuses-incorrect'> Score: {score}</div>
                     
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
                            <input type="checkbox" class='mr-3' value="all" />
                                All
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="math" onChange={(e) => setCheckboxCategory(e.target.value)} />
                                Math
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="physics" onChange={(e) => setCheckboxCategory(e.target.value)}/>
                                Physics
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="chemistry" onChange={(e) => setCheckboxCategory(e.target.value)}/>
                                Chemistry
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="biology" onChange={(e) => setCheckboxCategory(e.target.value)}/>
                                Biology
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="earth and space" onChange={(e) => setCheckboxCategory(e.target.value)}/>
                                Earth and Space
                            </label>
                            
                            <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="energy" onChange={(e) => setCheckboxCategory(e.target.value)}/>
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
                            <input type="checkbox" class='mr-3' value="all" />
                                All
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="scibowldb" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                ScibowlDB (easy)
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="mit" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                MIT
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="esbot" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                ESBOT
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="prometheus" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                Prometheus
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="lost" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                LOST
                            </label>

                            <label class="block mb-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="lexington" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                Lexington
                            </label>
                            
                            <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="nsba" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
                                NSBA
                            </label>

                            <label class="block mb-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input type="checkbox" class='mr-3' value="sbst" onChange={(e) => setCheckboxParentPacket(e.target.value)}/>
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