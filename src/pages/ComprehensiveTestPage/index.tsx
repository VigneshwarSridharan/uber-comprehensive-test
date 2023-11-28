import { Block, BlockOverrides } from "baseui/block";
import { useParams } from "react-router-dom";
import comprehensiveTestList from "../../data/mock-comprehensive-tests.json";
import QuizWizard from "./components/QuizWizard";

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

const ComprehensiveTestPage = () => {
  const { UUID } = useParams();
  const testDetails: (typeof comprehensiveTestList)[0] | undefined =
    comprehensiveTestList.find((item) => item.UUID === UUID);

  return (
    <Block overrides={containerBlockOverrides}>
      {!!testDetails && <QuizWizard testDetails={testDetails} />}
    </Block>
  );
};

export default ComprehensiveTestPage;
