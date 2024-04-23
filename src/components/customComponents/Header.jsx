import { Link } from "react-router-dom";
import { Button } from "src/components/libraryComponents/button";

export function Header() {
  return (
    <header className="bg-gray-900 py-4" id="header">
      <div className="container flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 text-gray-50">
          <span className="font-semibold uppercase">College Erp</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="login">
            <Button to="login" size="sm">
              Login
            </Button>
          </Link>
          <Link to="register">
            <Button to="login" size="sm">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
