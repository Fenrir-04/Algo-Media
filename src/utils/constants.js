import MusicNoteIcon from "@mui/icons-material/MusicNote";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export const logo = "https://i.ibb.co/s9Qys2j/logo.png";
export const categories = [
  { name: "Music", icon: <MusicNoteIcon />, categoryId: 10 },
  { name: "Film & Animation", icon: <OndemandVideoIcon />, categoryId: 1 },
  { name: "Gaming", icon: <SportsEsportsIcon />, categoryId: 20 },
  { name: "Sport", icon: <FitnessCenterIcon />, categoryId: 17 },
  { name: "Comedy", icon: <TheaterComedyIcon />, categoryId: 23 },
  { name: "Entertainment", icon: <TheaterComedyIcon />, categoryId: 24 },
  { name: "News", icon: <TheaterComedyIcon />, categoryId: 25 },
  {
    name: "Science and Technology",
    icon: <TheaterComedyIcon />,
    categoryId: 28,
  },
];

const demoThumbnailUrl = "https://i.ibb.co/G2L2Gwp/API-Course.png";
const demoChannelUrl = "/channel/UCmXmlB4-HJytD7wek0Uo97A";
const demoVideoUrl = "/video/GDa8kZLNhJ4";
const demoChannelTitle = "JavaScript Mastery";
const demoVideoTitle =
  "Build and Deploy 5 JavaScript & React API Projects in 10 Hours - Full Course | RapidAPI";
const demoProfilePicture =
  "http://dergipark.org.tr/assets/app/images/buddy_sample.png";
const dateFormat = "DD/MM/YYYY";

export {
  demoThumbnailUrl,
  demoChannelUrl,
  demoVideoUrl,
  demoChannelTitle,
  demoVideoTitle,
  demoProfilePicture,
  dateFormat,
};
