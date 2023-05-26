const VectorDownIcon = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 20" fill='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C6.4142 0 6.75 0.33579 6.75 0.75V10.0064L10.2342 6.70554C10.5349 6.42066 11.0096 6.43349 11.2945 6.73419C11.5793 7.03489 11.5665 7.50959 11.2658 7.79447L6.5158 12.2945C6.2265 12.5685 5.7735 12.5685 5.4842 12.2945L0.734193 7.79447C0.433493 7.50959 0.420663 7.03489 0.705543 6.73419C0.990413 6.43349 1.46511 6.42066 1.76581 6.70554L5.25 10.0063V0.75C5.25 0.33579 5.5858 0 6 0ZM6 20C7.6569 20 9 18.6569 9 17C9 15.3431 7.6569 14 6 14C4.3431 14 3 15.3431 3 17C3 18.6569 4.3431 20 6 20ZM6 18.5C5.1716 18.5 4.5 17.8284 4.5 17C4.5 16.1716 5.1716 15.5 6 15.5C6.8284 15.5 7.5 16.1716 7.5 17C7.5 17.8284 6.8284 18.5 6 18.5Z" fill={color} />
    </svg>
  );
};

export default VectorDownIcon;