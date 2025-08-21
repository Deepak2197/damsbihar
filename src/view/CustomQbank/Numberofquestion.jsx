import React, { useEffect, useRef, useState } from "react";
import IScroll from "iscroll"; // Assuming `iscroll` is installed via npm
import './style.css'
import Levels from "./Levels";
import ChooseSubject from "./ChooseSubject";
const Numberofquestion = () => {
  const [formstate,setformstate]=useState(1);
  return (
    <>
    {formstate==1 &&
  
    <div className="numberOFquestion">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="selectPicker">
              <h1>Select number of questions</h1>
            </div>
            <div className="numberPicker">
              <Spinner value={32} unit="IN" increment={10} zeroPadded={false} />
            </div>
            <div className="buttonGroup">
                <button className="btn back" onClick={()=>setformstate(2)}>Back</button>
                <button className="btn" onClick={()=>setformstate(2)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
}


{formstate==2 &&
<Levels setformstate={setformstate}/>
}

{formstate==3 &&
<ChooseSubject setformstate={setformstate}/>
}
    </>
  );
};

const Spinner = ({
  id = "spinner_01",
  value = 32,
  unit = "IN",
  increment = 10,
  zeroPadded = false,
}) => {
  const spinnerRef = useRef(null);
  const [spinnerInstance, setSpinnerInstance] = useState(null);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    // Initialize IScroll
    const spinner = new IScroll(spinnerRef.current, {
      mouseWheel: true,
      snap: "li",
      momentum: true,
      bounce: true,
    });

    spinner.on("scrollEnd", () => {
      const selectedIndex = spinner.currentPage.pageY;
      const selectedText = spinnerRef.current.querySelectorAll("li")[selectedIndex]
        .textContent;
      setCurrentValue(parseInt(selectedText, 10));
    });

    setSpinnerInstance(spinner);

    // Cleanup
    return () => {
      spinner.destroy();
    };
  }, []);

  // Generate Spinner Items
  const generateSpinnerItems = () => {
    const items = [];
    for (let i = 10; i <= 100; i += increment) {
      const paddedValue = zeroPadded ? String(i).padStart(3, "0") : i;
      items.push(
        <li key={i} className={currentValue === i ? "highlighted" : ""}>
          <span>{paddedValue}</span>
        </li>
      );
    }
    return items;
  };

  const handleTap = (direction) => {
    if (!spinnerInstance) return;

    const newPage =
      spinnerInstance.currentPage.pageY + (direction === "up" ? -1 : 1);
    spinnerInstance.goToPage(0, newPage, 300);
  };

  return (
    <div id={id} className="spinner rounded" ref={spinnerRef}>
      <div>
        <ul>{generateSpinnerItems()}</ul>
      </div>
      <div className="tap_area value_up" onClick={() => handleTap("up")}>
        <div className="arrow up"></div>
      </div>
      <div className="tap_area value_down" onClick={() => handleTap("down")}>
        <div className="arrow down"></div>
      </div>
    </div>
  );
};

export default Numberofquestion;
