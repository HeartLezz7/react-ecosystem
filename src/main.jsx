import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={4} sx={{ background: "red" }}>
            left
          </Grid>
          <Grid item xs={4} sx={{ background: "red" }}>
            center
          </Grid>
          <Grid item xs={4} sx={{ background: "red" }}>
            right
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
