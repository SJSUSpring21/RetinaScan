import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FindInPageSharpIcon from '@material-ui/icons/FindInPageSharp';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import WarningSharpIcon from '@material-ui/icons/WarningSharp';
import PersonIcon from '@material-ui/icons/Person';

export const SideNavbarData = [
    {
        title: "Home" ,
        icon: <HomeIcon />,
        link:"/",
    },
    {
        title: "Add A New Patient" ,
        icon: <AddCircleSharpIcon />,
        link: "/add",
    },
    {
        title: "View Patients" ,
        icon: <PersonIcon />,
        link: "/regpatients",
    },
    {
        title: "All Patients" ,
        icon: <FindInPageSharpIcon />,
        link: "/viewAndPredict",
    },
    {
        title: "Patients At Risk" ,
        icon: <WarningSharpIcon />,
        link: "/patientAtRisk",
    }



];
    



