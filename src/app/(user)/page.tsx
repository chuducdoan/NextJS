import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<ITrackProps[]>>({
    url: "http://localhost:8080/api/v1/tracks",
    method: "GET",
    headers: {
      ["Authorization"]: `Bearer ${session?.access_token}`,
    },
  });

  const data: ITrackProps[] = res?.data ?? [];

  return (
    <Container>
      <MainSlider data={data} title="Favorite" />
    </Container>
  );
};
export default HomePage;
