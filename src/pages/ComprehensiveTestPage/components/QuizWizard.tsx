import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Card, StyledBody } from "baseui/card";
import { Radio, RadioGroup } from "baseui/radio";
import { useState } from "react";
import comprehensiveTestList from "../../../data/mock-comprehensive-tests.json";
import { HeadingMedium, ParagraphLarge } from "baseui/typography";
import { Button, KIND } from "baseui/button";
import { StyledDivider } from "baseui/divider";
import { Textarea } from "baseui/textarea";
import { ButtonTimed } from "baseui/button-timed";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Check, Delete } from "baseui/icon";

export type QuizWizardPropsT = {
  testDetails: (typeof comprehensiveTestList)[0];
};

export type AnswersT = {
  [key: string]: string;
};

const QuizWizard = ({ testDetails }: QuizWizardPropsT) => {
  const { name, questions } = testDetails;
  const [css, theme] = useStyletron();
  const [answers, setAnswers] = useState<AnswersT>(
    questions.reduce((final, item) => ({ ...final, [item.UUID]: "" }), {}),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(0);

  const question = questions[currentIndex];
  const { options = [] } = question;

  const handleSubmit = () => {
    setIsSubmitted(true);
    const result = questions.reduce((final, item) => {
      const userAnswer = answers[item.UUID];
      const isPass = item.answer == userAnswer;
      if (isPass) {
        final++;
      }
      return final;
    }, 0);
    setResult(result);
  };

  return (
    <Card
      title={
        <Block
          className={css({
            display: "flex",
            width: "100%",
            alignItems: "center",
          })}
        >
          <Block className={css({ flex: 1 })}>{name}</Block>
          {!isSubmitted && (
            <ButtonTimed
              onClick={handleSubmit}
              initialTime={questions.length * 60}
              disabled
            >
              <Block className={css({ marginRight: theme.sizing.scale100 })}>
                Time Left
              </Block>
            </ButtonTimed>
          )}
        </Block>
      }
    >
      <StyledDivider />
      {isSubmitted && (
        <Block>
          <HeadingMedium className={css({ textAlign: "center" })}>
            Your score is {result} out of {questions.length}
          </HeadingMedium>
          <ul className={css({ padding: 0 })}>
            {questions.map((question) => {
              const userAnswer = answers[question.UUID];
              const isPass = question.answer == userAnswer;
              return (
                <ListItem
                  artwork={isPass ? Check : Delete}
                  artworkSize={ARTWORK_SIZES.LARGE}
                  key={question.UUID}
                >
                  <ListItemLabel
                    description={
                      <>
                        <Block>{userAnswer}</Block>
                        {!isPass && <Block>Answer is: {question.answer}</Block>}
                      </>
                    }
                  >
                    {question.question}
                  </ListItemLabel>
                </ListItem>
              );
            })}
          </ul>
        </Block>
      )}
      {!isSubmitted && (
        <>
          <StyledBody>
            <Block>
              <ParagraphLarge>{question.question}</ParagraphLarge>
              {question.type === "TEXT" && (
                <Textarea
                  value={answers[question.UUID]}
                  onChange={({ target }) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.UUID]: target.value,
                    }))
                  }
                  placeholder="Type your answer here.."
                  clearOnEscape
                />
              )}
              {question.type === "SINGLE_CHOICE" && (
                <RadioGroup
                  value={answers[question.UUID]}
                  onChange={({ currentTarget }) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.UUID]: currentTarget.value,
                    }))
                  }
                >
                  {options.map((option, inx) => {
                    return (
                      <Radio value={option} key={inx}>
                        {option}
                      </Radio>
                    );
                  })}
                </RadioGroup>
              )}
            </Block>
          </StyledBody>
          <StyledDivider />
          <StyledBody
            className={css({ display: "flex", alignItems: "center" })}
          >
            <Block className={css({ flex: 1 })}>
              {currentIndex + 1} of {questions.length} Questions
            </Block>
            <Block>
              {0 != currentIndex && (
                <Button
                  kind={KIND.secondary}
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className={css({ marginLeft: theme.sizing.scale200 })}
                >
                  Prev
                </Button>
              )}
              {questions.length - 1 != currentIndex && (
                <Button
                  kind={KIND.primary}
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className={css({ marginLeft: theme.sizing.scale200 })}
                >
                  Next
                </Button>
              )}
              {questions.length - 1 == currentIndex && (
                <Button
                  kind={KIND.primary}
                  onClick={handleSubmit}
                  className={css({ marginLeft: theme.sizing.scale200 })}
                >
                  Submit
                </Button>
              )}
            </Block>
          </StyledBody>
        </>
      )}
    </Card>
  );
};

export default QuizWizard;
