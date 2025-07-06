// src/components/TopProgressBar/TopProgressBar.tsx
import React from "react";


interface Props {
  isLoading: boolean;
}

const TopProgressBar: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className={`top-progress-bar ${isLoading ? "loading" : ""}`} />
  );
};

export default TopProgressBar;
