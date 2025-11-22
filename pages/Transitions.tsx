import React from 'react';
import { Navigate } from 'react-router-dom';

const Transitions: React.FC = () => {
  return <Navigate to="/transmissions" replace />;
};

export default Transitions;