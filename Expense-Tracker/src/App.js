import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [name,setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [desc,setDesc] = useState('');
  const [trans,setTrans] = useState([]);
  useEffect(() => {
    getTransactions().then(setTrans);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTrans(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch(url,{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        name:name.substring(price.length+1),
        desc,
        dateTime,
        price
      })
    }).then(response => {
      response.json().then(json => {
        console.log('result',json);
        setName('');
        setDateTime('');
        setDesc('');
      });
    });
    // fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify({ name, desc, dateTime }),
    // }).then((response) => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // }).then((json) => {
    //   console.log('result', json);
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });
    //console.log(url);
  }

  let balance = 0;
  for(const transaction of trans){
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>₹{balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTrans}>
        <div className="basic">
          <input type="text" 
          value={name} 
          onChange={ev => setName(ev.target.value)}
          placeholder={'Amount + Product'} />
          <input type="datetime-local" 
          value={dateTime} 
          onChange={ev => setDateTime(ev.target.value)}/>
        </div>
        <div className="description">
          <input type="text" 
          value={desc}
          onChange={ev => setDesc(ev.target.value)}
          placeholder={'Description'} />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {trans.length > 0 && trans.map(transaction => (
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.desc}</div>
          </div>
          <div className="right">
            <div className={"price " +(transaction.price<0?'red':'green')}>
              {transaction.price}
              </div>
            <div className="dateTime">{transaction.dateTime}</div>
          </div>
        </div>
        ))}
      </div>
    </main>
  );
}

export default App;
