import {
  AccountBalance,
  AccountBalanceWallet,
  Savings,
  PieChartOutline,
  PlaylistAddCheck,
} from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";

export default function AccountInfoSection() {
  return (
    <Box p={4}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        چرا باید حساب بسازید؟
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        با ساخت حساب‌های مختلف، می‌تونید مدیریت دقیقی روی پول‌هاتون داشته باشید.
        چه نقدی باشه، چه توی کارت بانکی یا حتی حساب پس‌انداز.
      </Typography>

      <Stack spacing={2} mt={3}>
        <InfoItem
          icon={<AccountBalance color="primary" />}
          title="حساب‌های بانکی"
          description="برای مدیریت کارت‌ها و حساب‌های بانکی رسمی"
        />
        <InfoItem
          icon={<AccountBalanceWallet color="primary" />}
          title="کیف پول"
          description="برای ثبت پول‌های نقدی یا کیف‌پول‌های دیجیتال مثل زرین‌پال، پی‌پال و..."
        />
        <InfoItem
          icon={<Savings color="primary" />}
          title="پس‌انداز"
          description="برای ذخیره‌سازی پول جهت اهداف بلندمدت"
        />
        <InfoItem
          icon={<PieChartOutline color="primary" />}
          title="گزارش‌گیری دقیق"
          description="گزارش‌گیری لحظه‌ای از وضعیت مالی هر حساب"
        />
        <InfoItem
          icon={<PlaylistAddCheck color="primary" />}
          title="مدیریت بهتر خرج‌ها"
          description="تقسیم‌بندی خرج‌ها و درآمدها بر اساس نوع حساب"
        />
      </Stack>
    </Box>
  );
}

function InfoItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box mt={0.5}>{icon}</Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}
