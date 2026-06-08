import React, { use, useEffect, useState } from "react";

const LifeCycle = () => {
  const [text, setText] = React.useState("");
  useEffect(() => {
    console.log("Componente cargado");
  }, []);
  useEffect(() => {
    console.log("Componente actualizado:", text);
  }, [text]);
  useEffect(() => {
    return () => {
      console.log("Componente desmontado");
    };
  }, []);
  useEffect(() => {
    console.log("Componente actualizado");
  });
  return (
    <>
      <div>LifeCycle</div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
};

export default LifeCycle;
