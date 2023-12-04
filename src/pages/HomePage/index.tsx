import { Block, BlockOverrides } from "baseui/block";

import TestList from "./components/TestList";
import { useEffect } from "react";

const containerBlockOverrides: BlockOverrides = {
  Block: {
    style: ({ $theme }) => ({
      maxWidth: "768px",
      height: "100px",
      margin: "auto",
      padding: $theme.sizing.scale600,
    }),
  },
};

const HomePage = () => {

  useEffect(() => {



    fetch('/api/sample', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-token": "token value"
      },
      body: JSON.stringify({ data: "asdasd asdasd" })
    }).then(res => res.json()).then(res => {
      console.log('res', res)
    })
  }, [])
  return (
    <Block overrides={containerBlockOverrides}>
      <TestList />
    </Block>
  );
};

export default HomePage;
