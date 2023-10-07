const API_URL = process.env.REACT_APP_API_URL as string;

export const getTokenConfig = () => ({
  url: `${API_URL}/getaccesstoken` as string,
  options: {
    headers: {
      Accept: "application/json",
      "api-token": process.env.REACT_APP_TOKEN,
      "user-email": process.env.REACT_APP_EMAIL,
    } as HeadersInit
  }
});

export const getSelectOptionsConfig = (url: string, authToken: string) => {
  return ({
    url,
    options: {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      } as HeadersInit
    },
  })
};