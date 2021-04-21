import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { AiFillDashboard } from 'react-icons/ai'
import FindInPageSharpIcon from '@material-ui/icons/FindInPageSharp';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import WarningSharpIcon from '@material-ui/icons/WarningSharp';
import PersonIcon from '@material-ui/icons/Person';

export const SideNavbarData = [
    {
        title: "Dashboard", 
        icon: <AiFillDashboard />,
        link: "/",

    },
    {
        title: "Home" ,
        icon: <HomeIcon />,
        link:"/home",
    },

    {
        title: "Predict" ,
        icon: <FindInPageSharpIcon />,
        link: "/viewAndPredict",
    },

    {
        title: "Add" ,
        icon: <AddCircleSharpIcon />,
        link: "/add",
    },

    {
        title: "Patients at risk" ,
        icon: <WarningSharpIcon />,
        link: "/patientAtRisk",
    },

    {
        title: "View Patients" ,
        icon: <PersonIcon />,
        link: "/regpatients",
    }

];
    



