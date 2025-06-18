import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CardTrack from "@/components/track/card.track";
import { sendRequest } from "@/utils/api";
import { Box, Container, Grid } from "@mui/material";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<ITrackProps[]>>({
    url: "http://localhost:8080/api/v1/tracks/user",
    method: "POST",
    body: {
      id: params.slug,
      current: 0,
      pageSize: 10,
    },
    headers: {
      ["Authorization"]: `Bearer ${session?.access_token}`,
    },
  });

  const data = res?.data ?? [];

  return (
    <Box sx={{ mt: 5 }}>
      <Container>
        <Grid container spacing={2}>
          {data.map((item: ITrackProps, index: number) => (
            <Grid item xs={6} key={index}>
              <CardTrack data={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
