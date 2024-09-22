const tailwindColors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-gray-500',
    'bg-orange-500',
    'bg-lime-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-rose-500',
  ];
  
  // Function to get a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
  };
  
export {getRandomColor}
  