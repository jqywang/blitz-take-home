import { styled } from "goober";

// Feel free to remove this component from the final result.
const Instructions = () => {
  return (
    <Wrapper>
      <H1>Blitz.gg Take Home Test</H1>
    </Wrapper>
  );
};

const Wrapper = styled("section")`
  font-size: var(--sp-3);
  text-align: left;
  margin-bottom: var(--sp-8);
`;

const H1 = styled("h1")`
  font-size: var(--sp-14);
  margin: 0 0 var(--sp-4);
`;

export default Instructions;
