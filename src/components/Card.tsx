import React from "react";

interface CardProps{
    // element: React.ReactNode; 
    children : React.ReactNode
}

const Card: React.FC<CardProps>= ({children}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.8rem",
          overflowY: "auto",
        }}
      >
   {children}

      </div>
    </>
  );
};

export default Card;
