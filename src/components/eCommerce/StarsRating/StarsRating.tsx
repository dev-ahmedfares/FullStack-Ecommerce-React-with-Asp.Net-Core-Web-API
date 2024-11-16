import { useEffect, useState } from "react";


const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const starContainerStyle = {
  display: "flex",
};

type TStarsProps = {
  maxRating?: number;
  color?: string;
  size: number;
  onSetRating: (value: number) => void;
  showCountOfStars?:boolean,
  refreshReview?:boolean,
};

function StarsRating({
  maxRating = 5,
  color = "#fcc419",
  size = 30,
  onSetRating,
  showCountOfStars = false,
  refreshReview

}: TStarsProps) {
  const [Rating, setRating] = useState(0);
  const [updateRating, setUpdateRating] = useState(0);

  const numStyle = {
    margin: "0",
    lineHeight: "1",
    fontSize: `${size / 1.6}px`,
    color: color,
  };
  
  useEffect(()=>{
    setRating(0)
  },[refreshReview])

  // Handler
  function handleRating(value: number) {
    setRating(value);
    onSetRating(value);
  }

  function handleUpdateEnter(value: number) {
    setUpdateRating(value);
  }
  function handleUpdateLeave() {
    setUpdateRating(0);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star

            key={i}
            onRate={() => handleRating(i + 1)}
            onEnter={() => handleUpdateEnter(i + 1)}
            onLeave={handleUpdateLeave}
            color={color}
            size={size}
            full={i >= (updateRating ? updateRating : Rating)}
          />
        ))}
      </div>
      {showCountOfStars && <p style={numStyle}>{updateRating || Rating || ""}</p>}
    </div>
  );
}

type TStarProps = {
  onRate:()=>void;
  onEnter:()=>void;
  onLeave:()=>void;
  full:boolean;
  color:string;
  size:number;
};

function Star({ onRate, onEnter, onLeave, full, color, size }: TStarProps) {
  const StarStyle = {
    display: "block",
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
  };
  return (
    <span
      style={StarStyle}
      onClick={onRate}
      role="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}

export default StarsRating;
