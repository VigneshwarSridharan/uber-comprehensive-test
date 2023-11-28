import { Button } from "baseui/button";
import { Card, StyledAction, StyledBody } from "baseui/card";
import comprehensiveTestList from "../../../data/mock-comprehensive-tests.json";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../../constants";

const TestList = () => {
  const navigate = useNavigate();
  const handleStartTest = (uuid: string) => {
    navigate(`${PAGES.COMPREHENSIVE_TEST_PAGE}/${uuid}`);
  };
  return (
    <>
      {comprehensiveTestList.map((item) => {
        return (
          <Card
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  marginBottom: $theme.sizing.scale600,
                }),
              },
            }}
            title={item.name}
            key={item.UUID}
          >
            <StyledBody>{item.description}</StyledBody>
            <StyledAction>
              <Button
                overrides={{ BaseButton: { style: { width: "100%" } } }}
                onClick={() => handleStartTest(item.UUID)}
              >
                Start
              </Button>
            </StyledAction>
          </Card>
        );
      })}
    </>
  );
};

export default TestList;
