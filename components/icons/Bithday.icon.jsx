const BithdayIcon = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 19" fill='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C9.0503 0 8.4145 0.68199 8.0634 1.28249C7.70175 1.90087 7.5 2.65552 7.5 3.25C7.5 3.74417 7.56283 4.42355 7.9325 4.99584C8.3421 5.63003 9.0377 6 10 6C10.9623 6 11.6579 5.63003 12.0675 4.99584C12.4372 4.42355 12.5 3.74417 12.5 3.25C12.5 2.65552 12.2983 1.90087 11.9366 1.28249C11.5855 0.68199 10.9497 0 10 0ZM9 3.25C9 2.94074 9.121 2.4454 9.3582 2.0397C9.6059 1.61614 9.8451 1.5 10 1.5C10.1549 1.5 10.3941 1.61614 10.6418 2.0397C10.879 2.4454 11 2.94074 11 3.25C11 3.65957 10.9378 3.98019 10.8075 4.18196C10.7171 4.32184 10.5377 4.5 10 4.5C9.4623 4.5 9.2829 4.32184 9.1925 4.18196C9.0622 3.98019 9 3.65957 9 3.25ZM18.5 9.25V17.5H19.25C19.6642 17.5 20 17.8358 20 18.25C20 18.6642 19.6642 19 19.25 19H0.75C0.33579 19 0 18.6642 0 18.25C0 17.8358 0.33579 17.5 0.75 17.5H1.5V9.25C1.5 8.00736 2.50736 7 3.75 7H16.25C17.4926 7 18.5 8.00736 18.5 9.25ZM3 9.25V11.3413L5.44734 12.9203C5.85991 13.1864 6.39009 13.1864 6.80266 12.9203L8.55 11.7929C9.4287 11.2261 10.5528 11.2065 11.4506 11.7425L13.459 12.9416C13.8821 13.1942 14.4143 13.1746 14.8177 12.8915L17 11.3601V9.25C17 8.83579 16.6642 8.5 16.25 8.5H3.75C3.33579 8.5 3 8.83579 3 9.25ZM15.6794 14.1193C14.7918 14.7422 13.6211 14.7853 12.69 14.2295L10.6817 13.0305C10.2736 12.7868 9.7626 12.7957 9.3632 13.0534L7.61585 14.1807C6.7082 14.7663 5.5418 14.7663 4.63415 14.1807L3 13.1264V17.5H17V13.1926L15.6794 14.1193Z" fill={color} />
    </svg>
  );

}

export default BithdayIcon;