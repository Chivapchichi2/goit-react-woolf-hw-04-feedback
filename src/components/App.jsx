import React, { useState } from 'react';
import { Wrapper } from './Wrapper/Wrapper';
import { Title } from './Title/TitleStyled';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const addFeedback = type => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedbackCount = countTotalFeedback();
    return totalFeedbackCount
      ? Math.round((feedback.good / totalFeedbackCount) * 100)
      : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();
  const options = Object.keys(feedback);

  return (
    <Wrapper>
      <Title>GoIT React Woolf HW-04 "Feedback"</Title>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={addFeedback} options={options} />
      </Section>
      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            totalFeedback={totalFeedback}
            positiveFeedbackPercentage={positiveFeedbackPercentage}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </Wrapper>
  );
};
