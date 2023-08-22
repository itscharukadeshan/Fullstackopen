/** @format */
import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import { Gender } from "../../types";

interface Props {
  gender: Gender;
}

function GenderIcon({ gender }: Props) {
  switch (gender) {
    case "male":
      return <MaleIcon />;

    case "female":
      return <FemaleIcon />;

    case "other":
      return <TransgenderIcon />;

    default:
      return null;
  }
}

export default GenderIcon;
