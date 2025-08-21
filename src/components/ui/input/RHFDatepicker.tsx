import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { TextField, useMediaQuery } from "@mui/material";
import "react-multi-date-picker/styles/layouts/mobile.css";
import theme from "@/Providers/theme";
import "./datePicker.css";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFDatepickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function RHFDatepicker<T extends FieldValues>({
  name,
  label,
}: RHFDatepickerProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <>
          <DatePicker
            value={value || ""}
            onChange={(newValue) => {
              if (newValue) {
                onChange(newValue.toDate());
              } else {
                onChange(null);
              }
            }}
            className={`${fullScreen ? "rmdp-mobile yellow" : "yellow"}`}
            format="D MMMM YYYY ساعت HH:mm"
            containerStyle={{ width: "100%" }}
            style={{
              width: "100%",
              height: "40px",
              boxSizing: "border-box",
            }}
            plugins={[<TimePicker key={1} position="bottom" hideSeconds />]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            render={(value, openCalendar) => (
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextField
                  value={value}
                  onClick={openCalendar}
                  label={label}
                  style={{
                    flex: 1,
                    height: "40px",
                    boxSizing: "border-box",
                  }}
                  error={!!errors[name]}
                  helperText={(errors[name]?.message as string) || ""}
                />
                <CalendarTodayOutlined
                  style={{
                    position: "absolute",
                    left: "40px",
                    cursor: "pointer",
                    color: "gray",
                  }}
                  onClick={openCalendar}
                />
              </div>
            )}
          />
        </>
      )}
    />
  );
}
