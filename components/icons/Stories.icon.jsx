const StoriesIcon = ({ width, height, color }) => {

  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8578 1.83306L17.9088 1.99271L18.4601 3.91523C18.5648 4.28022 18.3801 4.65963 18.0418 4.80828L17.9459 4.84291L7.219 7.91802L18.3781 7.91892C18.7578 7.91892 19.0715 8.20112 19.1212 8.56722L19.1281 8.66892V17.1669C19.1281 18.6295 17.9864 19.8253 16.5456 19.9119L16.3781 19.9169H3.87921C2.41668 19.9169 1.22081 18.7752 1.13423 17.3345L1.12921 17.1669L1.129 8.77502L0.607237 6.95387C0.204117 5.54799 0.971957 4.08375 2.33306 3.6034L2.49271 3.5524L14.5074 0.107236C15.9133 -0.295884 17.3775 0.471966 17.8578 1.83306ZM17.6272 9.41802H2.62921V17.1669C2.62921 17.771 3.05769 18.275 3.62729 18.3915L3.7514 18.4105L3.87921 18.4169H16.3781C17.0253 18.4169 17.5576 17.9251 17.6216 17.2947L17.6281 17.1669L17.6272 9.41802ZM4.40189 4.5654L2.90617 4.99429C2.28403 5.17268 1.90787 5.79224 2.02007 6.41579L2.04909 6.54042L2.39343 7.74127L2.68851 7.65641L4.40189 4.5654ZM9.15821 3.20154L6.44073 3.98077L4.72735 7.07178L7.44484 6.29255L9.15821 3.20154ZM13.9155 1.83741L11.198 2.61664L9.48461 5.70765L12.2012 4.9287L13.9155 1.83741ZM15.7627 1.60386L14.2419 4.34352L16.8104 3.60726L16.467 2.40617C16.3598 2.03245 16.0934 1.74751 15.7627 1.60386Z" fill={color} />
    </svg>
  );
}

export default StoriesIcon;