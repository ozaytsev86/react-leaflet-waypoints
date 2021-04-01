import React from 'react';

const newStory = ({Component, args, sourceCode}) => {
  const Template = (args) => <Component {...args} />;
  const component = Template.bind({});
  component.args = args;
  component.parameters = {
    docs: {
      source: {
        code: sourceCode
      }
    },
  };
  return component;
};

export {
  newStory
}
