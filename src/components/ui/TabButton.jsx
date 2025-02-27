const TabButton = ({ children, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors
          ${
            active
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }
        `}
      >
        {children}
      </button>
    );
  };
  
  export default TabButton;  