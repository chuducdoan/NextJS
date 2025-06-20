import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";

import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const res = await sendRequest<IBackendRes<ITrackProps>>({
    url: `http://localhost:8080/api/v1/tracks/${slug}`,
    method: "GET",
    nextOption: {caches: 'no-store'}
  });
 
  return {
    title: res.data?.title,
    description: res.data?.description,
  }
}

const DetailTrackPage = async (props: any) => {

  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<ITrackProps>>({
    url: `http://localhost:8080/api/v1/tracks/${props.params.slug}`,
    method: "GET",
    nextOption: {caches: 'no-store'},
  });

  const resComment = await sendRequest<IBackendRes<ITrackCommentProps[]>>({
    url: `http://localhost:8080/api/v1/tracks/comment`,
    method: "POST",
    body: {
      "trackId": props.params.slug,
      "current": 0,
      "pageSize": 10
    },
    headers: {
      ["Authorization"]: `Bearer ${session?.access_token}`,
    },
  });

  return (
    <Container>
      <div>
        <WaveTrack trackInfo={res?.data ?? null} comments={resComment?.data ?? null}/>
      </div>
    </Container>
  );
};

export default DetailTrackPage;
