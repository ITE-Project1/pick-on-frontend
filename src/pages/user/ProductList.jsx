import React from "react";
// import { Component55 } from "./Component55";
// import { Component56 } from "./Component56";
// import { DivWrapper } from "./DivWrapper";
// import { Frame } from "./Frame";
import "../../components/styled/ProductList.css"; 

// Frame 컴포넌트 정의
function Frame() {
  return (
    <div className="frame">
      <img className="fluent-box" alt="Fluent box" src="fluent-box-16-regular.svg" />
      <div className="text-wrapper">마이</div>
      <img className="profile" alt="Profile" src="profile-1-1.png" />
      <div className="div">홈</div>
    </div>
  );
}

function DivWrapper () { //상태변경 바꿔줘야함
  return (
    <div className="div-wrapper">
      <p className="div">
        <span className="text-wrapper">최신순</span>
        <span className="span">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;낮은
          가격순&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;높은 가격순
        </span>
      </p>
    </div>
  );
}

export const ProductList = () => {
  return (
    <div className="product-list">
      {/* <DivWrapper className="view" />
      <Component55 className="component-55-instance" />
      <Component56 className="component-56-instance" /> */}
      <img className="rectangle" alt="Rectangle" src="rectangle-6.png" />
      <img className="img" alt="Rectangle" src="rectangle-7.png" />
      <img className="rectangle-2" alt="Rectangle" src="rectangle-8.png" />
      <img className="rectangle-3" alt="Rectangle" src="rectangle-9.png" />
      <img className="rectangle-4" alt="Rectangle" src="rectangle-10.png" />
      <img className="rectangle-5" alt="Rectangle" src="rectangle-11.png" />
      <img className="rectangle-6" alt="Rectangle" src="rectangle-12.png" />
      <img className="rectangle-7" alt="Rectangle" src="rectangle-13.png" />
      <img className="rectangle-8" alt="Rectangle" src="rectangle-14.png" />
      {/* <Frame className="frame-instance" /> */}
      <Frame />
      <DivWrapper/>
      <div className="overlap">
        <img className="bi-plus-circle" alt="Bi plus circle" src="bi-plus-circle.png" />
        <div className="text-wrapper-5">더보기</div>
      </div>
    </div>
  );
};
export default ProductList;