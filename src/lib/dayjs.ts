import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(quarterOfYear);

dayjs.extend(jalali);
dayjs.calendar("jalali");

export default dayjs;
