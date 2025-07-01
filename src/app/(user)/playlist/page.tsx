import AppBarChart from "@/components/charts/bar.chart";
import AppPieChart from "@/components/charts/pie.chart";

const PlaylistPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div>
      <AppBarChart />
      <AppPieChart />
    </div>
  );
};

export default PlaylistPage;
