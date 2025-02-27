const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  const Button = ({
    children,
    variant = 'primary',
    className = '',
    disabled = false,
    ...props
  }) => {
    return (
      <button
        className={`
          flex items-center justify-center px-4 py-2 rounded-lg
          font-medium transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;  