const token = localStorage.getItem("token") || "";
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

fetch(`http://37.140.197.124:8087/verify-token`, requestOptions).then((res) => {
  if (!res.ok) window.location.href = "sign-in.html";
});

