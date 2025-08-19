import useGetCategory from "@/app/hooks/useGetCategory";
import { ArrowLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { CategoryType } from "@prisma/client";
import CategoryItem from "./CategoryItem";

const CategoryList = ({
  label,
  type,
}: {
  label: string;
  type: CategoryType;
}) => {
  const { data } = useGetCategory();

  return (
    <Box>
      <Box display={"flex"}>
        <ArrowLeft />
        <Typography
          variant="subtitle2"
          fontSize={{ xs: "0.6rem", md: "0.75rem" }}
          paddingTop={{ xs: 0.5, md: 0.2 }}
        >
          {label}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {data
          ?.filter((category) => category.type == type)
          .map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
      </Box>
    </Box>
  );
};
export default CategoryList;
