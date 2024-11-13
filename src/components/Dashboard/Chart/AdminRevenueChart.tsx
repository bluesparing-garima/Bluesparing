import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Button as MuiButton,
  MenuItem,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { header } from "../../../context/constant";
import { MoreVertical } from "react-feather";
import toast, { Toaster } from "react-hot-toast";
import GetRevenueDataService from "../../../api/Dashboard/GetRevenueData/GetRevenueDataService";
const Card = styled(MuiCard)`
  margin-bottom: 20px;
`;
const Button = styled(MuiButton)`
  margin-right: 10px;
`;
const ChartWrapper = styled.div`
  height: 250px;
  width: 100%;
`;
const AdminRevenueChart = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [revenueLabelData, setRevenueLabelData] = useState<string[]>([]);
  const [netPremiumData, setNetPremiumData] = useState<number[]>([]);
  const [revenuePer, setRevenuePer] = useState<number[]>([]);
  const [revenueData, setRevenueData] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const fetchRevenueData = async (filter: string) => {
    setRevenueLabelData([]);
    setNetPremiumData([]);
    setRevenuePer([]);
    setRevenueData([]);
    setTitle(`${filter.toUpperCase()} REVENUE`);
    try {
      const response = await GetRevenueDataService({ header, filter });
      const revenueData = response.data;
      const PolicyLabel = revenueData.map((item: any) => Object.keys(item)[0]);
      const netPremium = revenueData.map((item: any) => {
        const monthData = item[Object.keys(item)[0]];
        return monthData.netPremium;
      });
      const revenuePer = revenueData.map((item: any) => {
        const monthData = item[Object.keys(item)[0]];
        const percentage = parseFloat(monthData.revenuePercentage);
        return isNaN(percentage) ? 0 : percentage;
      });
      const revenue = revenueData.map((item: any) => {
        const monthData = item[Object.keys(item)[0]];
        return monthData.revenue;
      });
      setRevenueLabelData(PolicyLabel);
      setNetPremiumData(netPremium);
      setRevenuePer(revenuePer);
      setRevenueData(revenue);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchRevenueData("week");
  }, []);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };
  const chartData = {
    labels: revenueLabelData,
    datasets: [
      {
        label: "Net Premium",
        data: netPremiumData,
        backgroundColor: "rgba(0, 0, 139, 0.3)",
        borderColor: "rgba(0, 0, 139, 0.7)",
        fill: true,
      },
      {
        label: "Revenue",
        data: revenueData,
        backgroundColor: "rgba(47, 79, 79, 0.9)",
        borderColor: "rgba(47, 79, 79, 1)",
        fill: true,
      },
      {
        label: "Revenue Percentage",
        data: revenuePer,
        backgroundColor: "rgba(128, 0, 0, 0.9)",
        borderColor: "rgba(128, 0, 0, 1)",
        fill: true,
        yAxisID: "y2",
      },
    ],
  };
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1000,
        },
      },
      x: {
        grid: {
          color: "transparent",
        },
      },
    },
  };
  return (
    <>
      <Card>
        <CardHeader
          action={
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <MoreVertical style={{ color: "black" }} />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          <MenuItem onClick={() => fetchRevenueData("week")}>
                            Week
                          </MenuItem>
                          <MenuItem onClick={() => fetchRevenueData("month")}>
                            Month
                          </MenuItem>
                          <MenuItem onClick={() => fetchRevenueData("year")}>
                            Year
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          }
          title={title}
        />
        <CardContent>
          <ChartWrapper>
            <Bar data={chartData} options={chartOptions} />
          </ChartWrapper>
        </CardContent>
      </Card>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default AdminRevenueChart;
