import React from "react";
import sourceData from "../assests/sourceData.json";
import PostData from "../assests/PostData.json";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Box, CircularProgress, Container, styled } from "@mui/material";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const StyledBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.15s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));
const Insights = () => {
  if (!sourceData || !PostData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Analytics Charts",
      },
    },
  };
  return (
    <Container>
      <StyledBox sx={{ height: "400px", marginBottom: 4 }}>
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Views",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(60,179,113,0.8)",
                  "rgba(27,27,27,0.8)",
                  "rgba(255,99,187,0.8)",
                  "rgba(155,99,17,0.8)",
                  "rgba(125,199,187,0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={chartOptions}
        />
      </StyledBox>
      <StyledBox sx={{ height: "400px", marginBottom: 4 }}>
        <Doughnut
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Views",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(60,179,113,0.8)",
                  "rgba(27,27,27,0.8)",
                  "rgba(255,99,187,0.8)",
                  "rgba(155,99,17,0.8)",
                  "rgba(125,199,187,0.8)",
                ],
                borderColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(60,179,113,0.8)",
                  "rgba(27,27,27,0.8)",
                  "rgba(255,99,187,0.8)",
                  "rgba(155,99,17,0.8)",
                  "rgba(125,199,187,0.8)",
                ],
              },
            ],
          }}
          options={chartOptions}
        />
      </StyledBox>
      <StyledBox sx={{ height: "400px" }}>
        <Line
          data={{
            labels: PostData.map((data) => data.month),
            datasets: [
              {
                label: "Views",
                data: PostData.map((data) => data.views),
                backgroundColor: "rgba(182, 199, 0,0.8)",
                borderColor: "rgba(182, 199, 0,1)",
                fill: false,
              },
              {
                label: "Likes",
                data: PostData.map((data) => data.likes),
                backgroundColor: "rgba(182, 99, 71,0.8)",
                borderColor: "rgba(182, 99, 71,1)",
                fill: false,
              },
              {
                label: "Comments",
                data: PostData.map((data) => data.comments),
                backgroundColor: "rgba(90, 99, 71,0.8)",
                borderColor: "rgba(90, 99, 71,1)",
                fill: false,
              },
              {
                label: "Shares",
                data: PostData.map((data) => data.shares),
                backgroundColor: "rgba(131, 43, 218,0.8)",
                borderColor: "rgba(131, 43, 218,1)",
                fill: false,
              },
            ],
          }}
          options={chartOptions}
        />
      </StyledBox>
    </Container>
  );
};

export default Insights;
