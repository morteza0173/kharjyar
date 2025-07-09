import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { NavigateBeforeRounded } from "@mui/icons-material";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function HeaderBreadcrumbs() {
  return (
    <StyledBreadcrumbs
      dir="rtl"
      aria-label="breadcrumb"
      separator={<NavigateBeforeRounded fontSize="small" />}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "caption.fontSize",
            md: "body1.fontSize",
          },
        }}
      >
        داشبورد
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: {
            xs: "caption.fontSize",
            md: "body1.fontSize",
          },
          color: "text.primary",
          fontWeight: 600,
        }}
      >
        صفحه اصلی
      </Typography>
    </StyledBreadcrumbs>
  );
}
