import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(">> check session: ", session);
  // const res = await sendRequest<IMessage>({
  //   url: "https://smsgw.vnpaytest.vn/smsgw/sendSms",
  //   method: "POST",
  //   body: {
  //     messageId: "87308x01256",
  //     destination: "0328118909",
  //     sender: "doancdtest",
  //     keyword: "doancd_test",
  //     shortMessage: "Dich vu he sinh thai",
  //     encryptMessage: "",
  //     isEncrypt: "0",
  //     type: "0",
  //     requestTime: "1590032785",
  //     partnerCode: "953012",
  //     secretKey: "9a270b8435d84d9dbba5b2890c3cd83f",
  //   },
  // });

  const data: ITrack[] = [
    {
      _id: "1",
      title: "doancd",
      description: "demo1",
      imgUrl:
        "https://img.freepik.com/premium-photo/headphones-with-music-notes-headband-purple-background_1204450-18453.jpg?semt=ais_hybrid&w=740",
      trackUrl: "headphones.mp3",
    },
    {
      _id: "2",
      title: "doancd",
      description: "demo1",
      imgUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/024/295/098/small_2x/music-notes-background-illustration-ai-generative-free-photo.jpg",
      trackUrl: "music-notes.mp3",
    },
    {
      _id: "4",
      title: "doancd sample.mp3",
      description: "demo1",
      imgUrl:
        "https://schoolofrock.imgix.net/img/news-article-hero@2x/hero-1703187225.jpg",
      trackUrl: "sample.mp3",
    },
    {
      _id: "3",
      title: "doancd",
      description: "demo1",
      imgUrl:
        "https://assets.bosecreative.com/transform/6f5d20ca-f183-410a-b33d-281378107494/QCUH24_Holiday_FY24_012?io=transform:crop,height:1000,width:1920,path:square&quality=95",
      trackUrl: "bosecreative.mp3",
    },

    {
      _id: "5",
      title: "doancd",
      description: "demo1",
      imgUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
      trackUrl: "photo.mp3",
    },
    {
      _id: "6",
      title: "doancd",
      description: "demo1",
      imgUrl:
        "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2024/03/woman-listening-to-music-with-headphones.jpg",
      trackUrl: "woman.mp3",
    },
  ];

  return (
    <Container>
      <MainSlider data={data} title="Favorite" />
    </Container>
  );
}
