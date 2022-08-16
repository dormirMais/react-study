import React from 'react'


function Charge({coins, setCoins}) {
  const Random = global.MissionUtils.Random;
  

  const moneyAmount = coins[500]*500 + coins[100]*100 + coins[50]*50 + coins[10]*10;

  //돈을 넣으면 금액에 맞추어서 랜덤으로 동전의 갯수를 맹글어준다. 
  const handleInsertChange = (e) => {
    e.preventDefault();
    
    let insertedChange = Number(e.target.insertedChange.value); //자판기 동전 충전하기에 넣은 금액을 숫자로 읽어온다. 
    if(insertedChange % 10 !== 0) {
      alert("충전할 금액은 10원으로 나누어 떨어져야 합니다.");
      e.target.reset();
      return;
    }
    let filteredChange = insertedChange;                        
    let possibleCoinCount = 0;
    const newCoins = {
      500: 0,
      100: 0,
      50: 0,
      10: 0
    };

    //기존에 가지고 있던 금액에 새로 충전한 금액을 더해준다. 금액이 제대로 올라가지 않는 이유는 이것이 비동기적으로 작동하기 때문이다.
    //이부분은 상당히 중요한 부분이었다. 언제나 기억해야 할게 set함수는 비동기로 동작을 마지막에 몰아준다. 그래서 insertedChange에 대해 아래에서 조작을 가해주면 원래의 의도와는 다르게 동작한다. 
    //이를 해결하기 위해서 filtetedChange변수를 새로 만들어주었다. 
    possibleCoinCount = Math.floor(filteredChange / 500); //500원으로 만들수 있는 숫자
    newCoins[500] = Random.pickNumberInRange(0, possibleCoinCount);
    filteredChange = filteredChange - (newCoins[500] * 500);  //1사이클   

    possibleCoinCount = Math.floor(filteredChange / 100); //500원으로 만들수 있는 숫자
    newCoins[100] = Random.pickNumberInRange(0, possibleCoinCount);
    filteredChange = filteredChange - (newCoins[100] * 100);  //1사이클 


    possibleCoinCount = Math.floor(filteredChange / 50); //500원으로 만들수 있는 숫자
    newCoins[50] = Random.pickNumberInRange(0, possibleCoinCount);
    filteredChange = filteredChange - (newCoins[50] * 50);  //1사이클 

    newCoins[10] = filteredChange / 10;   //남은돈은 10원에서 몰아준다. 

    setCoins(curr => {
      const newCurr = {...curr};

      newCurr[500] += newCoins[500];
      newCurr[100] += newCoins[100];
      newCurr[50] += newCoins[50];
      newCurr[10] += newCoins[10];

      return newCurr;
    })

    
    e.target.reset(); //clear 해주기위해서 해당 함수 사용, 



  }


  return (
    <React.Fragment>
      <h2>자판기 동전 충전하기</h2>
      <form onSubmit={handleInsertChange}>
        <input id='charge-input' type={"number"} name={"insertedChange"}/>
        <button id='charge-button' type='submit'>충전하기</button>
      </form>
      <div id='charge-result'>보유 금액:{moneyAmount}원</div>
      <h2>동전 보유 현황</h2>
      <table id='charge-table'>
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td>{coins[500]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>{coins[100]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>{coins[50]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>{coins[10]}개</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Charge;