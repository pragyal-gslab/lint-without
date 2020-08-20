import React, { useEffect } from "react";
import { Select } from "../../materialUI";

const Dashboard = () => {
  const [number, setNumber] = React.useState([1]);
  const items = React.useMemo(() => {
    return [
      { text: "One", value: 1 },
      { text: "Two", value: 2 },
      { text: "Three", value: 3 },
      { text: "Four", value: 4 },
    ];
  }, []);

  useEffect(() => {
    console.log(number);
  }, [number]);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <Select
        label="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        items={items}
        required
        placeholder="Select Number"
        helperText="Select Number"
        width="100%"
        multiple
        displayKey="text"
        valueKey="value"
      />
    </div>
  );
};

export default React.memo(Dashboard);
