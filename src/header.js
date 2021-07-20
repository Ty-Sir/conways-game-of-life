import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  font-size: 5rem;
  font-weight: 800;
  line-height: 10rem;
  background: url(https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX34857173.jpg);
`;

export default function Header(){
  return (
    <Title>
      Conway's Game of Life
    </Title>
  );
}
