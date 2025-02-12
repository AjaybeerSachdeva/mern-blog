import { Avatar, Button, Dropdown, Navbar, TextInput  } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import {useSelector} from 'react-redux';
import { HiLogout, HiViewGrid } from "react-icons/hi";

function Header() {
  const {currentUser}=useSelector((state)=>state.user);
  const location=useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap 
        text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 text-white'>Playground</span>
        Pixels
        </Link>
        <form>
            <TextInput type='text' placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'/>
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch/></Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill><FaMoon/></Button>
            {currentUser?
            (
              <Dropdown
              arrowIcon={false}
              label={
                <Avatar
                  img={currentUser.profilePicture} // Replace with the correct path
                  alt="User"
                  rounded
                  size="md"
                />
              }
              inline
            >
      <Dropdown.Header>
        <span className="block text-sm">@{currentUser.username}</span>
        <span className="block truncate text-sm font-medium">{currentUser.email}</span>
      </Dropdown.Header>
      <Link to={'/dashboard?tab=profile'}>
      <Dropdown.Item icon={HiViewGrid}>Profile</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
    </Dropdown>
            )
            :
            (<Link to="/sign-in">
            <Button className='w-auto h-10' gradientDuoTone="purpleToBlue" outline>Sign In</Button>
            </Link>)
            }
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={location==='/'} as={'div'}>
            <Link to="/">
            Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={location==='/about'} as={'div'}>
            <Link to="/about">
            About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={location==='/projects'} as={'div'}>
            <Link to="/projects">
            Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;