import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

const Summarize = () => {
  const [inputText, setInputText] = useState('');
  const [summaryText, setSummaryText] = useState('');

  const [animate, setAnimate] = useState(false);

  const handleSummarize = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/summarize/', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: inputText}),
      })

      if(response.ok){
        setAnimate(false)
        const data = await response.json();
        setSummaryText(data)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/30">
      <div className="w-[500px] p-8 bg-yellow-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Summarize</h1>

        <textarea
          className="w-full h-40 border rounded-md p-2 mb-4"
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 flex items-center justify-between"
          onClick={() => {
            setAnimate(true);
            handleSummarize();
          }}
        >
          <p className="mr-2">Summarize</p>
          {animate && (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          )}
        </button>

        <div className="w-full p-2 overflow-auto max-h-40">
          {summaryText ? (
            <div className="typing-animation">
              {summaryText}
              <span className="blink-caret">|</span>
            </div>
          ) : (
            <div className="text-gray-500">
              Summarized text will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summarize;