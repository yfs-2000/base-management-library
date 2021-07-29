import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
/*antd使用dayjs替换*/
const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
