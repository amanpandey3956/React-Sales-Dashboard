import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // States for dynamic data
  const [transactions, setTransactions] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Transactions and Active Users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions dynamically
        const transactionsResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const formattedTransactions = transactionsResponse.data.slice(0, 10).map((post, index) => ({
          txId: `TX${index + 1}`,
          user: post.title.substring(0, 10),
          date: new Date().toISOString().split("T")[0],
          cost: (Math.random() * 100).toFixed(2),
        }));
        setTransactions(formattedTransactions);

        // Fetch active users data
        const activeUsersData = [
          { id: "AFG", value: 520600 },
          { id: "USA", value: 658725 },
          { id: "IND", value: 549818 },
          { id: "BRA", value: 432239 },
          { id: "CHN", value: 593604 },
          { id: "RUS", value: 268735 },
          { id: "ZAF", value: 836949 },
        ];
        const totalUsers = activeUsersData.reduce((sum, user) => sum + user.value, 0);

        setActiveUsers(activeUsersData);
        setTotalActiveUsers(totalUsers);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Sales Distribution" subtitle="This is all over Platform Sales Generated" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 - Stat Boxes */}
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="$34,343.00" subtitle="Total Sales" progress="0.75" increase="+14%" />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="$4.5k" subtitle="By Website" progress="0.50" increase="+21%" />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="$2.8K" subtitle="By Mobile" progress="0.30" increase="+5%" />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="$2.2k" subtitle="By Agent" progress="0.80" increase="+43%" />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size="125" />
            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 - Active Users */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px">
          <Box display="flex" justifyContent="space-between" mb="20px">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Active Users
              </Typography>
              <Typography variant="h6" color={colors.greenAccent[500]}>
                8.06% vs Previous Month
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Total Active Users
              </Typography>
              <Typography variant="h6" color={colors.greenAccent[500]}>
                {totalActiveUsers.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box height="200px" m="-20px 0 0 0">
            {loading ? (
              <Typography variant="h6" color={colors.grey[300]} textAlign="center">
                Loading Active Users...
              </Typography>
            ) : (
              <GeographyChart isDashboard={true} data={activeUsers} />
            )}
          </Box>
        </Box>

        {/* Recent Transactions */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {loading ? (
            <Typography variant="h6" color={colors.grey[300]} textAlign="center">
              Loading Transactions...
            </Typography>
          ) : (
            transactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>{transaction.user}</Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                  ${transaction.cost}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
