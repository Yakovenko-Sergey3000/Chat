import axios from "axios";
import { LoginType } from "@/app/login/actions/useLogin";

const _apiPath = "/api/auth/login";
export const ApiLogin = (data: LoginType) =>
  axios({
    method: "POST",
    url: _apiPath,
    data,
  });
