import { Box, Button, IconButton, Typography } from "@mui/material";
import { tokens } from "../components/Visual/visualTheme";
import Header from "../components/Visual/Header";
import { useTheme } from "../components/theme-provider";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import { Linegraph } from "../components/Visual/Linegraph";
import HeatMap from "../components/Visual/HeatMap";




const Dashboard = () => { 
  return (
    <div className="mt-10">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <HeatMap/>
        </div>
  );
};

export default Dashboard;