import React from 'react'




function Management({products, setProducts}) {
  
  //상품리스트들을 화면에 뿌려주는 함수
  const paintProductList = () =>{
    if(products){
      const result  = products.map((product, idx) => {
        return (
          <tr key={idx}>
              <td>{product.product}</td>
              <td>{product.price}</td>
              <td>{product.count}</td>
          </tr>
      )
    })

    return result;
  }
  }

  //새로운 상품을 추가해주는 button에 대한 핸들링.
  const handleAddProduct = (e) => {
    e.preventDefault();

    const product = e.target.product.value;
    const price = e.target.price.value;
    const count = Number(e.target.count.value);


    //상품 가격은 100원부터 시작하며, 10원으로 나누어 떨어져야 한다.
    if(Number(price) <100 || Number(price % 10 !== 0))  {
      alert("상품 가격은 100원부터 시작하며, 10원으로 나누어 떨어져야 한다.");
      e.target.reset();
    }else if(product === "" || count <= 0){
      alert("상품명, 가격, 수량은 필수로 입력해야 합니다.");
      e.target.reset();
    }  
    else{
      const newProduct = {
        product: product,
        price: price,
        count: count,
        id: Math.floor(Math.random() * 100000)
      }
      setProducts(curr =>[...curr, newProduct]);
      e.target.reset();
    }
  }




  return (
    <React.Fragment>
      <h2>상품 추가하기</h2>
      <form onSubmit={handleAddProduct}>
        <input id='management-product-input' name='product' placeholder='상품명' type={"text"} />
        <input id='management-price-input' name='price' placeholder='가격' type={"number"} />
        <input id='management-count-input' name='count' placeholder='수량'type={"number"} />
        <button id='management-submit' type='submit'>추가하기</button>
      </form>
      <h2>상품 현황</h2>
      <table id='management-table'>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {/* 아래는 테이블 예시 데이터 입니다. 확인후 지워주세요!!*/}
          {paintProductList()}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Management;