import axios from "axios";
import { RegistrationType } from "@/app/registration/actions/useRegistration";

const _apiPath = "/api/auth/registration";
export const ApiRegistration = (data: RegistrationType) =>
  axios({
    method: "POST",
    url: _apiPath,
    data,
  });
