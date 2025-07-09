import {
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Search() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return isMdUp ? (
    <FormControl
      sx={{
        width: { md: "25ch" },
        display: "flex",
      }}
      variant="outlined"
    >
      <OutlinedInput
        size="small"
        id="search"
        placeholder="جستجو در تراکنش ها ..."
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  ) : (
    <IconButton aria-label="جستجو">
      <SearchRoundedIcon />
    </IconButton>
  );
}
