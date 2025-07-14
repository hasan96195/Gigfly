import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <h1 className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
          GigFly
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
