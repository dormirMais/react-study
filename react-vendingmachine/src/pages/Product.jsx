import React from "react";
import { useState } from "react";

function Product({products, setProducts, coins, setCoins }) {
  const [insertedMoney, setInsertedMoney] = useState(0); 
  const [changeCoins, setChangeCoins] = useState({
    500: 0,
    100: 0,
    50: 0,
    10: 0
  })





  //화면에 현재 물품 리스트들을 뿌려주는 함수.(구매할 수 있는 상품 현황)
  const productList = () =>{ 
    const result = products.map((product, idx) => {
      return(
        <tr key={idx}> 
            <td>{product.product}</td>
            <td>{product.price}</td>
            <td>{product.count}</td>
            <td><button onClick={handlePerchase} id={product.id} disabled={product.count===0? true: false} >구매하기</button></td>
        </tr>
      )})

      return result;
  }

  const handlePerchase = (e) => { //현재 선택된 상품의 금액을 insertedMoney에서 빼준다.
    e.preventDefault();
    const newProductList = [...products];
    //* console.log(typeof(e.target.id)); 요아이는 스트링으로 받는다. 
   for(let i=0; i<newProductList.length; i++){
    //* console.log("여기서확인 => " + typeof(newProductList[i].id)); // 요아이는 number로 받는다. 
    if(newProductList[i].id === Number(e.target.id)) {
      if(newProductList[i].price >insertedMoney){
        alert("투입한 금액보다 상품의 금액이 큽니다.");
        return;
      }
      newProductList[i].count -= 1;
      setInsertedMoney(curr => curr - newProductList[i].price)
    }
   }
    setProducts(newProductList);
    
  }

  const handleInsertedMoney = (e) =>{
    e.preventDefault(); 
    const insertedMoney = Number(e.target.productInput.value);  //사용자가 넣은 돈을 읽어온다. 이 때 string으로 읽어오기 때문에 Number로 변환해준다. 
    if(insertedMoney % 10 !== 0) {
      alert("금액은 10원으로 나누어 떨어지는 금액만 투입할 수 있다.");
      e.target.reset();
    } else{
      setInsertedMoney(curr => curr + insertedMoney);             //읽어온 돈을 setting 해준다. 
      e.target.reset();
    }
  }

  const givingChange = () =>{ //사용자가 잔돈반환하기 버튼을 누르면 동작한다. 생각해봐야 할거는 자판기가 가지고 있는 동전보유 현황에 맞추어서 돈을 주어야 한다는 것이다. 
                              
    let money = insertedMoney;
    const change = {
      500: 0,
      100: 0,
      50: 0,
      10: 0
    };

    let coinsCount = (Math.floor(money/500));
    if(coinsCount <= coins[500]) change[500] = coinsCount;  //해당동전이 충분히 있기 때문에 count를 넣어주면 된다. 
    else change[500] = coins[500];                          //해당 동전이 충분하지 않은 경우이다. 그러면 coins에 있는 돈을 넣어주면 된다. 
    money = money - change[500]*500;   //요렇게 한 사이클이다. 

    coinsCount = (Math.floor(money/100));
    if(coinsCount <= coins[100]) change[100] = coinsCount;
    else change[100] = coins[100];    
    money = money - change[100]*100;

    coinsCount = (Math.floor(money/50));
    if(coinsCount <= coins[50]) change[50] = coinsCount;
    else change[50] = coins[50];    
    money = money - change[50]*50;

    coinsCount = (Math.floor(money/10));
    if(coinsCount <= coins[10]) change[10] = coinsCount;
    else change[10] = coins[10];    
    money = money - change[10]*10;

    setChangeCoins({...change});
    setCoins(curr => {
      const newCurr = {...curr};

      newCurr[500] -= change[500];
      newCurr[100] -= change[100];
      newCurr[50] -= change[50];
      newCurr[10] -= change[10];

      return newCurr;
    })
    setInsertedMoney(money);

  }



  return (
    <React.Fragment>
      <h2>금액 투입</h2>
      <form onSubmit={handleInsertedMoney}>
        <input id="product-input" name="productInput"  type="number" />
        <button id="product-input-button" type="form">투입하기</button>
      </form>
      <div id="product-result">투입한 금액: {insertedMoney}원 </div>
      <h2>구매할 수 있는 상품 현황</h2>
      <table id="product-table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        
        <tbody>
            {productList()}
        </tbody>
        
      </table>
      <h2>잔돈</h2>
      <button id="product-output-button" onClick={givingChange}>반환하기</button>
      <table id="product-coin-table">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td>{changeCoins[500]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>{changeCoins[100]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>{changeCoins[50]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>{changeCoins[10]}개</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Product;