import { ReactNode, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  children: ReactNode;
  to: string; // URL to navigate back to
  className?: string; // Custom class names
  style?: CSSProperties; // Inline styles
}

const BackButton = ({ children, to, className = '', style }: BackButtonProps) => {
  return (
    <Link
      to={to}
      className={`inline-block rounded-lg text-white font-semibold shadow-lg bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 hover:from-blue-500 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out ${className}`}
      style={style}
    >
      {children}
    </Link>
  );
};

export { BackButton };
