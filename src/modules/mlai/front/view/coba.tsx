"use client"
import React, { useEffect, useState } from 'react';

export default function Coba() {
  const [y, setY] = useState(0);
  const handleNavigation = (e: any) => {
    const window = e.currentTarget;
    if (y > window.scrollY) {
      console.log("scrolling up");
    } else if (y < window.scrollY) {
      console.log("scrolling down");
    }
    setY(window.scrollY);
  };

  function onScroll1(val: any) {
    const tinggi = document.body.scrollHeight
    const sekarang = val.currentTarget.scrollY
    console.log(tinggi, sekarang)
  }

  useEffect(() => {
    // setY(window.scrollY);

    // window.addEventListener("scroll", (e) => handleNavigation(e));
    window.addEventListener("scroll", (e) => onScroll1(e));
    // const onscroll = () => {
    //   const scrolledTo = window.scrollY + window.innerHeight;
    //   const threshold = 300;
    //   const isReachBottom =
    //     document.body.scrollHeight - threshold <= scrolledTo;
    //   if (isReachBottom) alert("reached bottom");
    // };
    // window.addEventListener("scroll", onscroll);
    // return () => {
    //   window.removeEventListener("scroll", onscroll);
    // };
    // onscroll
  }, []);
  return (
    // <div style={{
    //   overflow: 'scroll',
    //   height: '93vh',
    //   width: '100px',
    //   color: 'white'
    // }}>
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    //   Coba
    // </div>
    <div style={{ width: "100vw", fontSize: "72px" }}>
      <div
        style={{
          height: "500px",
          background: "red",
        }}
      >
        Box 1
      </div>

      <div
        style={{
          height: "500px",
          background: "blue",
        }}
      >
        Box 2
      </div>

      <div
        style={{
          height: "500px",
          background: "green",
        }}
      >
        Box 3
      </div>
    </div>
  );
}

