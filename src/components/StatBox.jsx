import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box width="100%" m={isSmallScreen ? "0 15px" : "0 30px"}>
      <Box display="flex" justifyContent="space-between" flexDirection={isSmallScreen ? "column" : "row"}>
        <Box mb={isSmallScreen ? "10px" : "0"}>
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px" flexDirection={isSmallScreen ? "column" : "row"}>
        <Typography
          variant={isSmallScreen ? "body1" : "h5"}
          sx={{ color: colors.greenAccent[500] }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant={isSmallScreen ? "body1" : "h5"}
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
