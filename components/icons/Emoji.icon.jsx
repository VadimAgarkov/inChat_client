const EmojiIcon = ({ width, height, color }) => {

  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5001 10.9991C19.5377 10.9991 22.0001 13.4615 22.0001 16.4991C22.0001 19.5366 19.5377 21.9991 16.5001 21.9991C13.4626 21.9991 11.0001 19.5366 11.0001 16.4991C11.0001 13.4615 13.4626 10.9991 16.5001 10.9991ZM11.0001 0.998047C16.5238 0.998047 21.0017 5.47589 21.0017 10.9996C21.0017 11.2628 20.9915 11.5237 20.9715 11.7818C20.5337 11.3662 20.0378 11.0112 19.4974 10.7299C19.3553 6.15965 15.6053 2.49805 11.0001 2.49805C6.30481 2.49805 2.49854 6.30432 2.49854 10.9996C2.49854 15.6051 6.16069 19.3553 10.7319 19.497C11.0126 20.0372 11.3675 20.5329 11.7826 20.9707C11.5249 20.991 11.2637 21.0011 11.0001 21.0011C5.47638 21.0011 0.998535 16.5233 0.998535 10.9996C0.998535 5.47589 5.47638 0.998047 11.0001 0.998047ZM16.5001 12.9983L16.4102 13.0064C16.2062 13.0434 16.0452 13.2043 16.0082 13.4084L16.0001 13.4983L15.9998 15.9983L13.4978 15.9991L13.4079 16.0071C13.2038 16.0442 13.0429 16.2051 13.0058 16.4092L12.9978 16.4991L13.0058 16.589C13.0429 16.793 13.2038 16.954 13.4079 16.991L13.4978 16.9991L16.0008 16.9983L16.0012 19.5026L16.0093 19.5924C16.0463 19.7965 16.2073 19.9575 16.4114 19.9945L16.5012 20.0026L16.5911 19.9945C16.7952 19.9575 16.9561 19.7965 16.9932 19.5924L17.0012 19.5026L17.0008 16.9983L19.5047 16.9991L19.5946 16.991C19.7987 16.954 19.9596 16.793 19.9966 16.589L20.0047 16.4991L19.9966 16.4092C19.9596 16.2051 19.7987 16.0442 19.5946 16.0071L19.5047 15.9991L16.9998 15.9983L17.0001 13.4983L16.9921 13.4084C16.955 13.2043 16.7941 13.0434 16.59 13.0064L16.5001 12.9983ZM7.46182 13.7829C8.12319 14.6223 9.05256 15.1965 10.0919 15.4094C10.0313 15.7629 10.0001 16.1273 10.0001 16.4991C10.0001 16.64 10.0046 16.7798 10.0134 16.9184C8.53821 16.6757 7.21138 15.8888 6.28361 14.7112C6.02726 14.3859 6.0832 13.9143 6.40856 13.658C6.73392 13.4016 7.20548 13.4576 7.46182 13.7829ZM8.00054 7.75024C8.69051 7.75024 9.24986 8.30956 9.24986 8.99953C9.24986 9.6895 8.69051 10.2488 8.00054 10.2488C7.31058 10.2488 6.75125 9.6895 6.75125 8.99953C6.75125 8.30956 7.31058 7.75024 8.00054 7.75024ZM14.0006 7.75024C14.6905 7.75024 15.2499 8.30956 15.2499 8.99953C15.2499 9.6895 14.6905 10.2488 14.0006 10.2488C13.3106 10.2488 12.7513 9.6895 12.7513 8.99953C12.7513 8.30956 13.3106 7.75024 14.0006 7.75024Z" fill={color} />
    </svg>
  );
}

export default EmojiIcon;