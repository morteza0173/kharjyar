import {
  Category,
  ContentPasteSearch,
  EventNote,
  PriceChange,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

const items = [
  {
    icon: <Category sx={{ color: "text.secondary" }} />,
    title: "مدیریت دسته‌بندی‌ هزینه‌ها",
    description:
      "هزینه‌هایت را در دسته‌های دلخواه (مثلاً خورد‌وخوراک، حمل‌ونقل یا تفریح) ثبت کن تا بفهمی پولت کجا خرج می‌شود؛ این دسته‌بندی‌ها کاملاً قابل شخصی‌سازی‌اند.",
  },
  {
    icon: <EventNote sx={{ color: "text.secondary" }} />,
    title: "گزارش‌گیری ماهانه و هفتگی",
    description:
      "با نمودارها و گزارش‌های عددی، وضعیت خرج و درآمدت در هر ماه یا هفته را یک‌جا ببین و روند مالی‌ات را بهتر تحلیل و مدیریت کن.",
  },
  {
    icon: <PriceChange sx={{ color: "text.secondary" }} />,
    title: "تعیین بودجه برای هر دسته‌بندی",
    description:
      "برای هر دسته‌ می‌تونی بودجه تعیین کنی؛ اگر به سقف نزدیک بشی، سیستم هشدار می‌ده تا خرج‌هات رو بهتر مدیریت کنی.",
  },
  {
    icon: <ContentPasteSearch sx={{ color: "text.secondary" }} />,
    title: "جست‌وجوی پیشرفته در تراکنش‌ها",
    description:
      "با جست‌وجو و فیلتر پیشرفته، می‌تونی بین همه تراکنش‌هات موارد خاص رو سریع پیدا کنی، مثلاً خرج‌های تفریح در آبان یا هزینه‌های بالای ۵۰۰ هزار تومان.",
  },
];

const AuthSideInfo = () => {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }} className="mx-2">
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
};
export default AuthSideInfo;
