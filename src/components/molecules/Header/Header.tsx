"use client";

import { useContext, useState } from "react";

import { Menu, X } from "lucide-react";

import AuthButtonGroup from "../AuthButtonGroup/AuthButtonGroup";
import Button from "@/components/atoms/Button/Button";
import Container from "@/components/atoms/Container/Container";
import Logo from "@/components/atoms/Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import NavigationLink from "@/components/atoms/NavigationLink/NavigationLink";

import { AuthContext } from "@/contexts/AuthState";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);

  const logout = () => {};

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16">
          <Logo size="lg" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationLink href="#about">About</NavigationLink>
            <NavigationLink href="#partnership">Partnership</NavigationLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex">
            <AuthButtonGroup isLoggedIn={currentUser} userRole={currentUser} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isMenuOpen}
          isLoggedIn={currentUser}
          userRole={currentUser}
          onLogout={logout}
        />
      </Container>
    </header>
  );
};

export default Header;
