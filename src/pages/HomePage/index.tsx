import { Block, BlockOverrides } from "baseui/block";

import TestList from "./components/TestList";

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
  return (
    <Block overrides={containerBlockOverrides}>
      <TestList />
    </Block>
  );
};

export default HomePage;
