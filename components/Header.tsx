import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
      <header className="navbar bg-purple-600 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="navbar-container max-w-6xl mx-auto">
          {/* Left: Title */}
          <h1 className="text-2xl font-bold">Expense Tracker</h1>

          {/* Center: Nav */}
          <nav className="flex-1 flex justify-center gap-6">
            <a href="#balance" className="text-white inline-flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-purple-700">Balance</a>
            <a href="#charts" className="text-white inline-flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-purple-700">Charts</a>
            <a href="#transactions" className="text-white inline-flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-purple-700">Transactions</a>
            <a href="#import" className="text-white inline-flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-purple-700">Import</a>
            <a href="#add" className="text-white inline-flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-purple-700">Add New</a>
          </nav>

          {/* Right: Auth/Icon */}
          <div className="navbar-right ml-auto flex items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
  );
};

export default Header;
