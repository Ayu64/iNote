import { useState } from "react";

function Mode(props) {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      if (document.body && document.body.style) {
        document.body.style.backgroundColor = "#3C5665";
        // document.body.style.backgroundColor = "#353D60";
        document.body.style.color = "white"; // Set text color for dark mode
      }
    } else {
      setMode("light");
      if (document.body && document.body.style) {
        document.body.style.backgroundColor = "#DDDEE5";

        document.body.style.color = "black"; // Set text color for dark mode
      }
    }
  };
  return (
    // <div>
    //   <button className="btn btn-danger mx-2" onClick={toggleMode}>{mode}</button>
    // </div>

    <div className="form-check form-switch text">
      <input className="form-check-input" onClick={toggleMode} type="checkbox" id="flexSwitchCheckDefault" />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
    </div>


  );
}

export default Mode;
