import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WaveTrack from "@/components/track/wave.track";
import { getIdFromSlug, sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from "next/navigation";
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
  const id = getIdFromSlug(slug);
 
  // fetch post information
  const res = await sendRequest<IBackendRes<ITrackProps>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET",
    // nextOption: {caches: 'no-store'}
  });
 
  return {
    title: res.data?.title,
    description: res.data?.description,
    openGraph: {
      title: 'Hỏi Dân IT',
      description: 'Beyond Your Coding Skills',
      type: 'website',
      images: [`https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`],
    },
  }
}

export async function generateStaticParams() {
  return [
    {slug: "run-8.html"},
    {slug: "nang-tho-7.html"}
  ]
}

const DetailTrackPage = async (props: any) => {
  const id = getIdFromSlug(props.params.slug);

  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<ITrackProps>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET",
  });

  const resComment = await sendRequest<IBackendRes<ITrackCommentProps[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comment`,
    method: "POST",
    body: {
      "trackId": id,
      "current": 0,
      "pageSize": 10
    },
    headers: {
      ["Authorization"]: `Bearer ${session?.access_token}`,
    },
  });

  await new Promise(resolve => setTimeout(resolve, 3000))

  if (!resComment?.data) {
    notFound();
  }

  return (
    <Container>
      <div>
        <WaveTrack trackInfo={res?.data ?? null} comments={resComment?.data ?? null}/>
      </div>
    </Container>
  );
};

export default DetailTrackPage;
