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
import GetCommissionDataService from "../../../api/Dashboard/GetCommissionData/GetCommissionDataService";
import toast, { Toaster } from "react-hot-toast";

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

const AdminCommisionChart = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [commissionLabelData, setCommissionLabelData] = useState<string[]>([]);
  const [payInValueData, setPayInValueData] = useState<number[]>([]);
  const [payOutValueData, setPayOutValueData] = useState<number[]>([]);
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const fetchData = async (filter: string) => {
    setCommissionLabelData([]);
    setPayInValueData([]);
    setPayOutValueData([]);
    setTitle(`${filter.toUpperCase()} COMMISSION`);
    try {
      const commissions = await GetCommissionDataService({ header, filter });
      const CommissionLabel = commissions.data.payIn.map(
        (item: any) => Object.keys(item)[0]
      );
      const payInData = commissions.data.payIn.map(
        (item: any) => Object.values(item)[0]
      );
      const payOutData = commissions.data.payOut.map(
        (item: any) => Object.values(item)[0]
      );

      setCommissionLabelData(CommissionLabel);
      setPayInValueData(payInData);
      setPayOutValueData(payOutData);
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("week"); // Initial fetch with default filter "week"
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

  const memberData = {
    labels: commissionLabelData,
    datasets: [
      {
        label: "PayIn Commission",
        backgroundColor: "rgba(30, 144, 255, 0.7)",
        borderColor: "rgba(30, 144, 255, 1)",
        hoverBackgroundColor: "blue",
        hoverBorderColor: "blue",
        data: payInValueData,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: "PayOut Commission",
        backgroundColor: "rgba(255, 165, 0, 0.7)",
        borderColor: "rgba(255, 165, 0, 1)",
        hoverBackgroundColor: "blue",
        hoverBorderColor: "blue",
        data: payOutValueData,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const memberOptions = {
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
        stacked: false,
        ticks: {
          stepSize: 20,
          fontColor: "red",
        },
      },
      x: {
        stacked: false,
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
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                      >
                        <MenuItem onClick={() => fetchData("week")}>
                          {"Week"}
                        </MenuItem>
                        <MenuItem onClick={() => fetchData("month")}>
                          {"Month"}
                        </MenuItem>
                        <MenuItem onClick={() => fetchData("year")}>
                          {"Year"}
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
          <Bar data={memberData} options={memberOptions} />
        </ChartWrapper>
      </CardContent>
    </Card>
    <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AdminCommisionChart;
